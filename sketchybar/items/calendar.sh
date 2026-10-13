#!/bin/bash

calendar=(
  icon=cal
  icon.font="$FONT:Bold:14.0"
  icon.padding_right=0
  icon.color=$WHITE
  label.width=60
  label.align=right
  label.font="$FONT:Bold:13.0"
  label.color=$WHITE
  padding_left=5
  padding_right=5
  update_freq=30
  script="$PLUGIN_DIR/calendar.sh"
)

sketchybar --add item calendar right       \
           --set calendar "${calendar[@]}" \
           --subscribe calendar system_woke