#!/bin/bash

# WiFi - Apple-inspired with materials and interactive feedback

wifi=(
  icon=$WIFI_DISCONNECTED
  icon.font="$FONT:Bold:16.0"
  icon.color=$WHITE
  label.drawing=off
  padding_left=4
  padding_right=4
  script="$PLUGIN_DIR/wifi.sh"
)

wifi_header=(
  label="Wi-Fi"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=5
)

wifi_network=(
  label="—"
  label.font="$FONT:Semibold:13.0"
  label.color=$WHITE
  icon=$WIFI_CONNECTED
  icon.font="$FONT:Bold:15.0"
  icon.color=$BLUE
  icon.drawing=on
  icon.padding_right=8
  padding_left=10
  padding_right=10
  y_offset=2
)

wifi_ip=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$GREY
  icon=" IP Address"
  icon.font="$FONT:Bold:11.0"
  icon.color=$GREY
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
)

wifi_signal=(
  label="—"
  label.font="$FONT:Regular:12.0"
  label.color=$GREY
  icon=" Signal"
  icon.font="$FONT:Bold:11.0"
  icon.color=$GREY
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
)

wifi_separator=(
  icon.drawing=off
  label.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  background.drawing=on
  background.color=$BACKGROUND_2
  background.height=1
)

wifi_toggle=(
  label="Turn Wi-Fi Off"
  label.font="$FONT:Semibold:13.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="networksetup -setairportpower en0 \$(networksetup -getairportpower en0 | awk '{if(\$NF==\"On\")print\"off\";else print\"on\"}') 2>/dev/null; sleep 1; sketchybar --trigger wifi_change"
)

wifi_settings=(
  label="Network Settings..."
  label.font="$FONT:Regular:13.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="open 'x-apple.systempreferences:com.apple.network'"
)

sketchybar --add item wifi right \
  --set wifi "${wifi[@]}" \
  --subscribe wifi wifi_change mouse.clicked system_woke

sketchybar --add item wifi.header popup.wifi \
  --set wifi.header "${wifi_header[@]}"

sketchybar --add item wifi.network popup.wifi \
  --set wifi.network "${wifi_network[@]}"

sketchybar --add item wifi.ip popup.wifi \
  --set wifi.ip "${wifi_ip[@]}"

sketchybar --add item wifi.signal popup.wifi \
  --set wifi.signal "${wifi_signal[@]}"

sketchybar --add item wifi.separator popup.wifi \
  --set wifi.separator "${wifi_separator[@]}"

sketchybar --add item wifi.toggle popup.wifi \
  --set wifi.toggle "${wifi_toggle[@]}"

sketchybar --add item wifi.settings popup.wifi \
  --set wifi.settings "${wifi_settings[@]}"