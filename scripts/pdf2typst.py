#!/usr/bin/env python3
"""pdf2typst - convert a PDF into Typst source, in the usual note template.

Everything the converter needs lives in this one file: markup escaping, the
geometric layout analysis, maths and super/subscript recovery, the Tesseract
wrapper used for scanned pages, both PDF back ends and the command line.
png2typst.py imports this file as its engine, so the two must stay together.

    pdf2typst.py paper.pdf -o paper.typ     # write a file
    pdf2typst.py paper.pdf                  # write to stdout
    pdf2typst.py scan.pdf --ocr auto        # rasterise and OCR the pages
    pdf2typst.py --check                    # what is installed?

The output starts with the template that `:r typst.typ` inserts, so a
conversion reads like every other note. Use --no-template for bare markup.
"""

from __future__ import annotations

import argparse
import importlib.util
import os
import re
import shutil
import statistics
import subprocess
import sys
import tempfile
from dataclasses import dataclass, replace
from typing import Dict, List, Optional, Sequence, Tuple


# ==========================================================================
# Handing over to an interpreter that can do the work
# ==========================================================================
#
# A "run this file" action, or a bare `python3 pdf2typst.py`, may pick an
# interpreter without PyMuPDF installed. Rather than dying with an ImportError,
# look for one that has it and hand the process over.

#: Set while re-executing, so a bad guess cannot loop forever.
REEXEC_FLAG = "DOC2TYPST_REEXEC"

#: Interpreters tried, newest first, after the running one and $PATH.
INTERPRETER_CANDIDATES = (
    "/opt/homebrew/bin/python3.14",
    "/opt/homebrew/bin/python3.13",
    "/opt/homebrew/bin/python3.12",
    "/opt/homebrew/bin/python3.11",
    "/opt/homebrew/bin/python3.10",
    "/opt/homebrew/bin/python3",
    "/usr/local/bin/python3",
    "/usr/bin/python3",
)

#: Any one of these means PDF text can be read.
PDF_MODULES = ("pymupdf", "fitz", "pdfplumber")


def importable(module: str) -> bool:
    """True when the running interpreter can import *module*."""
    try:
        return importlib.util.find_spec(module) is not None
    except (ImportError, ValueError):
        return False


def _interpreter_with(modules: Sequence[str], candidates: Sequence[str]) -> str:
    """First interpreter in *candidates* that can import one of *modules*."""
    for python in candidates:
        if not python or not os.path.isfile(python):
            continue
        for module in modules:
            probe = subprocess.run(
                [python, "-c", "import " + module],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            if probe.returncode == 0:
                return python
    return ""


def reexec_with(modules: Sequence[str], program: str, argv: Sequence[str]) -> None:
    """Re-run *program* under an interpreter that can import one of *modules*.

    Does nothing when the running interpreter already works, when no candidate
    is better, or when this is already the second attempt.
    """
    if any(importable(module) for module in modules):
        return
    if os.environ.get(REEXEC_FLAG):
        return

    candidates = [sys.executable]
    candidates.extend(shutil.which(name) or "" for name in ("python3", "python"))
    candidates.extend(INTERPRETER_CANDIDATES)
    target = _interpreter_with(modules, candidates)
    if not target or os.path.realpath(target) == os.path.realpath(sys.executable):
        return

    environment = dict(os.environ)
    environment[REEXEC_FLAG] = "1"
    os.execve(target, [target, os.path.abspath(program)] + list(argv), environment)


# ==========================================================================
# Typst markup: escaping and inline styling
# ==========================================================================

#: Characters that always carry a special meaning in Typst markup mode.
ALWAYS_ESCAPE = frozenset("\\#$@*_`<>~[]")

#: Characters that only need escaping at the very beginning of a line, where
#: they would start a heading (``=``), a list item (``-`` ``+`` ``/``) or a
#: term (``:``).
LINE_START_ESCAPE = frozenset("=-+/:")


def escape_markup(text: str, at_line_start: bool = False) -> str:
    """Escape *text* so that Typst prints it verbatim in markup mode.

    A backslash followed by a character yields that character literally, so
    escaping is safe to apply broadly. Multi-character shorthands (``--`` for
    an en dash, ``...`` for an ellipsis) are neutralised by escaping their
    first character.
    """
    if not text:
        return ""

    out: List[str] = []
    at_start = at_line_start
    for index, char in enumerate(text):
        if char == "\\":
            out.append("\\\\")
        elif char in ALWAYS_ESCAPE:
            out.append("\\" + char)
        elif at_start and char in LINE_START_ESCAPE:
            out.append("\\" + char)
        elif char == "-" and text.startswith("--", index):
            out.append("\\-")
        elif (
            char == "."
            and text.startswith("...", index)
            and not text.startswith("....", index)
        ):
            out.append("\\.")
        else:
            out.append(char)
        at_start = False
    return "".join(out)


def _split_edge_spaces(text: str) -> Tuple[str, str, str]:
    """Split *text* into ``(leading, core, trailing)`` whitespace parts."""
    core = text.strip()
    if not core:
        return text, "", ""
    start = text.index(core[0])
    end = start + len(core)
    return text[:start], text[start:end], text[end:]


def emphasise(escaped: str, bold: bool, italic: bool) -> str:
    """Wrap already-escaped text in Typst emphasis markers.

    Surrounding whitespace is kept outside the markers because ``* bold *`` is
    not emphasis in Typst.
    """
    if not (bold or italic):
        return escaped
    lead, core, trail = _split_edge_spaces(escaped)
    if not core:
        return escaped
    if bold and italic:
        return lead + "#strong[#emph[" + core + "]]" + trail
    if bold:
        return lead + "*" + core + "*" + trail
    return lead + "_" + core + "_" + trail


def apply_script(styled: str, script: int) -> str:
    """Wrap already-rendered markup in Typst's super/subscript.

    ``#super[2]`` is used rather than the maths ``^`` because the run usually
    sits in ordinary text (an ``H`` followed by a smaller raised ``2``), where
    ``^`` means nothing at all.
    """
    if not script or not styled.strip():
        return styled
    lead, core, trail = _split_edge_spaces(styled)
    command = "super" if script > 0 else "sub"
    return lead + "#" + command + "[" + core + "]" + trail


@dataclass(frozen=True)
class Run:
    """A stretch of text sharing one inline style."""

    text: str
    bold: bool = False
    italic: bool = False
    #: +1 for a superscript, -1 for a subscript, 0 for ordinary text.
    script: int = 0
    #: Set when the run was set in a maths font (see :func:`is_math_font`).
    math: bool = False

    @property
    def is_blank(self) -> bool:
        return not self.text.strip()


def runs_text(runs: Sequence[Run]) -> str:
    """Plain text of *runs*, styles discarded."""
    return "".join(run.text for run in runs)


def _continues_math(runs: Sequence[Run], index: int) -> bool:
    """True while the run at *index* still belongs to the current formula."""
    run = runs[index]
    if run.math or run.script:
        return True
    if run.text.strip():
        return False
    # A blank run only joins the formula when the formula continues after it,
    # otherwise the space in front of the next word would be swallowed.
    following = runs[index + 1] if index + 1 < len(runs) else None
    return following is not None and (following.math or following.script)


def render_runs(
    runs: Sequence[Run],
    at_line_start: bool = False,
    math: bool = True,
    scripts: bool = True,
) -> str:
    """Render styled runs as Typst inline markup.

    A formula arrives as several runs - the operator, the exponent, the word
    after it - so neighbouring maths runs are gathered back into a single
    ``$...$`` instead of being wrapped one at a time.
    """
    parts: List[str] = []
    index = 0
    first = True
    while index < len(runs):
        run = runs[index]
        if math and run.math:
            segment: List[Run] = []
            while index < len(runs) and _continues_math(runs, index):
                segment.append(runs[index])
                index += 1
            parts.append("$" + math_expression(segment) + "$")
            first = False
            continue
        index += 1
        if not run.text:
            continue
        escaped = escape_markup(run.text, at_line_start=at_line_start and first)
        body = emphasise(escaped, run.bold, run.italic)
        if scripts:
            body = apply_script(body, run.script)
        parts.append(body)
        first = False
    return "".join(parts)


def merge_run(
    runs: List[Run],
    text: str,
    bold: bool = False,
    italic: bool = False,
    script: int = 0,
    math: bool = False,
) -> None:
    """Append *text* to *runs*, merging with the previous run when possible."""
    if not text:
        return
    if (
        runs
        and runs[-1].bold == bold
        and runs[-1].italic == italic
        and runs[-1].script == script
        and runs[-1].math == math
    ):
        runs[-1] = replace(runs[-1], text=runs[-1].text + text)
        return
    runs.append(Run(text=text, bold=bold, italic=italic, script=script, math=math))


def drop_trailing(runs: Sequence[Run], count: int) -> Tuple[Run, ...]:
    """Return *runs* with the last *count* characters removed."""
    if count <= 0:
        return tuple(runs)
    trimmed: List[Run] = []
    remaining = count
    for run in reversed(runs):
        if remaining <= 0:
            trimmed.append(run)
            continue
        if len(run.text) <= remaining:
            remaining -= len(run.text)
            continue
        trimmed.append(replace(run, text=run.text[: len(run.text) - remaining]))
        remaining = 0
    trimmed.reverse()
    return tuple(trimmed)


def slice_runs(runs: Sequence[Run], start: int) -> Tuple[Run, ...]:
    """Return *runs* starting from character offset *start*."""
    if start <= 0:
        return tuple(runs)
    out: List[Run] = []
    position = 0
    for run in runs:
        end = position + len(run.text)
        if end > start:
            offset = max(0, start - position)
            out.append(replace(run, text=run.text[offset:]))
        position = end
    return tuple(out)

# ==========================================================================
# Maths and super/subscripts
# ==========================================================================
#
# Text extraction reports a formula as ordinary spans that happen to be set in
# a maths font, and an exponent as a smaller span sitting a little higher.
# Both are recovered here: maths runs are wrapped in $...$ and scripted runs
# become #super[] / #sub[]. That is what turns a converted page into something
# editable instead of a string of loose characters.

#: Font families that only ever carry mathematics.
MATH_FONT_MARKERS = (
    "cmmi", "cmsy", "cmex", "cmbsy", "cmmib",           # Computer Modern
    "lmmi", "lmsy", "lmex", "lmmath", "latinmodernmath",
    "msam", "msbm", "eufm", "eurm", "eusm",             # AMS
    "mathjax", "cambriamath", "stixtwomath", "stixmath", "xitsmath",
    "asana", "mtmi", "mtsy", "mtextra", "symbol",       # MathType, Symbol
)

#: A scripted span is smaller than this share of the tallest span on its line.
SCRIPT_SIZE_RATIO = 0.85

#: ... and sits this far above or below the line's baseline, measured in ems.
SCRIPT_OFFSET_RATIO = 0.12

#: Characters that mean something else inside $...$.
_MATH_SPECIAL = "\\$#&\"@~{}"

#: List bullets and dingbats. They are set smaller and higher than the text
#: around them, exactly like a superscript, but they are never one.
_NON_SCRIPT = frozenset(
    "\u2022\u2023\u25aa\u25ab\u25e6\u25cb\u25cf\u25c6\u25c7\u25a0\u25a1\u00b7\u2219"
)


def _is_dingbat(text: str) -> bool:
    """True for a span that is nothing but list markers."""
    stripped = text.strip()
    return bool(stripped) and all(char in _NON_SCRIPT for char in stripped)


def is_math_font(family: str) -> bool:
    """True when *family* names a maths font rather than a text font.

    Most maths fonts are named "... Math" (NewCMMath, CambriaMath, STIXTwoMath,
    LatinModernMath), which is a reliable signal on its own. Older Computer
    Modern, AMS and MathType names are matched by prefix instead. Font names
    arrive both as a bare family ("New CMMath") and as the original PostScript
    name ("NewCMMath-Book"), so both are accepted.
    """
    if not family:
        return False
    lowered = family.replace(" ", "").lower()
    if lowered.endswith("math"):
        return True
    # The part before the style suffix, for names that were not split yet.
    stem = re.split(r"[-,_]", lowered)[0]
    if stem.endswith("math"):
        return True
    return any(marker in lowered for marker in MATH_FONT_MARKERS)


def script_levels(spans: Sequence[Span]) -> List[int]:
    """+1 for a superscript span, -1 for a subscript, 0 for ordinary text."""
    visible = [span for span in spans if span.text.strip()]
    if not visible:
        return [0] * len(spans)
    tallest = max(span.size for span in visible)
    main = [span for span in visible if span.size >= 0.9 * tallest] or visible
    baseline = statistics.median([span.y1 for span in main])
    levels: List[int] = []
    for span in spans:
        level = 0
        if (
            span.text.strip()
            and not _is_dingbat(span.text)
            and span.size < SCRIPT_SIZE_RATIO * tallest
        ):
            offset = span.y1 - baseline
            if offset <= -SCRIPT_OFFSET_RATIO * span.size:
                level = 1
            elif offset >= SCRIPT_OFFSET_RATIO * span.size:
                level = -1
        levels.append(level)
    return levels


def escape_math(text: str) -> str:
    """Escape *text* so that it survives inside $...$."""
    out: List[str] = []
    for char in text:
        if char == "\\":
            out.append("\\\\")
        elif char in _MATH_SPECIAL:
            out.append("\\" + char)
        else:
            out.append(char)
    return "".join(out)


def tidy_math(text: str) -> str:
    """Collapse the spacing that extraction sprinkles through a formula."""
    text = re.sub(r"[ \t\u00a0]+", " ", text)
    text = re.sub(r"\s+([,;:.)\]])", r"\1", text)
    text = re.sub(r"([(\[])\s+", r"\1", text)
    return text.strip()


#: A run of letters inside a formula is a word, not a row of variables.
_MATH_WORD = re.compile(r"[A-Za-z]{2,}(?: +[A-Za-z]{2,})*")


def quote_words(text: str) -> str:
    """Set words in a formula upright, the way maths typography does.

    ``$is prime$`` would render as six italic variables; ``$"is prime"$``
    renders as the two upright words the original page printed.
    """
    return _MATH_WORD.sub(lambda match: '"' + match.group(0) + '"', text)


def mathify(text: str) -> str:
    """Turn extracted text into the body of a ``$...$`` run."""
    return quote_words(escape_math(tidy_math(text)))


def render_math(text: str) -> str:
    """Render one maths run as inline Typst maths."""
    body = mathify(text)
    return "$" + body + "$" if body else ""


def math_expression(runs: Sequence[Run]) -> str:
    """Join *runs* into one maths expression, keeping ^ and _ attached."""
    out = ""
    for run in runs:
        if not run.text.strip():
            out += " "
            continue
        body = mathify(run.text)
        if run.script:
            out += ("^" if run.script > 0 else "_") + "(" + body + ")"
            continue
        if out and not out.endswith((" ", "^(", "_(")):
            out += " "
        out += body
    return re.sub(r"\s+", " ", out).strip()


def is_math_block(runs: Sequence[Run]) -> bool:
    """True when every visible run is maths or a script inside maths."""
    visible = [run for run in runs if run.text.strip()]
    return (
        bool(visible)
        and any(run.math for run in visible)
        and all(run.math or run.script for run in visible)
    )


def render_math_inline(runs: Sequence[Run]) -> str:
    """A whole line of maths, rendered inline (used by --mode absolute)."""
    return "$" + math_expression(runs) + "$"


def render_math_block(runs: Sequence[Run]) -> str:
    """A whole line of maths, rendered as displayed maths."""
    return "$ " + math_expression(runs) + " $"


# ==========================================================================
# Geometry: spans, lines, columns, style profile, blocks
# ==========================================================================

import re
import statistics
from dataclasses import dataclass, replace
from typing import Dict, List, Optional, Sequence, Tuple


#: A horizontal gap wider than this many times the font size reads as a space.
SPACE_GAP_FACTOR = 0.22

#: Spans whose vertical centres differ by less than this fraction of the median
#: line height are treated as part of the same line.
LINE_TOLERANCE_FACTOR = 0.55

#: Inside one back-end block a font change can split a visual line into several
#: spans that sit slightly apart, so the gap limit is generous there.
SAME_BLOCK_GAP_FACTOR = 4.0

#: Without block information a gap wider than this many ems is treated as a
#: column or table-cell boundary instead of a space.
LOOSE_GAP_FACTOR = 1.0

#: Heading sizes within this factor of each other are the same visual level.
HEADING_CLUSTER_RATIO = 0.88

#: Detection thresholds.
_BULLET_CHARS = "\u2022\u2023\u25aa\u25cf\u25cb\u25e6\u2043\u00b7\u2219\u2013\u2014"
_BULLET_RE = re.compile(r"^(?P<marker>[" + re.escape(_BULLET_CHARS) + r"]|-)\s+(?=\S)")
_NUMBER_RE = re.compile(r"^(?P<marker>\d{1,2})[.)]\s+(?=\S)")
_WHITESPACE = (" ", "\t", "\n", "\u00a0", "\u2009", "\u200a", "\u3000")

#: Font-name tokens that describe a style rather than the family.
_STYLE_TOKENS = frozenset(
    """
    bold bolditalic boldoblique italic oblique black heavy semibold demibold
    regular roman book medium light thin extralight extra light condensed
    narrow width mt ps ms std ce cy regularmt
    """.split()
)

#: Cosmetically nicer family names for the usual PDF base fonts.
_FONT_ALIASES = {
    "arial": "Arial",
    "arialmt": "Arial",
    "helvetica": "Helvetica",
    "helveticaneue": "Helvetica Neue",
    "times": "Times New Roman",
    "timesnewroman": "Times New Roman",
    "timesnewromanps": "Times New Roman",
    "courier": "Courier New",
    "couriernew": "Courier New",
    "calibri": "Calibri",
    "cambria": "Cambria",
    "georgia": "Georgia",
    "verdana": "Verdana",
}

_FONT_SUBSET = re.compile(r"^[A-Z]{6}\+")


def split_font_name(raw: str) -> Tuple[str, bool, bool]:
    """Split a PDF font name into ``(family, bold, italic)``.

    ``ABCDEF+Times-BoldItalic`` becomes ``("Times New Roman", True, True)``.
    """
    name = _FONT_SUBSET.sub("", raw or "").strip()
    if not name:
        return "", False, False
    lowered = name.lower()
    bold = any(
        token in lowered
        for token in ("bold", "black", "heavy", "semibold", "demibold", "extrabold")
    )
    italic = "italic" in lowered or "oblique" in lowered
    # Split glued names ("CourierNewPS" -> "Courier New PS") before filtering.
    spaced = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", name)
    tokens = [token for token in re.split(r"[-,_\s]+", spaced) if token]
    family_tokens = [token for token in tokens if token.lower() not in _STYLE_TOKENS]
    family = " ".join(family_tokens) if family_tokens else name
    family = _FONT_ALIASES.get(family.lower().replace(" ", ""), family)
    return family, bold, italic


@dataclass(frozen=True)
class Span:
    """A piece of text with its bounding box in points, origin top-left."""

    text: str
    x0: float
    y0: float
    x1: float
    y1: float
    size: float = 10.0
    font: str = ""
    bold: bool = False
    italic: bool = False
    group: str = ""

    @property
    def width(self) -> float:
        return max(0.0, self.x1 - self.x0)

    @property
    def height(self) -> float:
        return max(0.0, self.y1 - self.y0)

    @property
    def cy(self) -> float:
        return 0.5 * (self.y0 + self.y1)


@dataclass(frozen=True)
class Line:
    """A run of spans sharing one baseline."""

    spans: Tuple[Span, ...]
    page: int = 1
    group: str = ""
    column: int = 1
    hard_break: bool = False
    left_edge: float = 0.0
    right_edge: float = 0.0

    @property
    def x0(self) -> float:
        return min(span.x0 for span in self.spans)

    @property
    def y0(self) -> float:
        return min(span.y0 for span in self.spans)

    @property
    def x1(self) -> float:
        return max(span.x1 for span in self.spans)

    @property
    def y1(self) -> float:
        return max(span.y1 for span in self.spans)

    @property
    def width(self) -> float:
        return max(0.0, self.x1 - self.x0)

    @property
    def height(self) -> float:
        return max(0.0, self.y1 - self.y0)

    @property
    def size(self) -> float:
        weighted: List[float] = []
        for span in self.spans:
            weight = max(1, len(span.text.strip()))
            weighted.extend([span.size] * min(weight, 200))
        return statistics.median(weighted) if weighted else 10.0

    @property
    def font(self) -> str:
        counts: Dict[str, int] = {}
        for span in self.spans:
            if span.font:
                counts[span.font] = counts.get(span.font, 0) + max(1, len(span.text.strip()))
        if not counts:
            return ""
        return max(counts.items(), key=lambda item: item[1])[0]

    @property
    def is_bold(self) -> bool:
        styled = [span for span in self.spans if span.text.strip()]
        return bool(styled) and all(span.bold for span in styled)

    @property
    def is_italic(self) -> bool:
        styled = [span for span in self.spans if span.text.strip()]
        return bool(styled) and all(span.italic for span in styled)

    @property
    def runs(self) -> Tuple[Run, ...]:
        return line_runs(self.spans)

    @property
    def text(self) -> str:
        return runs_text(self.runs)


@dataclass(frozen=True)
class PageText:
    """One page of extracted text."""

    number: int
    width: float
    height: float
    lines: Tuple[Line, ...] = ()


def _joiner(previous: Span, current: Span) -> str:
    """Decide whether a space belongs between two consecutive spans."""
    if previous.text.endswith(_WHITESPACE) or current.text.startswith(_WHITESPACE):
        return ""
    gap = current.x0 - previous.x1
    if gap > SPACE_GAP_FACTOR * max(previous.size, current.size, 1.0):
        return " "
    return ""


def line_runs(spans: Sequence[Span]) -> Tuple[Run, ...]:
    """Merge spans into styled runs, restoring spaces, maths and scripts."""
    runs: List[Run] = []
    levels = script_levels(spans)
    for index, span in enumerate(spans):
        text = span.text
        if index:
            text = _joiner(spans[index - 1], span) + text
        merge_run(
            runs,
            text,
            span.bold,
            span.italic,
            levels[index],
            is_math_font(span.font),
        )
    return tuple(runs)


def _row_gap_limit(left: Span, right: Span, unit: float) -> float:
    """Gap that still reads as a space rather than a layout boundary."""
    if left.group and left.group == right.group:
        return SAME_BLOCK_GAP_FACTOR * unit
    return LOOSE_GAP_FACTOR * unit


def _split_row(band: Sequence[Span], page: int, unit: float) -> List[Line]:
    """Cut one visual row into lines wherever the gap is not a space."""
    ordered = sorted(band, key=lambda span: span.x0)
    runs: List[List[Span]] = [[ordered[0]]]
    for span in ordered[1:]:
        current = runs[-1]
        right = max(item.x1 for item in current)
        if span.x0 - right > _row_gap_limit(current[-1], span, unit):
            runs.append([span])
        else:
            current.append(span)

    lines: List[Line] = []
    for run in runs:
        groups: Dict[str, int] = {}
        for span in run:
            if span.group:
                groups[span.group] = groups.get(span.group, 0) + 1
        group = max(groups.items(), key=lambda item: item[1])[0] if groups else ""
        lines.append(Line(spans=tuple(run), page=page, group=group))
    return lines


def group_spans_into_lines(
    spans: Sequence[Span],
    page: int = 1,
    tolerance_factor: float = LINE_TOLERANCE_FACTOR,
) -> Tuple[Line, ...]:
    """Cluster loose spans into lines.

    Spans carrying the same ``group`` (one back-end block, one OCR paragraph)
    are clustered together but never across groups, so a two-column page keeps
    its columns apart even when the gutter is narrow. Inside a group the spans
    are split into lines by vertical position and by any gap too wide to be a
    space.
    """
    usable = [span for span in spans if span.text.strip()]
    if not usable:
        return ()

    heights = [span.height for span in usable if span.height > 0]
    sizes = [span.size for span in usable if span.size > 0]
    median_height = statistics.median(heights) if heights else 10.0
    median_size = statistics.median(sizes) if sizes else median_height
    tolerance = max(1.2, tolerance_factor * median_height)

    by_group: Dict[str, List[Span]] = {}
    for span in usable:
        by_group.setdefault(span.group, []).append(span)

    lines: List[Line] = []
    for group_spans in by_group.values():
        band: List[Span] = []
        centre = 0.0
        for span in sorted(group_spans, key=lambda item: (item.cy, item.x0)):
            if band and abs(span.cy - centre) > tolerance:
                lines.extend(_split_row(band, page, median_size))
                band = []
            band.append(span)
            centre = statistics.fmean(item.cy for item in band)
        if band:
            lines.extend(_split_row(band, page, median_size))
    return tuple(sorted(lines, key=lambda line: (line.y0, line.x0)))


# --------------------------------------------------------------------------
# Multi-column detection
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class LayoutOptions:
    """Knobs for geometric analysis."""

    columns: bool = True
    max_columns: int = 3
    min_gutter: float = 10.0


def _union_gaps(intervals: Sequence[Tuple[float, float]], min_width: float) -> List[Tuple[float, float]]:
    """Gaps left uncovered by the union of *intervals*."""
    if not intervals:
        return []
    ordered = sorted(intervals)
    gaps: List[Tuple[float, float]] = []
    end = ordered[0][1]
    for start, stop in ordered[1:]:
        if start - end >= min_width:
            gaps.append((end, start))
        end = max(end, stop)
    return gaps


def _parallel(left: Sequence[Line], right: Sequence[Line], ratio: float = 0.4) -> bool:
    """True when two groups of lines sit side by side rather than in sequence."""
    left_span = max(line.y1 for line in left) - min(line.y0 for line in left)
    right_span = max(line.y1 for line in right) - min(line.y0 for line in right)
    if left_span <= 0 or right_span <= 0:
        return False
    top = max(min(line.y0 for line in left), min(line.y0 for line in right))
    bottom = min(max(line.y1 for line in left), max(line.y1 for line in right))
    return (bottom - top) > ratio * min(left_span, right_span)


def _find_gutter(
    lines: Sequence[Line], min_gutter: float
) -> Tuple[Optional[Tuple[float, float]], List[Line], List[Line], List[Line]]:
    text_left = min(line.x0 for line in lines)
    text_right = max(line.x1 for line in lines)
    width = text_right - text_left
    if width <= 0:
        return None, [], [], []

    span_limit = 0.82 * width
    body = [line for line in lines if line.width <= span_limit]
    spanning = [line for line in lines if line.width > span_limit]
    if len(body) < 4:
        return None, [], [], []

    candidates = [
        gap
        for gap in _union_gaps([(line.x0, line.x1) for line in body], min_gutter)
        if text_left + 0.15 * width <= 0.5 * (gap[0] + gap[1]) <= text_right - 0.15 * width
    ]
    candidates.sort(key=lambda gap: gap[1] - gap[0], reverse=True)

    for gutter_left, gutter_right in candidates:
        left = [line for line in body if line.x1 <= gutter_left + 0.5]
        right = [line for line in body if line.x0 >= gutter_right - 0.5]
        if not left or not right:
            continue
        if _parallel(left, right):
            return (gutter_left, gutter_right), left, right, spanning
    return None, [], [], []


def _split_columns(
    lines: Sequence[Line], options: LayoutOptions, depth: int = 0
) -> Tuple[List[List[Line]], List[Line]]:
    if depth >= max(1, options.max_columns) - 1 or len(lines) < 4:
        return [list(lines)], []

    gutter, left, right, spanning = _find_gutter(lines, options.min_gutter)
    if gutter is None:
        return [list(lines)], []

    left_columns, left_spanning = _split_columns(left, options, depth + 1)
    right_columns, right_spanning = _split_columns(right, options, depth + 1)
    return left_columns + right_columns, spanning + left_spanning + right_spanning


def _emit_band(
    band: Sequence[Line], columns: Dict[int, int], column_count: int
) -> List[Line]:
    """Order one horizontal band: full-width lines first, then column by column."""
    ordered: List[Line] = []
    spanning = sorted(
        (line for line in band if columns.get(id(line), 0) == 0),
        key=lambda line: (line.y0, line.x0),
    )
    if spanning:
        ordered.append(replace(spanning[0], hard_break=True, column=0))
        ordered.extend(spanning[1:])
    for index in range(1, column_count + 1):
        group = sorted(
            (line for line in band if columns.get(id(line)) == index),
            key=lambda line: line.y0,
        )
        if not group:
            continue
        ordered.append(replace(group[0], hard_break=True, column=index))
        ordered.extend(replace(line, column=index) for line in group[1:])
    return ordered


def order_lines(lines: Sequence[Line], options: LayoutOptions) -> Tuple[Tuple[Line, ...], int]:
    """Return the lines in reading order plus the detected column count."""
    usable = tuple(line for line in lines if line.text.strip())
    if not usable:
        return (), 1
    if not options.columns:
        return tuple(sorted(usable, key=lambda line: (line.y0, line.x0))), 1

    columns, spanning = _split_columns(usable, options)
    if len(columns) <= 1:
        return tuple(sorted(usable, key=lambda line: (line.y0, line.x0))), 1

    column_of: Dict[int, int] = {}
    for index, column in enumerate(columns, start=1):
        for line in column:
            column_of[id(line)] = index
    for line in spanning:
        column_of[id(line)] = 0

    heights = [line.height for line in usable if line.height > 0]
    median_height = statistics.median(heights) if heights else 10.0
    band_gap = 2.4 * median_height

    ordered: List[Line] = []
    band: List[Line] = []
    band_bottom = 0.0
    for line in sorted(usable, key=lambda item: item.y0):
        if band and line.y0 - band_bottom > band_gap:
            ordered.extend(_emit_band(band, column_of, len(columns)))
            band = []
            band_bottom = 0.0
        band.append(line)
        band_bottom = max(band_bottom, line.y1)
    if band:
        ordered.extend(_emit_band(band, column_of, len(columns)))
    return tuple(ordered), len(columns)


def column_edges(lines: Sequence[Line]) -> Tuple[Line, ...]:
    """Attach each line's own column edges, measured from its neighbours.

    A document can mix a single column page with a two column page, so the
    right edge used to decide "did this line fill the column?" must come from
    the line's own column rather than from the document as a whole.

    Reading order is preserved: lines are only annotated, never reordered.
    """
    columns: Dict[int, List[Line]] = {}
    for line in lines:
        columns.setdefault(line.column, []).append(line)

    edges: Dict[int, Tuple[float, float]] = {}
    for column, group in columns.items():
        edges[column] = (
            _percentile(sorted(line.x0 for line in group), 0.10),
            _percentile(sorted(line.x1 for line in group), 0.90),
        )

    return tuple(
        replace(line, left_edge=edges[line.column][0], right_edge=edges[line.column][1])
        for line in lines
    )


# --------------------------------------------------------------------------
# Style profiling
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class StyleProfile:
    """Document-wide typographic statistics used by the heuristics."""

    body_size: float = 10.0
    line_height: float = 12.0
    pitch: float = 14.0
    text_left: float = 0.0
    text_right: float = 612.0
    body_left: float = 0.0
    heading_sizes: Tuple[float, ...] = ()
    indent_unit: float = 16.0

    @property
    def text_width(self) -> float:
        return max(0.0, self.text_right - self.text_left)

    @property
    def intra_gap(self) -> float:
        """Typical vertical gap between two wrapped lines of one paragraph."""
        return max(self.pitch - self.line_height, 0.25 * self.body_size)

    @classmethod
    def from_lines(cls, lines: Sequence[Line], options: "BlockOptions") -> "StyleProfile":
        usable = [line for line in lines if line.text.strip()]
        if not usable:
            return cls()

        # The body size is the size that covers the most text area: body copy
        # always outruns headings, even when a heading has a long title.
        widths: Dict[float, float] = {}
        counts: Dict[float, int] = {}
        for line in usable:
            key = round(line.size * 2) / 2
            widths[key] = widths.get(key, 0.0) + line.width
            counts[key] = counts.get(key, 0) + 1
        body_size = max(widths, key=lambda size: (widths[size], counts[size]))

        heights = [line.height for line in usable if line.height > 0]
        line_height = statistics.median(heights) if heights else body_size * 1.2

        x_starts = sorted(line.x0 for line in usable)
        x_ends = sorted(line.x1 for line in usable)
        text_left = _percentile(x_starts, 0.02)
        text_right = _percentile(x_ends, 0.98)
        text_width = max(1.0, text_right - text_left)

        left_counts: Dict[float, int] = {}
        for line in usable:
            if line.width >= 0.35 * text_width:
                key = round(line.x0)
                left_counts[key] = left_counts.get(key, 0) + 1
        if left_counts:
            body_left = float(max(left_counts.items(), key=lambda item: item[1])[0])
        else:
            body_left = text_left

        # Heading sizes are grouped into visual levels: 20pt and 18pt in the
        # same document are one level, not two. Each level uses its smallest
        # member as the threshold so a slightly smaller title still matches.
        clusters: List[List[float]] = []
        for size in sorted(widths, reverse=True):
            if size < body_size * options.heading_ratio:
                continue
            if clusters and size >= clusters[-1][0] * HEADING_CLUSTER_RATIO:
                clusters[-1].append(size)
            else:
                clusters.append([size])
        heading_sizes = [min(cluster) for cluster in clusters]

        indent_unit = _indent_unit(x_starts, body_size)

        return cls(
            body_size=body_size,
            line_height=line_height,
            pitch=_pitch(usable, body_size, line_height),
            text_left=text_left,
            text_right=text_right,
            body_left=body_left,
            heading_sizes=tuple(heading_sizes),
            indent_unit=indent_unit,
        )


def _percentile(values: Sequence[float], fraction: float) -> float:
    if not values:
        return 0.0
    if len(values) == 1:
        return float(values[0])
    index = int(round(fraction * (len(values) - 1)))
    return float(values[max(0, min(index, len(values) - 1))])


def _pitch(lines: Sequence[Line], body_size: float, line_height: float) -> float:
    """Modal distance between the tops of two consecutive lines."""
    deltas: Dict[float, int] = {}
    ordered = sorted(lines, key=lambda line: (line.page, line.y0))
    for previous, current in zip(ordered, ordered[1:]):
        if previous.page != current.page:
            continue
        delta = current.y0 - previous.y0
        if 0.5 * body_size <= delta <= 4.0 * body_size:
            key = round(delta * 2) / 2
            deltas[key] = deltas.get(key, 0) + 1
    if sum(deltas.values()) < 3:
        return line_height * 1.15
    return max(deltas.items(), key=lambda item: item[1])[0]


def _indent_unit(x_starts: Sequence[float], body_size: float) -> float:
    distinct = sorted({round(value) for value in x_starts})
    diffs = {b - a for a, b in zip(distinct, distinct[1:]) if 2 < b - a < 200}
    if not diffs:
        return max(12.0, body_size * 1.6)
    smallest = float(min(diffs))
    return max(8.0, min(smallest, 60.0))


# --------------------------------------------------------------------------
# Block building
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class BlockOptions:
    """Knobs for turning lines into document blocks."""

    headings: bool = True
    heading_ratio: float = 1.18
    merge_ratio: float = 1.6
    dehyphenate: bool = True
    keep_numbering: bool = False
    max_list_level: int = 3


@dataclass(frozen=True)
class Block:
    """A logical document element."""

    kind: str  # "heading" | "paragraph" | "bullet" | "numbered" | "literal"
    runs: Tuple[Run, ...] = ()
    level: int = 0
    size: float = 0.0

    @property
    def text(self) -> str:
        return runs_text(self.runs)


@dataclass(frozen=True)
class ListMarker:
    """A detected list marker at the start of a line."""

    kind: str  # "bullet" | "numbered"
    number: int = 0
    content_start: int = 0


def find_list_marker(text: str) -> Optional[ListMarker]:
    """Detect a bullet or numbered marker at the start of *text*."""
    match = _BULLET_RE.match(text)
    if match:
        return ListMarker(kind="bullet", content_start=match.end())
    match = _NUMBER_RE.match(text)
    if match:
        return ListMarker(
            kind="numbered",
            number=int(match.group("marker")),
            content_start=match.end(),
        )
    return None


def heading_level(line: Line, profile: StyleProfile, options: BlockOptions) -> int:
    """Heuristic heading level (0 = body text)."""
    if not options.headings:
        return 0
    text = line.text.strip()
    if not text or len(text) > 200:
        return 0
    for index, heading_size in enumerate(profile.heading_sizes):
        if line.size >= heading_size - 0.6:
            if len(text) <= 120 or line.width < 0.9 * profile.text_width:
                return min(index + 1, 3)
    if (
        line.is_bold
        and line.size >= 0.97 * profile.body_size
        and line.width < 0.75 * profile.text_width
        and len(text) <= 80
        and len(text.split()) <= 10
    ):
        return min(len(profile.heading_sizes) + 1, 3)
    return 0


def _column_width(line: Line, profile: StyleProfile) -> float:
    """Width of the column *line* lives in, falling back to the document."""
    left = line.left_edge or profile.text_left
    right = line.right_edge or profile.text_right
    return max(1.0, right - left)


def _fills_column(line: Line, profile: StyleProfile) -> bool:
    """True when *line* reaches the right edge of its column.

    A paragraph is only continued when the previous line ran to the margin;
    otherwise it was the last line of the paragraph.
    """
    right = line.right_edge or profile.text_right
    slack = max(1.5 * profile.body_size, 0.10 * _column_width(line, profile))
    return line.x1 >= right - slack


def _can_merge(
    previous: Line, current: Line, profile: StyleProfile, options: BlockOptions
) -> bool:
    if current.hard_break or previous.page != current.page:
        return False
    if previous.column != current.column:
        # Text in another column starts a new paragraph, never a continuation.
        return False
    if abs(current.size - previous.size) > 0.2 * max(previous.size, 1.0):
        return False

    gap = current.y0 - previous.y1
    limit = options.merge_ratio * profile.intra_gap
    if current.group and current.group == previous.group:
        # Same back-end block or OCR paragraph: the author certainly meant one
        # paragraph, so only the gap between them can rule it out.
        limit = max(limit * 2.0, 1.1 * profile.pitch)
    if gap > limit:
        return False
    if not _fills_column(previous, profile):
        return False

    # A continuation starts where the paragraph started, or (for a paragraph
    # whose first line is indented) at the left edge of the column.
    body_left = current.left_edge or profile.body_left
    if abs(current.x0 - previous.x0) <= 0.6 * profile.body_size:
        return True
    return abs(current.x0 - body_left) <= 0.6 * profile.body_size


def _append_runs(pending: List[Run], runs: Sequence[Run], options: BlockOptions) -> None:
    if not runs:
        return
    if (
        pending
        and options.dehyphenate
        and pending[-1].text.endswith("-")
        and runs[0].text[:1].islower()
    ):
        trimmed = drop_trailing(pending, 1)
        pending[:] = list(trimmed)
        pending.extend(runs)
        return
    if pending and not pending[-1].text.endswith(_WHITESPACE) and runs[0].text[:1] not in _WHITESPACE:
        merge_run(pending, " ")
    pending.extend(runs)


def _list_level(x0: float, profile: StyleProfile, options: BlockOptions) -> int:
    offset = x0 - profile.body_left
    level = int(round(offset / profile.indent_unit))
    return max(0, min(level, options.max_list_level))


def _content_runs(line: Line, marker: ListMarker, start: int) -> Tuple[Run, ...]:
    runs = slice_runs(line.runs, start)
    if runs and runs[0].text[:1] in _WHITESPACE:
        runs = (replace(runs[0], text=runs[0].text.lstrip()),) + tuple(runs[1:])
    return tuple(run for run in runs if run.text)


def lines_to_blocks(
    lines: Sequence[Line], profile: StyleProfile, options: BlockOptions
) -> Tuple[Block, ...]:
    """Group ordered lines into headings, paragraphs and list items."""
    blocks: List[Block] = []
    pending: List[Run] = []
    pending_size = profile.body_size
    previous: Optional[Line] = None
    number_cursor = 0
    numbered_run = False

    def flush() -> None:
        nonlocal pending
        if pending and runs_text(pending).strip():
            blocks.append(Block(kind="paragraph", runs=tuple(pending), size=pending_size))
        pending = []

    for line in lines:
        if not line.text.strip():
            continue
        heading = heading_level(line, profile, options)
        if heading:
            flush()
            previous = None
            numbered_run = False
            # Typst sets headings in bold already, so drop the emphasis that
            # came from the source font to avoid ``= *Title*``.
            runs = tuple(replace(run, bold=False) for run in line.runs)
            blocks.append(Block(kind="heading", runs=runs, level=heading, size=line.size))
            continue

        marker = find_list_marker(line.text)
        if marker is not None and marker.content_start < len(line.text):
            flush()
            previous = None
            level = _list_level(line.x0, profile, options)

            if marker.kind == "numbered":
                if options.keep_numbering:
                    # Keep the digits as literal text so the original
                    # numbering survives verbatim.
                    numbered_run = False
                    blocks.append(
                        Block(kind="literal", runs=line.runs, level=level, size=line.size)
                    )
                    continue
                sequential = (numbered_run and marker.number == number_cursor + 1) or (
                    not numbered_run and marker.number == 1
                )
                if sequential:
                    number_cursor = marker.number
                    numbered_run = True
                    blocks.append(
                        Block(
                            kind="numbered",
                            runs=_content_runs(line, marker, marker.content_start),
                            level=level,
                            size=line.size,
                        )
                    )
                    continue
                # A list that does not start at 1 (or skips a number) keeps its
                # own text instead of being renumbered by Typst.
                numbered_run = False
                blocks.append(
                    Block(kind="literal", runs=line.runs, level=level, size=line.size)
                )
                continue

            numbered_run = False
            blocks.append(
                Block(
                    kind="bullet",
                    runs=_content_runs(line, marker, marker.content_start),
                    level=level,
                    size=line.size,
                )
            )
            continue

        if pending and previous is not None and _can_merge(previous, line, profile, options):
            _append_runs(pending, line.runs, options)
        else:
            flush()
            pending.extend(line.runs)
            pending_size = line.size
        previous = line
        numbered_run = False

    flush()
    return tuple(blocks)

# ==========================================================================
# Document analysis and rendering
# ==========================================================================

import statistics
from dataclasses import dataclass
from typing import Dict, List, Optional, Sequence, Tuple


#: Named paper sizes from Typst, used when the PDF page matches one closely.
_PAPER_SIZES = (
    ("a3", (841.89, 1190.551)),
    ("a4", (595.276, 841.89)),
    ("a5", (419.528, 595.276)),
    ("us-letter", (612.0, 792.0)),
    ("us-legal", (612.0, 1008.0)),
)

_PAPER_TOLERANCE = 3.0


def fmt_number(value: float, digits: int = 2) -> str:
    """Format a number for Typst, trimming pointless trailing zeros."""
    text = "{0:.{1}f}".format(value, digits)
    if "." in text:
        text = text.rstrip("0").rstrip(".")
    return text or "0"


def match_paper(width: float, height: float) -> Optional[str]:
    """Name of the matching Typst paper size, if any."""
    for name, (paper_width, paper_height) in _PAPER_SIZES:
        if (
            abs(width - paper_width) <= _PAPER_TOLERANCE
            and abs(height - paper_height) <= _PAPER_TOLERANCE
        ):
            return name
    return None


@dataclass(frozen=True)
class Options:
    """Conversion options shared by both entry points."""

    mode: str = "content"
    columns: bool = True
    max_columns: int = 3
    min_gutter: float = 10.0
    headings: bool = True
    heading_ratio: float = 1.18
    merge_ratio: float = 1.6
    dehyphenate: bool = True
    keep_numbering: bool = False
    max_list_level: int = 3
    fonts: bool = False
    justify: bool = False
    margin: Optional[Tuple[float, float]] = None
    page_breaks: bool = False
    source_note: bool = True
    #: Template text placed at the top of content mode ("" disables it).
    template: str = ""
    #: Where that template came from, for the report.
    template_source: str = ""
    #: Title for the template header ("" means detect one).
    title: str = ""
    #: Course and author for the template's grid ("" means detect one).
    course: str = ""
    author: str = ""
    math: bool = True
    scripts: bool = True

    def layout_options(self) -> LayoutOptions:
        return LayoutOptions(
            columns=self.columns,
            max_columns=self.max_columns,
            min_gutter=self.min_gutter,
        )

    def block_options(self) -> BlockOptions:
        return BlockOptions(
            headings=self.headings,
            heading_ratio=self.heading_ratio,
            merge_ratio=self.merge_ratio,
            dehyphenate=self.dehyphenate,
            keep_numbering=self.keep_numbering,
            max_list_level=self.max_list_level,
        )


@dataclass(frozen=True)
class DocumentLayout:
    """Everything the renderers need, computed once."""

    pages: Tuple[PageText, ...]
    ordered: Tuple[Tuple[Line, ...], ...]
    blocks: Tuple[Tuple[Block, ...], ...]
    profile: StyleProfile
    column_counts: Tuple[int, ...]
    warnings: Tuple[str, ...] = ()

    @property
    def line_count(self) -> int:
        return sum(len(lines) for lines in self.ordered)

    @property
    def block_count(self) -> int:
        return sum(len(block) for block in self.blocks)


def analyze(pages: Sequence[PageText], options: Options) -> DocumentLayout:
    """Order lines per page and group them into document blocks."""
    ordered: List[Tuple[Line, ...]] = []
    column_counts: List[int] = []
    warnings: List[str] = []

    for page in pages:
        lines, columns = order_lines(page.lines, options.layout_options())
        lines = column_edges(lines)
        ordered.append(lines)
        column_counts.append(columns)
        if not lines:
            warnings.append("page {0} has no extractable text".format(page.number))

    profile = StyleProfile.from_lines(
        [line for lines in ordered for line in lines], options.block_options()
    )
    blocks = tuple(
        lines_to_blocks(lines, profile, options.block_options()) for lines in ordered
    )

    if not any(blocks):
        warnings.append("no text was extracted; the source may be a scan or an image")

    return DocumentLayout(
        pages=tuple(pages),
        ordered=tuple(ordered),
        blocks=blocks,
        profile=profile,
        column_counts=tuple(column_counts),
        warnings=tuple(warnings),
    )


# --------------------------------------------------------------------------
# The template
# --------------------------------------------------------------------------
#
# The result has to read like every other note, so a conversion starts with the
# same template that `:r typst.typ` inserts. The copy below is the built-in
# fallback; a real typst.typ is preferred whenever one can be found, which means
# editing that file changes future conversions too.

TEMPLATE_SEARCH = (
    "~/Projects/Notes/Obsidian Vault/Extra/Template/typst.typ",
    "~/.config/doc2typst/template.typ",
)

TEMPLATE_DEFAULT = """#set document(title: "Title")
#set page(paper: "us-letter", margin: (x: 1.2in, y: 1in))
#set text(font: "New Computer Modern", size: 12pt)
#set par(justify: true, leading: 0.65em)

#show heading.where(level: 1): it => {
  v(1em)
  text(size: 16pt, weight: "bold", it.body)
  v(0.4em)
}

#show heading.where(level: 2): it => {
  v(0.8em)
  text(size: 15pt, weight: "bold", it.body)
  v(0.3em)
}

#grid(
  columns: (1fr, 1fr), align(left)[
    Course

    Author
],
align(right)[
  #datetime.today().display("[month repr:long] [day], [year]")
])

#line(length: 100%, stroke: 0.5pt)
#v(0.3em)

#align(center, text(size: 18pt, weight: "bold")[Tittle/Topic])
#v(1em)"""

#: Placeholders in a template that the detected title replaces.
_TITLE_PLACEHOLDERS = ("Tittle/Topic", "{{title}}", "TITLE")

#: Placeholders that stand on their own line, filled with a course or an author.
_LINE_PLACEHOLDERS = {
    "course": ("Course", "{{course}}"),
    "author": ("Author", "{{author}}"),
}

#: Lines on the first page that introduce the course, and the author.
_LABEL_PATTERNS = {
    "course": re.compile(
        r"^(?:course|module|subject|paper|class)\s*[:\-\u2013]\s*(?P<value>.+)$", re.I
    ),
    "author": re.compile(
        r"^(?:by|authors?|written by)\s*[:\-\u2013]?\s*(?P<value>.+)$", re.I
    ),
}

#: Words that show a "By .." line is a sentence rather than a name.
_PROSE_WORDS = frozenset(
    "the a an this that these those you your we our us it its there here when where why "
    "how what which who whom whose is are was were be been being will would can could "
    "may might must shall should have has had do does did not no all any each every "
    "some now then than end seen set sets lecture chapter section figure table example "
    "theorem proof definition".split()
)

#: Lower-case words that do appear inside real names.
_NAME_CONNECTORS = frozenset(
    "von van de del den der da di du la le bin ibn al st saint mac mc and".split()
)

#: How far into the first page the labels are looked for.
_CREDIT_SCAN_LINES = 12

#: Longest a course, or an author, may be before it is clearly not one.
_CREDIT_LIMIT = 60
_COURSE_SUBJECT_LIMIT = 40

#: Folder names that hold documents but say nothing about the subject.
_GENERIC_FOLDERS = frozenset(
    "books book downloads download documents desktop notes note projects project "
    "papers library pdfs pdf misc tmp temp extra study files vault obsidian".split()
)

_COURSE_CODE = re.compile(r"\d")


def _word_count(text: str) -> int:
    return len(text.split())


def _looks_like_name(value: str) -> bool:
    """True when *value* reads like a person's name rather than a sentence."""
    words = [word.strip(".,;:") for word in value.split()]
    if not 1 <= len(words) <= 6:
        return False
    for word in words:
        if not word:
            return False
        lowered = word.lower()
        if lowered in _PROSE_WORDS:
            return False
        if lowered in _NAME_CONNECTORS:
            continue
        if not word[0].isupper():
            return False
        if not all(char.isalpha() or char in "'\u2019.-" for char in word):
            return False
    return True


def _looks_like_course(value: str) -> bool:
    """True when *value* reads like a course name rather than a sentence."""
    if not 1 <= _word_count(value) <= 6 or len(value) > _COURSE_SUBJECT_LIMIT:
        return False
    return not value.endswith(".")


def label_value(texts: Sequence[str], kind: str) -> str:
    """The value of a labelled line ("By ..", "Course: ..") in *texts*.

    Only an explicit label counts, so ordinary prose that happens to start with
    "By" is not mistaken for an author.
    """
    pattern = _LABEL_PATTERNS.get(kind)
    if pattern is None:
        return ""
    check = _looks_like_name if kind == "author" else _looks_like_course
    for raw in texts:
        text = " ".join(str(raw or "").split())
        match = pattern.match(text) if text else None
        if not match:
            continue
        value = match.group("value").strip().strip(".,;:")
        if value and check(value):
            return value
    return ""


def course_from_source(source: str) -> str:
    """A course taken from the folder a file sits in, when it looks like one.

    Course codes ("MIT6.875", "18.06", "MATH 51") come from the containing
    folder; a generic folder such as "Books" says nothing, so the template's
    placeholder is left for the caller to fill in by hand.
    """
    if not source:
        return ""
    folder = os.path.basename(os.path.dirname(os.path.abspath(source)))
    name = " ".join(folder.replace("_", " ").split())
    if not name or len(name) > _COURSE_SUBJECT_LIMIT:
        return ""
    if name.lower() in _GENERIC_FOLDERS:
        return ""
    if not _COURSE_CODE.search(name):
        return ""
    return name


class TemplateError(RuntimeError):
    """Raised when a template that was asked for cannot be read."""


def find_template(explicit: str = "") -> Tuple[str, str]:
    """Return the template text and the file it came from ("" when built in).

    A template that was asked for by name is never silently replaced by a
    different one, so a typo in ``--template`` is reported rather than hidden.
    """
    requested = explicit or os.environ.get("DOC2TYPST_TEMPLATE", "")
    if requested:
        expanded = os.path.expanduser(requested)
        if not os.path.isfile(expanded):
            raise TemplateError("template not found: {0}".format(requested))
        try:
            with open(expanded, encoding="utf-8") as handle:
                return handle.read().rstrip("\n"), expanded
        except OSError as error:
            raise TemplateError(
                "cannot read template {0}: {1}".format(requested, error)
            )

    for path in TEMPLATE_SEARCH:
        expanded = os.path.expanduser(path)
        if not os.path.isfile(expanded):
            continue
        try:
            with open(expanded, encoding="utf-8") as handle:
                return handle.read().rstrip("\n"), expanded
        except OSError:
            continue
    return TEMPLATE_DEFAULT.rstrip("\n"), ""


def _fill_line(text: str, placeholder: str, value: str) -> str:
    """Replace a placeholder that stands alone on its own line.

    The grid in the template holds ``Course`` and ``Author`` on lines of their
    own, so the word is only replaced where it is the whole line: prose that
    mentions a course is left alone.
    """
    pattern = re.compile(r"(?m)^([ \t]*)" + re.escape(placeholder) + r"[ \t]*$")
    if not pattern.search(text):
        return text
    return pattern.sub(lambda match: match.group(1) + value, text, count=1)


def apply_template(
    template: str, title: str, course: str = "", author: str = ""
) -> str:
    """Put *title*, *course* and *author* into the template's own places.

    A value that is empty leaves its placeholder exactly as the template has
    it, so an unfilled grid field still reads like `:r typst.typ` did.
    """
    if not title and not course and not author:
        return template
    text = template
    if title:
        quoted = title.replace('"', '\\"')
        text = re.sub(
            r'(#set document\(title:\s*)"[^"]*"',
            lambda match: match.group(1) + '"' + quoted + '"',
            text,
            count=1,
        )
        for placeholder in _TITLE_PLACEHOLDERS:
            if placeholder in text:
                text = text.replace(placeholder, title, 1)
    for kind, value in (("course", course), ("author", author)):
        if not value:
            continue
        for placeholder in _LINE_PLACEHOLDERS[kind]:
            text = _fill_line(text, placeholder, value)
    return text


def title_from_source(source: str) -> str:
    """A human title derived from a file name."""
    name = os.path.basename(source or "").rsplit(".", 1)[0]
    name = re.sub(r"[_\-]+", " ", name).strip()
    if not name:
        return "Untitled"
    if name.islower() or name.isupper():
        name = name.title()
    return name


def document_title(
    layout: DocumentLayout, options: Options, source: str, hint: str = ""
) -> str:
    """The title for the template: chosen, given, detected or derived."""
    if options.title.strip():
        return options.title.strip()
    if hint.strip():
        return hint.strip()
    for block in layout.blocks[0] if layout.blocks else ():
        if block.kind == "heading" and block.text.strip():
            return block.text.strip()
    return title_from_source(source)


def document_credits(
    layout: DocumentLayout,
    options: Options,
    source: str,
    course_hint: str = "",
    author_hint: str = "",
) -> Tuple[str, str]:
    """The course and the author for the template's grid.

    Each is chosen on the command line, taken from the PDF metadata, read off a
    labelled line near the top of the first page, or derived from the folder.
    An empty result leaves the template's placeholder untouched.
    """
    page_one = tuple(
        line.text for line in (layout.ordered[0] if layout.ordered else ())
    )[:_CREDIT_SCAN_LINES]
    course = (
        options.course.strip()
        or course_hint.strip()
        or label_value(page_one, "course")
        or course_from_source(source)
    )
    author = (
        options.author.strip()
        or author_hint.strip()
        or label_value(page_one, "author")
    )
    return course[:_CREDIT_LIMIT], author[:_CREDIT_LIMIT]


# --------------------------------------------------------------------------
# Rendering
# --------------------------------------------------------------------------


def _page_sizes(pages: Sequence[PageText]) -> Tuple[float, float]:
    counts = {}
    for page in pages:
        key = (page.width, page.height)
        counts[key] = counts.get(key, 0) + 1
    return max(counts.items(), key=lambda item: item[1])[0]


def _margins(layout: DocumentLayout, options: Options) -> Tuple[float, float]:
    if options.margin is not None:
        return options.margin
    profile = layout.profile
    x_margin = max(12.0, round(profile.text_left * 2) / 2)
    tops = []
    for page, lines in zip(layout.pages, layout.ordered):
        if lines:
            tops.append(min(line.y0 for line in lines))
    y_margin = statistics.median(tops) if tops else x_margin
    y_margin = min(max(y_margin, 0.5 * x_margin), 2.5 * x_margin)
    return round(x_margin, 1), round(y_margin, 1)


def _leading(profile: StyleProfile) -> float:
    if profile.body_size <= 0:
        return 0.65
    raw = profile.pitch / profile.body_size - 1.18
    return min(max(raw, 0.5), 1.0)


def _sized(markup: str, size: float, profile: StyleProfile) -> str:
    """Keep a block's own size when it differs from the document body."""
    if size <= 0 or abs(size - profile.body_size) <= 0.5:
        return markup
    return "#text(size: {0}pt)[{1}]".format(fmt_number(size, 1), markup)


def _render_blocks(
    blocks: Sequence[Block], profile: StyleProfile, options: Options
) -> List[str]:
    """Render blocks as Typst chunks separated by blank lines."""
    chunks: List[str] = []
    previous_list: Optional[Tuple[str, int]] = None

    for block in blocks:
        if block.kind in ("bullet", "numbered"):
            indent = "  " * block.level
            marker = "+ " if block.kind == "numbered" else "- "
            body = _sized(
                render_runs(
                    block.runs, math=options.math, scripts=options.scripts
                ),
                block.size,
                profile,
            )
            item = indent + marker + body
            continues = previous_list is not None and (
                block.kind == previous_list[0] or block.level > previous_list[1]
            )
            if continues and chunks:
                chunks[-1] = chunks[-1] + "\n" + item
            else:
                chunks.append(item)
            previous_list = (block.kind, block.level)
            continue

        previous_list = None
        if block.kind == "heading":
            # Headings stay at Typst's own heading sizes so the outline keeps
            # its hierarchy; only their emphasis is dropped (see lines_to_blocks).
            level = max(1, min(block.level, 3))
            # The markers have to touch: "== Title" is level two, while
            # "= = Title" is a level one heading whose text starts with "=".
            chunks.append(
                "=" * level
                + " "
                + render_runs(
                    block.runs, math=options.math, scripts=options.scripts
                )
            )
        elif options.math and is_math_block(block.runs):
            # A paragraph that is nothing but maths is a displayed equation.
            chunks.append(render_math_block(block.runs))
        else:
            chunks.append(
                _sized(
                    render_runs(
                        block.runs,
                        at_line_start=True,
                        math=options.math,
                        scripts=options.scripts,
                    ),
                    block.size,
                    profile,
                )
            )

    return chunks


def _preamble(
    layout: DocumentLayout,
    options: Options,
    source: str,
    source_kind: str,
    ocr_pages: int,
) -> List[str]:
    lines: List[str] = []
    if options.source_note:
        lines.append(
            "// Converted from {0} ({1}) by doc2typst".format(source or "input", source_kind)
        )
        lines.append(
            "// {0} page(s), {1} line(s), {2} block(s)".format(
                len(layout.pages), layout.line_count, layout.block_count
            )
        )
        if ocr_pages:
            lines.append("// {0} page(s) read with OCR".format(ocr_pages))
    return lines


def _page_setup(layout: DocumentLayout, options: Options) -> str:
    width, height = _page_sizes(layout.pages)
    margin_x, margin_y = _margins(layout, options)
    parts: List[str] = []
    paper = match_paper(width, height)
    if paper:
        parts.append('paper: "{0}"'.format(paper))
    else:
        parts.append("width: {0}pt".format(fmt_number(width)))
        parts.append("height: {0}pt".format(fmt_number(height)))
    parts.append(
        "margin: (x: {0}pt, y: {1}pt)".format(fmt_number(margin_x), fmt_number(margin_y))
    )
    return "#set page({0})".format(", ".join(parts))


def render_content(
    layout: DocumentLayout,
    options: Options,
    source: str,
    source_kind: str,
    ocr_pages: int,
    title: str = "",
    course: str = "",
    author: str = "",
) -> str:
    """Render the layout as reflowable Typst markup."""
    body: List[str] = _preamble(layout, options, source, source_kind, ocr_pages)

    if options.template:
        # The template owns the page, text and paragraph setup, which is the
        # whole point of matching the notes: nothing here may override it.
        body.append(apply_template(options.template, title, course=course, author=author))
    else:
        body.append(_page_setup(layout, options))
        text_parts = ["size: {0}pt".format(fmt_number(layout.profile.body_size, 1))]
        family = _dominant_font(layout)
        if options.fonts and family:
            text_parts.append('font: "{0}"'.format(family))
        body.append("#set text({0})".format(", ".join(text_parts)))
        body.append(
            "#set par(justify: {0}, leading: {1}em)".format(
                "true" if options.justify else "false",
                fmt_number(_leading(layout.profile)),
            )
        )

    for index, blocks in enumerate(layout.blocks):
        if index:
            if options.page_breaks:
                body.append("#pagebreak()")
            elif options.source_note:
                body.append("// --- page {0} ---".format(index + 1))
        body.extend(_render_blocks(blocks, layout.profile, options))

    return "\n\n".join(chunk for chunk in body if chunk) + "\n"


def _dominant_font(layout: DocumentLayout) -> str:
    counts = {}
    for lines in layout.ordered:
        for line in lines:
            family = line.font
            if family:
                counts[family] = counts.get(family, 0) + len(line.text.strip())
    if not counts:
        return ""
    return max(counts.items(), key=lambda item: item[1])[0]


def render_absolute(
    layout: DocumentLayout, options: Options, source: str, source_kind: str, ocr_pages: int
) -> str:
    """Render the layout with every line placed at its original coordinates."""
    body: List[str] = _preamble(layout, options, source, source_kind, ocr_pages)

    for index, (page, lines) in enumerate(zip(layout.pages, layout.ordered)):
        if index:
            body.append("#pagebreak()")
        setup = "#set page(width: {0}pt, height: {1}pt, margin: 0pt)".format(
            fmt_number(page.width), fmt_number(page.height)
        )
        body.append(setup)
        if options.source_note:
            body.append("// page {0}".format(page.number))
        for line in lines:
            if not line.text.strip():
                continue
            attrs = ["size: {0}pt".format(fmt_number(line.size, 1))]
            if options.fonts and line.font:
                attrs.append('font: "{0}"'.format(line.font))
            if options.math and is_math_block(line.runs):
                markup = render_math_inline(line.runs)
            else:
                markup = render_runs(
                    line.runs,
                    at_line_start=True,
                    math=options.math,
                    scripts=options.scripts,
                )
            body.append(
                "#place(top + left, dx: {0}pt, dy: {1}pt)[#text({2})[{3}]]".format(
                    fmt_number(line.x0),
                    fmt_number(line.y0),
                    ", ".join(attrs),
                    markup,
                )
            )
    return "\n".join(body) + "\n"


@dataclass(frozen=True)
class ConversionResult:
    """Rendered Typst source plus a summary of what happened."""

    typst: str
    source: str
    source_kind: str
    pages: int
    lines: int
    blocks: int
    headings: int
    list_items: int
    columns: int
    body_size: float
    page_width: float
    page_height: float
    ocr_pages: int = 0
    warnings: Tuple[str, ...] = ()
    template_source: str = ""
    title: str = ""
    course: str = ""
    author: str = ""

    def report(self) -> str:
        """Human readable one-liner-per-fact summary for stderr."""
        paper = match_paper(self.page_width, self.page_height)
        size = "{0} x {1} pt".format(
            fmt_number(self.page_width, 1), fmt_number(self.page_height, 1)
        )
        if paper:
            size += " ({0})".format(paper)
        rows = [
            ("source", "{0} [{1}]".format(self.source or "input", self.source_kind)),
            ("pages", str(self.pages)),
            ("lines", str(self.lines)),
            (
                "blocks",
                "{0} ({1} heading(s), {2} list item(s))".format(
                    self.blocks, self.headings, self.list_items
                ),
            ),
            ("columns", str(self.columns)),
            ("body size", "{0} pt".format(fmt_number(self.body_size, 1))),
            ("page size", size),
        ]
        if self.template_source:
            rows.append(("template", self.template_source))
        if self.title:
            rows.append(("title", self.title))
        if self.course:
            rows.append(("course", self.course))
        if self.author:
            rows.append(("author", self.author))
        if self.ocr_pages:
            rows.append(("ocr pages", str(self.ocr_pages)))
        text = "\n".join("  {0:<10} {1}".format(key, value) for key, value in rows)
        for warning in self.warnings:
            text += "\n  warning:   {0}".format(warning)
        return text


def convert_document(
    pages: Sequence[PageText],
    options: Options,
    source: str = "",
    source_kind: str = "pdf",
    ocr_pages: int = 0,
    title_hint: str = "",
    course_hint: str = "",
    author_hint: str = "",
) -> ConversionResult:
    """Analyse *pages* and render Typst source."""
    layout = analyze(pages, options)
    title = document_title(layout, options, source, title_hint)
    course, author = document_credits(layout, options, source, course_hint, author_hint)
    if options.mode == "absolute":
        typst = render_absolute(layout, options, source, source_kind, ocr_pages)
        # Absolute mode keeps the original coordinates, which the template's
        # own page setup and header would fight with, so it is not applied.
        template_source = ""
    else:
        typst = render_content(
            layout,
            options,
            source,
            source_kind,
            ocr_pages,
            title=title,
            course=course,
            author=author,
        )
        template_source = ""
        if options.template:
            template_source = options.template_source or "built in"

    templated = bool(options.template) and options.mode == "content"
    blocks = [block for page in layout.blocks for block in page]
    return ConversionResult(
        typst=typst,
        source=source,
        source_kind=source_kind,
        pages=len(layout.pages),
        lines=layout.line_count,
        blocks=layout.block_count,
        headings=sum(1 for block in blocks if block.kind == "heading"),
        list_items=sum(1 for block in blocks if block.kind in ("bullet", "numbered")),
        columns=max(layout.column_counts) if layout.column_counts else 1,
        body_size=layout.profile.body_size,
        page_width=_page_sizes(layout.pages)[0],
        page_height=_page_sizes(layout.pages)[1],
        ocr_pages=ocr_pages,
        warnings=layout.warnings,
        template_source=template_source,
        title=title if templated else "",
        course=course if templated else "",
        author=author if templated else "",
    )

# ==========================================================================
# OCR (Tesseract via its command line interface)
# ==========================================================================

import os
import shutil
import statistics
import subprocess
import tempfile
from dataclasses import dataclass, replace
from typing import Dict, List, Optional, Sequence, Tuple


try:  # pragma: no cover - depends on the host environment
    from PIL import Image, ImageOps
except ImportError:  # pragma: no cover
    Image = None  # type: ignore[assignment]
    ImageOps = None  # type: ignore[assignment]

try:  # pragma: no cover - depends on the host environment
    import numpy as _numpy
except ImportError:  # pragma: no cover
    _numpy = None  # type: ignore[assignment]

#: Assumed resolution when neither the caller nor the file says otherwise.
DEFAULT_DPI = 96.0

#: Tesseract is happiest around 300 dpi; small images are upscaled towards it.
RECOMMENDED_DPI = 300.0

#: Ratio of glyph height to em size used to recover a font size from word boxes.
_HEIGHT_TO_EM = 0.72

#: A line counts as bold when its ink density exceeds this multiple of the
#: document median (only used when ``detect_bold`` is enabled).
_BOLD_DENSITY_RATIO = 1.35


class OcrError(RuntimeError):
    """Raised when OCR cannot run at all."""


@dataclass(frozen=True)
class OcrOptions:
    """Knobs for the OCR pass."""

    lang: str = "eng"
    psm: int = 3
    dpi: float = 0.0  # 0 = trust the file metadata, then DEFAULT_DPI
    min_conf: float = -1.0
    upscale: bool = True
    detect_bold: bool = False
    tesseract: str = ""
    timeout: float = 180.0


def find_tesseract(explicit: str = "") -> str:
    """Locate the tesseract binary, raising :class:`OcrError` when missing."""
    if explicit:
        if os.path.isfile(explicit) and os.access(explicit, os.X_OK):
            return explicit
        raise OcrError("tesseract not executable: {0}".format(explicit))
    found = shutil.which("tesseract") or shutil.which("tesseract.exe")
    if not found:
        raise OcrError(
            "tesseract was not found on PATH.\n"
            "  macOS:  brew install tesseract\n"
            "  Debian: apt-get install tesseract-ocr\n"
            "  or pass --tesseract /path/to/tesseract"
        )
    return found


def _image_size(path: str) -> Optional[Tuple[int, int]]:
    if Image is None:
        return None
    with Image.open(path) as image:
        return image.size


def _image_dpi(path: str) -> float:
    if Image is None:
        return DEFAULT_DPI
    try:
        with Image.open(path) as image:
            dpi = image.info.get("dpi")
    except Exception:
        return DEFAULT_DPI
    if not dpi:
        return DEFAULT_DPI
    value = dpi[0] if isinstance(dpi, (tuple, list)) else dpi
    try:
        value = float(value)
    except (TypeError, ValueError):
        return DEFAULT_DPI
    return value if value > 1.0 else DEFAULT_DPI


def _prepare_image(path: str, options: OcrOptions, dpi: float) -> Tuple[str, float, bool]:
    """Return ``(path_for_tesseract, scale_factor, keep_alive)``.

    The image is converted to grayscale and, when the effective resolution is
    far below :data:`RECOMMENDED_DPI`, upscaled for the OCR pass only. All
    coordinates are divided by *scale_factor* afterwards so the caller keeps
    working in the original resolution.
    """
    if Image is None or ImageOps is None:
        return path, 1.0, True

    with Image.open(path) as source:
        page = source.convert("L")
        scale = 1.0
        if options.upscale and dpi > 0:
            wanted = min(4.0, max(1.0, RECOMMENDED_DPI / dpi))
            if wanted > 1.2:
                scale = wanted
                page = page.resize(
                    (max(1, int(page.width * scale)), max(1, int(page.height * scale))),
                    Image.LANCZOS,
                )
        page = ImageOps.autocontrast(page)

        handle = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
        handle.close()
        page.save(handle.name, format="PNG")
    return handle.name, scale, False


def _run_tesseract(
    binary: str, image_path: str, options: OcrOptions, extra: Sequence[str] = ()
) -> str:
    command = [
        binary,
        image_path,
        "stdout",
        "-l",
        options.lang,
        "--psm",
        str(options.psm),
    ]
    command.extend(extra)
    command.append("tsv")
    try:
        completed = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=options.timeout,
        )
    except subprocess.TimeoutExpired:
        raise OcrError("tesseract timed out after {0}s".format(options.timeout))
    except OSError as error:
        raise OcrError("could not run tesseract: {0}".format(error))
    if completed.returncode != 0:
        message = completed.stderr.decode("utf-8", "replace").strip()
        raise OcrError("tesseract failed ({0}): {1}".format(completed.returncode, message))
    return completed.stdout.decode("utf-8", "replace")


@dataclass(frozen=True)
class _Word:
    text: str
    left: int
    top: int
    width: int
    height: int
    confidence: float
    line_key: str
    paragraph_key: str


def _parse_tsv(payload: str, options: OcrOptions) -> List[_Word]:
    words: List[_Word] = []
    for index, row in enumerate(payload.splitlines()):
        if index == 0 and row.startswith("level"):
            continue
        columns = row.split("\t")
        if len(columns) < 12:
            continue
        try:
            level = int(columns[0])
        except ValueError:
            continue
        if level != 5:
            continue
        text = columns[11].strip()
        if not text:
            continue
        try:
            confidence = float(columns[10])
        except ValueError:
            confidence = -1.0
        if options.min_conf > 0 and confidence < options.min_conf:
            continue
        try:
            left = int(columns[6])
            top = int(columns[7])
            width = int(columns[8])
            height = int(columns[9])
        except ValueError:
            continue
        if width <= 0 or height <= 0:
            continue
        paragraph = "p{0}b{1}c{2}".format(columns[1], columns[2], columns[3])
        words.append(
            _Word(
                text=text,
                left=left,
                top=top,
                width=width,
                height=height,
                confidence=confidence,
                line_key="{0}l{1}".format(paragraph, columns[4]),
                paragraph_key=paragraph,
            )
        )
    return words


def _group_words(words: Sequence[_Word]) -> List[List[_Word]]:
    grouped: Dict[str, List[_Word]] = {}
    for word in words:
        grouped.setdefault(word.line_key, []).append(word)
    lines = [sorted(group, key=lambda word: word.left) for group in grouped.values()]
    return sorted(lines, key=lambda group: (min(word.top for word in group), group[0].left))


def _line_size(group: Sequence[_Word], scale: float, dpi: float) -> float:
    heights = sorted(word.height / scale for word in group)
    reference = heights[int(round(0.75 * (len(heights) - 1)))]
    em_px = reference / _HEIGHT_TO_EM
    return max(1.0, em_px * 72.0 / dpi)


def _density_scores(
    image_path: str, groups: Sequence[Sequence[_Word]], scale: float
) -> List[float]:
    """Ink density per line, used for the optional bold heuristic."""
    if _numpy is None or Image is None:
        return []
    scores: List[float] = []
    with Image.open(image_path) as source:
        grey = _numpy.asarray(source.convert("L"), dtype=_numpy.float32)
    for group in groups:
        left = max(0, int(min(word.left for word in group)))
        top = max(0, int(min(word.top for word in group)))
        right = min(grey.shape[1], int(max(word.left + word.width for word in group)))
        bottom = min(grey.shape[0], int(max(word.top + word.height for word in group)))
        if right <= left or bottom <= top:
            scores.append(0.0)
            continue
        crop = grey[top:bottom, left:right]
        scores.append(float((crop < 128.0).mean()) if crop.size else 0.0)
    return scores


def ocr_image(
    path: str, options: OcrOptions, page: int = 1
) -> Tuple[PageText, List[str]]:
    """OCR one bitmap and return its :class:`PageText` plus warnings."""
    if not os.path.isfile(path):
        raise OcrError("not an image file: {0}".format(path))
    binary = find_tesseract(options.tesseract)
    dpi = options.dpi if options.dpi > 0 else _image_dpi(path)

    size = _image_size(path)
    if size is None:
        raise OcrError(
            "Pillow is required to read image dimensions; install it with pip install pillow"
        )
    width_px, height_px = size

    prepared, scale, keep_alive = _prepare_image(path, options, dpi)
    warnings: List[str] = []
    try:
        payload = _run_tesseract(binary, prepared, options)
        words = _parse_tsv(payload, options)
        groups = _group_words(words)
        if not groups:
            warnings.append("{0}: OCR found no text".format(os.path.basename(path)))
            return PageText(
                number=page,
                width=width_px * 72.0 / dpi,
                height=height_px * 72.0 / dpi,
                lines=(),
            ), warnings

        confidences = [word.confidence for word in words if word.confidence >= 0]
        if confidences and statistics.mean(confidences) < 60.0:
            warnings.append(
                "{0}: low OCR confidence (mean {1:.0f}%)".format(
                    os.path.basename(path), statistics.mean(confidences)
                )
            )

        scale_factor = 72.0 / dpi / scale
        bold_flags: List[bool] = [False] * len(groups)
        if options.detect_bold:
            scores = _density_scores(prepared, groups, scale)
            if scores:
                median = statistics.median(scores)
                threshold = _BOLD_DENSITY_RATIO * median
                bold_flags = [score > threshold for score in scores]

        lines: List[Line] = []
        for index, group in enumerate(groups):
            size_pt = _line_size(group, scale, dpi)
            spans = tuple(
                Span(
                    text=word.text,
                    x0=word.left * scale_factor,
                    y0=word.top * scale_factor,
                    x1=(word.left + word.width) * scale_factor,
                    y1=(word.top + word.height) * scale_factor,
                    size=size_pt,
                    bold=bold_flags[index],
                    group=word.paragraph_key,
                )
                for word in group
            )
            lines.append(Line(spans=spans, page=page, group=group[0].paragraph_key))
    finally:
        if not keep_alive:
            try:
                os.unlink(prepared)
            except OSError:
                pass

    return (
        PageText(
            number=page,
            width=width_px * 72.0 / dpi,
            height=height_px * 72.0 / dpi,
            lines=tuple(lines),
        ),
        warnings,
    )


def ocr_files(
    paths: Sequence[str], options: OcrOptions, start_page: int = 1
) -> Tuple[List[PageText], List[str]]:
    """OCR several bitmaps in order, numbering them as consecutive pages."""
    pages: List[PageText] = []
    warnings: List[str] = []
    for offset, path in enumerate(paths):
        result, page_warnings = ocr_image(path, options, start_page + offset)
        pages.append(result)
        warnings.extend(page_warnings)
    return pages, warnings

# ==========================================================================
# PDF text extraction back ends
# ==========================================================================

import os
import sys
import tempfile
from dataclasses import dataclass, replace
from typing import List, Optional, Sequence, Tuple


#: Bit flags reported by PyMuPDF for span styling.
_PYMUPDF_ITALIC = 1 << 1
_PYMUPDF_BOLD = 1 << 4


class PdfError(RuntimeError):
    """Raised when no usable PDF backend is installed or the file is broken."""


@dataclass(frozen=True)
class PdfOptions:
    """Options for reading a PDF."""

    pages: Tuple[int, ...] = ()
    ocr: str = "auto"  # auto | always | never
    ocr_dpi: float = 200.0
    ocr_options: OcrOptions = OcrOptions()


@dataclass(frozen=True)
class PdfLoad:
    """Result of reading a PDF."""

    pages: Tuple[PageText, ...]
    backend: str
    ocr_pages: int = 0
    warnings: Tuple[str, ...] = ()
    title: str = ""
    author: str = ""
    course: str = ""


#: Metadata values that carry no information at all.
_EMPTY_METADATA = frozenset(
    {"-", "--", "n/a", "na", "none", "null", "nil", "unknown", "untitled", "anonymous"}
)

#: Markers that show a metadata subject is generic blurb rather than a subject.
_BLURB_MARKERS = (
    "http://",
    "https://",
    "www.",
    "download",
    "free ebook",
    "copyright",
    "all rights reserved",
)


def clean_metadata(value: object) -> str:
    """A metadata field with its whitespace tidied, or "" when it says nothing."""
    text = " ".join(str(value or "").split())
    if text.lower() in _EMPTY_METADATA:
        return ""
    return text


def _metadata_field(document, key: str) -> str:
    try:
        metadata = document.metadata or {}
    except Exception:  # pragma: no cover - depends on the back end
        return ""
    return clean_metadata(metadata.get(key))


def pdf_metadata_title(document) -> str:
    """The title recorded in the PDF metadata, when it is worth using."""
    title = _metadata_field(document, "title")
    if title.lower() in ("untitled", "document", "microsoft word", "pdf", "none"):
        return ""
    if not any(char.isalpha() for char in title):
        return ""  # a bare file number ("488174479") is not a title
    return title


def pdf_metadata_author(document) -> str:
    """The author recorded in the PDF metadata, when it is worth using.

    Exporters write "Unknown" as readily as they write a real name, so the
    placeholder values are dropped rather than printed on the title page.
    """
    return _metadata_field(document, "author")


def pdf_metadata_course(document) -> str:
    """The subject recorded in the PDF metadata, when it looks like a course."""
    subject = _metadata_field(document, "subject")
    if len(subject) > _COURSE_SUBJECT_LIMIT:
        return ""
    lowered = subject.lower()
    if any(marker in lowered for marker in _BLURB_MARKERS):
        return ""
    return subject


def _import_pymupdf():
    try:
        import pymupdf  # type: ignore

        return pymupdf
    except ImportError:
        pass
    try:
        import fitz  # type: ignore

        return fitz
    except ImportError:
        return None


def _import_pdfplumber():
    try:
        import pdfplumber  # type: ignore

        return pdfplumber
    except ImportError:
        return None


def available_backends() -> Tuple[str, ...]:
    backends: List[str] = []
    if _import_pymupdf() is not None:
        backends.append("pymupdf")
    if _import_pdfplumber() is not None:
        backends.append("pdfplumber")
    return tuple(backends)


def describe_backend() -> str:
    fitz = _import_pymupdf()
    if fitz is not None:
        version = getattr(fitz, "__version__", None) or getattr(fitz, "VersionBind", "unknown")
        return "pymupdf {0}".format(version)
    plumber = _import_pdfplumber()
    if plumber is not None:
        return "pdfplumber {0}".format(getattr(plumber, "__version__", "unknown"))
    return "missing (pip install pymupdf)"


def load_pdf(path: str, options: PdfOptions) -> PdfLoad:
    """Read *path* into :class:`PageText` objects."""
    if not os.path.isfile(path):
        raise PdfError("file not found: {0}".format(path))

    fitz = _import_pymupdf()
    if fitz is not None:
        return _load_with_pymupdf(fitz, path, options)

    plumber = _import_pdfplumber()
    if plumber is not None:
        if options.ocr == "always":
            raise PdfError("--ocr always needs PyMuPDF so pages can be rasterised")
        return _load_with_pdfplumber(plumber, path, options)

    raise PdfError(
        "no PDF backend installed for {0}.\n"
        "  pip install pymupdf        # recommended (also enables --ocr)\n"
        "  pip install pdfplumber     # lighter alternative\n"
        "  or run doc2typst-picker.sh --check to see which interpreter "
        "already has one".format(sys.executable)
    )


def _wanted_numbers(requested: Sequence[int], total: int) -> Tuple[int, ...]:
    if not requested:
        return tuple(range(1, total + 1))
    return tuple(number for number in requested if 1 <= number <= total)


def _spans_from_pymupdf(page) -> List[Span]:
    spans: List[Span] = []
    data = page.get_text("dict")
    for index, block in enumerate(data.get("blocks", [])):
        if block.get("type", 0) != 0:
            continue  # images have no text
        # The block number keeps two columns apart during line clustering.
        group = "b{0}".format(index)
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                text = span.get("text", "")
                if not text.strip():
                    continue
                bbox = span.get("bbox") or (0.0, 0.0, 0.0, 0.0)
                family, bold, italic = split_font_name(span.get("font", ""))
                flags = int(span.get("flags", 0))
                spans.append(
                    Span(
                        text=text,
                        x0=float(bbox[0]),
                        y0=float(bbox[1]),
                        x1=float(bbox[2]),
                        y1=float(bbox[3]),
                        size=float(span.get("size", 10.0)),
                        font=family,
                        bold=bold or bool(flags & _PYMUPDF_BOLD),
                        italic=italic or bool(flags & _PYMUPDF_ITALIC),
                        group=group,
                    )
                )
    return spans


def _ocr_pdf_page(fitz, document, index: int, options: PdfOptions) -> Tuple[PageText, List[str]]:
    """Rasterise one page and OCR it, keeping PDF point coordinates."""
    page = document[index]
    pixmap = page.get_pixmap(dpi=int(options.ocr_dpi))
    handle = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    handle.close()
    try:
        pixmap.save(handle.name)
        ocr_options = replace(
            options.ocr_options, dpi=float(options.ocr_dpi), upscale=False
        )
        page_text, warnings = ocr_image(handle.name, ocr_options, page=index + 1)
    finally:
        try:
            os.unlink(handle.name)
        except OSError:
            pass
    rect = page.rect
    return replace(page_text, width=rect.width, height=rect.height), warnings


def _load_with_pymupdf(fitz, path: str, options: PdfOptions) -> PdfLoad:
    document = fitz.open(path)
    pages: List[PageText] = []
    warnings: List[str] = []
    ocr_pages = 0
    try:
        wanted = _wanted_numbers(options.pages, document.page_count)
        if not wanted:
            raise PdfError("no pages selected")
        for index in range(document.page_count):
            number = index + 1
            if number not in wanted:
                continue
            page = document[index]
            rect = page.rect
            spans = _spans_from_pymupdf(page)
            if spans:
                lines = group_spans_into_lines(spans, page=number)
                if options.ocr == "always":
                    ocr_page, ocr_warnings = _ocr_pdf_page(fitz, document, index, options)
                    if ocr_page.lines:
                        lines = ocr_page.lines
                        ocr_pages += 1
                    warnings.extend(ocr_warnings)
            elif options.ocr == "auto":
                ocr_page, ocr_warnings = _ocr_pdf_page(fitz, document, index, options)
                lines = ocr_page.lines
                ocr_pages += 1
                warnings.extend(ocr_warnings)
            else:
                lines = ()
                warnings.append(
                    "page {0} has no text layer; re-run with --ocr auto to read it "
                    "as an image".format(number)
                )
            pages.append(
                PageText(
                    number=number,
                    width=rect.width,
                    height=rect.height,
                    lines=lines,
                )
            )
    finally:
        document.close()
    return PdfLoad(
        pages=tuple(pages),
        backend="pymupdf",
        ocr_pages=ocr_pages,
        warnings=tuple(warnings),
        title=pdf_metadata_title(document),
        author=pdf_metadata_author(document),
        course=pdf_metadata_course(document),
    )


def _load_with_pdfplumber(plumber, path: str, options: PdfOptions) -> PdfLoad:
    pages: List[PageText] = []
    warnings: List[str] = []
    with plumber.open(path) as document:
        # Read the document properties while the file is still open.
        title = pdf_metadata_title(document)
        author = pdf_metadata_author(document)
        course = pdf_metadata_course(document)
        wanted = _wanted_numbers(options.pages, len(document.pages))
        if not wanted:
            raise PdfError("no pages selected")
        for index, page in enumerate(document.pages, start=1):
            if index not in wanted:
                continue
            spans: List[Span] = []
            for word in page.extract_words(extra_attrs=["size", "fontname"]):
                text = word.get("text", "")
                if not text.strip():
                    continue
                family, bold, italic = split_font_name(str(word.get("fontname") or ""))
                spans.append(
                    Span(
                        text=text,
                        x0=float(word["x0"]),
                        y0=float(word["top"]),
                        x1=float(word["x1"]),
                        y1=float(word["bottom"]),
                        size=float(word.get("size") or 10.0),
                        font=family,
                        bold=bold,
                        italic=italic,
                    )
                )
            lines = group_spans_into_lines(spans, page=index)
            if not lines:
                warnings.append("page {0} has no text layer".format(index))
            pages.append(
                PageText(
                    number=index,
                    width=float(page.width),
                    height=float(page.height),
                    lines=lines,
                )
            )
    return PdfLoad(
        pages=tuple(pages),
        backend="pdfplumber",
        warnings=tuple(warnings),
        title=title,
        author=author,
        course=course,
    )

# ==========================================================================
# Command line plumbing
# ==========================================================================

import argparse
import os
import sys
from typing import List, Optional, Sequence, Tuple


VERSION = "2.0.0"


def build_common_parser(
    program: str, description: str, source_help: str
) -> argparse.ArgumentParser:
    """Create a parser with the options both entry points share."""
    parser = argparse.ArgumentParser(
        prog=program,
        description=description,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "source",
        nargs="*" if program == "png2typst" else "?",
        help=source_help,
    )
    parser.add_argument(
        "-o",
        "--out",
        default="-",
        help="write Typst to this file (default: stdout, use '-' for stdout)",
    )
    parser.add_argument(
        "--mode",
        choices=("content", "absolute"),
        default="content",
        help="content reflows the text into markup (default); "
        "absolute reproduces the original coordinates with #place",
    )

    layout = parser.add_argument_group("layout detection")
    layout.add_argument(
        "--columns",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="detect and keep multi-column layouts (default: on)",
    )
    layout.add_argument(
        "--max-columns", type=int, default=3, help="maximum columns to split (default: 3)"
    )
    layout.add_argument(
        "--min-gutter",
        type=float,
        default=10.0,
        metavar="PT",
        help="minimum width of a column gutter in points (default: 10)",
    )
    layout.add_argument(
        "--headings",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="detect headings from font size and weight (default: on)",
    )
    layout.add_argument(
        "--heading-ratio",
        type=float,
        default=1.18,
        metavar="RATIO",
        help="font size ratio above the body size that counts as a heading (default: 1.18)",
    )
    layout.add_argument(
        "--merge-ratio",
        type=float,
        default=1.6,
        metavar="RATIO",
        help="how much looser than the line pitch a gap may be before it "
        "starts a new paragraph (default: 1.6)",
    )
    layout.add_argument(
        "--dehyphenate",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="join words hyphenated across a line break (default: on)",
    )
    layout.add_argument(
        "--keep-numbering",
        action="store_true",
        help="keep literal list numbers instead of emitting Typst numbered lists",
    )
    layout.add_argument(
        "--max-list-level", type=int, default=3, help="deepest list nesting to emit (default: 3)"
    )

    style = parser.add_argument_group("output style")
    style.add_argument(
        "--fonts",
        action="store_true",
        help="also emit #set text(font: ..) / font: .. for detected fonts",
    )
    style.add_argument("--justify", action="store_true", help="emit #set par(justify: true)")
    style.add_argument(
        "--margin",
        metavar="X,Y",
        help="override the detected page margin in points, e.g. --margin 56,72",
    )
    style.add_argument(
        "--page-breaks",
        action="store_true",
        help="insert #pagebreak() between source pages (content mode only)",
    )
    style.add_argument(
        "--no-source-note",
        dest="source_note",
        action="store_false",
        help="omit the generated-by comment header",
    )
    style.add_argument(
        "--title",
        default="",
        metavar="TEXT",
        help="title for the template header (default: detected from the document)",
    )
    style.add_argument(
        "--course",
        default="",
        metavar="TEXT",
        help="course for the template's grid (default: the PDF subject, a "
        "'Course: ..' line, or a course code folder name)",
    )
    style.add_argument(
        "--author",
        default="",
        metavar="TEXT",
        help="author for the template's grid (default: the PDF author or a "
        "'By ..' line on the first page)",
    )
    style.add_argument(
        "--template",
        default=None,
        metavar="PATH",
        help="template to start the output with (default: the usual typst.typ)",
    )
    style.add_argument(
        "--no-template",
        dest="template",
        action="store_const",
        const="",
        help="emit bare markup with no template header",
    )
    style.add_argument(
        "--math",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="wrap spans set in a maths font in $...$ (default: on)",
    )
    style.add_argument(
        "--scripts",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="turn smaller raised/lowered spans into #super[]/#sub[] (default: on)",
    )

    parser.add_argument("-q", "--quiet", action="store_true", help="suppress the summary report")
    parser.add_argument(
        "--check", action="store_true", help="report available backends and exit"
    )
    parser.add_argument("--version", action="version", version="{0} {1}".format(program, VERSION))
    return parser


def fail(message: str, code: int = 2) -> None:
    """Print an error message and exit."""
    sys.stderr.write("{0}: error: {1}\n".format("doc2typst", message))
    raise SystemExit(code)


PICKER_NAME = "doc2typst-picker.sh"


def picker_path() -> Optional[str]:
    """The interactive picker that sits beside this file, when it is installed."""
    here = os.path.dirname(os.path.abspath(__file__))
    candidate = os.path.join(here, PICKER_NAME)
    return candidate if os.path.isfile(candidate) else None


def hand_over_to_picker(mode: Optional[str] = None) -> None:
    """Become the picker rather than refuse to run.

    A bare run in a terminal is really "help me choose a document", and that is
    what the picker does - it lists the documents in the current directory and
    writes the result there. Anywhere else (a pipe, an editor run panel) there is
    nobody to answer, so the caller keeps the usage message instead.
    """
    path = picker_path()
    if path is None or not sys.stdin.isatty():
        return
    command = ["bash", path]
    if mode:
        command += ["--mode", mode]
    sys.stdout.flush()
    try:
        os.execvp("bash", command)
    except OSError:
        # No usable bash after all: fall back to explaining the options.
        return


def require_source(parser: argparse.ArgumentParser, source, hint: str) -> None:
    """Explain the missing input when the converter is run with no arguments.

    A bare invocation is what a "run this file" editor action does, so it should
    teach the caller how to use the tool rather than print a one-line refusal.
    """
    empty = not source if isinstance(source, list) else source is None
    if not empty:
        return
    # In a terminal this never returns: the picker takes over.
    hand_over_to_picker()
    # Both streams must be stderr so the help and the error stay together when
    # a caller (an editor run panel, or a pipe) captures them.
    parser.print_help(sys.stderr)
    sys.stderr.write(
        "\n{0}: error: no input file given - {1}\n"
        "       To pick one interactively, run doc2typst-picker.sh "
        "(or press prefix + d in tmux).\n".format("doc2typst", hint)
    )
    raise SystemExit(2)


def parse_margin(raw: Optional[str]) -> Optional[Tuple[float, float]]:
    if not raw:
        return None
    parts = [part.strip() for part in raw.replace("x", ",").replace(":", ",").split(",")]
    parts = [part for part in parts if part]
    if len(parts) != 2:
        fail("--margin expects two numbers, for example --margin 56,72")
    try:
        return float(parts[0]), float(parts[1])
    except ValueError:
        fail("--margin expects numbers, got {0!r}".format(raw))
    return None  # unreachable, keeps type checkers happy


def conversion_options(args: argparse.Namespace) -> Options:
    """Translate parsed arguments into :class:`Options`."""
    template = ""
    template_source = ""
    if args.template != "":
        template, template_source = find_template(args.template or "")
    return Options(
        mode=args.mode,
        columns=args.columns,
        max_columns=args.max_columns,
        min_gutter=args.min_gutter,
        headings=args.headings,
        heading_ratio=args.heading_ratio,
        merge_ratio=args.merge_ratio,
        dehyphenate=args.dehyphenate,
        keep_numbering=args.keep_numbering,
        max_list_level=args.max_list_level,
        fonts=args.fonts,
        justify=args.justify,
        margin=parse_margin(args.margin),
        page_breaks=args.page_breaks,
        source_note=args.source_note,
        template=template,
        template_source=template_source,
        title=args.title,
        course=args.course or os.environ.get("DOC2TYPST_COURSE", ""),
        author=args.author or os.environ.get("DOC2TYPST_AUTHOR", ""),
        math=args.math,
        scripts=args.scripts,
    )


def write_output(text: str, path: Optional[str]) -> None:
    """Write the generated Typst to stdout or a file."""
    if not path or path == "-":
        sys.stdout.write(text)
        return
    directory = os.path.dirname(os.path.abspath(path))
    if directory and not os.path.isdir(directory):
        os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(text)


def report(result: ConversionResult, quiet: bool, destination: Optional[str]) -> None:
    """Print the conversion summary to stderr."""
    if quiet:
        return
    where = "stdout" if not destination or destination == "-" else destination
    sys.stderr.write("doc2typst -> {0}\n{1}\n".format(where, result.report()))
    for source_kind, note in _backend_notes():
        sys.stderr.write("  {0:<10} {1}\n".format(source_kind, note))


def _backend_notes() -> List[Tuple[str, str]]:
    return [("backend", describe_backend())]


def check_environment() -> int:
    """Print what is available on this machine."""
    lines: List[str] = []
    lines.append("pdf backend:   {0}".format(describe_backend()))

    try:
        binary = find_tesseract()
        lines.append("tesseract:     {0}".format(binary))
        version = subprocess.run(
            [binary, "--version"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT
        ).stdout.decode("utf-8", "replace").splitlines()
        if version:
            lines.append("               {0}".format(version[0].strip()))
    except Exception as error:
        lines.append("tesseract:     unavailable ({0})".format(error))

    try:
        import PIL  # noqa: F401

        lines.append("pillow:        available")
    except ImportError:
        lines.append("pillow:        missing (pip install pillow)")

    try:
        import numpy  # noqa: F401

        lines.append("numpy:         available")
    except ImportError:
        lines.append("numpy:         missing (optional, enables --detect-bold)")

    _, template_path = find_template()
    lines.append("template:      {0}".format(template_path or "built in"))
    lines.append("interpreter:   {0}".format(sys.executable))
    lines.append("typst:         {0}".format(_typst_version()))
    sys.stdout.write("\n".join(lines) + "\n")
    return 0


def _typst_version() -> str:
    import shutil
    import subprocess

    binary = shutil.which("typst")
    if not binary:
        return "not found (install from https://typst.app)"
    try:
        output = subprocess.run(
            [binary, "--version"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=20
        ).stdout.decode("utf-8", "replace").strip()
    except Exception:
        return binary
    return output or binary

# ==========================================================================
# PDF entry point
# ==========================================================================

import sys
from dataclasses import replace
from typing import List, Optional, Sequence


PROGRAM = "pdf2typst"
DESCRIPTION = "Convert a PDF into Typst source."


def build_parser() -> argparse.ArgumentParser:
    parser = build_common_parser(PROGRAM, DESCRIPTION, "input PDF")
    parser.add_argument(
        "--pages",
        metavar="SPEC",
        default="",
        help="pages to convert, e.g. 1-5,9,12- (default: all)",
    )
    ocr = parser.add_argument_group("OCR (scanned pages)")
    ocr.add_argument(
        "--ocr",
        choices=("auto", "always", "never"),
        default="auto",
        help="auto OCRs pages without a text layer (default), "
        "always OCRs every page, never keeps them empty",
    )
    ocr.add_argument(
        "--ocr-dpi",
        type=float,
        default=200.0,
        metavar="DPI",
        help="resolution used when rasterising a page for OCR (default: 200)",
    )
    ocr.add_argument("--ocr-lang", default="eng", help="Tesseract language (default: eng)")
    ocr.add_argument(
        "--ocr-psm", type=int, default=6, help="Tesseract page segmentation mode (default: 6)"
    )
    ocr.add_argument(
        "--min-conf",
        type=float,
        default=25.0,
        metavar="PCT",
        help="drop OCR words below this confidence (default: 25)",
    )
    ocr.add_argument(
        "--tesseract", default="", metavar="PATH", help="path to the tesseract binary"
    )
    return parser


def parse_pages(spec: str) -> tuple:
    """Parse a page selection such as ``1-5,9,12-`` into a sorted tuple."""
    if not spec.strip():
        return ()
    numbers = set()
    for chunk in spec.replace(" ", "").split(","):
        if not chunk:
            continue
        if "-" in chunk:
            start_text, _, end_text = chunk.partition("-")
            start = int(start_text) if start_text else 1
            end = int(end_text) if end_text else 9999
            if end < start:
                fail("invalid page range {0!r}".format(chunk))
            numbers.update(range(start, end + 1))
        else:
            numbers.add(int(chunk))
    return tuple(sorted(number for number in numbers if number > 0))


def main(argv: Optional[Sequence[str]] = None) -> int:
    reexec_with(
        PDF_MODULES, __file__, list(argv) if argv is not None else sys.argv[1:]
    )
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.check:
        return check_environment()

    if not args.source:
        require_source(
            parser,
            args.source,
            "pass a PDF path, for example 'pdf2typst.py paper.pdf -o paper.typ'",
        )

    try:
        pages = parse_pages(args.pages)
    except ValueError:
        fail("--pages expects numbers, for example --pages 1-5,9")
        return 2

    try:
        options = conversion_options(args)
    except TemplateError as error:
        fail(str(error))
        return 2
    pdf_options = PdfOptions(
        pages=pages,
        ocr=args.ocr,
        ocr_dpi=args.ocr_dpi,
        ocr_options=OcrOptions(
            lang=args.ocr_lang,
            psm=args.ocr_psm,
            min_conf=args.min_conf,
            tesseract=args.tesseract,
        ),
    )

    try:
        loaded = load_pdf(args.source, pdf_options)
        result = convert_document(
            loaded.pages,
            options,
            source=args.source,
            source_kind="pdf",
            ocr_pages=loaded.ocr_pages,
            title_hint=loaded.title,
            course_hint=loaded.course,
            author_hint=loaded.author,
        )
    except (PdfError, OcrError) as error:
        fail(str(error))
        return 2

    if loaded.warnings:
        result = replace(result, warnings=result.warnings + loaded.warnings)
    write_output(result.typst, args.out)
    report(result, args.quiet, args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
