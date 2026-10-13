#!/bin/bash

# CPU - Apple-inspired with system stats popup

cpu=(
  icon=$CPU
  icon.font="$FONT:Bold:16.0"
  icon.color=$WHITE
  label.font="$FONT:Bold:12.0"
  label.color=$WHITE
  label.drawing=on
  padding_left=4
  padding_right=4
  script="$PLUGIN_DIR/cpu.sh"
  update_freq=3
  updates=on
  popup.drawing=off
)

cpu_header=(
  label="System Monitor"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=5
)

cpu_section=(
  label="CPU"
  label.font="$FONT:Bold:12.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
)

cpu_value=(
  label="—"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
)

mem_section=(
  label="Memory"
  label.font="$FONT:Bold:12.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
)

mem_value=(
  label="—"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
)

mem_detail=(
  label="—"
  label.font="$FONT:Regular:11.0"
  label.color=$GREY
  icon.drawing=off
  padding_left=10
  padding_right=10
)

disk_section=(
  label="Storage"
  label.font="$FONT:Bold:12.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
)

disk_value=(
  label="—"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
)

disk_detail=(
  label="—"
  label.font="$FONT:Regular:11.0"
  label.color=$GREY
  icon.drawing=off
  padding_left=10
  padding_right=10
)

net_section=(
  label="Network"
  label.font="$FONT:Bold:12.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
)

net_in=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$WHITE
  icon="↓ In"
  icon.font="$FONT:Bold:11.0"
  icon.color=$GREEN
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
)

net_out=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$WHITE
  icon="↑ Out"
  icon.font="$FONT:Bold:11.0"
  icon.color=$RED
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
)

cpu_separator=(
  icon.drawing=off
  label.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  background.drawing=on
  background.color=$BACKGROUND_2
  background.height=1
)

sketchybar --add item cpu right \
  --set cpu "${cpu[@]}" \
  --subscribe cpu mouse.clicked

sketchybar --add item cpu.header popup.cpu \
  --set cpu.header "${cpu_header[@]}"

sketchybar --add item cpu.section popup.cpu \
  --set cpu.section "${cpu_section[@]}"

sketchybar --add item cpu.cpu_value popup.cpu \
  --set cpu.cpu_value "${cpu_value[@]}"

sketchybar --add item cpu.separator popup.cpu \
  --set cpu.separator "${cpu_separator[@]}"

sketchybar --add item cpu.mem_section popup.cpu \
  --set cpu.mem_section "${mem_section[@]}"

sketchybar --add item cpu.mem_value popup.cpu \
  --set cpu.mem_value "${mem_value[@]}"

sketchybar --add item cpu.mem_detail popup.cpu \
  --set cpu.mem_detail "${mem_detail[@]}"

sketchybar --add item cpu.separator2 popup.cpu \
  --set cpu.separator2 "${cpu_separator[@]}"

sketchybar --add item cpu.disk_section popup.cpu \
  --set cpu.disk_section "${disk_section[@]}"

sketchybar --add item cpu.disk_value popup.cpu \
  --set cpu.disk_value "${disk_value[@]}"

sketchybar --add item cpu.disk_detail popup.cpu \
  --set cpu.disk_detail "${disk_detail[@]}"

sketchybar --add item cpu.separator3 popup.cpu \
  --set cpu.separator3 "${cpu_separator[@]}"

sketchybar --add item cpu.net_section popup.cpu \
  --set cpu.net_section "${net_section[@]}"

sketchybar --add item cpu.net_in popup.cpu \
  --set cpu.net_in "${net_in[@]}"

sketchybar --add item cpu.net_out popup.cpu \
  --set cpu.net_out "${net_out[@]}"