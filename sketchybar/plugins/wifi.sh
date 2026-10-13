#!/bin/bash

# WiFi plugin - populates macOS-style popup with network info

source "$CONFIG_DIR/icons.sh"
source "$CONFIG_DIR/colors.sh"

update() {
  # Get WiFi status from en0
  WIFI_OUTPUT=$(networksetup -getairportnetwork en0 2>/dev/null)
  
  # Check if connected (output contains "Current Wi-Fi Network" when connected)
  if echo "$WIFI_OUTPUT" | grep -q "Current Wi-Fi Network"; then
    # Connected - extract network name
    INFO=$(echo "$WIFI_OUTPUT" | cut -d: -f2 | xargs)
    IP=$(ipconfig getifaddr en0 2>/dev/null)
    RSSI=$(airport -I 2>/dev/null | grep agrCtlRSSI | awk '{print $2}' | xargs)

    sketchybar --set "$NAME" icon=$WIFI_CONNECTED icon.color=$BLUE
    sketchybar --set wifi.network label="${INFO:-Unknown}"
    sketchybar --set wifi.ip label="${IP:-—}"
    sketchybar --set wifi.signal label="${RSSI:-—} dBm"
    sketchybar --set wifi.toggle label="Turn Wi-Fi Off"
  else
    # Disconnected
    sketchybar --set "$NAME" icon=$WIFI_DISCONNECTED icon.color=$GREY
    sketchybar --set wifi.network label="Not Connected"
    sketchybar --set wifi.ip label="—"
    sketchybar --set wifi.signal label="—"
    sketchybar --set wifi.toggle label="Turn Wi-Fi On"
  fi
}

toggle_popup() {
  CURRENT=$(sketchybar --query "$NAME" | jq -r ".popup.drawing")
  if [ "$CURRENT" = "on" ]; then
    sketchybar --set "$NAME" popup.drawing=off
  else
    update
    sketchybar --set "$NAME" popup.drawing=on
  fi
}

case "$SENDER" in
  "wifi_change") update
  ;;
  "mouse.clicked")
    toggle_popup
  ;;
  "system_woke") update
  ;;
  *) update
  ;;
esac