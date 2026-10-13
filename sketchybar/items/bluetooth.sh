#!/bin/bash

# Bluetooth - Apple-inspired with materials and interactive feedback

bluetooth=(
  icon=$BLUETOOTH_ON
  icon.font="$FONT:Bold:16.0"
  icon.color=$WHITE
  label.drawing=off
  padding_left=4
  padding_right=4
  script="$PLUGIN_DIR/bluetooth.sh"
  click_script="$PLUGIN_DIR/bluetooth.sh"
)

bluetooth_header=(
  label="Bluetooth"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=5
)

bluetooth_status=(
  label="—"
  label.font="$FONT:Semibold:13.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=2
)

bluetooth_separator=(
  icon.drawing=off
  label.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  background.drawing=on
  background.color=$BACKGROUND_2
  background.height=1
)

bluetooth_toggle=(
  label="Turn Bluetooth Off"
  label.font="$FONT:Semibold:13.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="$PLUGIN_DIR/bluetooth_toggle.sh"
)

bluetooth_settings=(
  label="Bluetooth Settings..."
  label.font="$FONT:Regular:13.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="open 'x-apple.systempreferences:com.apple.Bluetooth'"
)

sketchybar --add item bluetooth right \
  --set bluetooth "${bluetooth[@]}" \
  --subscribe bluetooth mouse.clicked system_woke

sketchybar --add item bluetooth.header popup.bluetooth \
  --set bluetooth.header "${bluetooth_header[@]}"

sketchybar --add item bluetooth.status popup.bluetooth \
  --set bluetooth.status "${bluetooth_status[@]}"

sketchybar --add item bluetooth.separator popup.bluetooth \
  --set bluetooth.separator "${bluetooth_separator[@]}"

sketchybar --add item bluetooth.toggle popup.bluetooth \
  --set bluetooth.toggle "${bluetooth_toggle[@]}"

sketchybar --add item bluetooth.settings popup.bluetooth \
  --set bluetooth.settings "${bluetooth_settings[@]}"