#!/bin/bash
CATEGORIES=(
  "WORK"
  "VIM"
  "WASTE"
  "STOP"
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/skim-themes.sh"

selected=$(
  printf "%s\n" "${CATEGORIES[@]}" |
    sk "${SKIM_THEME_BASE[@]}" --bind 'q:abort'
)
sk_status=$?

if [[ $sk_status -ne 0 || -z "$selected" ]]; then
  exit 0
fi

tmux set -g status-interval 5

missing=""
command -v timew >/dev/null 2>&1 || missing="$missing timew"
command -v hostess >/dev/null 2>&1 || missing="$missing hostess"
if [[ -n "$missing" ]]; then
  echo "time.sh: missing command(s):${missing}"
  sleep 3
fi

if [[ "$selected" == "STOP" ]]; then
  command -v timew >/dev/null 2>&1 && timew stop >/dev/null 2>&1
  tmux set -g status-right ""
else
  command -v timew >/dev/null 2>&1 && timew start "$selected" >/dev/null 2>&1
  tmux set -g status-right "$selected #(timew | awk '/^ *Total/ {print \$NF}')"

  if [[ -n "$(command -v hostess || true)" ]]; then
    if [[ "$selected" == "WASTE" ]]; then
      hostess rm www.youtube.com >/dev/null 2>&1
      hostess rm www.reddit.com >/dev/null 2>&1
      hostess rm www.x.com >/dev/null 2>&1
      hostess rm www.instagram.com >/dev/null 2>&1
      hostess rm www.privatemail.com >/dev/null 2>&1
    else
      hostess add www.youtube.com 127.0.0.1 >/dev/null 2>&1
      hostess add www.reddit.com 127.0.0.1 >/dev/null 2>&1
      hostess add www.x.com 127.0.0.1 >/dev/null 2>&1
      hostess add www.instagram.com 127.0.0.1 >/dev/null 2>&1
      hostess add www.privatemail.com 127.0.0.1 >/dev/null 2>&1
    fi
  fi
fi
