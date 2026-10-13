#!/bin/bash

# Volume - clean macOS style with proper round knob and Apple-inspired animations

# Round filled circle icon from Nerd Fonts
CIRCLE_ICON="󰆤"

volume_slider=(
  script="$PLUGIN_DIR/volume.sh"
  updates=on
  label.drawing=off
  icon.drawing=off
  slider.highlight_color=$WHITE
  slider.background.height=6
  slider.background.corner_radius=3
  slider.background.color=$GREY
  slider.knob="$CIRCLE_ICON"
  slider.knob.font="$FONT:Bold:16.0"
  slider.knob.drawing=on
  slider.knob.color=$WHITE
  slider.knob.width=16
  slider.knob.height=16
  slider.knob.shadow.drawing=on
  slider.knob.shadow.color=0x40000000
  slider.knob.shadow.angle=90
  slider.knob.shadow.distance=2
)

volume_icon=(
  click_script="$PLUGIN_DIR/volume_click.sh"
  padding_left=4
  icon=$VOLUME_100
  icon.width=0
  icon.align=left
  icon.color=$WHITE
  icon.font="$FONT:Regular:16.0"
  label.width=25
  label.align=left
  label.font="$FONT:Regular:16.0"
)

volume_header=(
  label="Sound"
  label.font="$FONT:Bold:14.0"
  label.color=$WHITE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=5
)

volume_output=(
  label="—"
  label.font="$FONT:Semibold:13.0"
  label.color=$WHITE
  icon=" Output"
  icon.font="$FONT:Bold:12.0"
  icon.color=$BLUE
  icon.drawing=on
  icon.padding_right=5
  padding_left=10
  padding_right=10
  y_offset=2
)

volume_separator=(
  icon.drawing=off
  label.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  background.drawing=on
  background.color=$BACKGROUND_2
  background.height=1
)

volume_settings=(
  label="Sound Settings..."
  label.font="$FONT:Regular:13.0"
  label.color=$BLUE
  icon.drawing=off
  padding_left=10
  padding_right=10
  y_offset=3
  click_script="open 'x-apple.systempreferences:com.apple.Sound'"
)

sketchybar --add slider volume right            \
           --set volume "${volume_slider[@]}"   \
           --subscribe volume volume_change     \
                              mouse.clicked     \
                                                \
           --add item volume_icon right         \
           --set volume_icon "${volume_icon[@]}" \
           --subscribe volume_icon mouse.clicked

sketchybar --add item volume_header popup.volume_icon \
  --set volume_header "${volume_header[@]}"

sketchybar --add item volume_output popup.volume_icon \
  --set volume_output "${volume_output[@]}"

sketchybar --add item volume_separator popup.volume_icon \
  --set volume_separator "${volume_separator[@]}"

sketchybar --add item volume_settings popup.volume_icon \
  --set volume_settings "${volume_settings[@]}"