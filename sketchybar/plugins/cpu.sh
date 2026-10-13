#!/bin/bash

# CPU plugin - shows CPU usage with popup for detailed system stats

source "$CONFIG_DIR/colors.sh"

update() {
  # Get CPU usage
  CPU_RAW=$(top -l 1 -s 0 2>/dev/null | grep "CPU usage" | awk '{print $3}' | tr -d '%')
  
  # Get Memory info
  MEM_INFO=$(top -l 1 -s 0 2>/dev/null | grep "PhysMem")
  MEM_USED=$(echo "$MEM_INFO" | awk '{print $2}' | tr -d 'G')
  MEM_UNUSED=$(echo "$MEM_INFO" | awk '{print $8}' | tr -d 'G')
  MEM_TOTAL=$(echo "$MEM_USED + $MEM_UNUSED" | bc 2>/dev/null || echo "18")
  MEM_PERCENT=$(echo "scale=0; $MEM_USED * 100 / $MEM_TOTAL" | bc 2>/dev/null || echo "0")
  
  # Get Network info
  NET_INFO=$(top -l 1 -s 0 2>/dev/null | grep "Networks")
  NET_IN=$(echo "$NET_INFO" | awk '{print $2}' | tr -d ',')
  NET_OUT=$(echo "$NET_INFO" | awk '{print $5}' | tr -d ',')
  
  # Get Disk usage
  DISK_INFO=$(df -h / 2>/dev/null | tail -1)
  DISK_USED=$(echo "$DISK_INFO" | awk '{print $3}')
  DISK_TOTAL=$(echo "$DISK_INFO" | awk '{print $2}')
  DISK_PERCENT=$(echo "$DISK_INFO" | awk '{print $5}' | tr -d '%')

  # Determine color based on CPU usage
  COLOR=$GREEN
  if [ "${CPU_RAW%%.*}" -ge 70 ] 2>/dev/null; then
    COLOR=$RED
  elif [ "${CPU_RAW%%.*}" -ge 30 ] 2>/dev/null; then
    COLOR=$ORANGE
  elif [ "${CPU_RAW%%.*}" -ge 10 ] 2>/dev/null; then
    COLOR=$YELLOW
  fi

  # Update main CPU display
  sketchybar --set $NAME label="${CPU_RAW:-0}%" label.color=$COLOR
  
  # Update popup content
  sketchybar --set cpu.cpu_value label="${CPU_RAW:-0}%"
  sketchybar --set cpu.mem_value label="${MEM_PERCENT:-0}%"
  sketchybar --set cpu.mem_detail label="${MEM_USED:-0}G / ${MEM_TOTAL:-18}G"
  sketchybar --set cpu.disk_value label="${DISK_PERCENT:-0}%"
  sketchybar --set cpu.disk_detail label="${DISK_USED:-?} / ${DISK_TOTAL:-?}"
  sketchybar --set cpu.net_in label="${NET_IN:-0}"
  sketchybar --set cpu.net_out label="${NET_OUT:-0}"
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
  "forced") update
  ;;
  "mouse.clicked")
    toggle_popup
  ;;
  *) update
  ;;
esac