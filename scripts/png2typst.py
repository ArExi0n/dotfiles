#!/usr/bin/env python3
"""png2typst - convert images into Typst source using Tesseract OCR.

Several images are treated as consecutive pages of one document. The engine,
including the template, lives in pdf2typst.py beside this file, so the two must
be kept together.

Examples
--------
    python3 png2typst.py scan.png -o scan.typ
    python3 png2typst.py page1.png page2.png -o book.typ
    python3 png2typst.py photo.png --mode absolute -o photo.typ
    python3 png2typst.py --check
"""

from __future__ import annotations

import argparse
import os
import sys
from dataclasses import replace
from typing import Optional, Sequence

# Importing the engine must not leave a __pycache__ behind in a directory that
# other tools scan.
sys.dont_write_bytecode = True

PROGRAM = "png2typst"
DESCRIPTION = "Convert bitmap images into Typst source using Tesseract OCR."


def load_engine():
    """Import pdf2typst from this file's own directory.

    The name is unusual for a module, so the sibling file is loaded by path
    rather than relying on the import system finding it.
    """
    here = os.path.dirname(os.path.abspath(__file__))
    engine_path = os.path.join(here, "pdf2typst.py")
    if not os.path.isfile(engine_path):
        sys.stderr.write(
            "pdf2typst.py is missing.\n\n"
            "png2typst.py is the image front end for that file and has to sit\n"
            "next to it. Restore pdf2typst.py in:\n"
            "  {0}\n".format(here)
        )
        raise SystemExit(127)

    import importlib.util

    spec = importlib.util.spec_from_file_location("pdf2typst", engine_path)
    if spec is None or spec.loader is None:  # pragma: no cover - unreadable file
        sys.stderr.write("cannot load {0}\n".format(engine_path))
        raise SystemExit(127)
    module = importlib.util.module_from_spec(spec)
    sys.modules["pdf2typst"] = module
    spec.loader.exec_module(module)
    return module


engine = load_engine()


def build_parser():
    parser = engine.build_common_parser(
        PROGRAM, DESCRIPTION, "one or more images, in page order"
    )
    parser.add_argument(
        "--dpi",
        type=float,
        default=0.0,
        metavar="DPI",
        help="resolution of the image; 0 reads it from the file and falls back to 96",
    )
    parser.add_argument("--lang", default="eng", help="tesseract language (default: eng)")
    parser.add_argument(
        "--psm",
        type=int,
        default=3,
        help="tesseract page segmentation mode (default: 3 = fully automatic)",
    )
    parser.add_argument(
        "--min-conf",
        type=float,
        default=-1.0,
        metavar="PCT",
        help="drop words below this OCR confidence (default: keep all)",
    )
    parser.add_argument(
        "--upscale",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="upscale low resolution images before OCR (default: on)",
    )
    parser.add_argument(
        "--detect-bold",
        action="store_true",
        help="experimentally mark heavy lines as bold using ink density; "
        "needed for bold-only headings that share the body font size",
    )
    parser.add_argument(
        "--tesseract", default="", metavar="PATH", help="path to the tesseract binary"
    )
    return parser


def main(argv: Optional[Sequence[str]] = None) -> int:
    # Reading an image needs Pillow, which the interpreter that runs this file
    # may not have.
    engine.reexec_with(
        ("PIL",), __file__, list(argv) if argv is not None else sys.argv[1:]
    )

    parser = build_parser()
    args = parser.parse_args(argv)

    if args.check:
        return engine.check_environment()

    if not args.source:
        engine.require_source(
            parser,
            args.source,
            "pass one or more image paths, for example "
            "'png2typst.py page1.png page2.png -o book.typ'",
        )

    try:
        options = engine.conversion_options(args)
    except engine.TemplateError as error:
        engine.fail(str(error))
        return 2

    ocr_options = engine.OcrOptions(
        lang=args.lang,
        psm=args.psm,
        dpi=args.dpi,
        min_conf=args.min_conf,
        upscale=args.upscale,
        detect_bold=args.detect_bold,
        tesseract=args.tesseract,
    )

    try:
        pages, warnings = engine.ocr_files(args.source, ocr_options)
        result = engine.convert_document(
            pages,
            options,
            source=", ".join(args.source),
            source_kind="image",
            ocr_pages=len(pages),
        )
    except engine.OcrError as error:
        engine.fail(str(error))
        return 2

    if warnings:
        result = replace(result, warnings=result.warnings + tuple(warnings))
    engine.write_output(result.typst, args.out)
    engine.report(result, args.quiet, args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
