#!/bin/bash

# Aerospace workspace monitor for sketchybar
# Shows current workspace and occupancy

source "$CONFIG_DIR/colors.sh"
source "$CONFIG_DIR/icons.sh"

update() {
  # Get current focused workspace
  FOCUSED=$(aerospace list-workspaces --focused 2>/dev/null)

  # Get all workspaces with windows
  OCCUPIED=""
  for ws in $(aerospace list-workspaces --all 2>/dev/null); do
    wins=$(aerospace list-windows --workspace "$ws" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$wins" -gt 0 ]; then
      OCCUPIED="$OCCUPIED $ws"
    fi
  done

  # Update the workspace indicator
  if [ -n "$FOCUSED" ]; then
    sketchybar --set $NAME label="$FOCUSED" label.drawing=on
  else
    sketchybar --set $NAME label="" label.drawing=off
  fi
}

case "$SENDER" in
  "aerospace_workspace_change") update
  ;;
  "forced") update
  ;;
  *) update
  ;;
esac
