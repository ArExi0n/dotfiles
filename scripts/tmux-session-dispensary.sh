#!/usr/bin/env bash

DIRS=(
  "$HOME"
  "$HOME/Projects"
  "$HOME/Projects/Notes"
  "$HOME/.config"
  "$HOME/Downloads"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

if [[ $# -eq 1 ]]; then
  selected="$1"
else
  selected=$(
    fd . "${DIRS[@]}" \
      --type=dir \
      --max-depth=1 \
      --full-path \
      --base-directory "$HOME" |
      sed "s|^$HOME/||" |
      sk "${SKIM_THEME_SESSION[@]}"
  )

  [[ -z "$selected" ]] && exit 0
  selected="$HOME/$selected"
fi

selected="${selected/#\~/$HOME}"

[[ ! -d "$selected" ]] && exit 1

case "$selected" in
  "$HOME")
    session="home"
    ;;
  "$HOME/Projects")
    session="project"
    ;;
  "$HOME/Projects/Notes")
    session="notes"
    ;;
  "$HOME/.config")
    session="config"
    ;;
  "$HOME/Downloads")
    session="downloads"
    ;;
  *)
    session=$(basename "$selected" | tr '[:upper:]' '[:lower:]' | sed 's/[^[:alnum:]_-]/_/g')
    ;;
esac

if tmux has-session -t "$session" 2>/dev/null; then
    if [[ -n "$TMUX" ]]; then
        tmux switch-client -t "$session"
    else
        tmux attach-session -t "$session"
    fi
else
    if [[ -n "$TMUX" ]]; then
        tmux new-session -ds "$session" -c "$selected"
        tmux switch-client -t "$session"
    else
        tmux new-session -s "$session" -c "$selected"
    fi
fi
