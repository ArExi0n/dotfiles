#!/bin/bash

ACTIVE_BG=0xfff5f5f5
INACTIVE_BG=0xcc202020

ACTIVE_TEXT=0xff000000
INACTIVE_TEXT=0xffffffff

CURRENT=$(aerospace list-workspaces --focused)

for WS in $(aerospace list-workspaces --all); do

  if [ "$WS" = "$CURRENT" ]; then

    sketchybar --set "ws.$WS" \
      background.color=$ACTIVE_BG \
      label.color=$ACTIVE_TEXT

  else

    sketchybar --set "ws.$WS" \
      background.color=$INACTIVE_BG \
      label.color=$INACTIVE_TEXT

  fi

done
