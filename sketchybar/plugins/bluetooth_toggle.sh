#!/bin/bash

# Bluetooth toggle script using blueutil

if which blueutil >/dev/null 2>&1; then
  # Toggle Bluetooth
  CURRENT=$(blueutil --power 2>/dev/null)
  if [ "$CURRENT" = "1" ]; then
    blueutil --power 0 2>/dev/null
  else
    blueutil --power 1 2>/dev/null
  fi
else
  # Fallback: open Bluetooth settings
  open "x-apple.systempreferences:com.apple.Bluetooth"
fi

# Update after toggle
sleep 0.3
sketchybar --trigger bluetooth_update