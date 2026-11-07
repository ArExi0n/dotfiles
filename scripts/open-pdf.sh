#!/usr/bin/env bash
# open-pdf - choose a document and open it in sioyek.
#
#   open-pdf.sh                 # first ask: this directory, or book/ ?
#   open-pdf.sh here            # go straight to the current directory
#   open-pdf.sh book            # go straight to ~/Books
#   open-pdf.sh ~/papers        # go straight to that directory
#   open-pdf.sh paper.pdf       # open this file, no picking
set -euo pipefail

BOOK_DIR="$HOME/Books"
DOC_EXTENSIONS=(--extension=djvu --extension=epub --extension=pdf)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

# Every document under $1, absolute, de-duplicated and sorted.
find_documents() {
	fd . "$1" "${DOC_EXTENSIONS[@]}" 2>/dev/null | sort -uf
}

# Ask where to look, before listing anything. The two places that hold
# documents are the directory you are standing in and the book library; the
# counts are shown so an empty directory is obvious before it is chosen.
choose_root() {
	local here count_here count_books choice rest

	here="$(pwd -P)"
	if [[ "$here" == "$BOOK_DIR" ]]; then
		printf '%s\n' "$BOOK_DIR"
		return 0
	fi
	# Nothing to choose between when the library is not there.
	if [[ ! -d "$BOOK_DIR" ]]; then
		printf '%s\n' "$here"
		return 0
	fi

	count_here="$(find_documents "$here" | wc -l | tr -d ' ')"
	count_books="$(find_documents "$BOOK_DIR" | wc -l | tr -d ' ')"

	choice="$(printf '%-16s\t%s\t%s\n' \
		"this directory" "$here" "($count_here)" \
		"book/" "$BOOK_DIR" "($count_books)" |
		sk "${SKIM_THEME_PDF[@]}")" || choice=""

	[[ -n "$choice" ]] || exit 0
	rest="${choice#*$'\t'}"
	printf '%s\n' "${rest%%$'\t'*}"
}

# ---------------------------------------------------------------------------
# Choosing what to open
# ---------------------------------------------------------------------------

root=""
case "${1:-}" in
"")
	# An empty answer means the menu was dismissed: leave quietly.
	root="$(choose_root)"
	[[ -n "$root" ]] || exit 0
	;;
here | this | .)
	root="$(pwd -P)"
	;;
book | books | BOOK | Books)
	root="$BOOK_DIR"
	;;
*)
	if [[ -d "$1" ]]; then
		root="$(cd "$1" && pwd -P)"
	elif [[ -f "$1" ]]; then
		selected="$1"
	else
		printf 'No such file or directory: %s\n' "$1"
		printf 'Press enter to close... '
		read -r _ || true
		exit 1
	fi
	;;
esac

if [[ -z "${selected:-}" ]]; then
	if [[ ! -d "$root" ]]; then
		printf 'Directory does not exist: %s\n' "$root"
		printf 'Press enter to close... '
		read -r _ || true
		exit 1
	fi

	documents="$(find_documents "$root")"
	if [[ -z "$documents" ]]; then
		printf 'No PDFs, ebooks or DjVu files in %s\n' "${root/#$HOME/~}"
		printf 'Press enter to close... '
		read -r _ || true
		exit 0
	fi

	# Listed relative to the directory being searched, so the path stays short.
	listing="$(while IFS= read -r f; do printf '%s\n' "${f#"$root"/}"; done <<<"$documents")"
	selected="$(printf '%s\n' "$listing" | sk "${SKIM_THEME_PDF[@]}")" || selected=""
	[[ -n "$selected" ]] || exit 0
	selected="$root/$selected"
fi

if [[ -n "${TMUX:-}" ]]; then
	tmux new-window -d "exec sioyek $(printf '%q' "$selected")"
else
	exec sioyek "$selected"
fi
