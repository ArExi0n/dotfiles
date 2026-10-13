#!/bin/bash

# Space plugin - handles workspace system with Apple-inspired animations
# Smooth transitions, materials, and interactive feedback

source "$CONFIG_DIR/colors.sh"

# Get slot number from item name (space.1 -> 1)
SLOT="${NAME#space.}"

# Get the currently focused workspace
FOCUSED=$(aerospace list-workspaces --focused 2>/dev/null)

# Map workspaces to numbers
case "$FOCUSED" in
  GHOSTTY) FOCUSED_NUM="1"; FOCUSED_WS="GHOSTTY" ;;
  ZEN) FOCUSED_NUM="2"; FOCUSED_WS="ZEN" ;;
  OBSIDIAN) FOCUSED_NUM="3"; FOCUSED_WS="OBSIDIAN" ;;
  SIOYEK) FOCUSED_NUM="4"; FOCUSED_WS="SIOYEK" ;;
  SPOTIFY) FOCUSED_NUM="5"; FOCUSED_WS="SPOTIFY" ;;
  VESKTOP) FOCUSED_NUM="6"; FOCUSED_WS="VESKTOP" ;;
  FIGMA) FOCUSED_NUM="7"; FOCUSED_WS="FIGMA" ;;
  AGENTHARNESS) FOCUSED_NUM="8"; FOCUSED_WS="AGENTHARNESS" ;;
  SAFARI) FOCUSED_NUM="9"; FOCUSED_WS="SAFARI" ;;
  FINDER) FOCUSED_NUM="-"; FOCUSED_WS="FINDER" ;;
  *) FOCUSED_NUM="0"; FOCUSED_WS="$FOCUSED" ;;
esac

# Determine which workspace this slot represents
case "$SLOT" in
  1) SLOT_WS="GHOSTTY"; SLOT_NUM="1" ;;
  2) SLOT_WS="ZEN"; SLOT_NUM="2" ;;
  3) SLOT_WS="OBSIDIAN"; SLOT_NUM="3" ;;
  4) SLOT_WS="SIOYEK"; SLOT_NUM="4" ;;
  5) SLOT_WS=""; SLOT_NUM="5" ;;
  *) SLOT_WS=""; SLOT_NUM="" ;;
esac

# Check if this slot's workspace is focused
IS_FOCUSED=0
if [ "$FOCUSED" = "$SLOT_WS" ]; then
  IS_FOCUSED=1
fi

# Check if slot 5 should show dynamic content
SHOW_DYNAMIC=0
if [ "$SLOT" = "5" ] && [ "$FOCUSED" != "GHOSTTY" ] && [ "$FOCUSED" != "ZEN" ] && [ "$FOCUSED" != "OBSIDIAN" ] && [ "$FOCUSED" != "SIOYEK" ]; then
  SHOW_DYNAMIC=1
fi

update() {
  if [ "$SHOW_DYNAMIC" -eq 1 ]; then
    # Slot 5 shows the current workspace's number and name
    sketchybar --set "$NAME" \
      label="$FOCUSED_NUM $FOCUSED_WS" \
      label.color=$WORKSPACE_ACTIVE_COLOR \
      background.drawing=on \
      background.color=$WORKSPACE_BG_COLOR \
      background.border_color=$WORKSPACE_BG_BORDER
  elif [ "$IS_FOCUSED" -eq 1 ]; then
    # This slot's workspace is focused - highlight with material
    sketchybar --set "$NAME" \
      label.color=$WORKSPACE_ACTIVE_COLOR \
      background.drawing=on \
      background.color=$WORKSPACE_BG_COLOR \
      background.border_color=$WORKSPACE_BG_BORDER
  else
    # Not focused - dim, no background
    sketchybar --set "$NAME" \
      label.color=$WORKSPACE_INACTIVE_COLOR \
      background.drawing=off \
      background.color=$TRANSPARENT \
      background.border_color=$TRANSPARENT
  fi
}

mouse_clicked() {
  if [ "$SLOT" = "5" ] && [ "$SHOW_DYNAMIC" -eq 1 ]; then
    # Click on slot 5 when dynamic - stay on current workspace
    :
  elif [ "$SLOT" != "5" ] && [ -n "$SLOT_WS" ]; then
    aerospace workspace "$SLOT_WS" 2>/dev/null
  fi
}

mouse_entered() {
  # Hover effect - subtle highlight
  if [ "$IS_FOCUSED" -eq 0 ]; then
    sketchybar --set "$NAME" \
      label.color=$WHITE
  fi
}

mouse_exited() {
  # Remove hover effect
  if [ "$IS_FOCUSED" -eq 0 ]; then
    sketchybar --set "$NAME" \
      label.color=$WORKSPACE_INACTIVE_COLOR
  fi
}

case "$SENDER" in
  "mouse.clicked") mouse_clicked
  ;;
  "mouse.entered") mouse_entered
  ;;
  "mouse.exited") mouse_exited
  ;;
  "aerospace_workspace_change") update
  ;;
  "forced") update
  ;;
  *) update
  ;;
esac