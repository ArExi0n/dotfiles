#!/usr/bin/env bash

# Shared skim layout for all pickers.
# NOTE: intentionally no `set -euo pipefail` here - this file is sourced and
# must not change the caller's shell options.
SKIM_THEME_BASE=(
  --color=bw
  --height=70%
  --margin=10%,20%,20%,20%
  --layout=reverse
  --info=hidden
)

SKIM_THEME_PDF=("${SKIM_THEME_BASE[@]}")

SKIM_THEME_SESSION=("${SKIM_THEME_BASE[@]}" --scheme=path)

SKIM_THEME_LINKS=("${SKIM_THEME_BASE[@]}" --cycle)

skim_theme_flags() {
  local theme="${1:-}"
  local upper_theme="${theme^^}"
  local var_name="SKIM_THEME_${upper_theme}"
  if ! declare -p "${var_name}" >/dev/null 2>&1; then
    return 1
  fi
  local -n flags="${var_name}"
  printf '%s\n' "${flags[@]}"
}
