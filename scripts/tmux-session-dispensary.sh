#!/usr/bin/env bash

DIRS=(
  "$HOME"
  "$HOME/Projects"
  "$HOME/Projects/Notes"
  "$HOME/.config"
  "$HOME/Downloads"
  "$HOME/Books"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

# Map an absolute directory to its tmux session name.
# Shared mapping with fzf-tmux.sh: short names for the pinned dirs,
# otherwise the plain directory name (matches existing sessions).
session_for_dir() {
  case "$1" in
  "$HOME")
    printf 'home'
    ;;
  "$HOME/Projects")
    printf 'project'
    ;;
  "$HOME/.config")
    printf 'config'
    ;;
  "$HOME/Downloads")
    printf 'downloads'
    ;;
  *)
    basename "$1" | tr . _
    ;;
  esac
}

if [[ $# -eq 1 ]]; then
  selected="$1"
else
  candidates="$(
    fd . "${DIRS[@]}" \
      --type=dir \
      --max-depth=1 \
      --full-path \
      --base-directory "$HOME" 2>/dev/null |
      sed -e "s|^$HOME/||" -e 's|/$||' |
      sort -uf || true
  )"

  [[ -z "$candidates" ]] && exit 0

  items=""
  while IFS= read -r rel; do
    [[ -n "$rel" ]] || continue
    items+="${rel}"$'\t'"$(session_for_dir "$HOME/$rel")"$'\n'
  done <<< "$candidates"
  items="${items%$'\n'}"

  selected=$(
    printf '%s\n' "$items" |
      sk "${SKIM_THEME_SESSION[@]}" \
        --height=100% \
        --margin=0 \
        --delimiter=$'\t' \
        --with-nth 1 \
        --nth 1 \
        --header="$(printf '%s' "$candidates" | grep -c . || true) sessions" \
        --prompt="sessions> "
  )

  [[ -z "$selected" ]] && exit 0
  selected="$HOME/${selected%%$'\t'*}"
fi

selected="${selected/#\~/$HOME}"

[[ ! -d "$selected" ]] && exit 1

session="$(session_for_dir "$selected")"

# When launched in a dedicated picker window (tmux prefix+f sets
# SESSION_PICKER_WINDOW=1), close that window after switching so no
# empty window is left behind. Never fires for the in-pane Ctrl+F flow.
close_picker_window() {
  [[ "${SESSION_PICKER_WINDOW:-}" == "1" ]] || return 0
  [[ -n "${TMUX_PANE:-}" ]] || return 0
  local win
  win="$(tmux display-message -p -t "$TMUX_PANE" '#{window_id}' 2>/dev/null || true)"
  [[ -n "$win" ]] || return 0
  tmux kill-window -t "$win" 2>/dev/null || true
}

# Snapshot all sessions (all tabs/windows) before leaving, tmux
# picker-tab flow only (SESSION_PICKER_WINDOW=1). Runs detached in the
# background (nohup survives the picker tab being closed right after)
# so the switch stays snappy. Save takes ~5s with many sessions.
save_all_sessions() {
  [[ "${SESSION_PICKER_WINDOW:-}" == "1" ]] || return 0
  local save="$HOME/.config/tmux/plugins/tmux-resurrect/scripts/save.sh"
  [[ -x "$save" ]] || return 0
  nohup "$save" quiet >/dev/null 2>&1 &
}

if tmux has-session -t "=$session" 2>/dev/null; then
    if [[ -n "$TMUX" ]]; then
        save_all_sessions
        tmux switch-client -t "=$session"
        close_picker_window
    else
        tmux attach-session -t "=$session"
    fi
else
    if [[ -n "$TMUX" ]]; then
        tmux new-session -ds "$session" -c "$selected"
        save_all_sessions
        tmux switch-client -t "=$session"
        close_picker_window
    else
        tmux new-session -s "$session" -c "$selected"
    fi
fi
