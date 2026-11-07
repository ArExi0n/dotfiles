#!/usr/bin/env bash
# doc2typst-ai - PDF or image -> Typst source, through NVIDIA's hosted models.
#
# The document is rendered to page images, one request per page. The model
# returns the document's credits and its Typst body; your template is
# prepended here, unaltered, so the preamble is always exactly the one you use.
#
#   doc2typst-ai.sh paper.pdf              # writes paper.typ next to you
#   doc2typst-ai.sh paper.pdf --pages 1-4  # only the pages you want
#   doc2typst-ai.sh --models               # what this key can call
#   doc2typst-ai.sh --check                # key + tool check, no request
#
# The equivalent curl request, if you want it on its own:
#
#   jq -n --arg m "$MODEL" --arg t "$PROMPT" \
#         --arg i "data:image/png;base64,$(base64 < page-1.png | tr -d '\n')" \
#      '{model:$m,max_tokens:2048,temperature:0.2,
#        messages:[{role:"user",content:[
#          {type:"text",text:$t},
#          {type:"image_url",image_url:{url:$i}}]}]}' \
#   | curl -sS https://integrate.api.nvidia.com/v1/chat/completions \
#          -H "Authorization: Bearer $NVIDIA_API_KEY" \
#          -H 'Content-Type: application/json' \
#          --data-binary @- \
#   | jq -r '.choices[0].message.content'
#
# Environment:
#   NVIDIA_API_KEY           API key; asked for once and saved if absent
#   DOC2TYPST_AI_MODEL       model id (default below; run --models to see all)
#   DOC2TYPST_AI_ENDPOINT    full chat-completions URL
#   DOC2TYPST_AI_KEY_FILE    where the key is saved (default below)
#   DOC2TYPST_AI_MAX_PAGES   pages sent when --pages is not given (default 10)
#   DOC2TYPST_AI_MAX_TOKENS  output budget per page (default 8192;
#                            nemotron is a reasoning model and needs more)
#   DOC2TYPST_AI_TIMEOUT     seconds to wait per attempt (default 420)
#   DOC2TYPST_AI_HEDGE       silence before another request is tried (default 60)
#   DOC2TYPST_AI_ATTEMPTS    most requests in flight for one page (default 3)
#   DOC2TYPST_AI_DPI         render resolution (default 150)
#   DOC2TYPST_TEMPLATE       template file; its text is prepended to the answer
#
# Models that accept images and answer with usable Typst, as of this writing:
#
#   nvidia/nemotron-3.5-super-vl-120b-a12b    default; responds on the
#                                             integrate.api.nvidia.com endpoint,
#                                             puts its output in reasoning_content
#                                             (a reasoning model), so give it
#                                             a generous --max-tokens
#
# google/gemma-4-31b-it used to be the default but the endpoint returns 504
# for it; meta/llama-3.2-11b-vision-instruct times out. Most other entries in
# --models are text-only, and the list includes ids that answer 404 on this
# endpoint. A "--model" that returns nothing is the model's fault, not yours:
# pick another from the list above.
set -euo pipefail

MODEL="${DOC2TYPST_AI_MODEL:-nvidia/nemotron-3.5-super-vl-120b-a12b}"
ENDPOINT="${DOC2TYPST_AI_ENDPOINT:-https://integrate.api.nvidia.com/v1/chat/completions}"
KEY_FILE="${DOC2TYPST_AI_KEY_FILE:-$HOME/.config/doc2typst/nvidia.key}"
MAX_PAGES="${DOC2TYPST_AI_MAX_PAGES:-10}"
MAX_TOKENS="${DOC2TYPST_AI_MAX_TOKENS:-16384}"
TIMEOUT="${DOC2TYPST_AI_TIMEOUT:-420}"
HEDGE="${DOC2TYPST_AI_HEDGE:-3600}"
ATTEMPTS="${DOC2TYPST_AI_ATTEMPTS:-2}"
DPI="${DOC2TYPST_AI_DPI:-150}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PICKER="$HERE/doc2typst-picker.sh"
TEMPLATE_CANDIDATES=(
	"$HOME/Projects/Notes/Obsidian Vault/Extra/Template/typst.typ"
	"$HOME/.config/doc2typst/template.typ"
)

INPUT=""
PAGES=""
OUTPUT=""
NOTE=1
ACTION="convert"

usage() {
	cat <<'USAGE'
usage: doc2typst-ai.sh [file] [options]

  file                 PDF or image to convert (default: the only one here)
  --file PATH          say it explicitly
  --pages SPEC         pages to send, e.g. 1-4 or 3 (default: first 10)
  --model ID           NVIDIA model to call; overrides DOC2TYPST_AI_MODEL
  --max-tokens N       output budget; raise it for wordy models
  --timeout SECS       how long to wait per attempt (default 420)
  --hedge SECS         ask again after this much silence (default 60)
  --attempts N         most requests in flight for one page (default 3)
  --endpoint URL       chat-completions endpoint
  -o, --output PATH    where to write (default: ./<name>.typ)
  --no-note            do not write the "Converted from ..." first line
  --models             list the models this key can call, then exit
  --check              check the key and the rendering tools, then exit
  -h, --help           show this help

The .typ is written to the directory you run this in, never to the directory
the document was read from.

Only some models read images, and fewer still write usable Typst. The ones
known to work are nvidia/nemotron-3.5-super-vl-120b-a12b (the default).
Most of --models is text-only.

The endpoint ends every request at about five minutes and answers with a bare
504, and some requests stay silent until it does. So a page is asked for again
after a minute of silence, up to --attempts times at once, and the first real
answer is the one kept.
USAGE
}

die() {
	printf '%s\n' "$*" >&2
	exit 1
}

while [[ $# -gt 0 ]]; do
	case "$1" in
	--file) INPUT="${2:-}"; shift 2 ;;
	--file=*) INPUT="${1#*=}"; shift ;;
	--pages) PAGES="${2:-}"; shift 2 ;;
	--pages=*) PAGES="${1#*=}"; shift ;;
	--model) MODEL="${2:-}"; shift 2 ;;
	--model=*) MODEL="${1#*=}"; shift ;;
	--max-tokens) MAX_TOKENS="${2:-}"; shift 2 ;;
	--max-tokens=*) MAX_TOKENS="${1#*=}"; shift ;;
	--timeout) TIMEOUT="${2:-}"; shift 2 ;;
	--timeout=*) TIMEOUT="${1#*=}"; shift ;;
	--hedge) HEDGE="${2:-}"; shift 2 ;;
	--hedge=*) HEDGE="${1#*=}"; shift ;;
	--attempts) ATTEMPTS="${2:-}"; shift 2 ;;
	--attempts=*) ATTEMPTS="${1#*=}"; shift ;;
	--endpoint) ENDPOINT="${2:-}"; shift 2 ;;
	--endpoint=*) ENDPOINT="${1#*=}"; shift ;;
	-o | --output) OUTPUT="${2:-}"; shift 2 ;;
	-o=* | --output=*) OUTPUT="${1#*=}"; shift ;;
	--no-note) NOTE=0; shift ;;
	--models) ACTION="models"; shift ;;
	--check) ACTION="check"; shift ;;
	-h | --help) usage; exit 0 ;;
	--) shift; break ;;
	-*) die "Unknown option: $1 (try --help)" ;;
	*) INPUT="$1"; shift ;;
	esac
done

# ---------------------------------------------------------------------------
# The key
# ---------------------------------------------------------------------------

resolve_key() {
	local key
	if [[ -n "${NVIDIA_API_KEY:-}" ]]; then
		printf '%s\n' "$NVIDIA_API_KEY"
		return 0
	fi
	if [[ -f "$KEY_FILE" ]]; then
		key="$(tr -d '\r\n' <"$KEY_FILE")"
		if [[ -n "$key" ]]; then
			printf '%s\n' "$key"
			return 0
		fi
	fi
	# Nothing saved yet: ask once, then keep it. A picker window is not always
	# interactive, so only ask when there is someone to answer.
	if [[ -t 0 ]]; then
		printf 'NVIDIA API key (nvapi-...): ' >&2
		read -r -s key || true
		printf '\n' >&2
		if [[ -n "$key" ]]; then
			mkdir -p "$(dirname "$KEY_FILE")"
			printf '%s' "$key" >"$KEY_FILE"
			chmod 600 "$KEY_FILE"
			printf 'Saved to %s\n' "$KEY_FILE" >&2
			printf '%s\n' "$key"
			return 0
		fi
	fi
	return 1
}

key_missing_message() {
	printf 'No NVIDIA API key.\n\n' >&2
	printf 'Get one at https://build.nvidia.com/settings, then either\n' >&2
	printf '  export NVIDIA_API_KEY=nvapi-...\n' >&2
	printf 'or put it in %s\n' "$KEY_FILE" >&2
}

# ---------------------------------------------------------------------------
# The template
# ---------------------------------------------------------------------------

template_file() {
	local candidate
	if [[ -n "${DOC2TYPST_TEMPLATE:-}" ]]; then
		[[ -f "$DOC2TYPST_TEMPLATE" ]] ||
			die "Template not found: $DOC2TYPST_TEMPLATE"
		printf '%s\n' "$DOC2TYPST_TEMPLATE"
		return 0
	fi
	for candidate in "${TEMPLATE_CANDIDATES[@]}"; do
		[[ -f "$candidate" ]] || continue
		printf '%s\n' "$candidate"
		return 0
	done
	return 1
}

# The template is never sent to the model to copy: it used to flatten the
# preamble onto one line, which is a Typst syntax error. The model supplies the
# credits and the body; the preamble is prepended here, exactly as written.
TEMPLATE_DEFAULT='#set document(title: "Title")
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
#v(1em)'

build_prompt() {
	printf '%s\n' \
		"Convert the attached document into Typst source." \
		"" \
		"Reply with exactly this shape, and nothing else:" \
		"" \
		"TITLE: <the document's title on one line>" \
		"COURSE: <course or module; leave empty if the document does not say>" \
		"AUTHOR: <author; leave empty if the document does not say>" \
		"BODY:" \
		"<the document itself as Typst markup>" \
		"" \
		"Rules for BODY:" \
		"- Do not write any #set, #show or page-setup line, and do not repeat" \
		"  the title block. Those are already supplied and will be prepended." \
		"- The BODY must not start with the title: the header already shows it." \
		"- Use = for a level-one heading and == for level-two." \
		"- Do not add colours, boxes, #rect, #text(fill: ...) or any other" \
		"  styling: the template decides how the document looks. Plain markup" \
		"  only, with #table for tables." \
		"- Write mathematics in Typst math mode, not LaTeX: \$forall n in NN\$," \
		"  not \$\\forall n \\in \\mathbb{N}\$. Keep the super- and subscripts" \
		"  the document shows." \
		"- Reproduce the words, lists and tables you can see." \
		"- No markdown fences and no commentary."
}

# ---------------------------------------------------------------------------
# Putting the answer back into the template
# ---------------------------------------------------------------------------

# Escape a value so sed treats it as text, not as a pattern or a delimiter.
sed_repl() {
	printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'
}

# Fill the template's own places: the document title, and the whole lines that
# read Course and Author. An empty value leaves its placeholder alone, so an
# unknown author still looks like the template. Mirrors apply_template() in
# pdf2typst.py.
fill_template() {
	local tpl="$1" title="$2" course="$3" author="$4" esc

	if [[ -n "$title" ]]; then
		esc="$(sed_repl "$title")"
		tpl="$(printf '%s\n' "$tpl" |
			sed -e 's|^#set document(title: "[^"]*")|#set document(title: "'"$esc"'")|')"
		tpl="$(printf '%s\n' "$tpl" | sed -e "s|Tittle/Topic|$esc|")"
	fi
	if [[ -n "$course" ]]; then
		esc="$(sed_repl "$course")"
		tpl="$(printf '%s\n' "$tpl" |
			sed -e "s|^\([[:space:]]*\)Course[[:space:]]*\$|\1$esc|")"
	fi
	if [[ -n "$author" ]]; then
		esc="$(sed_repl "$author")"
		tpl="$(printf '%s\n' "$tpl" |
			sed -e "s|^\([[:space:]]*\)Author[[:space:]]*\$|\1$esc|")"
	fi
	printf '%s\n' "$tpl"
}

# The value of a "NAME: value" line in the model's answer (first one wins).
field() {
	printf '%s\n' "$2" |
		sed -n "s/^[[:space:]]*$1:[[:space:]]*//p" |
		head -n 1 |
		sed -e 's/[[:space:]]*$//'
}

# Everything after the "BODY:" marker. The marker may carry the first line of
# the body itself ("BODY: = Introduction"), which is kept. If the model skipped
# the marker entirely, drop the leading TITLE/COURSE/AUTHOR lines instead, so
# the fields never leak into the text.
body_of() {
	printf '%s\n' "$1" | awk '
		{
			line[NR] = $0
			if (!body && $0 ~ /^[[:space:]]*BODY:/) {
				body = NR
				rest = $0
				sub(/^[[:space:]]*BODY:[[:space:]]*/, "", rest)
			}
			if ($0 ~ /^[[:space:]]*(TITLE|COURSE|AUTHOR):/) meta = NR
		}
		END {
			if (body) {
				if (length(rest)) print rest
				for (i = body + 1; i <= NR; i++) print line[i]
				exit
			}
			start = meta + 1
			while (start <= NR && line[start] ~ /^[[:space:]]*$/) start++
			for (i = start; i <= NR; i++) print line[i]
		}'
}

# Drop a leading heading that only repeats the title the header already shows.
drop_title_line() {
	printf '%s\n' "$1" | awk -v t="$2" '
		BEGIN { done = 0 }
		{
			if (!done) {
				if ($0 ~ /^[[:space:]]*$/) next
				text = $0
				sub(/^=+[[:space:]]*/, "", text)
				sub(/[[:space:]]+$/, "", text)
				done = 1
				if (text == t) next
			}
			print
		}'
}

# Models often answer in LaTeX math even when asked for Typst. Most commands
# have the same name in Typst once the backslash is gone (\times -> times,
# \forall -> forall), so the backslash is dropped; the few that differ are
# renamed, and fractions and roots get their braces turned into parentheses.
normalize_math() {
	printf '%s\n' "$1" | awk '
		BEGIN {
			ren["le"] = "<="; ren["leq"] = "<="
			ren["ge"] = ">="; ren["geq"] = ">="
			ren["neq"] = "!="; ren["ne"] = "!="
			ren["to"] = "arrow.r"; ren["rightarrow"] = "arrow.r"
			ren["leftarrow"] = "arrow.l"
			ren["Rightarrow"] = "arrow.r.double"
			ren["Leftrightarrow"] = "arrow.l.r.double"
			ren["leftrightarrow"] = "arrow.l.r"
			ren["mapsto"] = "arrow.r.bar"
			ren["iff"] = "arrow.l.r"; ren["implies"] = "arrow.r.double"
			ren["cross"] = "times"
			ren["cdot"] = "dot"
			ren["infty"] = "oo"
			ren["cup"] = "union"; ren["cap"] = "inter"
			ren["subseteq"] = "subset.eq"; ren["subset"] = "subset"
			ren["emptyset"] = "nothing"
			ren["sum"] = "sum"; ren["prod"] = "product"; ren["int"] = "integral"
			ren["left"] = ""; ren["right"] = ""
			ren["quad"] = " "; ren["qquad"] = "  "
			ren["ldots"] = "..."; ren["dots"] = "..."
			ren["lor"] = "or"; ren["land"] = "and"; ren["lnot"] = "not"

			# Words that Typst spells differently inside math.
			words["AND"] = "and"; words["OR"] = "or"
			words["NOT"] = "not"; words["XOR"] = "xor"
			words["intersect"] = "inter"; words["sect"] = "inter"
			words["neg"] = "not"; words["cross"] = "times"
			words["iff"] = "arrow.l.r"; words["implies"] = "arrow.r.double"

			# Names Typst already knows in math mode. Anything else with more
			# than one letter is an unknown variable to Typst, so it is shown
			# as upright text instead ("isOdd" rather than a compile error).
			safe["and"] = 1; safe["or"] = 1; safe["not"] = 1; safe["xor"] = 1
			safe["in"] = 1; safe["inter"] = 1; safe["union"] = 1; safe["sect"] = 1
			safe["diff"] = 1; safe["subset"] = 1; safe["supset"] = 1
			safe["compose"] = 1; safe["times"] = 1; safe["dot"] = 1
			safe["equiv"] = 1; safe["approx"] = 1; safe["prop"] = 1
			safe["tilde"] = 1; safe["asymp"] = 1; safe["parallel"] = 1
			safe["perp"] = 1; safe["angle"] = 1; safe["arrow"] = 1
			safe["oo"] = 1; safe["infinity"] = 1; safe["nothing"] = 1
			safe["emptyset"] = 1; safe["checkmark"] = 1; safe["therefore"] = 1
			safe["qed"] = 1; safe["because"] = 1; safe["prime"] = 1
			safe["partial"] = 1; safe["nabla"] = 1; safe["planck"] = 1
			safe["ell"] = 1; safe["hbar"] = 1; safe["degree"] = 1
			safe["mod"] = 1; safe["quo"] = 1; safe["rem"] = 1; safe["divides"] = 1
			safe["sqrt"] = 1; safe["root"] = 1; safe["abs"] = 1; safe["floor"] = 1
			safe["ceil"] = 1; safe["round"] = 1; safe["norm"] = 1; safe["sum"] = 1
			safe["prod"] = 1; safe["product"] = 1; safe["integral"] = 1
			safe["lim"] = 1; safe["inf"] = 1; safe["sup"] = 1; safe["max"] = 1
			safe["min"] = 1; safe["gcd"] = 1; safe["lcm"] = 1; safe["det"] = 1
			safe["dim"] = 1; safe["ker"] = 1; safe["deg"] = 1; safe["exp"] = 1
			safe["log"] = 1; safe["ln"] = 1; safe["sin"] = 1; safe["cos"] = 1
			safe["tan"] = 1; safe["cot"] = 1; safe["sec"] = 1; safe["csc"] = 1
			safe["sinh"] = 1; safe["cosh"] = 1; safe["tanh"] = 1
			safe["arcsin"] = 1; safe["arccos"] = 1; safe["arctan"] = 1
			safe["op"] = 1; safe["mat"] = 1; safe["cases"] = 1; safe["case"] = 1
			safe["vec"] = 1; safe["binom"] = 1; safe["frac"] = 1; safe["attach"] = 1
			safe["exists"] = 1; safe["forall"] = 1
			safe["dots"] = 1; safe["ldots"] = 1; safe["cdots"] = 1
			safe["vdots"] = 1; safe["ddots"] = 1
			safe["Re"] = 1; safe["Im"] = 1
			safe["NN"] = 1; safe["ZZ"] = 1; safe["RR"] = 1
			safe["QQ"] = 1; safe["CC"] = 1; safe["PP"] = 1
			safe["alpha"] = 1; safe["beta"] = 1; safe["gamma"] = 1
			safe["delta"] = 1; safe["epsilon"] = 1; safe["varepsilon"] = 1
			safe["zeta"] = 1; safe["eta"] = 1; safe["theta"] = 1
			safe["vartheta"] = 1; safe["iota"] = 1; safe["kappa"] = 1
			safe["varkappa"] = 1; safe["lambda"] = 1; safe["mu"] = 1
			safe["nu"] = 1; safe["xi"] = 1; safe["omicron"] = 1; safe["pi"] = 1
			safe["varpi"] = 1; safe["rho"] = 1; safe["varrho"] = 1
			safe["sigma"] = 1; safe["varsigma"] = 1; safe["tau"] = 1
			safe["upsilon"] = 1; safe["phi"] = 1; safe["varphi"] = 1
			safe["chi"] = 1; safe["psi"] = 1; safe["omega"] = 1
			safe["Gamma"] = 1; safe["Delta"] = 1; safe["Theta"] = 1
			safe["Lambda"] = 1; safe["Xi"] = 1; safe["Pi"] = 1
			safe["Sigma"] = 1; safe["Upsilon"] = 1; safe["Phi"] = 1
			safe["Psi"] = 1; safe["Omega"] = 1
		}
		{
			line = $0

			# \frac{a}{b} -> (a)/(b)
			while (match(line, /\\frac\{[^{}]*\}\{[^{}]*\}/)) {
				tok = substr(line, RSTART, RLENGTH)
				body = tok
				sub(/^\\frac\{/, "", body)
				split(body, part, "}{")
				den = part[2]; sub(/\}$/, "", den)
				line = substr(line, 1, RSTART - 1) "(" part[1] ")/(" den ")" substr(line, RSTART + RLENGTH)
			}

			# \sqrt{a} -> sqrt(a)
			while (match(line, /\\sqrt\{[^{}]*\}/)) {
				tok = substr(line, RSTART, RLENGTH)
				inner = tok
				sub(/^\\sqrt\{/, "", inner); sub(/\}$/, "", inner)
				line = substr(line, 1, RSTART - 1) "sqrt(" inner ")" substr(line, RSTART + RLENGTH)
			}

			# \mathbb{N} -> NN
			while (match(line, /\\mathbb\{[A-Za-z]\}/)) {
				tok = substr(line, RSTART, RLENGTH)
				letter = substr(tok, 9, 1)
				line = substr(line, 1, RSTART - 1) letter letter substr(line, RSTART + RLENGTH)
			}

			# \text{..} and \mathrm{..} -> ".."
			while (match(line, /\\(text|mathrm)\{[^{}]*\}/)) {
				tok = substr(line, RSTART, RLENGTH)
				inner = tok
				sub(/^\\(text|mathrm)\{/, "", inner); sub(/\}$/, "", inner)
				line = substr(line, 1, RSTART - 1) "\"" inner "\"" substr(line, RSTART + RLENGTH)
			}

			# Thin spaces and escaped punctuation carry no meaning here.
			gsub(/\\[,;!]/, "", line)

			# Everything else: drop the backslash, keep the name.
			out = ""
			while (match(line, /\\[a-zA-Z]+/)) {
				cmd = substr(line, RSTART + 1, RLENGTH - 1)
				pre = substr(line, 1, RSTART - 1)
				line = substr(line, RSTART + RLENGTH)
				rep = (cmd in ren) ? ren[cmd] : cmd
				out = out pre rep
			}
			line = out line

			# Logic words are renamed inside "$...$" only, so prose that
			# mentions AND or OR is left alone.
			parts = split(line, seg, /\$/)
			line = ""
			for (i = 1; i <= parts; i++) {
				line = line ((i % 2 == 0) ? fixmath(seg[i]) : seg[i])
				if (i < parts) line = line "$"
			}
			print line
		}

		# Rename whole words in one piece of math mode. Text inside quotes is
		# shown verbatim, so it is left alone.
		function fixmath(s,   out, i, ch, tok, quoted) {
			out = ""
			i = 1
			quoted = 0
			while (i <= length(s)) {
				ch = substr(s, i, 1)
				if (ch == "\"") {
					quoted = !quoted
					out = out ch
					i++
					continue
				}
				# [ ] inside math mode are not valid Typst; use ( ) instead
				if (ch == "[") { out = out "("; i++; continue }
				if (ch == "]") { out = out ")"; i++; continue }
				if (!quoted && ch ~ /[A-Za-z]/) {
					tok = ""
					while (i <= length(s) && substr(s, i, 1) ~ /[A-Za-z]/) {
						tok = tok substr(s, i, 1)
						i++
					}
					if (tok in words) out = out words[tok]
					else if (length(tok) == 1 || (tok in safe)) out = out tok
					else out = out "\"" tok "\""
				} else {
					out = out ch
					i++
				}
			}
			return out
		}'
}

# A section sign typed as text ("= § What is a Proof?"), not as a heading.
strip_section_sign() {
	printf '%s\n' "$1" | sed -e 's/^\(=*\)[[:space:]]*§[[:space:]]*/\1 /'
}

# The model appends a self-review / constraint-checking section despite being
# told not to. Lines like "- No `#set`, `#show`, or page-setup." and
# "*Reviewing constraints:*" are not valid Typst and break compilation. Strip
# them, plus everything from the review marker onwards.
strip_self_review() {
	printf '%s\n' "$1" | awk '
		/^[[:space:]]*\*Reviewing constraints:/ { exit }
		/^[[:space:]]*-[[:space:]]*No[[:space:]]+/ && /`/ { next }
		/^[[:space:]]*-[[:space:]]*"/ && /Checked/ { next }
		{ print }
	'
}

# Models drift into Markdown: rule lines, "**bold**", "* item", "1. item" and
# "# heading" are Typst syntax errors or, worse, silently wrong. Repair the
# shapes they actually emit; anything else is left exactly as written.
normalize_markup() {
	printf '%s\n' "$1" | awk '
		{
			line = $0

			# A rule line, or the underline of a Markdown setext heading.
			if (line ~ /^[[:space:]]*={3,}[[:space:]]*$/) next
			if (line ~ /^[[:space:]]*-{3,}[[:space:]]*$/) next

			# "# Heading" -> "= Heading"
			if (line ~ /^#+[[:space:]]/) {
				hashes = line
				sub(/[[:space:]].*/, "", hashes)
				n = length(hashes)
				if (n > 6) n = 6
				eq = ""
				for (i = 0; i < n; i++) eq = eq "="
				sub(/^#+[[:space:]]+/, eq " ", line)
				print line
				next
			}

			# "* item" / "+ item" -> "- item" (a leading * is bold in Typst)
			if (line ~ /^[[:space:]]*[*+][[:space:]]+/) {
				sub(/^[[:space:]]*[*+][[:space:]]+/, "- ", line)
				print line
				next
			}

			# "1. item" -> "+ item"
			if (line ~ /^[[:space:]]*[0-9]+[.][[:space:]]+/) {
				sub(/^[[:space:]]*[0-9]+[.][[:space:]]+/, "+ ", line)
				print line
				next
			}

			# "**bold**" -> "*bold*"
			while (match(line, /\*\*[^*]+\*\*/)) {
				start = RSTART; len = RLENGTH
				inner = substr(line, start + 2, len - 4)
				line = substr(line, 1, start - 1) "*" inner "*" substr(line, start + len)
			}

			# "[*]" -> "[x]" and "[ ]" -> "[]" (checkboxes are not valid Typst)
			while (match(line, /\[\*\]/)) {
				start = RSTART
				line = substr(line, 1, start - 1) "[x]" substr(line, start + 3)
			}
			gsub(/\[ \]/, "[]", line)

			# Bare * in table cells -> [x]
			while (match(line, /\*[[:space:]]*,/)) {
				line = substr(line, 1, RSTART - 1) "[x]" substr(line, RSTART + 1)
			}
			while (match(line, /,[[:space:]]*\*/)) {
				line = substr(line, 1, RSTART) " [x]" substr(line, RSTART + 2)
			}
			while (match(line, /\*[[:space:]]*$/)) {
				line = substr(line, 1, RSTART - 1) "[x]"
			}

			# Empty cell between commas -> [] (loop until no more consecutive empties)
			while (gsub(/,[[:space:]]*,/, ", [], ", line)) {}

			print line
		}'
}

# A model that ignores the rules may still echo the preamble. Cut through the
# template's title line, so the file gets the real template and one body.
strip_echoed_template() {
	local text="$1"
	if ! printf '%s\n' "$text" | grep -q '^#set document('; then
		printf '%s\n' "$text"
		return 0
	fi
	printf '%s\n' "$text" | awk '
		{ line[NR] = $0; if ($0 ~ /#align\(center, text\(size: 18pt/) cut = NR }
		END { for (i = cut + 1; i <= NR; i++) print line[i] }'
}

# A title from the file name, for when the model gives none.
title_from_name() {
	local name
	name="$(basename "$1")"
	name="${name%.*}"
	name="${name//_/ }"
	name="${name//-/ }"
	printf '%s\n' "$name"
}

# ---------------------------------------------------------------------------
# Rendering pages to images
# ---------------------------------------------------------------------------

# Lowercased copy, because macOS still ships bash 3.2 without ${v,,}.
lower() {
	printf '%s\n' "$1" | tr '[:upper:]' '[:lower:]'
}

# Print the MIME type for an image path, so the request labels it correctly.
image_mime() {
	case "$(lower "$1")" in
	*.png) printf 'image/png\n' ;;
	*.jpg | *.jpeg) printf 'image/jpeg\n' ;;
	*.tif | *.tiff) printf 'image/tiff\n' ;;
	*.bmp) printf 'image/bmp\n' ;;
	*.webp) printf 'image/webp\n' ;;
	*.gif) printf 'image/gif\n' ;;
	*) printf 'image/png\n' ;;
	esac
}

# An image is one page; a PDF is rendered to page-001.png, page-002.png, ...
render_pages() {
	local src="$1" outdir="$2" spec="$3" first last

	if [[ "$(lower "$src")" != *.pdf ]]; then
		cp "$src" "$outdir/page-001.${src##*.}"
		return 0
	fi

	if command -v mutool >/dev/null 2>&1; then
		if [[ -n "$spec" ]]; then
			mutool draw -q -r "$DPI" -o "$outdir/page-%03d.png" "$src" "$spec" >/dev/null ||
				die "Could not render pages '$spec' of $(basename "$src")."
		else
			mutool draw -q -r "$DPI" -o "$outdir/page-%03d.png" "$src" >/dev/null ||
				die "Could not render $(basename "$src")."
		fi
		return 0
	fi
	if command -v pdftoppm >/dev/null 2>&1; then
		if [[ -n "$spec" ]]; then
			first="${spec%%-*}"
			last="${spec##*-}"
			pdftoppm -png -r "$DPI" -f "$first" -l "$last" "$src" "$outdir/page" >/dev/null ||
				die "Could not render pages '$spec' of $(basename "$src")."
		else
			pdftoppm -png -r "$DPI" "$src" "$outdir/page" >/dev/null ||
				die "Could not render $(basename "$src")."
		fi
		return 0
	fi
	die 'No PDF renderer. Install one:
  brew install mupdf-tools    # mutool
  brew install poppler        # pdftoppm'
}

# Empty means every page, which is also how mutool and pdftoppm read it.
page_spec() {
	local spec="$1"
	case "$spec" in
	"") printf '1-%s\n' "$MAX_PAGES" ;;
	all | ALL) printf '\n' ;;
	*) printf '%s\n' "$spec" ;;
	esac
}

# ---------------------------------------------------------------------------
# Actions that do not convert
# ---------------------------------------------------------------------------

if [[ "$ACTION" == "models" ]]; then
	key="$(resolve_key)" || { key_missing_message; exit 1; }
	curl -sS -H "Authorization: Bearer $key" "${ENDPOINT%/chat/completions}/models" |
		jq -r '.data[].id' | sort
	exit 0
fi

if [[ "$ACTION" == "check" ]]; then
	printf 'endpoint: %s\n' "$ENDPOINT"
	printf 'model:    %s\n' "$MODEL"
	printf '          (run --models to confirm it is still hosted)\n'
	printf 'budget:   %s tokens, %s s per attempt\n' "$MAX_TOKENS" "$TIMEOUT"
	printf 'hedge:    a silent attempt gets company after %s s\n' "$HEDGE"
	printf 'retries:  up to %s requests at once per page\n' "$ATTEMPTS"
	if key="$(resolve_key)"; then
		printf 'key:      %s...\n' "${key:0:9}"
	else
		printf 'key:      missing (%s)\n' "$KEY_FILE"
	fi
	printf 'key file: %s\n' "$KEY_FILE"
	if command -v mutool >/dev/null 2>&1; then
		printf 'renderer: mutool\n'
	elif command -v pdftoppm >/dev/null 2>&1; then
		printf 'renderer: pdftoppm\n'
	else
		printf 'renderer: missing (brew install mupdf-tools)\n'
	fi
	if tpl="$(template_file)"; then
		printf 'template: %s\n' "$tpl"
	else
		printf 'template: not found (looked in %s)\n' "${TEMPLATE_CANDIDATES[*]}"
	fi
	printf 'jq:       %s\n' "$(command -v jq || echo missing)"
	printf 'curl:     %s\n' "$(command -v curl || echo missing)"
	exit 0
fi

# ---------------------------------------------------------------------------
# Converting
# ---------------------------------------------------------------------------

# A bare run in a terminal is "help me choose a document": hand over to the
# picker, already in ai mode, so it lists what is here and writes the result
# here. Piped or captured output still gets the explanation below.
if [[ -z "$INPUT" && -t 0 && -f "$PICKER" ]]; then
	exec bash "$PICKER" --mode ai
fi
[[ -n "$INPUT" ]] || die "Give me a PDF or an image (try --help)."
INPUT="${INPUT/#\~/$HOME}"
[[ -f "$INPUT" ]] || die "File not found: $INPUT"
command -v jq >/dev/null 2>&1 || die "jq is required (brew install jq)."
command -v curl >/dev/null 2>&1 || die "curl is required."
case "$MAX_TOKENS" in '' | *[!0-9]*) die "Max tokens must be a number: $MAX_TOKENS" ;; esac
case "$TIMEOUT" in '' | *[!0-9]*) die "Timeout must be seconds: $TIMEOUT" ;; esac
case "$HEDGE" in '' | *[!0-9]*) die "Hedge delay must be seconds: $HEDGE" ;; esac
case "$ATTEMPTS" in '' | *[!0-9]*) die "Attempts must be a number: $ATTEMPTS" ;; esac
((ATTEMPTS > 0)) || die "Attempts must be at least 1."

key="$(resolve_key)" || { key_missing_message; exit 1; }
prompt="$(build_prompt)"
spec="$(page_spec "$PAGES")"

work="$(mktemp -d "${TMPDIR:-/tmp}/doc2typst-ai.XXXXXX")"
trap 'rm -rf "$work"' EXIT INT TERM

render_pages "$INPUT" "$work" "$spec"
shopt -s nullglob
pages=("$work"/page-*)
((${#pages[@]})) || die "No pages were rendered from $INPUT."
shopt -u nullglob

# One image per request: several of the hosted vision models refuse a prompt
# that carries more than one ("At most 1 image(s) may be provided"), so each
# page is asked for on its own and the bodies are joined in order.
#
# This endpoint shows its hand early. A request it is really working on sends
# its first bytes within a minute; one that has been parked somewhere it will
# never leave sends nothing at all until the gateway kills it with a bare 504
# at five minutes. So a page is not retried *after* a failure: while the first
# request is still silent, another is already on its way, and the first
# complete answer wins. Waiting politely, one five-minute timeout at a time,
# is what made this take thirteen minutes for the first two pages.
ASK_ERROR_FILE="$work/last-error"
ASK_ANSWER="$work/answer"

# Start attempt $1 for the page image $2, posting the body in $3. The pid is
# left in LAUNCH_PID; the byte stream, the response headers and curl's own
# complaints each get a file of their own, named after the attempt. (An array
# shared with the caller would be neater, but bash 3.2 does not let a function
# assign into the caller's local array.)
ask_launch() {
	local sse="$work/attempt.$1.sse" hdr="$work/attempt.$1.hdr"
	local err="$work/attempt.$1.err"
	: >"$sse"
	: >"$hdr"
	: >"$err"
	curl -sS -N --max-time "$TIMEOUT" -D "$hdr" "$ENDPOINT" \
		-H "Authorization: Bearer $key" \
		-H 'Content-Type: application/json' \
		--data-binary "@$3" >"$sse" 2>"$err" &
	LAUNCH_PID=$!
}

# Read the stream in $1 into ANSWER and ANSWER_FINISH.
ask_read() {
	local sse="$1"
	ANSWER=""
	ANSWER_FINISH=""
	[[ -s "$sse" ]] || return 0
	if [[ "$(head -c 1 "$sse" 2>/dev/null)" == "{" ]]; then
		# A deployment that ignores "stream" answers in one piece.
		ANSWER="$(jq -r '.choices[0].message.content // .choices[0].message.reasoning_content // empty' "$sse" 2>/dev/null || true)"
		ANSWER_FINISH="$(jq -r '.choices[0].finish_reason // empty' "$sse" 2>/dev/null || true)"
	else
		ANSWER="$(sed -n 's/^data: //p' "$sse" 2>/dev/null |
			jq -R -j 'fromjson? | .choices[0].delta.content // .choices[0].delta.reasoning_content // empty' 2>/dev/null || true)"
		ANSWER_FINISH="$(sed -n 's/^data: //p' "$sse" 2>/dev/null |
			jq -R -r 'fromjson? | .choices[0].finish_reason // empty' 2>/dev/null |
			tail -n 1 || true)"
	fi
}

# Why the attempt with headers $1 and stream $2, which exited $3, has no answer.
ask_reason() {
	local hdr="$1" sse="$2" status="$3" http detail
	http="$(awk 'NR==1 {print $2}' "$hdr" 2>/dev/null || true)"
	case "$http" in
	401 | 403)
		printf 'the key was refused (HTTP %s)' "$http"
		return 0
		;;
	429)
		printf 'the endpoint is rate limiting this key (HTTP 429)'
		return 0
		;;
	500 | 502 | 503 | 504)
		printf 'the endpoint gave up (HTTP %s) and sent no answer' "$http"
		return 0
		;;
	esac
	if ((status == 28)); then
		printf 'no complete answer within %s s' "$TIMEOUT"
		return 0
	fi
	if ((status != 0)); then
		printf 'the request failed (curl exit %s)' "$status"
		return 0
	fi
	# A readable answer with no text in it is the model's doing, not the wire's.
	if [[ -s "$sse" ]]; then
		detail="$(jq -R -r 'fromjson? |
			if .error != null then (.error.message // "unknown error")
			elif ((.choices[0].message.reasoning_content //
				.choices[0].delta.reasoning_content // "") | length) > 0 then
				"the model spent its output budget on hidden reasoning and wrote nothing"
			elif (.choices[0].finish_reason // "") == "length" then
				"the model ran out of output tokens"
			else empty end' "$sse" 2>/dev/null | tail -n 1 || true)"
		if [[ -n "$detail" ]]; then
			printf '%s' "$detail"
			return 0
		fi
	fi
	printf 'the endpoint returned no text (HTTP %s)' "${http:-no status}"
}

# Ask for one page. The text goes to ASK_ANSWER and the reason for a failure
# to ASK_ERROR_FILE; the return value is non-zero only when nothing arrived.
ask_page() {
	local image="$1" payload="$work/request.json" bytes now status
	local started live noted last_bytes last_growth i winner fallback reason
	local -a pids

	: >"$ASK_ERROR_FILE"
	rm -f "$work/truncated" "$work/noted"

	{
		printf '{"model":%s,"max_tokens":%s,"temperature":0.2,"stream":false,"messages":[{"role":"user","content":[' \
			"$(jq -Rn --arg v "$MODEL" '$v')" "$MAX_TOKENS"
		printf '{"type":"text","text":%s}' "$(jq -Rn --arg v "$prompt" '$v')"
		printf ',{"type":"image_url","image_url":{"url":%s}}' \
			"$(jq -Rn --arg v "data:$(image_mime "$image");base64,$(base64 <"$image" | tr -d '\n')" '$v')"
		printf ']}]}'
	} >"$payload"

	started=0
	live=0
	noted=0
	bytes=0
	last_bytes=0
	winner=-1
	fallback=-1
	last_growth=$(date +%s)

	while :; do
		live=0
		for ((i = 0; i < started; i++)); do
			if kill -0 "${pids[$i]}" 2>/dev/null; then live=$((live + 1)); fi
		done

		# A finished attempt with text in it settles the page at once; there
		# is no reason to sit out the others. This comes before everything
		# else so that an answer that arrived between two polls is not
		# answered by starting a request nobody needs.
		for ((i = 0; i < started; i++)); do
			if ! kill -0 "${pids[$i]}" 2>/dev/null; then
				ask_read "$work/attempt.$i.sse"
				if [[ -n "$ANSWER" ]]; then
					winner=$i
					break
				fi
			fi
		done
		if ((winner >= 0)); then break; fi

		# Nothing running, nothing left to start: the page is decided.
		if ((live == 0)); then
			if ((started >= ATTEMPTS)); then break; fi
			# An attempt that has ended will never say anything more, so
			# replace it instead of waiting out the page. The first request
			# is simply the first replacement.
			ask_launch "$started" "$image" "$payload"
			pids[$started]=$LAUNCH_PID
			started=$((started + 1))
			last_growth=$(date +%s)
			continue
		fi

		# Silence: ask again on top of the request that is not moving.
		now=$(date +%s)
		if ((started < ATTEMPTS && now - last_growth >= HEDGE)); then
			ask_launch "$started" "$image" "$payload"
			pids[$started]=$LAUNCH_PID
			started=$((started + 1))
			last_growth=$now
			if ((noted == 0)); then
				printf '\n'
				noted=1
				: >"$work/noted"
			fi
			printf '  quiet for %s s, asking again (%s in flight)\n' "$HEDGE" "$started"
			continue
		fi

		sleep 2

		bytes=0
		for ((i = 0; i < started; i++)); do
			bytes=$((bytes + $(wc -c <"$work/attempt.$i.sse" 2>/dev/null | tr -d ' ')))
		done
		if ((bytes != last_bytes)); then
			last_bytes=$bytes
			last_growth=$(date +%s)
		fi
	done

	if ((winner < 0)); then
		# Every attempt has ended. Prefer one that finished cleanly, and keep
		# the reason from the last one so the failure can be explained.
		for ((i = 0; i < started; i++)); do
			status=0
			wait "${pids[$i]}" 2>/dev/null || status=$?
			ask_read "$work/attempt.$i.sse"
			if [[ -z "$ANSWER" ]]; then
				reason="$(ask_reason "$work/attempt.$i.hdr" "$work/attempt.$i.sse" "$status")"
				if [[ -n "$reason" ]]; then printf '%s' "$reason" >"$ASK_ERROR_FILE"; fi
			elif [[ "$ANSWER_FINISH" == "stop" ]]; then
				if ((winner < 0)); then winner=$i; fi
			elif ((fallback < 0)); then
				fallback=$i
			fi
		done
		if ((winner < 0)); then winner=$fallback; fi
	fi

	# Whatever is still running lost the race.
	for ((i = 0; i < started; i++)); do
		if ((i != winner)); then
			kill "${pids[$i]}" 2>/dev/null || true
			wait "${pids[$i]}" 2>/dev/null || true
		fi
	done

	if ((winner < 0)); then
		[[ -s "$ASK_ERROR_FILE" ]] || printf 'the endpoint returned no text' >"$ASK_ERROR_FILE"
		return 1
	fi

	ask_read "$work/attempt.$winner.sse"
	# "stop" is the only ending that means the page was written in full.
	[[ "$ANSWER_FINISH" == "stop" ]] || printf '1' >"$work/truncated"
	printf '%s' "$ANSWER" >"$ASK_ANSWER"
	return 0
}

printf 'Sending %s page(s) of %s\n' "${#pages[@]}" "$(basename "$INPUT")"
printf 'Model:  %s\n' "$MODEL"
if ((ATTEMPTS == 1)); then
	printf 'Up to %s s per page, one request at a time.\n\n' "$TIMEOUT"
else
	printf 'Up to %s s per request; after %s s of silence another is sent (%s at most).\n\n' \
		"$TIMEOUT" "$HEDGE" "$ATTEMPTS"
fi

# template_file() answers with a path; the file's text is what gets filled in.
if tpl_path="$(template_file)"; then
	template_text="$(cat "$tpl_path")"
else
	template_text="$TEMPLATE_DEFAULT"
fi

[[ -n "$OUTPUT" ]] || OUTPUT="$PWD/$(basename "${INPUT%.*}").typ"
[[ "$OUTPUT" == /* ]] || OUTPUT="$PWD/$OUTPUT"

# Everything collected so far, written somewhere. Used both for the answer and
# for the partial file left behind when a later page cannot be converted: ten
# minutes of work on pages one to five should not be thrown away by page six.
write_output() {
	local path="$1" note="$2"
	[[ -n "$title" ]] || title="$(title_from_name "$INPUT")"
	header="$(fill_template "$template_text" "$title" "$course" "$author")"
	if ((NOTE && note)); then
		{
			printf '// Converted from %s (nvidia:%s)\n' "$(basename "$INPUT")" "$MODEL"
			printf '%s\n\n' "$header"
			printf '%s\n' "$body"
		} >"$path"
	else
		{
			printf '%s\n\n' "$header"
			printf '%s\n' "$body"
		} >"$path"
	fi
}

title=""
course=""
author=""
body=""
page_no=0

for page in "${pages[@]}"; do
	page_no=$((page_no + 1))
	content=""

	printf 'Page %s/%s ... ' "$page_no" "${#pages[@]}"
	started=$(date +%s)
	if ask_page "$page"; then
		if [[ -f "$work/noted" ]]; then
			printf '  ok (%s s)\n' "$(( $(date +%s) - started ))"
		else
			printf 'ok (%s s)\n' "$(( $(date +%s) - started ))"
		fi
		content="$(cat "$ASK_ANSWER")"
	else
		reason="$(cat "$ASK_ERROR_FILE" 2>/dev/null)"
		if [[ -f "$work/noted" ]]; then
			printf '  %s\n' "$reason"
		else
			printf 'failed: %s\n' "$reason"
		fi
		printf 'Model tried: %s\n' "$MODEL" >&2
		if [[ -n "$body" ]]; then
			partial="${OUTPUT%.typ}.partial.typ"
			[[ "$partial" == "$OUTPUT" ]] && partial="$OUTPUT.partial"
			write_output "$partial" 0
			{
				printf 'Stopped at page %s of %s; the earlier pages are in\n' "$page_no" "${#pages[@]}"
				printf '  %s\n' "$partial"
			} >&2
		fi
		printf 'Check what this key can call:\n  %s --models\n' "$(basename "$0")" >&2
		exit 1
	fi

	if [[ -f "$work/truncated" ]]; then
		printf '     cut off at --max-tokens %s; raise it for this document\n' "$MAX_TOKENS"
		rm -f "$work/truncated"
	fi

	# Models like to wrap the answer in a fence even when told not to.
	content="$(printf '%s\n' "$content" | sed -e '/^[[:space:]]*```/d')"

	page_title="$(field TITLE "$content")"
	page_course="$(field COURSE "$content")"
	page_author="$(field AUTHOR "$content")"
	page_body="$(body_of "$content")"
	if [[ -z "$page_body" ]]; then
		page_body="$content"
	fi

	# Credits come from the first page that states them.
	if [[ -z "$title" ]]; then title="$page_title"; fi
	if [[ -z "$course" ]]; then course="$page_course"; fi
	if [[ -z "$author" ]]; then author="$page_author"; fi

	page_body="$(strip_echoed_template "$page_body")"
	page_body="$(strip_section_sign "$page_body")"
	page_body="$(normalize_math "$page_body")"
	page_body="$(normalize_markup "$page_body")"
	page_body="$(strip_self_review "$page_body")"
	page_body="$(drop_title_line "$page_body" "$title")"
	page_body="$(printf '%s\n' "$page_body" | sed -e '/./,$!d')"

	if [[ -n "$page_body" ]]; then
		if [[ -n "$body" ]]; then body="$body"$'\n\n'; fi
		body="$body$page_body"
	fi
done

[[ -n "$body" ]] || die "The model returned no body."

write_output "$OUTPUT" 1

printf 'Title:  %s\n' "$title"
if [[ -n "$course" ]]; then printf 'Course: %s\n' "$course"; fi
if [[ -n "$author" ]]; then printf 'Author: %s\n' "$author"; fi
printf 'Wrote %s\n' "$OUTPUT"

# The model can return markup that reads well and still does not parse, so say
# so now rather than leaving a broken file to be discovered later.
if command -v typst >/dev/null 2>&1; then
	if typst compile "$OUTPUT" "$work/check.pdf" 2>"$work/typst.err"; then
		printf 'Compiles cleanly.\n'
	else
		printf 'It does not compile yet:\n' >&2
		head -n 12 "$work/typst.err" | sed 's/^/  /' >&2
		printf 'The file is still open for fixing: %s\n' "$OUTPUT" >&2
	fi
fi
