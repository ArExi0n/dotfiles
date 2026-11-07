#!/usr/bin/env bash
# doc2typst-picker - turn a PDF or an image into Typst source.
#
#   doc2typst-picker.sh                     # pick from $PWD, write there
#   doc2typst-picker.sh ~/Books             # pick from a directory
#   doc2typst-picker.sh --mode absolute     # reproduce the original layout
#   doc2typst-picker.sh --mode ai           # read the pages with an NVIDIA model
#   doc2typst-picker.sh --file paper.pdf    # skip the picker
#   doc2typst-picker.sh --check             # show available backends
#
# The finished .typ always lands in the directory you started the picker in -
# the one you are working in - never in the directory the file was picked from.
# If that directory has nothing to convert, the picker looks in the directory
# that last produced a conversion and then in the directories documents
# actually live in (~/Books, ~/Projects/typst-notes, ~/Projects/Notes, and
# finally ~/Downloads). It then searches there while still writing the result
# where you are, and the header names both directories.
#
# Environment:
#   DOC2TYPST_MODE           default mode: content (reflow) or absolute
#   DOC2TYPST_PYTHON         interpreter to use instead of auto-detection
#   DOC2TYPST_ARGS           extra flags for the converter, e.g. "--pages 1-5"
#   DOC2TYPST_LIST_ONLY=1    print what would be offered, then exit
#   DOC2TYPST_FALLBACK_DIRS  colon separated roots to search when the directory
#                            has nothing to convert; replaces the defaults.
#                            Set it to "none" to search $PWD only.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PDF_ENTRY="$SCRIPT_DIR/pdf2typst.py"
PNG_ENTRY="$SCRIPT_DIR/png2typst.py"
AI_ENTRY="$SCRIPT_DIR/doc2typst-ai.sh"

MODE="${DOC2TYPST_MODE:-}"
MODE_SET=0
if [[ -n "$MODE" ]]; then
	MODE_SET=1
fi
FILE_ARG=""
DIR_ARG=""

# ---------------------------------------------------------------------------
# Finding an interpreter that can actually read the input
# ---------------------------------------------------------------------------

python_candidates() {
	local candidate

	{
		if [[ -n "${DOC2TYPST_PYTHON:-}" && -x "${DOC2TYPST_PYTHON:-}" ]]; then
			printf '%s\n' "$DOC2TYPST_PYTHON"
		fi
		# Newest first. Extra packages such as PyMuPDF usually live on a
		# versioned interpreter, because the system python3 refuses them.
		for version in 3.14 3.13 3.12 3.11 3.10 3.9; do
			candidate="$(command -v "python$version" 2>/dev/null || true)"
			[[ -n "$candidate" ]] && printf '%s\n' "$candidate"
		done
		command -v python3 2>/dev/null || true
		command -v python 2>/dev/null || true
	} | awk '!seen[$0]++'
}

# pick_python pdf|image|any - first interpreter with the needed modules.
pick_python() {
	local kind="$1" candidate

	while IFS= read -r candidate; do
		[[ -n "$candidate" ]] || continue
		case "$kind" in
		pdf)
			"$candidate" -c 'import pymupdf' 2>/dev/null && {
				printf '%s\n' "$candidate"
				return 0
			}
			"$candidate" -c 'import fitz' 2>/dev/null && {
				printf '%s\n' "$candidate"
				return 0
			}
			"$candidate" -c 'import pdfplumber' 2>/dev/null && {
				printf '%s\n' "$candidate"
				return 0
			}
			;;
		image)
			"$candidate" -c 'import PIL' 2>/dev/null && {
				printf '%s\n' "$candidate"
				return 0
			}
			;;
		*)
			printf '%s\n' "$candidate"
			return 0
			;;
		esac
	done < <(python_candidates)
	return 1
}

usage() {
	cat <<'USAGE'
usage: doc2typst-picker.sh [options] [dir]

  dir                directory to convert from (default: $PWD). The .typ is
                     written to the directory you run the picker in.
  --mode MODE        content (default), absolute, or ai (NVIDIA model)
  --file PATH        convert this file without showing the picker
  --check            report the available backends and exit
  -h, --help         show this help

  content   reads the text layer and reflows it into markup   (local)
  absolute  places every run where it was on the page         (local)
  ai        sends the pages to an NVIDIA model, returns Typst (network)
USAGE
}

while [[ $# -gt 0 ]]; do
	case "$1" in
	--mode)
		MODE="${2:-}"
		MODE_SET=1
		shift 2
		;;
	--mode=*)
		MODE="${1#*=}"
		MODE_SET=1
		shift
		;;
	--file)
		FILE_ARG="${2:-}"
		shift 2
		;;
	--file=*)
		FILE_ARG="${1#*=}"
		shift
		;;
	--check)
		MODE="__check__"
		shift
		;;
	-h | --help)
		usage
		exit 0
		;;
	--*)
		printf 'Unknown option: %s\n\n' "$1" >&2
		usage >&2
		exit 2
		;;
	*)
		DIR_ARG="$1"
		shift
		;;
	esac
done

if [[ "$MODE" == "__check__" ]]; then
	MODE=""
	found=0
	while IFS= read -r candidate; do
		[[ -n "$candidate" ]] || continue
		found=1
		printf '=== %s\n' "$candidate"
		"$candidate" "$PDF_ENTRY" --check 2>&1 || true
		printf '\n'
	done < <(python_candidates)
	if ((found == 0)); then
		printf 'No python interpreter found.\n' >&2
		exit 127
	fi
	printf 'PDFs will use:   %s\n' "$(pick_python pdf || echo 'nothing (pip install pymupdf)')"
	printf 'Images will use: %s\n' "$(pick_python image || echo 'nothing (pip install pillow)')"
	printf 'AI mode:         %s\n' "$(bash "$AI_ENTRY" --check 2>&1 | tr '\n' ' ' || echo missing)"
	exit 0
fi

# Same conventions as the other pickers: a directory argument wins, an
# unexpanded tmux format is resolved through tmux, and $PWD is the default.
DIR_ARG="${DIR_ARG:-${PWD}}"
DIR_ARG="${DIR_ARG/#\~/$HOME}"
if [[ "$DIR_ARG" == *'#{'* ]]; then
	if [[ -n "${TMUX:-}" ]] && command -v tmux >/dev/null 2>&1; then
		_resolved="$(tmux display-message -p '#{pane_current_path}' 2>/dev/null || true)"
		[[ -n "$_resolved" ]] && DIR_ARG="$_resolved"
	fi
fi

source "$SCRIPT_DIR/skim-themes.sh"

if [[ ! -d "$DIR_ARG" ]]; then
	printf 'Directory does not exist: %s\n' "$DIR_ARG"
	printf 'Press enter to close... '
	read -r _ || true
	exit 1
fi

# Where the result is written: the directory the picker was pointed at. This
# never changes, however far the search has to travel for a file.
OUTPUT_DIR="$(cd "$DIR_ARG" && pwd -P)"
SEARCH_DIR="$OUTPUT_DIR"

# --file means "do not ask": fall back to the reflowed output instead of
# prompting for a mode.
if [[ -n "$FILE_ARG" && -z "$MODE" ]]; then
	MODE="content"
	MODE_SET=1
fi
if [[ -n "$MODE" && "$MODE" != "content" && "$MODE" != "absolute" && "$MODE" != "ai" ]]; then
	printf 'Unknown mode: %s (expected content, absolute or ai)\n' "$MODE"
	printf 'Press enter to close... '
	read -r _ || true
	exit 2
fi

# ---------------------------------------------------------------------------
# Finding something to convert
# ---------------------------------------------------------------------------

# Print absolute paths of PDFs and images under $1 (recursive).
find_inputs_under() {
	local dir="$1"
	if command -v fd >/dev/null 2>&1; then
		fd --type=file --extension pdf --extension png --extension jpg \
			--extension jpeg --extension tif --extension tiff --extension bmp \
			--extension webp --extension gif . "$dir" 2>/dev/null
	else
		find "$dir" -type f \
			\( -iname '*.pdf' -o -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
			-o -iname '*.tif' -o -iname '*.tiff' -o -iname '*.bmp' -o -iname '*.webp' \
			-o -iname '*.gif' \) -not -path '*/.git/*' -print 2>/dev/null
	fi
}

# The directory that has documents is remembered, so the next conversion can
# offer it straight away.
state_file() {
	printf '%s\n' "${XDG_CACHE_HOME:-$HOME/.cache}/doc2typst/last-dir"
}

last_used_dir() {
	local saved
	[[ -f "$(state_file)" ]] || return 1
	saved="$(head -n 1 "$(state_file)" 2>/dev/null || true)"
	[[ -n "$saved" && -d "$saved" ]] || return 1
	printf '%s\n' "$saved"
}

remember_dir() {
	mkdir -p "$(dirname "$(state_file)")" 2>/dev/null || return 0
	printf '%s\n' "$1" >"$(state_file)" 2>/dev/null || true
}

# Print the directories to try, in order, separated by colons. The defaults are
# the directories documents actually live in; ~/Downloads is only a last resort,
# because it collects screenshots and other cruft.
DEFAULT_FALLBACK_ROOTS="${HOME}/Books:${HOME}/Projects/typst-notes:${HOME}/Projects/Notes:${HOME}/Downloads"

fallback_roots() {
	if [[ -n "${DOC2TYPST_FALLBACK_DIRS:-}" ]]; then
		# An explicit list replaces the defaults; "none" disables the search.
		[[ "$DOC2TYPST_FALLBACK_DIRS" == "none" ]] || printf '%s\n' "$DOC2TYPST_FALLBACK_DIRS"
		return 0
	fi
	local roots=""
	if roots_last="$(last_used_dir)"; then
		roots="$roots_last"
	fi
	printf '%s\n' "${roots:+$roots:}$DEFAULT_FALLBACK_ROOTS"
}

# A path shortened for display: relative to the output directory when it is
# inside it, otherwise relative to the search directory, otherwise with ~.
display_path() {
	local path="$1"
	if [[ "$path" == "$OUTPUT_DIR"/* ]]; then
		printf '%s\n' "${path#"$OUTPUT_DIR"/}"
	elif [[ "$path" == "$SEARCH_DIR"/* ]]; then
		printf '%s\n' "${path#"$SEARCH_DIR"/}"
	else
		printf '%s\n' "${path/#$HOME/~}"
	fi
}

listings="$(find_inputs_under "$SEARCH_DIR" | sort -uf || true)"
picker_header="$OUTPUT_DIR"
looked_in=""
searched_elsewhere=0
if [[ -z "$FILE_ARG" && -z "$listings" ]]; then
	candidates="$(fallback_roots)"
	if [[ -n "$candidates" ]]; then
		IFS=':' read -r -a roots <<<"$candidates"
		for r in "${roots[@]}"; do
			r="${r/#\~/$HOME}"
			if [[ -z "$r" || ! -d "$r" ]]; then
				continue
			fi
			r="$(cd "$r" && pwd -P)"
			if [[ "$r" == "$OUTPUT_DIR" ]]; then
				continue
			fi
			found="$(find_inputs_under "$r" | sort -uf || true)"
			if [[ -n "$found" ]]; then
				SEARCH_DIR="$r"
				listings="$found"
				searched_elsewhere=1
				picker_header="$OUTPUT_DIR  (files from $r)"
				break
			fi
		done
	fi
	looked_in="${candidates//:/, }"
	looked_in="${looked_in//$HOME/~}"
fi

if [[ "${DOC2TYPST_LIST_ONLY:-}" == "1" ]]; then
	if [[ -n "$listings" ]]; then
		while IFS= read -r f; do
			[[ -n "$f" ]] || continue
			printf '%s\t%s\n' "${f#"$SEARCH_DIR"/}" "$f"
		done <<<"$listings"
	fi
	exit 0
fi

if [[ -z "$FILE_ARG" && -z "$listings" ]]; then
	printf 'No PDFs or images found in %s\n' "$OUTPUT_DIR"
	if [[ -n "$looked_in" ]]; then
		printf 'Also looked in %s\n' "$looked_in"
	fi
	printf '\nGive it a directory to search:\n'
	printf '  %s ~/papers\n' "$(basename "${BASH_SOURCE[0]}")"
	printf 'Or press prefix + d in tmux to use the current pane.\n'
	printf 'Press enter to close... '
	read -r _ || true
	exit 0
fi

# ---------------------------------------------------------------------------
# Picking
# ---------------------------------------------------------------------------

choose_mode() {
	if [[ "$MODE_SET" == "1" && -n "$MODE" ]]; then
		return 0
	fi

	local choice
	choice="$(
		printf 'content\tcontent = reflowed markup (local)\nabsolute\tabsolute = original coordinates (local)\nai\tai = NVIDIA model, Typst only (network)\n' |
			sk "${SKIM_THEME_BASE[@]}" \
				--delimiter=$'\t' \
				--with-nth 1,2 \
				--nth 1,2 \
				--header="how should the page be read?" \
				--prompt="mode> "
	)" || return 1
	[[ -n "$choice" ]] || return 1
	MODE="${choice%%$'\t'*}"
	return 0
}

if [[ -n "$FILE_ARG" ]]; then
	abspath="$FILE_ARG"
	abspath="${abspath/#\~/$HOME}"
	if [[ ! -f "$abspath" ]]; then
		printf 'File not found: %s\n' "$FILE_ARG"
		printf 'Press enter to close... '
		read -r _ || true
		exit 1
	fi
	abspath="$(cd "$(dirname "$abspath")" && pwd -P)/$(basename "$abspath")"
else
	command -v sk >/dev/null 2>&1 || {
		printf 'skim (sk) is not on PATH; install it or pass --file.\n'
		printf 'Press enter to close... '
		read -r _ || true
		exit 127
	}

	picker_items=""
	while IFS= read -r f; do
		[[ -n "$f" ]] || continue
		picker_items+="${f#"$SEARCH_DIR"/}"$'\t'"$f"$'\n'
	done <<<"$listings"
	picker_items="${picker_items%$'\n'}"

	selected=""
	sk_status=0
	selected="$(
		printf '%s\n' "$picker_items" |
			sk "${SKIM_THEME_SESSION[@]}" \
				--delimiter=$'\t' \
				--with-nth 1 \
				--nth 1 \
				--header="$picker_header" \
				--prompt="doc2typst> "
	)" || sk_status=$?
	if ((sk_status != 0)); then
		[[ "$sk_status" == "130" ]] && exit 0
		printf 'Picker failed (sk exit %s)\n' "$sk_status"
		printf 'Press enter to close... '
		read -r _ || true
		exit "$sk_status"
	fi
	[[ -n "$selected" ]] || exit 0
	IFS=$'\t' read -r _display abspath <<<"$selected"
fi

[[ -n "${abspath:-}" && -f "$abspath" ]] || exit 0

case "${abspath##*.}" in
[Pp][Dd][Ff]) kind="pdf" ;;
*) kind="image" ;;
esac

choose_mode || exit 0
[[ -n "$MODE" ]] || exit 0

python_bin=""
if [[ "$MODE" == "ai" ]]; then
	if [[ ! -f "$AI_ENTRY" ]]; then
		printf 'Missing %s\n' "$(basename "$AI_ENTRY")"
		printf 'Press enter to close... '
		read -r _ || true
		exit 127
	fi
	command -v curl >/dev/null 2>&1 || {
		printf 'curl is needed for ai mode.\n'
		printf 'Press enter to close... '
		read -r _ || true
		exit 127
	}
	command -v jq >/dev/null 2>&1 || {
		printf 'jq is needed for ai mode (brew install jq).\n'
		printf 'Press enter to close... '
		read -r _ || true
		exit 127
	}
else
	python_bin="$(pick_python "$kind" || true)"
fi
if [[ "$MODE" != "ai" && -z "$python_bin" ]]; then
	printf 'No python interpreter can read %s.\n\n' "$(basename "$abspath")"
	if [[ "$kind" == "pdf" ]]; then
		printf 'A PDF backend is missing. Install one for the interpreter you use:\n'
		printf '  python3 -m pip install pymupdf      # also enables OCR of scanned PDFs\n'
		printf '  python3 -m pip install pdfplumber   # lighter alternative\n'
	else
		printf 'Pillow is missing, and it is needed to measure the image:\n'
		printf '  python3 -m pip install pillow\n'
	fi
	printf '\nSet DOC2TYPST_PYTHON to use a specific interpreter.\n'
	printf 'Press enter to close... '
	read -r _ || true
	exit 127
fi

# ---------------------------------------------------------------------------
# Converting
# ---------------------------------------------------------------------------

# The output belongs in the directory the picker was pointed at, even when the
# file came from somewhere else. An existing file is overwritten only when
# doc2typst wrote it; otherwise a free name is picked so nothing else is lost.
output_path_for() {
	local dir="$1" stem="$2" suffix="$3" candidate number

	candidate="$dir/$stem$suffix.typ"
	if [[ ! -e "$candidate" ]] || head -n 1 "$candidate" 2>/dev/null | grep -q '^// Converted from'; then
		printf '%s\n' "$candidate"
		return 0
	fi
	number=1
	while [[ -e "$dir/$stem$suffix-$number.typ" ]]; do
		number=$((number + 1))
	done
	printf '%s\n' "$dir/$stem$suffix-$number.typ"
}

stem="$(basename "$abspath")"
stem="${stem%.*}"
suffix=""
[[ "$MODE" == "absolute" ]] && suffix="-absolute"
out_path="$(output_path_for "$OUTPUT_DIR" "$stem" "$suffix")"
out_rel="$(display_path "$out_path")"

extra_args=()
if [[ -n "${DOC2TYPST_ARGS:-}" ]]; then
	read -r -a extra_args <<<"$DOC2TYPST_ARGS"
fi

if [[ "$kind" == "pdf" ]]; then
	entry="$PDF_ENTRY"
else
	entry="$PNG_ENTRY"
fi

# Name the window after the document being converted, but only when there is
# a terminal to name: the escape would otherwise land in whatever captured the
# output. BEL is the terminator terminals agree on.
if [[ -t 1 ]]; then
	printf '\033]2;%s\007' "doc2typst:$(basename "$abspath")"
fi
printf 'Converting %s\n' "$(display_path "$abspath")"
printf 'Mode:      %s\n' "$MODE"
printf 'Output:    %s\n' "$out_rel"
if ((searched_elsewhere)); then
	printf 'Writing into %s\n' "$OUTPUT_DIR"
fi
printf '\n'

status=0
# ${extra_args[@]} cannot be expanded unquoted on bash 3.2 when it is empty.
run_converter() {
	if ((${#extra_args[@]})); then
		"$@" "${extra_args[@]}"
	else
		"$@"
	fi
}

if [[ "$MODE" == "ai" ]]; then
	run_converter bash "$AI_ENTRY" "$abspath" -o "$out_path" || status=$?
else
	run_converter "$python_bin" "$entry" "$abspath" --mode "$MODE" -o "$out_path" || status=$?
fi

printf '\n'
if ((status == 0)); then
	remember_dir "$SEARCH_DIR"
	printf 'Wrote %s\n' "$out_rel"
	printf 'Preview:  typst compile %q\n' "$out_rel"
	printf "          tinymist preview %q   # or press 'k' for the preview picker\n" "$out_rel"
else
	printf 'Conversion failed (exit %s).\n' "$status"
fi
printf 'Press enter to close... '
read -r _ || true
exit "$status"
