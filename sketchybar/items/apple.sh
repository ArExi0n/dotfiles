#!/bin/bash

# Apple icon on far left - opens Finder

sketchybar --add item apple left \
           --set apple icon=$APPLE \
                       icon.font="$FONT:Bold:16.0" \
                       icon.color=$WHITE \
                       padding_left=12 \
                       padding_right=8 \
                       click_script="open -a Finder"
