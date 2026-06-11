#!/bin/bash

DIRS=(
  "$HOME"
  "$HOME/Projects"
  "$HOME/Projects/Notes"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

if [[ $# -eq 1 ]]; then
  selected=$1
else
  selected=$(fd . "${DIRS[@]}" --type=dir --max-depth=1 --full-path --base-directory "$HOME" |
    sed "s|^$HOME/||" |
    sk "${SKIM_THEME_SESSION[@]}")

  [[ $selected ]] && selected="$HOME/$selected"
fi

[[ ! $selected ]] && exit 0
selected="${selected/#\~/$HOME}"
[[ ! -d "$selected" ]] && exit 1
selected_name=$(basename "$selected" | sed 's/[^[:alnum:]_-]/_/g')
[[ -z "$selected_name" ]] && selected_name="shell"

if [[ -n "${TMUX:-}" ]]; then
  current_session="$(tmux display-message -p '#S')"

  if tmux list-windows -t "$current_session" -F '#{window_name}' | grep -Fxq "$selected_name"; then
    tmux select-window -t "$current_session:$selected_name"
  else
    tmux new-window -t "$current_session:" -n "$selected_name" -c "$selected"
  fi
  exit 0
fi

if tmux has-session -t "$selected_name" 2>/dev/null; then
  tmux attach-session -t "$selected_name"
else
  tmux new-session -s "$selected_name" -n "$selected_name" -c "$selected"
fi
