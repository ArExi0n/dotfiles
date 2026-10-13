#!/bin/bash

# Aerospace workspace plugin
# Updates workspace item based on focus and occupancy

source "$CONFIG_DIR/colors.sh"

# Extract workspace name from item name (ws.ZEN -> ZEN)
WS="${NAME#ws.}"

update() {
  FOCUSED=$(aerospace list-workspaces --focused 2>/dev/null)
  WINS=$(aerospace list-windows --workspace "$WS" 2>/dev/null | wc -l | tr -d ' ')

  if [ "$WS" = "$FOCUSED" ]; then
    # Focused workspace - bright, with background
    sketchybar --set $NAME label.color=$WHITE \
                         background.drawing=on \
                         background.color=$BACKGROUND_1 \
                         background.border_color=$BACKGROUND_2
  elif [ "$WINS" -gt 0 ]; then
    # Occupied but not focused - subtle highlight
    sketchybar --set $NAME label.color=$WHITE \
                         background.drawing=on \
                         background.color=0x30798186 \
                         background.border_color=0x30798186
  else
    # Empty workspace - dim
    sketchybar --set $NAME label.color=$GREY \
                         background.drawing=off
  fi
}

mouse_clicked() {
  aerospace workspace $WS 2>/dev/null
}

case "$SENDER" in
  "mouse.clicked") mouse_clicked
  ;;
  "forced") update
  ;;
  "aerospace_workspace_change") update
  ;;
  *) update
  ;;
esac
