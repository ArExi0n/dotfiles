#!/bin/zsh

SESSION="$1"

[[ -z "$SESSION" ]] && exit 0

# Find every pane in the session running OpenCode
tmux list-panes -t "$SESSION" -a \
  -F '#{pane_id} #{pane_current_command}' 2>/dev/null |
  while read -r PANE CMD; do
    case "$CMD" in
    opencode | opencode-cli)
      # Gracefully exit OpenCode
      tmux send-keys -t "$PANE" C-c
      sleep 0.3
      tmux send-keys -t "$PANE" C-d
      ;;
    esac
  done
