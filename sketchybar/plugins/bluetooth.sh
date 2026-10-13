#!/bin/bash

# Bluetooth plugin - populates macOS-style popup with device info

source "$CONFIG_DIR/colors.sh"
source "$CONFIG_DIR/icons.sh"

update() {
  # Check Bluetooth state using blueutil
  BT_POWER=$(blueutil --power 2>/dev/null)

  if [ "$BT_POWER" = "1" ]; then
    # Bluetooth is On - check for connected devices
    CONNECTED=$(blueutil --connected 2>/dev/null)
    
    if [ -n "$CONNECTED" ] && [ "$CONNECTED" != "0" ]; then
      # Get connected device name
      DEVICE_NAME=$(blueutil --connected-device-name 2>/dev/null | head -1)
      STATUS="On — ${DEVICE_NAME:-Connected}"
    else
      STATUS="On — No device connected"
    fi
    sketchybar --set "$NAME" icon=$BLUETOOTH_ON icon.color=$BLUE
    sketchybar --set bluetooth.toggle label="Turn Bluetooth Off"
  else
    STATUS="Off"
    sketchybar --set "$NAME" icon=$BLUETOOTH_OFF icon.color=$GREY
    sketchybar --set bluetooth.toggle label="Turn Bluetooth On"
  fi

  sketchybar --set bluetooth.status label="$STATUS"
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
  "mouse.clicked")
    toggle_popup
  ;;
  "system_woke") update
  ;;
  "bluetooth_update") update
  ;;
  *) update
  ;;
esac