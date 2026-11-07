#!/bin/bash

# Ensure tmux server is running as an independent daemon so sessions
# survive terminal closure (not just tmux detach)
tmux start-server 2>/dev/null

# Map an absolute directory to its tmux session name.
# (Same mapping as tmux-session-dispensary.sh, so both pickers land in
# the same session for the same directory.)
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

# Check if a directory argument is passed
if [[ $# -eq 1 ]]; then
  selected=$1
else
  # Search within ~/Projects and ~/.config with a maximum depth of 2
  selected=$(find ~/Projects/ ~/Projects/Notes/ ~/.config/ -mindepth 1 -maxdepth 2 -type d | fzf --border=none --layout=default --prompt="sessions> " --info=hidden)
fi

# Exit if no directory was selected
if [[ -z $selected ]]; then
  exit 0
fi

# Use the shared directory-to-session mapping.
selected_name=$(session_for_dir "$selected")

# Check if a session with the selected name exists
if tmux has-session -t="=$selected_name" 2>/dev/null; then
  # If inside tmux, switch to the session
  if [[ -n $TMUX ]]; then
    tmux switch-client -t "=$selected_name"
  else
    # If outside tmux, attach to the session
    tmux attach-session -t "=$selected_name"
  fi
else
  # Create a new session with the directory name and start in the selected directory
  tmux new-session -ds "$selected_name" -c "$selected"
  # If outside tmux, attach to the new session
  if [[ -z $TMUX ]]; then
    tmux attach-session -t "=$selected_name"
  else
    tmux switch-client -t "=$selected_name"
  fi
fi
