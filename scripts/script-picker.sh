#!/usr/bin/env bash
set -euo pipefail

# script-picker.sh [--list-from DIR] [dir]
#
#   dir             where the picker is opened: scripts are run here, and the
#                   result of anything you pick lands here.
#   --list-from     list scripts from this directory instead of the one above.
#                   The keybind uses it for the global menu, so choosing one of
#                   the global scripts still runs it in the current pane.
list_from=""
if [[ "${1:-}" == "--list-from" ]]; then
    list_from="${2:-}"
    shift 2 2>/dev/null || shift
    list_from="${list_from/#\~/$HOME}"
fi

target_dir="${1:-${PWD}}"
target_dir="${target_dir/#\~/$HOME}"
# If handed an unexpanded tmux format (e.g. literal #{pane_current_path}),
# resolve it via tmux when possible instead of dying on a bad path.
if [[ "$target_dir" == *'#{'* ]]; then
    if [[ -n "${TMUX:-}" ]] && command -v tmux >/dev/null 2>&1; then
        _resolved="$(tmux display-message -p '#{pane_current_path}' 2>/dev/null || true)"
        [[ -n "$_resolved" ]] && target_dir="$_resolved"
    fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GLOBAL_SCRIPT_DIR="$(cd "$SCRIPT_DIR" && pwd -P)"
source "$SCRIPT_DIR/skim-themes.sh"

if [[ ! -d "$target_dir" ]]; then
    echo "Directory does not exist: $target_dir" >&2
    exit 1
fi

# The directory the scripts are *listed* from can differ from the directory
# they are *run* in. Everything a picked script produces must land in the
# directory the picker was opened from, so that one is remembered separately
# and never reassigned.
invoke_dir="$(cd "$target_dir" && pwd -P)"
target_dir="$invoke_dir"
if [[ -n "$list_from" ]]; then
    if [[ -d "$list_from" ]]; then
        target_dir="$(cd "$list_from" && pwd -P)"
    else
        echo "Cannot list from $list_from; using $invoke_dir" >&2
    fi
fi

classify_script() {
    local path="$1"
    local name first_line

    name="$(basename "$path")"

    case "$name" in
        *.py)
            printf 'python'
            return 0
            ;;
        *.sh|*.bash)
            printf 'bash'
            return 0
            ;;
    esac

    first_line=""
    IFS= read -r -n 256 first_line < "$path" || true

    case "$first_line" in
        '#!'*python*|'#!'*'/env python'*)
            printf 'python'
            return 0
            ;;
        '#!'*bash*|'#!'*'/env bash'*|'#!'*'/bin/sh'*|'#!'*'/env sh'*|'#!'*zsh*|'#!'*'/env zsh'*)
            printf 'bash'
            return 0
            ;;
    esac

    if [[ -x "$path" && "$name" != *.* ]]; then
        printf 'exec'
        return 0
    fi

    return 1
}

find_scripts() {
    # The listing is taken in a subshell so the picker's own working directory
    # stays where the caller opened it.
    local root="${1:-.}"
    (
        cd "$root" || exit 1
        find . \
            \( \
                -name .git -o \
                -name .hg -o \
                -name .svn -o \
                -name node_modules -o \
                -name bower_components -o \
                -name .venv -o \
                -name venv -o \
                -name env -o \
                -name virtenv -o \
                -name .direnv -o \
                -name .tox -o \
                -name .nox -o \
                -name __pycache__ -o \
                -name .mypy_cache -o \
                -name .pytest_cache -o \
                -name .ruff_cache -o \
                -name target -o \
                -name dist -o \
                -name build -o \
                -name .next -o \
                -name .svelte-kit -o \
                -name .nuxt -o \
                -name .turbo -o \
                -name vendor \
            \) -type d -prune -o \
            -type f \
            \( \
                -name '*.py' -o \
                -name '*.sh' -o \
                -name '*.bash' -o \
                -perm -u+x -o \
                -perm -g+x -o \
                -perm -o+x \
            \) -print0
    )
}

list_scripts() {
    local root="${1:-.}"
    while IFS= read -r -d '' path; do
        kind="$(classify_script "$root/${path#./}" || true)"
        [[ -n "$kind" ]] || continue
        printf '%s\t%s\t%s\n' "${path#./}" "$kind" "$root/${path#./}"
    done < <(find_scripts "$root")
}

# Collect scripts for the requested directory. If it contains nothing
# runnable, fall back to the global scripts dir so the picker is useful
# from any directory instead of opening empty and exiting immediately.
fallback_from=""
listings="$(list_scripts "$target_dir" || true)"
if [[ -z "$listings" && "$target_dir" != "$GLOBAL_SCRIPT_DIR" ]]; then
    fallback_from="$target_dir"
    target_dir="$GLOBAL_SCRIPT_DIR"
    listings="$(list_scripts "$target_dir" || true)"
fi

if [[ "${SCRIPT_PICKER_LIST_ONLY:-}" == "1" ]]; then
    if [[ -n "$listings" ]]; then
        printf '%s\n' "$listings"
    fi
    exit 0
fi

if [[ -z "$listings" ]]; then
    printf 'No runnable scripts found in %s\n' "$target_dir"
    printf 'Press enter to close... '
    read -r _ || true
    exit 0
fi

if [[ -n "$fallback_from" ]]; then
    picker_header="no scripts in ${fallback_from}; showing global scripts (${target_dir})"
elif [[ "$target_dir" != "$invoke_dir" ]]; then
    picker_header="${invoke_dir}  (scripts from ${target_dir})"
else
    picker_header="${target_dir}"
fi

# Every picked script runs here, not in the directory it was listed from.
cd "$invoke_dir"

selected="$(
    printf '%s\n' "$listings" \
        | sk "${SKIM_THEME_SESSION[@]}" \
            --delimiter=$'\t' \
            --with-nth 1,2 \
            --nth 1,2 \
            --header="$picker_header" \
            --prompt="scripts> " \
        || true
)"

[[ -n "$selected" ]] || exit 0

IFS=$'\t' read -r display_name kind path <<< "$selected"

printf '\033]2;%s\033\\' "script:${display_name}"
printf 'Running %s in %s\n\n' "$display_name" "$invoke_dir"

status=0
case "$kind" in
    python)
        if command -v python3 >/dev/null 2>&1; then
            python3 "$path" || status=$?
        elif command -v python >/dev/null 2>&1; then
            python "$path" || status=$?
        else
            echo "No python3 or python executable found" >&2
            status=127
        fi
        ;;
    bash)
        bash "$path" || status=$?
        ;;
    exec)
        "$path" || status=$?
        ;;
    *)
        echo "Unknown script type: $kind" >&2
        status=1
        ;;
esac

printf '\n'
if [[ "$status" -eq 0 ]]; then
    printf 'Finished: %s\n' "$display_name"
else
    printf 'Exited with status %s: %s\n' "$status" "$display_name"
fi

printf 'Press enter to close... '
read -r _ || true
exit "$status"
