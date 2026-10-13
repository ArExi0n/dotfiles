#!/bin/bash

# Battery - Apple-inspired with materials and interactive feedback

battery=(
  icon.font="$FONT:Bold:16.0"
  icon.color=$WHITE
  label.font="$FONT:Bold:13.0"
  label.color=$WHITE
  padding_right=4
  padding_left=0
  label.drawing=on
  update_freq=120
  updates=on
  popup.drawing=off
  script="$PLUGIN_DIR/battery.sh"
  click_script="sketchybar --set \$NAME popup.drawing=toggle"
)

battery_header=(
  label="Battery"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=5
)

battery_percentage=(
  label="—"
  label.font="$FONT:Bold:28.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=2
)

battery_status=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$GREY
  icon.drawing=off
  padding_left=10
  padding_right=10
)

battery_separator=(
  icon.drawing=off
  label.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  background.drawing=on
  background.color=$BACKGROUND_2
  background.height=1
)

battery_time=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$GREY
  icon=" Time Remaining"
  icon.font="$FONT:Bold:11.0"
  icon.color=$GREY
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
  y_offset=3
)

battery_settings=(
  label="Battery Settings..."
  label.font="$FONT:Regular:13.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="open 'x-apple.systempreferences:com.apple.Battery'"
)

sketchybar --add item battery right      \
           --set battery "${battery[@]}" \
           --subscribe battery power_source_change system_woke mouse.clicked

sketchybar --add item battery.header popup.battery \
           --set battery.header "${battery_header[@]}"

sketchybar --add item battery.percentage popup.battery \
           --set battery.percentage "${battery_percentage[@]}"

sketchybar --add item battery.status popup.battery \
           --set battery.status "${battery_status[@]}"

sketchybar --add item battery.separator popup.battery \
           --set battery.separator "${battery_separator[@]}"

sketchybar --add item battery.time popup.battery \
           --set battery.time "${battery_time[@]}"

sketchybar --add item battery.settings popup.battery \
           --set battery.settings "${battery_settings[@]}"