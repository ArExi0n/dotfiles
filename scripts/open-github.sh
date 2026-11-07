#!/usr/bin/env bash

# Format expansion happens in the pane where the key was pressed, so this
# resolves to the caller's current directory (not the pane's start dir).
dir=$(tmux display-message -p '#{pane_current_path}')
cd "$dir" || exit 1

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository: $dir"
  exit 1
fi

if ! url=$(git remote get-url origin 2>/dev/null); then
  echo "No 'origin' remote in $dir"
  exit 1
fi

if [[ $url == *github.com* ]]; then
  if [[ $url == git@* ]]; then
    # git@github.com:owner/repo.git -> https://github.com/owner/repo.git
    scp="${url#git@}"
    url="https://${scp%%:*}/${scp#*:}"
  fi
  open "${url%.git}"
else
  echo "This repository is not hosted on GitHub"
fi
