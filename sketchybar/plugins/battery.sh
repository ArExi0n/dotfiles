#!/bin/bash

# Battery plugin - populates macOS-style popup with battery info

source "$CONFIG_DIR/icons.sh"
source "$CONFIG_DIR/colors.sh"

BATTERY_INFO="$(pmset -g batt)"
PERCENTAGE=$(echo "$BATTERY_INFO" | grep -Eo "\d+%" | cut -d% -f1)
CHARGING=$(echo "$BATTERY_INFO" | grep 'AC Power')
TIME_LEFT=$(echo "$BATTERY_INFO" | grep -Eo "\d+:\d+" | head -1)

if [ -z "$PERCENTAGE" ]; then
  exit 0
fi

COLOR=$WHITE
case ${PERCENTAGE} in
  9[0-9]|100) ICON=$BATTERY_100
  ;;
  [6-8][0-9]) ICON=$BATTERY_75
  ;;
  [3-5][0-9]) ICON=$BATTERY_50
  ;;
  [1-2][0-9]) ICON=$BATTERY_25; COLOR=$ORANGE
  ;;
  *) ICON=$BATTERY_0; COLOR=$RED
esac

STATUS="Discharging"
if [[ -n "$CHARGING" ]]; then
  ICON=$BATTERY_CHARGING
  COLOR=$WHITE
  STATUS="Charging"
fi

# Update main battery icon and label
sketchybar --set $NAME icon="$ICON" icon.color=$COLOR label="${PERCENTAGE}%"

# Update popup content
sketchybar --set battery.percentage label="${PERCENTAGE}%"
sketchybar --set battery.status label="$STATUS"

if [ -n "$TIME_LEFT" ] && [ -z "$CHARGING" ]; then
  sketchybar --set battery.time label="$TIME_LEFT remaining"
else
  sketchybar --set battery.time label="—"
fi