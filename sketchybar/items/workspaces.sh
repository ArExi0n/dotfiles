#!/bin/bash

# Workspace slots: 1-4 fixed, 5=dynamic
# Apple-inspired with smooth transitions and materials

source "$CONFIG_DIR/colors.sh"

WORKSPACES=("GHOSTTY" "ZEN" "OBSIDIAN" "SIOYEK")
NUMBERS=("1" "2" "3" "4")

# Fixed workspaces (1-4)
for i in "${!WORKSPACES[@]}"; do
  ws="${WORKSPACES[$i]}"
  num="${NUMBERS[$i]}"
  sketchybar --add item space.$num left \
             --subscribe space.$num aerospace_workspace_change mouse.clicked mouse.entered mouse.exited \
             --set space.$num \
                 icon.drawing=off \
                 label="${num} ${ws}" \
                 label.font="$FONT:Bold:15.0" \
                 label.color=$GREY \
                 background.drawing=off \
                 background.corner_radius=8 \
                 background.height=28 \
                 background.color=$TRANSPARENT \
                 background.border_width=2 \
                 background.border_color=$TRANSPARENT \
                 background.padding_left=8 \
                 background.padding_right=8 \
                 click_script="aerospace workspace ${ws}" \
                 script="$PLUGIN_DIR/space.sh"
done

# Slot 5: dynamic workspace
sketchybar --add item space.5 left \
           --subscribe space.5 aerospace_workspace_change mouse.clicked mouse.entered mouse.exited \
           --set space.5 \
               icon.drawing=off \
               label="5 —" \
               label.font="$FONT:Bold:15.0" \
               label.color=$GREY \
               background.drawing=off \
               background.corner_radius=8 \
               background.height=28 \
               background.color=$TRANSPARENT \
               background.border_width=2 \
               background.border_color=$TRANSPARENT \
               background.padding_left=8 \
               background.padding_right=8 \
               script="$PLUGIN_DIR/space.sh"

sketchybar --add event aerospace_workspace_change