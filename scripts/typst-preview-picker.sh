#!/usr/bin/env bash
set -euo pipefail

target_dir="${1:-${PWD}}"
target_dir="${target_dir/#\~/$HOME}"
if [[ "$target_dir" == *'#{'* ]]; then
	if [[ -n "${TMUX:-}" ]] && command -v tmux >/dev/null 2>&1; then
		_resolved="$(tmux display-message -p '#{pane_current_path}' 2>/dev/null || true)"
		[[ -n "$_resolved" ]] && target_dir="$_resolved"
	fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

if [[ ! -d "$target_dir" ]]; then
	printf 'Directory does not exist: %s\n' "$target_dir"
	printf 'Press enter to close... '
	read -r _ || true
	exit 1
fi

cd "$target_dir"
target_dir="$(pwd -P)"

find_tinymist() {
	local candidate

	if command -v tinymist >/dev/null 2>&1; then
		command -v tinymist
		return 0
	fi

	for candidate in \
		"$HOME/.local/share/nvim/mason/packages/tinymist/tinymist-darwin-arm64" \
		"$HOME/.local/share/nvim/typst-preview/tinymist-darwin-arm64" \
		"$HOME/.local/share/opencode/bin/tinymist"; do
		if [[ -x "$candidate" ]]; then
			printf '%s\n' "$candidate"
			return 0
		fi
	done

	return 1
}

# Print absolute paths of .typ files under $1 (recursive).
find_typst_files_under() {
	local dir="$1"
	if command -v fd >/dev/null 2>&1; then
		fd --type=file --extension=typ . "$dir" 2>/dev/null
	else
		find "$dir" -type f -name '*.typ' -not -path '*/.git/*' -print 2>/dev/null
	fi
}

# Pick a currently-free TCP port on loopback.
free_port() {
	if command -v python3 >/dev/null 2>&1; then
		python3 -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1]); s.close()'
		return 0
	fi

	printf '%s\n' "$((30000 + RANDOM % 20000))"
}

# Roots searched when the current directory has no .typ files
# (colon-separated). Override with TYPST_PREVIEW_FALLBACK_DIRS.
FALLBACK_ROOTS="${TYPST_PREVIEW_FALLBACK_DIRS:-$HOME/Projects}"

# First: find .typ files in the current directory.
listings="$(find_typst_files_under "$target_dir" | sort -uf || true)"
picker_header="$target_dir"
if [[ -z "$listings" ]]; then
	fallback_from="$target_dir"
	listings="$(
		IFS=':' read -r -a roots <<<"$FALLBACK_ROOTS"
		for r in "${roots[@]}"; do
			r="${r/#\~/$HOME}"
			[[ -d "$r" ]] || continue
			find_typst_files_under "$r"
		done | sort -uf || true
	)"
	if [[ -n "$listings" ]]; then
		picker_header="no .typ in ${fallback_from}; showing ${FALLBACK_ROOTS}"
	fi
fi

if [[ "${TYPST_PREVIEW_LIST_ONLY:-}" == "1" ]]; then
	if [[ -n "$listings" ]]; then
		while IFS= read -r f; do
			[[ -n "$f" ]] || continue
			printf '%s\t%s\n' "${f/#$HOME/~}" "$f"
		done <<<"$listings"
	fi
	exit 0
fi

if [[ -z "$listings" ]]; then
	printf 'No .typ files found in %s (or %s)\n' "$target_dir" "$FALLBACK_ROOTS"
	printf 'Press enter to close... '
	read -r _ || true
	exit 0
fi

picker_items=""
while IFS= read -r f; do
	[[ -n "$f" ]] || continue
	picker_items+="${f/#$HOME/~}"$'\t'"$f"$'\n'
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
			--prompt="typst> "
)" || sk_status=$?
if ((sk_status != 0)); then
	printf 'Picker failed (sk exit %s)\n' "$sk_status"
	printf 'Press enter to close... '
	read -r _ || true
	exit "$sk_status"
fi

[[ -n "$selected" ]] || exit 0

IFS=$'\t' read -r _display abspath <<<"$selected"
[[ -n "${abspath:-}" && -f "$abspath" ]] || exit 0

tinymist_bin="$(find_tinymist || true)"
if [[ -z "$tinymist_bin" ]]; then
	echo "No tinymist executable found" >&2
	printf '\nInstall tinymist or make it available on PATH, then try again.\n'
	printf 'Press enter to close... '
	read -r _ || true
	exit 127
fi

# Run everything from the selected file's own folder, not the
# directory the picker was launched from.
file_dir="$(dirname "$abspath")"
cd "$file_dir" || exit 1
file_dir="$(pwd -P)"

root="${TYPST_PREVIEW_ROOT:-${TYPST_ROOT:-$file_dir}}"

printf '\033]2;%s\033\\' "typst:${abspath##*/}"
printf 'Previewing %s\n' "$abspath"
printf 'Root: %s\n\n' "$root"

# Per-file state so re-picking a file reuses its live server (same
# ports, so the already-open browser tab keeps updating) instead of
# orphaning it behind new ports.
preview_state_dir="${TMPDIR:-/tmp}/typst-previews"
mkdir -p "$preview_state_dir" 2>/dev/null || true
preview_id="$(printf '%s' "$abspath" | shasum -a 256 | cut -d' ' -f1)"
preview_pidfile="$preview_state_dir/$preview_id.pid"
preview_log="$preview_state_dir/$preview_id.log"

# True when TCP port $1 is held by a tinymist process.
port_held_by_preview() {
	command -v lsof >/dev/null 2>&1 || return 0
	lsof -iTCP:"$1" -sTCP:LISTEN -P 2>/dev/null | grep -q tinymist
}

if [[ -f "$preview_pidfile" ]]; then
	read -r saved_pid saved_data saved_ctrl <"$preview_pidfile" || true
	if [[ "${saved_pid:-}" =~ ^[0-9]+$ && -n "${saved_data:-}" && -n "${saved_ctrl:-}" ]] &&
		kill -0 "$saved_pid" 2>/dev/null &&
		ps -p "$saved_pid" -o args= 2>/dev/null | grep -q "tinymist preview" &&
		port_held_by_preview "$saved_data" &&
		port_held_by_preview "$saved_ctrl"; then
		preview_url="http://127.0.0.1:${saved_data}"
		printf 'Preview already running (pid %s).\n' "$saved_pid"
		printf 'URL: %s\n' "$preview_url"
		printf 'Log: %s\n' "$preview_log"
		printf 'Saving the file recompiles it live.\n'
		open "$preview_url" >/dev/null 2>&1 || true
		printf 'Press enter to close... '
		read -r _ || true
		exit 0
	fi
	# Stale state: stop any leftover server for this file, if any.
	if [[ "${saved_pid:-}" =~ ^[0-9]+$ ]] && kill -0 "$saved_pid" 2>/dev/null &&
		ps -p "$saved_pid" -o args= 2>/dev/null | grep -q "tinymist preview"; then
		printf 'Stopping stale preview of this file (pid %s)...\n' "$saved_pid"
		kill "$saved_pid" 2>/dev/null || true
		sleep 0.3
	fi
fi

# Fresh server: own ports so several previews run side by side.
# (--data-plane-host/--control-plane-host are hidden from
# `tinymist preview --help` but still work.)
data_port="$(free_port)"
control_port="$(free_port)"
while [[ "$control_port" == "$data_port" ]]; do
	control_port="$(free_port)"
done
preview_url="http://127.0.0.1:${data_port}"

cmd=(
	"$tinymist_bin"
	preview
	--open
	--partial-rendering=true
	"--data-plane-host=127.0.0.1:${data_port}"
	"--control-plane-host=127.0.0.1:${control_port}"
	--root "$root"
	"$abspath"
)

# Launch the preview in the background, keep this tab open showing
# status, and let Enter close the tab (server keeps running).
# nohup: the server must survive this tab closing (Enter), which
# SIGHUPs the pane's process group.
if command -v direnv >/dev/null 2>&1 && [[ -f "$file_dir/.envrc" ]]; then
	nohup direnv exec "$file_dir" "${cmd[@]}" >"$preview_log" 2>&1 &
else
	nohup "${cmd[@]}" >"$preview_log" 2>&1 &
fi
preview_pid=$!
printf '%s %s %s' "$preview_pid" "$data_port" "$control_port" >"$preview_pidfile" 2>/dev/null || true
sleep 1
if kill -0 "$preview_pid" 2>/dev/null; then
	printf 'Running in background (pid %s).\n' "$preview_pid"
	printf 'URL: %s (the browser should have opened)\n' "$preview_url"
	printf 'Log: %s\n' "$preview_log"
	printf 'Saving the file recompiles it live.\n'
	printf 'Starting another preview will not stop this one.\n'
else
	printf 'Failed to start. Last log lines:\n'
	tail -n 15 "$preview_log" 2>/dev/null || true
fi
printf 'Press enter to close... '
read -r _ || true
exit 0
