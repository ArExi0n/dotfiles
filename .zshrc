# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Tmux by default session (only if not already in tmux)
if [[ -z $TMUX ]]; then
  tmux attach -t home 2>/dev/null || tmux new-session -s home
fi

# Themes ()

ZSH_THEME="robbyrussell" # set by `omz`

PROMPT='%F{245}%n %~ λ %f'

export FZF_DEFAULT_OPTS="
--color=bg+:#1c1c1c,bg:#000000,spinner:#888888,hl:#aaaaaa
--color=fg:#c8c8c8,header:#999999,info:#888888,pointer:#ffffff
--color=marker:#bbbbbb,fg+:#ffffff,prompt:#c8c8c8,hl+:#ffffff
--border=rounded
"

export BAT_THEME="ansi"
export CLICOLOR=0
export LS_COLORS=""

plugins=(git zsh-syntax-highlighting zsh-autosuggestions)

source $ZSH/oh-my-zsh.sh
# eval "$(oh-my-posh init zsh --config ~/.config/oh-my-posh/zen.toml)"

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='nvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch $(uname -m)"

# Set personal aliases, overriding those provided by Oh My Zsh libs,
# plugins, and themes. Aliases can be placed here, though Oh My Zsh
# users are encouraged to define aliases within a top-level file in
# the $ZSH_CUSTOM folder, with .zsh extension. Examples:
# - $ZSH_CUSTOM/aliases.zsh
# - $ZSH_CUSTOM/macos.zsh
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

. "$HOME/.local/bin/env"
export PATH="$HOME/.avm/bin:$PATH"

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# Added by Antigravity
export PATH="/Users/ansh/.antigravity/antigravity/bin:$PATH"

export PATH="$(brew --prefix node@24)/bin:$PATH"

# Added by Antigravity
export PATH="/Users/ansh/.antigravity/antigravity/bin:$PATH"

#
# Completion Settings
#
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"

#
# Plugin Configuration
#
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)

#
# Key Bindings
#
bindkey -e
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward
bindkey '^a' expand-or-complete
bindkey '^[w' kill-region
bindkey -s '^f' '^u~/.config/scripts/tmux-session-dispensary.sh^M'

# Mole shell completion
if output="$(mole completion zsh 2>/dev/null)"; then eval "$output"; fi

# OpenClaw Completion
[ -f "/Users/ansh/.openclaw/completions/openclaw.zsh" ] && source "/Users/ansh/.openclaw/completions/openclaw.zsh"

# SYLVAN nvim (isolated config ~/.config/sylvan-nvim) — vim, vi, im
# LazyVim normal nvim (config ~/.config/nvim) — plain `nvim`, no alias.
alias vim='NVIM_APPNAME=sylvan-nvim nvim'
alias vi='NVIM_APPNAME=sylvan-nvim nvim'
alias im='NVIM_APPNAME=sylvan-nvim nvim'
unalias nvim 2>/dev/null || true

case ":$PATH:" in *":$HOME/.local/bin:"*) ;; *) export PATH="$HOME/.local/bin:$PATH" ;; esac
