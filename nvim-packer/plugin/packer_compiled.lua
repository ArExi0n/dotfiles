-- Automatically generated packer.nvim plugin loader code

if vim.api.nvim_call_function('has', {'nvim-0.5'}) ~= 1 then
  vim.api.nvim_command('echohl WarningMsg | echom "Invalid Neovim version for packer.nvim! | echohl None"')
  return
end

vim.api.nvim_command('packadd packer.nvim')

local no_errors, error_msg = pcall(function()

_G._packer = _G._packer or {}
_G._packer.inside_compile = true

local time
local profile_info
local should_profile = false
if should_profile then
  local hrtime = vim.loop.hrtime
  profile_info = {}
  time = function(chunk, start)
    if start then
      profile_info[chunk] = hrtime()
    else
      profile_info[chunk] = (hrtime() - profile_info[chunk]) / 1e6
    end
  end
else
  time = function(chunk, start) end
end

local function save_profiles(threshold)
  local sorted_times = {}
  for chunk_name, time_taken in pairs(profile_info) do
    sorted_times[#sorted_times + 1] = {chunk_name, time_taken}
  end
  table.sort(sorted_times, function(a, b) return a[2] > b[2] end)
  local results = {}
  for i, elem in ipairs(sorted_times) do
    if not threshold or threshold and elem[2] > threshold then
      results[i] = elem[1] .. ' took ' .. elem[2] .. 'ms'
    end
  end
  if threshold then
    table.insert(results, '(Only showing plugins that took longer than ' .. threshold .. ' ms ' .. 'to load)')
  end

  _G._packer.profile_output = results
end

time([[Luarocks path setup]], true)
local package_path_str = "/Users/ansh/.cache/nvim-packer/packer_hererocks/2.1.1774896198/share/lua/5.1/?.lua;/Users/ansh/.cache/nvim-packer/packer_hererocks/2.1.1774896198/share/lua/5.1/?/init.lua;/Users/ansh/.cache/nvim-packer/packer_hererocks/2.1.1774896198/lib/luarocks/rocks-5.1/?.lua;/Users/ansh/.cache/nvim-packer/packer_hererocks/2.1.1774896198/lib/luarocks/rocks-5.1/?/init.lua"
local install_cpath_pattern = "/Users/ansh/.cache/nvim-packer/packer_hererocks/2.1.1774896198/lib/lua/5.1/?.so"
if not string.find(package.path, package_path_str, 1, true) then
  package.path = package.path .. ';' .. package_path_str
end

if not string.find(package.cpath, install_cpath_pattern, 1, true) then
  package.cpath = package.cpath .. ';' .. install_cpath_pattern
end

time([[Luarocks path setup]], false)
time([[try_loadstring definition]], true)
local function try_loadstring(s, component, name)
  local success, result = pcall(loadstring(s), name, _G.packer_plugins[name])
  if not success then
    vim.schedule(function()
      vim.api.nvim_notify('packer.nvim: Error running ' .. component .. ' for ' .. name .. ': ' .. result, vim.log.levels.ERROR, {})
    end)
  end
  return result
end

time([[try_loadstring definition]], false)
time([[Defining packer_plugins]], true)
_G.packer_plugins = {
  ["FixCursorHold.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/FixCursorHold.nvim",
    url = "https://github.com/antoinemadec/FixCursorHold.nvim"
  },
  LuaSnip = {
    config = { "\27LJ\2\n \0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\vexpand\"\0\0\3\1\1\0\5-\0\0\0009\0\0\0)\2\1\0B\0\2\1K\0\1\0\0¿\tjump\"\0\0\3\1\1\0\5-\0\0\0009\0\0\0)\2ˇˇB\0\2\1K\0\1\0\0¿\tjumpM\0\0\3\1\2\0\n-\0\0\0009\0\0\0B\0\1\2\15\0\0\0X\1\4Ä-\0\0\0009\0\1\0)\2\1\0B\0\2\1K\0\1\0\0¿\18change_choice\18choice_active≠\3\1\0\a\0\29\00036\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\1\3\0015\3\t\0006\4\4\0009\4\5\0049\4\6\4'\6\a\0B\4\2\2'\5\b\0&\4\5\4=\4\n\3B\1\2\0016\1\4\0009\1\v\0019\1\f\0015\3\r\0'\4\14\0003\5\15\0005\6\16\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\17\0'\4\18\0003\5\19\0005\6\20\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\21\0'\4\22\0003\5\23\0005\6\24\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\25\0'\4\26\0003\5\27\0005\6\28\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\vsilent\2\0\n<C-E>\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>,\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>;\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>e\1\2\0\0\6i\bset\vkeymap\npaths\1\0\1\npaths\0\14/snippets\vconfig\fstdpath\afn\bvim\14lazy_load luasnip.loaders.from_vscode\fluasnip\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/LuaSnip",
    url = "https://github.com/L3MON4D3/LuaSnip"
  },
  ["alpha-nvim"] = {
    config = { "\27LJ\2\n\24\0\0\1\0\1\0\2'\0\0\0L\0\2\0\rgraphify≈\f\1\0\n\0$\1O6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0023\2\3\0009\3\4\0019\3\5\0035\4\a\0=\4\6\0039\3\4\0019\3\b\0034\4\a\0009\5\t\1'\a\n\0'\b\v\0'\t\f\0B\5\4\2>\5\1\0049\5\t\1'\a\r\0'\b\14\0'\t\15\0B\5\4\2>\5\2\0049\5\t\1'\a\16\0'\b\17\0'\t\18\0B\5\4\2>\5\3\0049\5\t\1'\a\19\0'\b\20\0'\t\21\0B\5\4\2>\5\4\0049\5\t\1'\a\22\0'\b\23\0'\t\24\0B\5\4\2>\5\5\0049\5\t\1'\a\25\0'\b\26\0'\t\27\0B\5\4\0?\5\0\0=\4\6\0039\3\4\0019\3\28\3\18\4\2\0B\4\1\2=\4\6\0039\3\4\0019\3\28\3'\4\30\0=\4\29\0039\3\4\0019\3\5\0039\3\31\3'\4!\0=\4 \0039\3\4\0019\3\b\0039\3\31\3'\4\"\0=\4 \0039\3\4\0019\3\28\0039\3\31\3'\4\30\0=\4 \0039\3#\0009\5\31\1B\3\2\1K\0\1\0\nsetup\17AlphaButtons\16AlphaHeader\ahl\topts\16AlphaFooter\14highlight\vfooter\f:qa<CR>\n Quit\6q\17:LazyGit<CR>\r LazyGit\a;c\27:Telescope buffers<CR>\r Buffers\a\\\\\29:Telescope live_grep<CR>\15 Live grep\a;r\30:Telescope find_files<CR>\15 Find file\a;f\31:ene <BAR> startinsert<CR>\14 New file\6e\vbutton\fbuttons\1\t\0\0:                                                     à\1  ‚ñà‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ïó‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ïó‚ñà‚ñà‚ïó‚ñà‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ñà‚ïó í\1  ‚ñà‚ñà‚ñà‚ñà‚ïó  ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ïê‚ïê‚ïê‚ïê‚ïù‚ñà‚ñà‚ïî‚ïê‚ïê‚ïê‚ñà‚ñà‚ïó‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ñà‚ñà‚ïë å\1  ‚ñà‚ñà‚ïî‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó  ‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ñà‚ñà‚ñà‚ñà‚ïî‚ñà‚ñà‚ïë í\1  ‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïó‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ïê‚ïê‚ïù  ‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïî‚ïù‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïî‚ïù‚ñà‚ñà‚ïë î\1  ‚ñà‚ñà‚ïë ‚ïö‚ñà‚ñà‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó‚ïö‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïî‚ïù ‚ïö‚ñà‚ñà‚ñà‚ñà‚ïî‚ïù ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë ‚ïö‚ïê‚ïù ‚ñà‚ñà‚ïë Ñ\1  ‚ïö‚ïê‚ïù  ‚ïö‚ïê‚ïê‚ïê‚ïù‚ïö‚ïê‚ïê‚ïê‚ïê‚ïê‚ïê‚ïù ‚ïö‚ïê‚ïê‚ïê‚ïê‚ïê‚ïù   ‚ïö‚ïê‚ïê‚ïê‚ïù  ‚ïö‚ïê‚ïù‚ïö‚ïê‚ïù     ‚ïö‚ïê‚ïù :                                                     \bval\vheader\fsection\0\27alpha.themes.dashboard\nalpha\frequire\rÄÄ¿ô\4\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/alpha-nvim",
    url = "https://github.com/goolord/alpha-nvim"
  },
  ["async.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/async.nvim",
    url = "https://github.com/lewis6991/async.nvim"
  },
  ["blink.cmp"] = {
    config = { "\27LJ\2\nõ\1\0\1\a\0\t\0\0196\1\0\0006\3\1\0009\3\2\0039\3\3\3\18\4\0\0B\1\3\3\14\0\1\0X\3\nÄ6\3\1\0009\3\4\3'\5\5\0\18\6\2\0&\5\6\0056\6\1\0009\6\6\0069\6\a\0069\6\b\6B\3\3\1K\0\1\0\tWARN\vlevels\blog\28Snippet expand failed: \vnotify\vexpand\fsnippet\bvim\npcallÆ\b\1\0\a\0005\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\3\0003\4\4\0=\4\5\3=\3\a\0025\3\b\0=\3\t\0025\3\r\0005\4\v\0005\5\n\0=\5\f\4=\4\14\0035\4\18\0005\5\16\0005\6\15\0=\6\17\5=\5\19\4=\4\20\0035\4\21\0=\4\22\0035\4\26\0006\5\23\0009\5\24\0059\5\25\5=\5\27\4=\4\28\3=\3\29\0025\3\31\0005\4\30\0=\4 \3=\3!\0025\3\"\0005\4$\0005\5#\0=\5%\0045\5&\0=\5'\4=\4(\3=\3)\0025\3*\0005\4+\0=\4%\0035\4,\0=\4'\0035\4-\0=\4.\3=\3(\0025\0030\0005\4/\0=\0041\0035\0042\0=\0043\3=\0034\2B\0\2\1K\0\1\0\nfuzzy\nsorts\1\4\0\0\nscore\14sort_text\tkind\rfrecency\1\0\3\nsorts\0\18use_proximity\2\rfrecency\0\1\0\1\fenabled\2\n<C-y>\1\2\0\0\22select_and_accept\1\3\0\0\16select_prev\rfallback\1\3\0\0\16select_next\rfallback\1\0\6\n<C-n>\0\n<C-y>\0\n<C-p>\0\vpreset\nenter\n<C-k>\0\n<C-j>\0\fcmdline\vkeymap\n<C-k>\1\2\0\0\16select_prev\n<C-j>\1\0\2\n<C-k>\0\n<C-j>\0\1\2\0\0\16select_next\1\0\2\vkeymap\0\fenabled\2\fsources\fdefault\1\0\1\fdefault\0\1\5\0\0\blsp\tpath\rsnippets\vbuffer\15completion\15ghost_text\fenabled\1\0\1\fenabled\0\vai_cmp\6g\bvim\18documentation\1\0\2\23auto_show_delay_ms\3»\1\14auto_show\2\tmenu\tdraw\1\0\1\tdraw\0\15treesitter\1\0\1\15treesitter\0\1\2\0\0\blsp\vaccept\1\0\4\18documentation\0\tmenu\0\vaccept\0\15ghost_text\0\18auto_brackets\1\0\1\18auto_brackets\0\1\0\1\fenabled\2\15appearance\1\0\2\28use_nvim_cmp_as_default\1\22nerd_font_variant\tmono\rsnippets\1\0\a\fsources\0\15appearance\0\fcmdline\0\15completion\0\rsnippets\0\vkeymap\0\nfuzzy\0\vexpand\0\1\0\2\vexpand\0\vpreset\fdefault\nsetup\14blink.cmp\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/blink.cmp",
    url = "https://github.com/saghen/blink.cmp"
  },
  ["blink.lib"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/blink.lib",
    url = "https://github.com/saghen/blink.lib"
  },
  ["conform.nvim"] = {
    config = { "\27LJ\2\nê\b\0\0\6\0008\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2.\0005\3\4\0005\4\3\0=\4\5\0035\4\6\0=\4\a\0035\4\b\0=\4\t\0035\4\n\0=\4\v\0035\4\f\0=\4\r\0035\4\14\0=\4\15\0035\4\16\0=\4\17\0035\4\18\0=\4\19\0035\4\20\0=\4\21\0035\4\22\0=\4\23\0035\4\24\0=\4\25\0035\4\26\0=\4\27\0035\4\28\0=\4\29\0035\4\30\0=\4\31\0035\4 \0=\4!\0035\4\"\0=\4#\0035\4$\0=\4%\0035\4&\0=\4'\0035\4(\0=\4)\0035\4*\0=\4+\0035\4,\0=\4-\3=\3/\0025\0033\0005\0040\0005\0051\0=\0052\4=\0044\3=\0035\0025\0036\0=\0037\2B\0\2\1K\0\1\0\19format_on_save\1\0\2\17lsp_fallback\2\15timeout_ms\3Ù\3\15formatters\rtypstyle\1\0\1\rtypstyle\0\targs\1\2\0\0\6-\1\0\3\fcommand\rtypstyle\targs\0\nstdin\2\21formatters_by_ft\1\0\3\15formatters\0\19format_on_save\0\21formatters_by_ft\0\ntypst\1\2\0\0\rtypstyle\truby\1\2\0\0\frubocop\ttoml\1\2\0\0\ntaplo\vkotlin\1\2\0\0\vktlint\nswift\1\2\0\0\16swiftformat\6c\1\2\0\0\17clang-format\bcpp\1\2\0\0\17clang-format\trust\1\2\0\0\frustfmt\rmarkdown\1\2\0\0\rprettier\tyaml\1\2\0\0\rprettier\bcss\1\2\0\0\rprettier\thtml\1\2\0\0\rprettier\tjson\1\2\0\0\rprettier\20typescriptreact\1\2\0\0\rprettier\20javascriptreact\1\2\0\0\rprettier\15typescript\1\2\0\0\rprettier\15javascript\1\2\0\0\rprettier\ago\1\3\0\0\fgofumpt\14goimports\vpython\1\2\0\0\16ruff_format\ash\1\2\0\0\nshfmt\blua\1\0\21\20javascriptreact\0\thtml\0\ago\0\nswift\0\ntypst\0\ttoml\0\15typescript\0\trust\0\6c\0\15javascript\0\rmarkdown\0\vkotlin\0\tjson\0\tyaml\0\blua\0\20typescriptreact\0\truby\0\ash\0\bcpp\0\bcss\0\vpython\0\1\2\0\0\vstylua\nsetup\fconform\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/conform.nvim",
    url = "https://github.com/stevearc/conform.nvim"
  },
  ["copilot.lua"] = {
    commands = { "Copilot" },
    config = { "\27LJ\2\n¬\2\0\0\5\0\f\0\0156\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\6\0005\4\a\0=\4\b\3=\3\t\0025\3\n\0=\3\v\2B\0\2\1K\0\1\0\14filetypes\1\0\t\tyaml\1\rmarkdown\1\6.\1\rhgcommit\1\bsvn\1\thelp\1\bcvs\1\14gitcommit\1\14gitrebase\1\15suggestion\vkeymap\1\0\3\fdismiss\n<C-]>\vaccept\n<C-a>\16accept_word\f<M-C-j>\1\0\3\17auto_trigger\2\fenabled\2\vkeymap\0\npanel\1\0\3\15suggestion\0\npanel\0\14filetypes\0\1\0\1\fenabled\1\nsetup\fcopilot\frequire\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/copilot.lua",
    url = "https://github.com/zbirenbaum/copilot.lua"
  },
  ["dracula.nvim"] = {
    config = { "\27LJ\2\nL\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\19transparent_bg\2\nsetup\fdracula\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/dracula.nvim",
    url = "https://github.com/Mofiqul/dracula.nvim"
  },
  everforest = {
    config = { "\27LJ\2\nC\0\0\2\0\3\0\0056\0\0\0009\0\1\0)\1\1\0=\1\2\0K\0\1\0&everforest_transparent_background\6g\bvim\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/everforest",
    url = "https://github.com/sainnhe/everforest"
  },
  ["fidget.nvim"] = {
    config = { "\27LJ\2\n˝\1\0\0\5\0\b\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\4\0005\4\3\0=\4\5\3=\3\a\2B\0\2\1K\0\1\0\17notification\1\0\1\17notification\0\vwindow\1\0\1\vwindow\0\1\0\n\15max_height\3\0\rrelative\veditor\rwinblend\3\0\nalign\vbottom\14y_padding\3\1\14x_padding\3\1\14normal_hl\vString\vborder\frounded\vzindex\3-\14max_width\3\0\nsetup\vfidget\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/fidget.nvim",
    url = "https://github.com/j-hui/fidget.nvim"
  },
  ["flash.nvim"] = {
    config = { "\27LJ\2\n2\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\tjump\nflash\frequire8\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\15treesitter\nflash\frequireÅ\2\1\0\6\0\19\0\0276\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\4\0005\4\3\0=\4\5\3=\3\a\2B\0\2\0016\0\b\0009\0\t\0009\0\n\0005\2\v\0'\3\f\0003\4\r\0005\5\14\0B\0\5\0016\0\b\0009\0\t\0009\0\n\0005\2\15\0'\3\16\0003\4\17\0005\5\18\0B\0\5\1K\0\1\0\1\0\1\tdesc\21Flash Treesitter\0\6S\1\4\0\0\6n\6x\6o\1\0\1\tdesc\nFlash\0\6s\1\4\0\0\6n\6x\6o\bset\vkeymap\bvim\nmodes\1\0\1\nmodes\0\tchar\1\0\1\tchar\0\1\0\1\fenabled\1\nsetup\nflash\frequire\0" },
    keys = { { "", "s" }, { "", "S" } },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/flash.nvim",
    url = "https://github.com/folke/flash.nvim"
  },
  ["friendly-snippets"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/friendly-snippets",
    url = "https://github.com/rafamadriz/friendly-snippets"
  },
  ["gruvbox.nvim"] = {
    config = { "\27LJ\2\nN\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\21transparent_mode\2\nsetup\fgruvbox\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/gruvbox.nvim",
    url = "https://github.com/ellisonleao/gruvbox.nvim"
  },
  harpoon = {
    config = { "\27LJ\2\n2\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\badd\tlistK\0\0\6\1\3\0\n-\0\0\0009\0\0\0\18\2\0\0009\0\1\0-\3\0\0\18\5\3\0009\3\2\3B\3\2\0A\0\1\1K\0\1\0\0¿\tlist\22toggle_quick_menu\aui9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\1\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\2\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\3\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\4\0B\0\3\1K\0\1\0\0¿\vselect\tlist3\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\tprev\tlist3\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\tnext\tlist·\4\1\0\a\0\31\0H6\0\0\0'\2\1\0B\0\2\2\18\3\0\0009\1\2\0B\1\2\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\a\0003\5\b\0005\6\t\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\n\0003\5\v\0005\6\f\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\r\0003\5\14\0005\6\15\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\16\0003\5\17\0005\6\18\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\19\0003\5\20\0005\6\21\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\22\0003\5\23\0005\6\24\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\25\0003\5\26\0005\6\27\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\28\0003\5\29\0005\6\30\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\18Harpoon: Next\0\n<C-N>\1\0\1\tdesc\22Harpoon: Previous\0\n<C-B>\1\0\1\tdesc\20Harpoon: File 4\0\14<leader>4\1\0\1\tdesc\20Harpoon: File 3\0\14<leader>3\1\0\1\tdesc\20Harpoon: File 2\0\14<leader>2\1\0\1\tdesc\20Harpoon: File 1\0\14<leader>1\1\0\1\tdesc\25Harpoon: Toggle menu\0\n<C-p>\1\0\1\tdesc\22Harpoon: Add file\0\14<leader>a\6n\bset\vkeymap\bvim\nsetup\fharpoon\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/harpoon",
    url = "https://github.com/ThePrimeagen/harpoon"
  },
  ["inc-rename.nvim"] = {
    commands = { "IncRename" },
    config = { "\27LJ\2\nI\0\0\4\0\5\0\b'\0\0\0006\1\1\0009\1\2\0019\1\3\1'\3\4\0B\1\2\2&\0\1\0L\0\2\0\f<cword>\vexpand\afn\bvim\16:IncRename i\1\0\6\0\a\0\t6\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0003\4\5\0005\5\6\0B\0\5\1K\0\1\0\1\0\2\tdesc\23Incremental rename\texpr\2\0\15<leader>rn\6n\bset\vkeymap\bvim\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/inc-rename.nvim",
    url = "https://github.com/smjonas/inc-rename.nvim"
  },
  ["incline.nvim"] = {
    config = { "\27LJ\2\n«\3\0\1\n\0\25\00196\1\0\0009\1\1\0019\1\2\0016\3\0\0009\3\3\0039\3\4\0039\5\5\0B\3\2\2'\4\6\0B\1\3\0026\2\a\0'\4\b\0B\2\2\0029\2\t\2\18\4\1\0B\2\2\0026\3\0\0009\3\3\0039\3\n\3)\5\0\0005\6\v\0B\3\3\0029\4\f\3\14\0\4\0X\5\1Ä)\4\0\0009\5\r\3\14\0\5\0X\6\1Ä*\5\0\0006\6\0\0009\6\14\0069\a\5\0008\6\a\0069\6\15\0065\a\20\0\15\0\2\0X\b\6Ä5\b\16\0>\2\2\b=\4\17\b=\5\18\b\14\0\b\0X\t\1Ä'\b\19\0>\b\1\a5\b\22\0>\1\1\b\15\0\6\0X\t\2Ä'\t\21\0X\n\1Ä'\t\23\0=\t\24\b>\b\3\a=\4\17\aL\a\2\0\bgui\tbold\1\0\1\bgui\0\16bold,italic\1\5\1\0\0\6 \0\6 \nguibg\0\5\nguifg\nguibg\1\4\2\0\6 \0\6 \nguibg\0\nguifg\0\rmodified\abo\afg\abg\1\0\2\tlink\1\tname\vNormal\16nvim_get_hl\rget_icon\22nvim-web-devicons\frequire\a:t\bbuf\22nvim_buf_get_name\bapi\16fnamemodify\afn\bvim˛ˇˇ\15ü\1\1\0\5\0\n\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\3\0005\4\4\0=\4\5\3=\3\a\0023\3\b\0=\3\t\2B\0\2\1K\0\1\0\vrender\0\vwindow\1\0\2\vrender\0\vwindow\0\vmargin\1\0\1\15horizontal\3\0\1\0\2\fpadding\3\0\vmargin\0\nsetup\fincline\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/incline.nvim",
    url = "https://github.com/b0o/incline.nvim"
  },
  ["kanagawa.nvim"] = {
    config = { "\27LJ\2\nJ\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\rkanagawa\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/kanagawa.nvim",
    url = "https://github.com/rebelot/kanagawa.nvim"
  },
  ["koda.nvim"] = {
    config = { "\27LJ\2\nG\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0B\0\2\1K\0\1\0\14koda-dark\nsetup\16config.koda\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/koda.nvim",
    url = "https://github.com/oskarnurm/koda.nvim"
  },
  ["kotlin-vim"] = {
    loaded = false,
    needs_bufread = true,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/kotlin-vim",
    url = "https://github.com/udalov/kotlin-vim"
  },
  ["lazygit.nvim"] = {
    commands = { "LazyGit" },
    loaded = false,
    needs_bufread = true,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/lazygit.nvim",
    url = "https://github.com/kdheepak/lazygit.nvim"
  },
  ["lualine.nvim"] = {
    config = { "\27LJ\2\n—\b\0\0\a\0-\0?6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2+\0005\3%\0005\4\n\0005\5\4\0005\6\3\0=\6\5\0055\6\6\0=\6\a\0055\6\b\0=\6\t\5=\5\v\0045\5\r\0005\6\f\0=\6\5\0055\6\14\0=\6\a\0055\6\15\0=\6\t\5=\5\16\0045\5\18\0005\6\17\0=\6\5\0055\6\19\0=\6\a\0055\6\20\0=\6\t\5=\5\21\0045\5\23\0005\6\22\0=\6\5\0055\6\24\0=\6\a\0055\6\25\0=\6\t\5=\5\26\0045\5\28\0005\6\27\0=\6\5\0055\6\29\0=\6\a\0055\6\30\0=\6\t\5=\5\31\0045\5!\0005\6 \0=\6\5\0055\6\"\0=\6\a\0055\6#\0=\6\t\5=\5$\4=\4&\0035\4'\0=\4(\0035\4)\0=\4*\3=\3,\2B\0\2\1K\0\1\0\foptions\1\0\1\foptions\0\23section_separators\1\0\2\tleft\5\nright\5\25component_separators\1\0\2\tleft\5\nright\5\ntheme\1\0\3\23section_separators\0\25component_separators\0\ntheme\0\rinactive\1\0\2\abg\f#101010\afg\f#474747\1\0\2\abg\f#101010\afg\f#474747\1\0\3\6a\0\6c\0\6b\0\1\0\2\abg\f#101010\afg\f#474747\fcommand\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\freplace\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vvisual\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vinsert\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vnormal\1\0\6\vnormal\0\vinsert\0\fcommand\0\rinactive\0\freplace\0\vvisual\0\6c\1\0\2\abg\f#101010\afg\f#b0b0b0\6b\1\0\2\abg\f#101010\afg\f#b0b0b0\6a\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\nsetup\flualine\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/lualine.nvim",
    url = "https://github.com/nvim-lualine/lualine.nvim"
  },
  ["mason-lspconfig.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/mason-lspconfig.nvim",
    url = "https://github.com/williamboman/mason-lspconfig.nvim"
  },
  ["mason.nvim"] = {
    config = { "\27LJ\2\n(\0\0\3\0\3\0\0056\0\0\0009\0\1\0'\2\2\0B\0\2\1K\0\1\0\tedit\bcmd\bvim-\1\0\4\0\3\0\0066\0\0\0009\0\1\0003\2\2\0)\3d\0B\0\3\1K\0\1\0\0\rdefer_fn\bvim \0\0\3\2\0\1\5-\0\0\0-\2\1\0\22\2\0\2B\0\2\1K\0\1\0\2\0\0¿\2√\1\1\1\a\3\a\1 -\1\0\0\21\1\1\0\1\1\0\0X\1\1Ä2\0\26Ä-\1\1\0009\1\0\1-\3\0\0008\3\0\3B\1\2\2\18\4\1\0009\2\1\1B\2\2\2\14\0\2\0X\2\vÄ6\2\2\0009\4\3\1\18\5\1\0B\2\3\3\14\0\2\0X\4\bÄ6\4\4\0009\4\5\0043\6\6\0B\4\2\1X\2\3Ä-\2\2\0\22\4\0\0B\2\2\0012\0\0ÄK\0\1\0K\0\1\0\0\0\1\0\0¿\0\rschedule\bvim\finstall\npcall\17is_installed\16get_package\2$\1\0\4\2\1\0\0063\0\0\0\18\1\0\0)\3\1\0B\1\2\0012\0\0ÄK\0\1\0\0¿\1¿\0‹\3\1\0\a\0\n\0\0195\0\0\0006\1\1\0'\3\2\0B\1\2\0029\1\3\1B\1\1\0016\1\1\0'\3\4\0B\1\2\2\18\4\1\0009\2\5\1'\5\6\0003\6\a\0B\2\4\0019\2\b\0013\4\t\0B\2\2\0012\0\0ÄK\0\1\0\0\frefresh\0\28package:install:success\aon\19mason-registry\nsetup\nmason\frequire\1\28\0\0\31typescript-language-server\15eslint-lsp\24lua-language-server\rjson-lsp tailwindcss-language-server\25bash-language-server\18rust-analyzer\ngopls\fcss-lsp\rhtml-lsp\16swiftformat\14swiftlint\rluacheck\15shellcheck\rprettier\vclangd\23xcode-build-server\vstylua\nshfmt\truff\fgofumpt\14goimports\vktlint\ntaplo\frubocop\rtinymist\25kotlin-debug-adapter\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/mason.nvim",
    url = "https://github.com/williamboman/mason.nvim"
  },
  ["mini.hipatterns"] = {
    config = { "\27LJ\2\nü\1\0\0\a\0\b\0\r6\0\0\0'\2\1\0B\0\2\0029\1\2\0005\3\6\0005\4\5\0009\5\3\0009\5\4\5B\5\1\2=\5\4\4=\4\a\3B\1\2\1K\0\1\0\17highlighters\1\0\1\17highlighters\0\1\0\1\14hex_color\0\14hex_color\20gen_highlighter\nsetup\20mini.hipatterns\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/mini.hipatterns",
    url = "https://github.com/echasnovski/mini.hipatterns"
  },
  ["mini.pairs"] = {
    config = { "\27LJ\2\n8\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\15mini.pairs\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/mini.pairs",
    url = "https://github.com/echasnovski/mini.pairs"
  },
  ["neoconf.nvim"] = {
    config = { "\27LJ\2\n≈\2\0\0\5\0\14\0\0176\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\a\0005\4\6\0=\4\b\0035\4\t\0=\4\n\0035\4\v\0=\4\f\3=\3\r\2B\0\2\1K\0\1\0\fplugins\vlua_ls\1\0\2\30enabled_for_neovim_config\2\fenabled\2\vjsonls\1\0\2\28configured_servers_only\1\fenabled\2\14lspconfig\1\0\3\vjsonls\0\vlua_ls\0\14lspconfig\0\1\0\1\fenabled\2\vimport\1\0\4\19filetype_jsonc\2\vimport\0\16live_reload\2\fplugins\0\1\0\3\vvscode\2\tnlsp\1\bcoc\1\nsetup\fneoconf\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neoconf.nvim",
    url = "https://github.com/folke/neoconf.nvim"
  },
  neotest = {
    config = { "\27LJ\2\nE\0\0\5\1\5\0\n-\0\0\0009\0\0\0009\0\0\0006\2\1\0009\2\2\0029\2\3\2'\4\4\0B\2\2\0A\0\0\1K\0\1\0\0¿\6%\vexpand\afn\bvim\brun!\0\0\2\1\1\0\5-\0\0\0009\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\brunQ\0\0\4\1\5\0\r-\0\0\0009\0\0\0009\0\0\0006\2\1\0009\2\2\2\14\0\2\0X\3\2Ä6\2\1\0009\2\3\0029\2\4\2B\2\1\0A\0\0\1K\0\1\0\0¿\bcwd\tloop\auv\bvim\brun*\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\rrun_last\brun,\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\vtoggle\fsummaryC\0\0\3\1\3\0\6-\0\0\0009\0\0\0009\0\1\0005\2\2\0B\0\2\1K\0\1\0\0¿\1\0\2\15auto_close\2\nenter\2\topen\voutput1\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\vtoggle\17output_panel&\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\tstop\brun≤\4\1\0\a\0 \0J6\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\0\0'\2\3\0B\0\2\0026\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\b\0003\5\t\0005\6\n\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\v\0003\5\f\0005\6\r\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\14\0003\5\15\0005\6\16\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\17\0003\5\18\0005\6\19\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\20\0003\5\21\0005\6\22\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\23\0003\5\24\0005\6\25\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\26\0003\5\27\0005\6\28\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\29\0003\5\30\0005\6\31\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\tStop\0\b;tS\1\0\1\tdesc\24Toggle Output Panel\0\b;tO\1\0\1\tdesc\16Show Output\0\b;to\1\0\1\tdesc\19Toggle Summary\0\b;ts\1\0\1\tdesc\rRun Last\0\b;tl\1\0\1\tdesc\23Run All Test Files\0\b;tT\1\0\1\tdesc\16Run Nearest\0\b;tr\1\0\1\tdesc\rRun File\0\b;tt\6n\bset\vkeymap\bvim\fneotest\nsetup\19config.neotest\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neotest",
    url = "https://github.com/nvim-neotest/neotest"
  },
  ["neotest-gradle"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neotest-gradle",
    url = "https://github.com/weilbith/neotest-gradle"
  },
  ["neotest-jest"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neotest-jest",
    url = "https://github.com/nvim-neotest/neotest-jest"
  },
  ["neotest-plenary"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neotest-plenary",
    url = "https://github.com/nvim-neotest/neotest-plenary"
  },
  neovim = {
    config = { "\27LJ\2\nÛ\4\0\0\5\0\27\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\a\0005\4\6\0=\4\b\3=\3\t\2B\0\2\0016\0\n\0009\0\v\0'\2\f\0B\0\2\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\15\0005\4\16\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\17\0005\4\18\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\19\0005\4\20\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\21\0005\4\22\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\23\0005\4\24\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\25\0005\4\26\0B\0\4\1K\0\1\0\1\0\2\tbold\2\afg\f#e0def4\17CursorLineNr\1\0\1\afg\f#6e6a86\vLineNr\1\0\1\abg\tnone\16EndOfBuffer\1\0\1\abg\tnone\15SignColumn\1\0\1\abg\tnone\16NormalFloat\1\0\1\abg\tnone\vNormal\16nvim_set_hl\bapi\26colorscheme rose-pine\bcmd\bvim\21highlight_groups\fComment\1\0\1\fComment\0\1\0\1\vitalic\1\vstyles\1\0\3\17transparency\2\vitalic\1\tbold\2\1\0\5\23disable_background\2\fvariant\tmoon\21highlight_groups\0\vstyles\0\29disable_float_background\2\nsetup\14rose-pine\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/neovim",
    url = "https://github.com/rose-pine/neovim"
  },
  ["nightfox.nvim"] = {
    config = { "\27LJ\2\nJ\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\rnightfox\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nightfox.nvim",
    url = "https://github.com/EdenEast/nightfox.nvim"
  },
  ["nui.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nui.nvim",
    url = "https://github.com/MunifTanjim/nui.nvim"
  },
  nvim = {
    config = { "\27LJ\2\nÜ\f\0\1\4\0>\0@5\1\1\0005\2\0\0=\2\2\0015\2\4\0009\3\3\0=\3\5\2=\2\6\0015\2\a\0=\2\b\0015\2\t\0=\2\n\0015\2\v\0=\2\f\0015\2\14\0009\3\r\0=\3\5\2=\2\15\0015\2\16\0=\2\17\0015\2\18\0=\2\19\0015\2\20\0=\2\21\0015\2\22\0=\2\23\0015\2\24\0=\2\25\0015\2\26\0=\2\27\0015\2\28\0=\2\29\0015\2\30\0=\2\31\0015\2 \0=\2!\0015\2\"\0=\2#\0015\2$\0=\2%\0015\2&\0=\2'\0015\2(\0=\2)\0015\2*\0=\2+\0015\2,\0=\2-\0015\2/\0009\3.\0=\0030\2=\0021\0015\0022\0=\0023\0015\0024\0=\0025\0015\0026\0=\0027\0015\0028\0=\0029\0015\2:\0=\2;\0015\2<\0=\2=\1L\1\2\0\15LazyNormal\1\0\1\abg\tNONE\16MasonNormal\1\0\1\abg\tNONE\21NotifyBackground\1\0\1\abg\tNONE\18WhichKeyFloat\1\0\1\abg\tNONE\18LspInfoBorder\1\0\1\abg\tNONE\16PmenuBorder\1\0\1\abg\tNONE\rPmenuSel\abg\1\0\1\abg\0\rsurface0\nPmenu\1\0\1\abg\tNONE\15FloatTitle\1\0\1\abg\tNONE\16FloatBorder\1\0\1\abg\tNONE\16NormalFloat\1\0\1\abg\tNONE\26TelescopePreviewTitle\1\0\1\abg\tNONE\27TelescopePreviewBorder\1\0\1\abg\tNONE\27TelescopePreviewNormal\1\0\1\abg\tNONE\26TelescopeResultsTitle\1\0\1\abg\tNONE\27TelescopeResultsBorder\1\0\1\abg\tNONE\27TelescopeResultsNormal\1\0\1\abg\tNONE\25TelescopePromptTitle\1\0\1\abg\tNONE\26TelescopePromptBorder\1\0\1\abg\tNONE\26TelescopePromptNormal\1\0\1\abg\tNONE\20TelescopeBorder\1\0\1\abg\tNONE\20TelescopeNormal\1\0\1\abg\tNONE\15MatchParen\1\0\3\abg\tNONE\afg\0\tbold\2\npeach\22LspReferenceWrite\1\0\1\abg\tNONE\21LspReferenceRead\1\0\1\abg\tNONE\21LspReferenceText\1\0\1\abg\tNONE\17CursorLineNr\afg\1\0\2\abg\tNONE\afg\0\rlavender\15CursorLine\1\0\28\27TelescopeResultsNormal\0\25TelescopePromptTitle\0\26TelescopePromptBorder\0\26TelescopePromptNormal\0\20TelescopeBorder\0\20TelescopeNormal\0\26TelescopeResultsTitle\0\15MatchParen\0\27TelescopeResultsBorder\0\21LspReferenceText\0\15CursorLine\0\18WhichKeyFloat\0\21NotifyBackground\0\15LazyNormal\0\16MasonNormal\0\17CursorLineNr\0\16FloatBorder\0\18LspInfoBorder\0\16PmenuBorder\0\16NormalFloat\0\rPmenuSel\0\nPmenu\0\15FloatTitle\0\26TelescopePreviewTitle\0\27TelescopePreviewBorder\0\27TelescopePreviewNormal\0\22LspReferenceWrite\0\21LspReferenceRead\0\1\0\1\abg\tNONEù\1\0\1\4\0\a\0\0166\1\0\0009\1\1\0019\1\2\0019\3\3\0009\3\4\3B\1\2\2\15\0\1\0X\2\aÄ9\2\5\0019\2\6\2\15\0\2\0X\3\3Ä9\2\5\1+\3\1\0=\3\6\2K\0\1\0\30documentHighlightProvider\24server_capabilities\14client_id\tdata\21get_client_by_id\blsp\bvim˝\n\1\0\a\0:\0O6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\a\0005\4\6\0=\4\b\0035\4\t\0=\4\n\0034\4\0\0=\4\v\0034\4\0\0=\4\f\0034\4\0\0=\4\r\0034\4\0\0=\4\14\0034\4\0\0=\4\15\0034\4\0\0=\4\16\0034\4\0\0=\4\17\0034\4\0\0=\4\18\0034\4\0\0=\4\19\0034\4\0\0=\4\20\3=\3\21\0024\3\0\0=\3\22\0023\3\23\0=\3\24\0025\3\25\0005\4\26\0=\4\27\0035\4\28\0=\4\29\0035\4\30\0005\5 \0005\6\31\0=\6!\0055\6\"\0=\6#\0055\6$\0=\6%\0055\6&\0=\6'\5=\5(\0045\5*\0005\6)\0=\6!\0055\6+\0=\6#\0055\6,\0=\6%\0055\6-\0=\6'\5=\5.\4=\4/\3=\0030\2B\0\2\0016\0001\0009\0002\0+\1\1\0=\0013\0006\0001\0009\0004\0009\0005\0'\0026\0005\0038\0003\0047\0=\0049\3B\0\3\1K\0\1\0\rcallback\1\0\1\rcallback\0\0\14LspAttach\24nvim_create_autocmd\bapi\15cursorline\bopt\bvim\17integrations\15native_lsp\15underlines\1\2\0\0\14underline\1\2\0\0\14underline\1\2\0\0\14underline\1\0\4\verrors\0\rwarnings\0\16information\0\nhints\0\1\2\0\0\14underline\17virtual_text\16information\1\2\0\0\vitalic\rwarnings\1\2\0\0\vitalic\nhints\1\2\0\0\vitalic\verrors\1\0\4\verrors\0\rwarnings\0\16information\0\nhints\0\1\2\0\0\vitalic\1\0\3\17virtual_text\0\fenabled\2\15underlines\0\14telescope\1\0\1\fenabled\2\tmini\1\0\2\22indentscope_color\5\fenabled\2\1\0\t\15treesitter\2\nmason\2\vnotify\2\15native_lsp\0\14which_key\2\14telescope\0\tmini\0\rgitsigns\2\bcmp\2\22custom_highlights\0\20color_overrides\vstyles\14operators\ntypes\15properties\rbooleans\fnumbers\14variables\fstrings\rkeywords\14functions\nloops\17conditionals\1\2\0\0\vitalic\rcomments\1\0\f\fnumbers\0\14variables\0\fstrings\0\rkeywords\0\14functions\0\nloops\0\17conditionals\0\rcomments\0\ntypes\0\15properties\0\14operators\0\rbooleans\0\1\2\0\0\vitalic\17dim_inactive\1\0\3\15percentage\4≥ÊÃô\3≥Êå˛\3\fenabled\1\nshade\tdark\1\0\f\17integrations\0\fflavour\vfrappe\20color_overrides\0\22custom_highlights\0\vstyles\0\17no_underline\1\fno_bold\1\14no_italic\1\17dim_inactive\0\16term_colors\1\23show_end_of_buffer\1\27transparent_background\2\nsetup\15catppuccin\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim",
    url = "https://github.com/catppuccin/nvim"
  },
  ["nvim-cmp"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-cmp",
    url = "https://github.com/hrsh7th/nvim-cmp"
  },
  ["nvim-dap"] = {
    config = { "\27LJ\2\nP\0\0\3\0\4\0\0056\0\0\0009\0\1\0009\0\2\0'\2\3\0D\0\2\0,Main class (e.g., com.example.MainKt): \ninput\afn\bvimı\4\0\0\a\2\30\0H-\0\0\0\14\0\0\0X\0DÄ1\0\2\0006\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0-\4\1\0009\4\5\0045\5\6\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\a\0-\4\1\0009\4\b\0045\5\t\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\n\0-\4\1\0009\4\v\0045\5\f\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\r\0-\4\1\0009\4\14\0045\5\15\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\16\0-\4\1\0009\4\17\0045\5\18\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0005\2\19\0'\3\20\0006\4\21\0'\6\22\0B\4\2\0029\4\23\0045\5\24\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0005\2\25\0'\3\26\0006\4\21\0'\6\27\0B\4\2\0029\4\28\0045\5\29\0B\0\5\1K\0\1\0\3Ä\0¿\1\0\1\tdesc\tEval\teval\ndapui\15<Leader>de\1\3\0\0\6n\6v\1\0\1\tdesc\nHover\nhover\19dap.ui.widgets\frequire\15<Leader>dh\1\3\0\0\6n\6v\1\0\1\tdesc\rStep Out\rstep_out\15<leader>do\1\0\1\tdesc\14Step Into\14step_into\15<leader>di\1\0\1\tdesc\14Step Over\14step_over\15<leader>ds\1\0\1\tdesc\18Run To Cursor\18run_to_cursor\15<leader>dC\1\0\2\tdesc\rContinue\fnoremap\2\rcontinue\15<leader>dc\6n\bset\vkeymap\bvim≥\2\0\0\4\1\r\0/-\0\0\0\15\0\0\0X\1+Ä1\0\1\0006\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\5\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\6\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\a\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\b\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0005\2\t\0'\3\n\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0005\2\v\0'\3\f\0B\0\3\1K\0\1\0\3Ä\15<Leader>de\1\3\0\0\6n\6v\15<Leader>dh\1\3\0\0\6n\6v\15<leader>do\15<leader>di\15<leader>ds\15<leader>dC\15<leader>dc\6n\bdel\vkeymap\bvim{\0\0\3\1\a\0\f-\0\0\0009\0\0\0B\0\1\0016\0\1\0'\2\2\0B\0\2\0029\0\3\0009\0\4\0009\0\5\0009\0\6\0B\0\1\1K\0\1\0\1¿\ame\21event_terminated\nafter\14listeners\bdap\frequire\22terminate_sessionÂ\f\1\0\t\0<\0u6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\1B\2\1\0019\2\4\0005\3\6\0005\4\a\0=\4\b\3=\3\5\0029\2\t\0004\3\3\0005\4\n\0003\5\v\0=\5\f\4>\4\1\0035\4\r\0>\4\2\3=\3\5\0026\2\14\0009\2\15\0029\2\16\2\18\3\2\0'\5\17\0005\6\18\0B\3\3\1\18\3\2\0'\5\19\0005\6\20\0B\3\3\1\18\3\2\0'\5\21\0005\6\22\0B\3\3\1\18\3\2\0'\5\23\0005\6\24\0B\3\3\1+\3\1\0009\4\25\0009\5\26\0049\5\27\0053\6\29\0=\6\28\0059\5\26\0049\5\30\0053\6\31\0=\6\28\0052\3\0Ä6\3\0\0'\5\1\0B\3\2\0029\3 \0039\3!\3'\4#\0=\4\"\0036\3\14\0009\3$\0039\3%\3'\5&\0'\6'\0009\a(\0015\b)\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\6*\0009\a+\0015\b,\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\6-\0009\a.\0015\b/\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0060\0009\a1\0015\b2\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0063\0009\a4\0015\b5\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0066\0009\a7\0015\b8\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0069\0003\a:\0005\b;\0B\3\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\23Terminate debugger\0\15<leader>dx\1\0\1\tdesc\30Toggle Message Breakpoint\30toggle_message_breakpoint\14<leader>B\1\0\1\tdesc\22Toggle Breakpoint\22toggle_breakpoint\14<leader>b\1\0\1\tdesc\22Debug Class Tests\22debug_class_tests\15<leader>dT\1\0\1\tdesc\16Debug Tests\16debug_tests\15<leader>dt\1\0\1\tdesc\27Debug Without Building\24debug_without_build\15<leader>dr\1\0\1\tdesc\18Build & Debug\20build_and_debug\15<leader>dd\6n\bset\vkeymap\19usetab,uselast\14switchbuf\rfallback\rdefaults\0\21event_terminated\0\ame\22event_initialized\nafter\14listeners\1\0\4\vlinehl\5\ttext\5\vtexthl\19DiagnosticInfo\nnumhl\5\16DapLogPoint\1\0\4\vlinehl\5\ttext\5\vtexthl\17DiagnosticOk\nnumhl\5\15DapStopped\1\0\4\vlinehl\5\ttext\5\vtexthl\20DiagnosticError\nnumhl\5\26DapBreakpointRejected\1\0\4\vlinehl\5\ttext\5\vtexthl\20DiagnosticError\nnumhl\5\18DapBreakpoint\16sign_define\afn\bvim\1\0\a\16projectRoot\23${workspaceFolder}\ttype\vkotlin\ftimeout\3∞Í\1\tname\29Attach to Kotlin Process\rhostName\14localhost\frequest\vattach\tport\3ç'\14mainClass\0\1\0\5\16projectRoot\23${workspaceFolder}\ttype\vkotlin\frequest\vlaunch\tname\26Launch Kotlin Program\14mainClass\0\19configurations\foptions\1\0\1\"auto_continue_if_many_stopped\1\1\0\3\fcommand\25kotlin-debug-adapter\ttype\15executable\foptions\0\vkotlin\radapters\nsetup xcodebuild.integrations.dap\bdap\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-dap",
    url = "https://github.com/mfussenegger/nvim-dap"
  },
  ["nvim-dap-ui"] = {
    config = { "\27LJ\2\n2\0\0\2\0\4\0\0056\0\0\0009\0\1\0'\1\3\0=\1\2\0K\0\1\0\neob: \14fillchars\awo\bvim2\0\0\2\0\4\0\0056\0\0\0009\0\1\0'\1\3\0=\1\2\0K\0\1\0\neob: \14fillchars\awo\bvim\30\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\topen\31\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\nclose\31\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\nclosew\0\0\4\1\b\0\0146\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2\6\0\4\0X\1\6Ä-\1\0\0009\1\5\0019\1\6\0019\1\a\1\18\3\0\0B\1\2\1K\0\1\0\1¿\badd\fwatches\relements\5\23Watch expression: \ninput\afn\bvim9\0\0\2\1\3\0\6-\0\0\0009\0\0\0009\0\1\0009\0\2\0B\0\1\1K\0\1\0\1¿\vremove\fwatches\relements8\0\0\2\1\3\0\6-\0\0\0009\0\0\0009\0\1\0009\0\2\0B\0\1\1K\0\1\0\1¿\nclear\fwatches\relements¿\v\1\0\t\0?\0t6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0015\4\a\0005\5\4\0005\6\5\0=\6\6\5=\5\b\0045\5\t\0005\6\v\0005\a\n\0=\a\f\6=\6\r\5=\5\14\0045\5\15\0=\5\6\0044\5\3\0005\6\20\0004\a\5\0005\b\16\0>\b\1\a5\b\17\0>\b\2\a5\b\18\0>\b\3\a5\b\19\0>\b\4\a=\a\21\6>\6\1\0055\6\24\0004\a\3\0005\b\22\0>\b\1\a5\b\23\0>\b\2\a=\a\21\6>\6\2\5=\5\25\4B\2\2\0016\2\26\0009\2\27\0029\2\28\2'\4\29\0005\5\30\0B\2\3\0026\3\26\0009\3\27\0039\3\31\3'\5 \0005\6!\0=\2\"\0063\a#\0=\a$\6B\3\3\0016\3\26\0009\3\27\0039\3\31\3'\5 \0005\6%\0=\2\"\0063\a&\0=\a$\6B\3\3\0019\3'\0009\3(\0039\3)\0033\4*\0=\4\29\0039\3'\0009\3+\0039\3,\0033\4-\0=\4\29\0039\3'\0009\3+\0039\3.\0033\4/\0=\4\29\0036\3\26\0009\0030\0039\0031\3'\0052\0'\0063\0009\a4\0015\b5\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\0066\0003\a7\0005\b8\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\0069\0003\a:\0005\b;\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\6<\0003\a=\0005\b>\0B\3\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\24DapUI clear watches\0\15<leader>dC\1\0\1\tdesc\23DapUI remove watch\0\15<leader>dW\1\0\1\tdesc\20DapUI add watch\0\15<leader>dw\1\0\1\tdesc\18DAP UI toggle\vtoggle\15<leader>du\6n\bset\vkeymap\0\17event_exited\0\21event_terminated\vbefore\0\22event_initialized\nafter\14listeners\0\1\0\3\fpattern\18\\[dap\\-repl\\]\rcallback\0\ngroup\0\rcallback\0\ngroup\1\0\3\fpattern\tDAP*\rcallback\0\ngroup\0\16BufWinEnter\24nvim_create_autocmd\1\0\1\nclear\2\17dapui_config\24nvim_create_augroup\bapi\bvim\flayouts\1\0\3\rposition\vbottom\relements\0\tsize\3\n\1\0\2\aid\fconsole\tsize\4≥ÊÃô\3≥Êåˇ\3\1\0\2\aid\trepl\tsize\4ö≥ÊÃ\tô≥Ê˛\3\relements\1\0\3\rposition\tleft\relements\0\tsize\3(\1\0\2\aid\fwatches\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\16breakpoints\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\vscopes\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\vstacks\tsize\4\0ÄÄ¿˛\3\1\0\3\14collapsed\5\18current_frame\5\rexpanded\5\rfloating\rmappings\nclose\1\0\1\nclose\0\1\3\0\0\6q\n<Esc>\1\0\2\vborder\vsingle\rmappings\0\rcontrols\1\0\4\nicons\0\flayouts\0\rfloating\0\rcontrols\0\nicons\1\0\t\14step_into\tÛ∞Üπ\rstep_out\tÛ∞Ü∏\14step_over\5\14step_back\5\tplay\5\npause\v‚è∏Ô∏é\14terminate\v‚èπÔ∏é\rrun_last\5\15disconnect\5\1\0\3\nicons\0\fenabled\2\felement\trepl\nsetup\ndapui\bdap\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-dap-ui",
    url = "https://github.com/rcarriga/nvim-dap-ui"
  },
  ["nvim-lint"] = {
    config = { "\27LJ\2\n\"\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\rtry_lintú\4\1\0\a\0\28\0$6\0\0\0'\2\1\0B\0\2\0025\1\4\0005\2\3\0=\2\5\0015\2\6\0=\2\a\0015\2\b\0=\2\t\0015\2\n\0=\2\v\0015\2\f\0=\2\r\0015\2\14\0=\2\15\0015\2\16\0=\2\17\1=\1\2\0006\1\18\0009\1\19\0019\1\20\1'\3\1\0005\4\21\0B\1\3\0026\2\18\0009\2\19\0029\2\22\0025\4\23\0005\5\24\0=\1\25\0053\6\26\0=\6\27\5B\2\3\0012\0\0ÄK\0\1\0\rcallback\0\ngroup\1\0\2\rcallback\0\ngroup\0\1\4\0\0\rBufEnter\17BufWritePost\16InsertLeave\24nvim_create_autocmd\1\0\1\nclear\2\24nvim_create_augroup\bapi\bvim\ash\1\2\0\0\15shellcheck\blua\1\2\0\0\rluacheck\nswift\1\2\0\0\14swiftlint\20typescriptreact\1\2\0\0\veslint\20javascriptreact\1\2\0\0\veslint\15typescript\1\2\0\0\veslint\15javascript\1\0\a\20typescriptreact\0\20javascriptreact\0\nswift\0\15javascript\0\blua\0\ash\0\15typescript\0\1\2\0\0\veslint\18linters_by_ft\tlint\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-lint",
    url = "https://github.com/mfussenegger/nvim-lint"
  },
  ["nvim-lspconfig"] = {
    config = { "\27LJ\2\nÖ\1\2\0\6\0\a\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0'\3\4\0'\4\5\0'\5\6\0B\0\5\2G\2\0\0C\0\0\0\t.git\18jsconfig.json\18tsconfig.json\17package.json\17root_pattern\19lspconfig.util\frequireÛ\2\0\1\r\0\15\00096\1\0\0'\3\1\0B\1\2\0029\2\2\1'\4\3\0'\5\4\0B\2\3\2\18\4\0\0B\2\2\2\15\0\2\0X\3\1ÄL\2\2\0006\3\5\0009\3\6\0039\3\a\3\18\5\0\0B\3\2\2\15\0\3\0X\4!Ä\6\3\b\0X\4\31ÄU\4\30Ä6\4\5\0009\4\6\0049\4\t\4\18\6\3\0B\4\2\4X\a\15Ä\a\b\n\0X\t\rÄ\18\v\a\0009\t\v\a'\f\f\0B\t\3\2\14\0\t\0X\n\6Ä\18\v\a\0009\t\v\a'\f\r\0B\t\3\2\15\0\t\0X\n\1ÄL\3\2\0E\a\3\3R\aÔ\1276\4\5\0009\4\6\0049\4\a\4\18\6\3\0B\4\2\2\18\3\4\0X\4›\1279\4\2\1'\6\14\0B\4\2\2\18\6\0\0D\4\2\0\t.git\19%.xcworkspace$\17%.xcodeproj$\tfind\14directory\bdir\6/\fdirname\afs\bvim\18Package.swift\21buildServer.json\17root_pattern\19lspconfig.util\frequirek\0\2\4\0\5\0\0166\2\0\0009\2\1\0028\2\1\2)\3\4\0=\3\2\0026\2\0\0009\2\1\0028\2\1\2)\3\4\0=\3\3\0026\2\0\0009\2\1\0028\2\1\2+\3\2\0=\3\4\2K\0\1\0\14expandtab\15shiftwidth\ftabstop\abo\bvim™\1\2\0\a\0\b\0\f6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0'\3\4\0'\4\5\0'\5\6\0'\6\a\0B\0\6\2G\2\0\0C\0\0\0\t.git\22postcss.config.ts\22postcss.config.js\23tailwind.config.ts\23tailwind.config.js\17root_pattern\19lspconfig.util\frequireô\1\0\1\5\0\t\0\0186\1\0\0'\3\1\0B\1\2\0029\1\2\1'\3\3\0'\4\4\0B\1\3\2\18\3\0\0B\1\2\2\14\0\1\0X\2\6Ä6\1\5\0009\1\6\0019\1\a\1\18\3\0\0'\4\b\0B\1\3\2L\1\2\0\a:h\16fnamemodify\afn\bvim\t.git\15typst.toml\17root_pattern\19lspconfig.util\frequire∫\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand!tinymist.startDefaultPreview\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4|\0\0\4\0\6\0\t6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\0\0=\3\5\2B\0\2\1K\0\1\0\14arguments\1\0\2\fcommand\25tinymist.stopPreview\14arguments\0\20execute_command\bbuf\blsp\bvim∞\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand\23tinymist.exportPdf\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4∞\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand\23tinymist.exportSvg\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4y\0\0\5\0\b\0\0156\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2'\1\4\0&\0\1\0006\1\0\0009\1\1\0019\1\5\0015\3\6\0>\0\2\0035\4\a\0B\1\3\1K\0\1\0\1\0\1\vdetach\2\1\2\0\0\vsioyek\rjobstart\t.pdf\b%:r\vexpand\afn\bvim \3\1\2\b\0\20\0/6\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\4\0003\6\5\0005\a\6\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\b\0003\6\t\0005\a\n\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\v\0003\6\f\0005\a\r\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\14\0003\6\15\0005\a\16\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\17\0003\6\18\0005\a\19\0=\1\a\aB\2\5\0012\0\0ÄK\0\1\0\1\0\2\tdesc\26Typst: open in sioyek\vbuffer\0\0\15<leader>tv\1\0\2\tdesc\22Typst: export SVG\vbuffer\0\0\15<leader>ts\1\0\2\tdesc\22Typst: export PDF\vbuffer\0\0\15<leader>te\1\0\2\tdesc\24Typst: stop preview\vbuffer\0\0\15<leader>tP\vbuffer\1\0\2\tdesc\25Typst: start preview\vbuffer\0\0\15<leader>tp\6n\bset\vkeymap\bvimê\1\0\0\4\0\t\0\0146\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\3\0009\0\4\0'\2\5\0006\3\3\0009\3\6\0039\3\a\0039\3\b\3B\0\3\1K\0\1\0\tINFO\vlevels\blog\27LSP servers configured\vnotify\bvim\nsetup\21config.lsp_setup\frequire»\2\0\0\b\0\r\1\0306\0\0\0006\2\1\0009\2\2\0029\2\3\0025\4\4\0B\2\2\0A\0\0\4X\3\aÄ\18\a\4\0009\5\5\4B\5\2\0016\5\1\0009\5\6\5'\a\a\0B\5\2\1E\3\3\3R\3˜\1276\0\1\0009\0\b\0009\0\t\0'\2\n\0B\0\2\2\t\0\0\0X\0\5Ä6\0\1\0009\0\b\0009\0\v\0005\2\f\0B\0\2\1K\0\1\0\1\4\0\0\23xcode-build-server\vconfig\15-overwrite\rjobstart\23xcode-build-server\15executable\afn@sourcekit-lsp stopped, will restart on next Swift file open\vnotify\tstop\1\0\1\tname\14sourcekit\16get_clients\blsp\bvim\vipairs\2©\3\0\0\v\0\20\00216\0\0\0009\0\1\0009\0\2\0005\2\3\0B\0\2\2\21\1\0\0\t\1\0\0X\1\tÄ6\1\0\0009\1\4\1'\3\5\0006\4\0\0009\4\6\0049\4\a\0049\4\b\4B\1\3\1K\0\1\0:\1\1\0009\2\t\0019\2\n\2\14\0\2\0X\3\1Ä'\2\v\0006\3\0\0009\3\f\0039\3\r\3\18\5\2\0'\6\14\0&\5\6\5B\3\2\2\b\3\1\0X\3\2Ä+\3\1\0X\4\1Ä+\3\2\0006\4\0\0009\4\4\0046\6\15\0009\6\16\6'\b\17\0\18\t\2\0\15\0\3\0X\n\2Ä'\n\18\0X\v\1Ä'\n\19\0B\6\4\0A\4\0\1K\0\1\0\ano\byes=sourcekit-lsp: running\n  Root: %s\n  buildServer.json: %s\vformat\vstring\22/buildServer.json\17filereadable\afn\bN/A\rroot_dir\vconfig\tWARN\vlevels\blog\31sourcekit-lsp: NOT running\vnotify\1\0\1\tname\14sourcekit\16get_clients\blsp\bvim\0\2v\0\4\v\1\6\0\f6\4\0\0009\4\1\0049\4\2\4\18\6\0\0\18\a\1\0\18\b\2\0005\t\3\0-\n\0\0=\n\4\t=\3\5\tB\4\5\1K\0\1\0\1¿\tdesc\vbuffer\1\0\4\tdesc\0\vbuffer\0\fnoremap\2\vsilent\2\bset\vkeymap\bvimK\0\0\4\0\4\0\a6\0\0\0009\0\1\0009\0\2\0)\2\0\0005\3\3\0B\0\3\1K\0\1\0\1\0\1\nscope\tline\15open_float\15diagnostic\bvimz\0\0\5\0\t\0\v6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\a\0005\3\5\0005\4\4\0=\4\6\3=\3\b\2B\0\2\1K\0\1\0\fcontext\1\0\1\fcontext\0\tonly\1\0\1\tonly\0\1\2\0\0\rquickfix\16code_action\bbuf\blsp\bvimÜ\2\0\0\5\0\v\0\0286\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\a\0005\3\5\0005\4\4\0=\4\6\3=\3\b\2B\0\2\2\15\0\0\0X\1\tÄ6\1\0\0009\1\t\0019\3\n\0\14\0\3\0X\4\1Ä4\3\0\0B\1\2\2\15\0\1\0X\2\6Ä6\1\0\0009\1\1\0019\1\2\0019\1\3\1B\1\1\2\18\0\1\0K\0\1\0\vresult\16tbl_isempty\fcontext\1\0\1\fcontext\0\tonly\1\0\1\tonly\0\1\4\0\0\27source.organizeImports\29source.addMissingImports\18source.fixAll\16code_action\bbuf\blsp\bvim@\0\0\3\0\5\0\a6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0B\0\2\1K\0\1\0\1\0\1\nasync\2\vformat\bbuf\blsp\bvim–\1\0\0\5\0\6\0\t6\0\0\0009\0\1\0009\0\2\0+\2\0\0005\3\3\0005\4\4\0=\4\5\3B\0\3\1K\0\1\0\17close_events\1\5\0\0\rBufLeave\16CursorMoved\16InsertEnter\14FocusLost\1\0\6\14focusable\1\vprefix\6 \nscope\vcursor\vborder\frounded\17close_events\0\vsource\valways\15open_float\15diagnostic\bvimÂ\v\1\1\n\0G\0±\0019\1\0\0003\2\1\0\18\3\2\0'\5\2\0'\6\3\0006\a\4\0009\a\5\a9\a\0\a9\a\6\a'\b\a\0B\3\5\1\18\3\2\0'\5\2\0'\6\b\0006\a\4\0009\a\5\a9\a\0\a9\a\t\a'\b\n\0B\3\5\1\18\3\2\0'\5\2\0'\6\v\0006\a\4\0009\a\5\a9\a\0\a9\a\f\a'\b\r\0B\3\5\1\18\3\2\0'\5\2\0'\6\14\0006\a\4\0009\a\5\a9\a\0\a9\a\f\a'\b\r\0B\3\5\1\18\3\2\0'\5\2\0'\6\15\0006\a\4\0009\a\5\a9\a\0\a9\a\16\a'\b\17\0B\3\5\1\18\3\2\0'\5\2\0'\6\18\0006\a\4\0009\a\5\a9\a\0\a9\a\19\a'\b\20\0B\3\5\1\18\3\2\0'\5\2\0'\6\21\0006\a\4\0009\a\5\a9\a\0\a9\a\22\a'\b\23\0B\3\5\1\18\3\2\0'\5\2\0'\6\24\0006\a\4\0009\a\5\a9\a\0\a9\a\25\a'\b\26\0B\3\5\1\18\3\2\0'\5\2\0'\6\27\0003\a\28\0'\b\29\0B\3\5\1\18\3\2\0'\5\2\0'\6\30\0006\a\4\0009\a\31\a9\a \a'\b!\0B\3\5\1\18\3\2\0'\5\2\0'\6\"\0006\a\4\0009\a\31\a9\a#\a'\b$\0B\3\5\1\18\3\2\0'\5\2\0'\6%\0006\a\4\0009\a\5\a9\a\0\a9\a&\a'\b'\0B\3\5\1\18\3\2\0005\5(\0'\6)\0003\a*\0'\b+\0B\3\5\1\18\3\2\0'\5\2\0'\6,\0003\a-\0'\b.\0B\3\5\1\18\3\2\0'\5\2\0'\6/\0006\a\4\0009\a\5\a9\a\0\a9\a\19\a'\b\20\0B\3\5\1\18\3\2\0'\5\2\0'\0060\0006\a\4\0009\a\5\a9\a\0\a9\a1\a'\b2\0B\3\5\1\18\3\2\0'\0053\0'\0064\0006\a\4\0009\a\5\a9\a\0\a9\a5\a'\b6\0B\3\5\1\18\3\2\0'\5\2\0'\0067\0003\a8\0'\b9\0B\3\5\0016\3\4\0009\3\5\0039\3:\0035\5;\0=\1<\5B\3\2\2\21\4\3\0)\5\0\0\1\5\4\0X\4\6Ä\18\4\2\0'\6\2\0'\a=\0'\b>\0'\t?\0B\4\5\0016\4\4\0009\4@\0049\4A\4'\6B\0005\aC\0=\1D\a3\bE\0=\bF\aB\4\3\0012\0\0ÄK\0\1\0\rcallback\0\vbuffer\1\0\2\rcallback\0\vbuffer\0\15CursorHold\24nvim_create_autocmd\bapi\27sourcekit-lsp: Restart\26:SourcekitRestart<CR>\15<leader>xr\nbufnr\1\0\2\tname\14sourcekit\nbufnr\0\16get_clients\16LSP: Format\0\14<leader>f\24LSP: Signature help\19signature_help\n<C-h>\6i\16LSP: Rename\vrename\16<leader>vrn\16<leader>vrr\21LSP: Fix imports\0\15<leader>vi\19LSP: Quick fix\0\15<leader>qf\1\3\0\0\6n\6x\21LSP: Code action\16code_action\16<leader>vca\25LSP: Next diagnostic\14goto_next\a]d\29LSP: Previous diagnostic\14goto_prev\15diagnostic\a[d\26LSP: Line diagnostics\0\15<leader>vd\26LSP: Workspace symbol\21workspace_symbol\16<leader>vws\15LSP: Hover\nhover\6K\20LSP: References\15references\agr\31LSP: Go to type definition\20type_definition\agy\agI\30LSP: Go to implementation\19implementation\agi\27LSP: Go to declaration\16declaration\agD\26LSP: Go to definition\15definition\blsp\bvim\15<leader>gd\6n\0\bbufü\1\0\0\5\0\t\0\0216\0\0\0009\0\1\0009\0\2\0\15\0\0\0X\1\15Ä6\0\0\0009\0\1\0009\0\2\0\18\2\0\0009\0\3\0'\3\4\0B\0\3\2\15\0\0\0X\1\6Ä6\0\5\0006\2\6\0'\4\a\0B\2\2\0029\2\b\2B\0\2\1K\0\1\0\napply\22config.monochrome\frequire\npcall\n^koda\nmatch\16colors_name\6g\bvimﬁ \1\0\14\0î\1\1Ù\0016\0\0\0006\2\1\0'\4\2\0B\2\2\0029\2\3\2B\0\2\0016\0\4\0009\0\5\0009\0\6\0009\0\a\0B\0\1\0026\1\0\0006\3\1\0'\4\b\0B\1\3\3\15\0\1\0X\3\4Ä9\3\t\2\18\5\0\0B\3\2\2\18\0\3\0009\3\n\0009\3\v\0039\3\f\3+\4\2\0=\4\r\0036\3\4\0009\3\14\0039\3\15\0035\5\16\0005\6\17\0=\6\18\0055\6\25\0004\a\0\0166\b\4\0009\b\14\b9\b\19\b9\b\20\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\22\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\23\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\24\b'\t\21\0<\t\b\a=\a\26\6=\6\27\0055\6\28\0=\6\29\5B\3\2\0015\3*\0005\4\30\0003\5\31\0=\5 \0045\5$\0005\6\"\0005\a!\0=\a#\6=\6%\0055\6'\0005\a&\0=\a#\6=\6(\5=\5)\4=\4+\0035\4,\0005\0054\0005\6.\0005\a-\0=\a/\0065\a0\0=\a1\0065\a2\0=\a3\6=\0065\5=\5)\4=\0046\0035\4;\0004\5\3\0006\6\4\0009\0067\0066\b\4\0009\b8\b9\b9\b'\n:\0B\b\2\0A\6\0\0?\6\0\0=\5<\0045\5=\0=\5>\0043\5?\0=\5 \0043\5@\0=\5A\4=\4B\0035\4C\0005\5E\0005\6D\0=\6F\5=\5)\4=\4G\0035\4H\0=\4I\0035\4J\0=\4K\0035\4L\0=\4M\0035\4N\0=\4O\0035\4P\0003\5Q\0=\5 \0045\5R\0=\5>\4=\4S\0035\4T\0005\5a\0005\6V\0005\aU\0=\aW\0065\aX\0=\a\v\0065\aY\0=\aZ\0065\a\\\0005\b[\0=\b]\a5\b^\0=\b_\a=\a`\6=\6b\5=\5)\4=\4c\0035\4d\0005\5h\0005\6f\0005\ae\0=\ag\6=\6i\5=\5)\4=\4i\0035\4j\0005\5k\0=\5<\4=\4l\0035\4m\0=\4n\0035\4o\0005\5p\0004\6\0\0=\6q\5=\5)\0043\5r\0=\5 \0043\5s\0=\5A\4=\4t\0034\4\0\0006\5u\0\18\a\3\0B\5\2\4H\b\aÄ\6\bB\0X\n\5Ä6\nv\0009\nw\n\18\f\4\0\18\r\b\0B\n\3\1F\b\3\3R\b˜\1276\5\1\0'\ax\0B\5\2\0029\5\3\0055\ay\0=\4z\aB\5\2\0016\5\4\0009\5{\0059\5|\5'\a}\0003\b~\0005\t\127\0B\5\4\0016\5\4\0009\5{\0059\5|\5'\aÄ\0003\bÅ\0005\tÇ\0B\5\4\0016\5\4\0009\5{\0059\5|\5'\aÉ\0003\bÑ\0005\tÖ\0B\5\4\0016\5\4\0009\5{\0059\5Ü\5'\aá\0005\bã\0006\t\4\0009\t{\t9\tà\t'\vâ\0005\fä\0B\t\3\2=\tå\b3\tç\0=\té\bB\5\3\0016\5\4\0009\5{\0059\5Ü\5'\aè\0005\bí\0006\t\4\0009\t{\t9\tà\t'\vê\0005\fë\0B\t\3\2=\tå\b3\tì\0=\té\bB\5\3\1K\0\1\0\0\1\0\2\rcallback\0\ngroup\0\1\0\1\nclear\2\25monochrome-overrides\16ColorScheme\rcallback\0\ngroup\1\0\2\rcallback\0\ngroup\0\1\0\1\nclear\2\18UserLspConfig\24nvim_create_augroup\14LspAttach\24nvim_create_autocmd\1\0\1\tdesc\31Check sourcekit-lsp status\0\20SourcekitStatus\1\0\1\tdesc:Restart sourcekit-lsp and regenerate buildServer.json\0\21SourcekitRestart\1\0\1\tdesc\27Set up all LSP servers\0\rLspSetup\29nvim_create_user_command\bapi\21ensure_installed\1\0\3\21automatic_enable\1\21ensure_installed\0\27automatic_installation\2\20mason-lspconfig\vinsert\ntable\npairs\rtinymist\0\0\14sysInputs\1\0\6\19previewFeature\venable\14sysInputs\0\18formatterMode\rtypstyle\15outputPath\16$root/$name\14exportPdf\vonSave\21defaultEntryFile\5\1\0\4\14on_attach\0\rroot_dir\0\rsettings\0\14autostart\2\bzls\1\0\1\14autostart\2\vclangd\1\a\0\0\vclangd\23xcode-build-server\23--background-index\17--clang-tidy\28--header-insertion=iwyu --completion-style=detailed\1\0\2\bcmd\0\14autostart\2\ngopls\1\0\1\ngopls\0\ranalyses\1\0\3\fgofumpt\2\16staticcheck\2\ranalyses\0\1\0\1\17unusedparams\2\1\0\2\rsettings\0\14autostart\2\vlua_ls\bLua\1\0\1\bLua\0\16diagnostics\fglobals\1\2\0\0\bvim\fdisable\1\0\2\fglobals\0\fdisable\0\1\3\0\0\29incomplete-signature-doc\19trailing-space\thint\1\0\6\fsetType\1\14paramName\fDisable\15arrayIndex\fDisable\14semicolon\fDisable\venable\2\14paramType\2\1\0\2\18workspaceWord\2\16callSnippet\tBoth\14workspace\1\0\4\thint\0\14workspace\0\16diagnostics\0\15completion\0\1\0\1\20checkThirdParty\1\1\0\3\rsettings\0\24single_file_support\2\14autostart\2\16tailwindcss\1\n\0\0\thtml\bcss\tscss\15javascript\20javascriptreact\15typescript\20typescriptreact\bvue\vsvelte\0\1\0\3\rroot_dir\0\14filetypes\0\14autostart\2\thtml\1\0\1\14autostart\2\ncssls\1\0\1\14autostart\2\vbashls\1\0\1\14autostart\2\vjsonls\1\0\1\14autostart\2\veslint\23workingDirectories\1\0\1\23workingDirectories\0\1\0\1\tmode\tauto\1\0\2\rsettings\0\14autostart\2\14sourcekit\14on_attach\0\0\14filetypes\1\4\0\0\nswift\tobjc\vobjcpp\bcmd\1\0\4\14on_attach\0\rroot_dir\0\bcmd\0\14filetypes\0\27xcrun -f sourcekit-lsp\vsystem\afn\ttrim\18rust_analyzer\18rust-analyzer\1\0\1\18rust-analyzer\0\14procMacro\1\0\1\venable\2\16checkOnSave\1\0\1\fcommand\vclippy\ncargo\1\0\3\14procMacro\0\16checkOnSave\0\ncargo\0\1\0\1\16allFeatures\2\1\0\2\rsettings\0\14autostart\2\nts_ls\1\0\14\bzls\0\thtml\0\vlua_ls\0\ngopls\0\vjsonls\0\vclangd\0\14sourcekit\0\18rust_analyzer\0\nts_ls\0\16tailwindcss\0\ncssls\0\vbashls\0\veslint\0\rtinymist\0\rsettings\15javascript\1\0\1\15inlayHints\0\1\0\a\"includeInlayVariableTypeHints\2+includeInlayFunctionParameterTypeHints\2:includeInlayParameterNameHintsWhenArgumentMatchesName\1#includeInlayParameterNameHints\ball%includeInlayEnumMemberValueHints\2,includeInlayFunctionLikeReturnTypeHints\2-includeInlayPropertyDeclarationTypeHints\2\15typescript\1\0\2\15javascript\0\15typescript\0\15inlayHints\1\0\1\15inlayHints\0\1\0\a\"includeInlayVariableTypeHints\2+includeInlayFunctionParameterTypeHints\2:includeInlayParameterNameHintsWhenArgumentMatchesName\1#includeInlayParameterNameHints\fliteral%includeInlayEnumMemberValueHints\2,includeInlayFunctionLikeReturnTypeHints\2-includeInlayPropertyDeclarationTypeHints\2\rroot_dir\0\1\0\4\rroot_dir\0\rsettings\0\24single_file_support\2\14autostart\2\nfloat\1\0\6\14focusable\1\vheader\5\vprefix\5\vborder\frounded\vsource\valways\nstyle\fminimal\nsigns\ttext\1\0\1\ttext\0\tINFO\tHINT\tWARN\6 \nERROR\rseverity\17virtual_text\1\0\3\vprefix\b‚óè\fspacing\3\4\vsource\fif_many\1\0\6\17virtual_text\0\nfloat\0\21update_in_insert\1\14underline\1\nsigns\0\18severity_sort\2\vconfig\15diagnostic\19snippetSupport\19completionItem\15completion\17textDocument\25get_lsp_capabilities\14blink.cmp\29make_client_capabilities\rprotocol\blsp\bvim\nsetup\nmason\frequire\npcall\3ÄÄ¿ô\4\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-lspconfig",
    url = "https://github.com/neovim/nvim-lspconfig"
  },
  ["nvim-nio"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-nio",
    url = "https://github.com/nvim-neotest/nvim-nio"
  },
  ["nvim-notify"] = {
    config = { "\27LJ\2\nè\1\0\0\4\0\5\0\f6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\0016\0\4\0006\1\0\0'\3\1\0B\1\2\2=\1\1\0K\0\1\0\bvim\1\0\3\22background_colour\f#000000\ftimeout\3à'\vrender\20wrapped-compact\nsetup\vnotify\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-notify",
    url = "https://github.com/rcarriga/nvim-notify"
  },
  ["nvim-treesitter"] = {
    commands = { "TSInstallSync", "TSUpdateSync", "TSUpdate", "TSInstall" },
    config = { "\27LJ\2\nê\1\0\2\t\0\a\1\21*\2\0\0006\3\0\0006\5\1\0009\5\2\0059\5\3\0056\6\1\0009\6\4\0069\6\5\6\18\b\1\0B\6\2\0A\3\1\3\15\0\3\0X\5\aÄ\15\0\4\0X\5\5Ä9\5\6\4\1\2\5\0X\5\2Ä+\5\2\0L\5\2\0K\0\1\0\tsize\22nvim_buf_get_name\bapi\ffs_stat\tloop\bvim\npcallÄ¿\f∆\v\1\0\6\0'\00016\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\6\0003\4\a\0=\4\b\3=\3\t\0025\3\n\0005\4\v\0=\4\b\3=\3\f\0025\3\r\0005\4\14\0=\4\15\3=\3\16\0025\3\19\0005\4\17\0005\5\18\0=\5\15\4=\4\20\0035\4\21\0005\5\22\0=\5\23\0045\5\24\0=\5\25\0045\5\26\0=\5\27\0045\5\28\0=\5\29\4=\4\30\3=\3\31\2B\0\2\0016\0 \0009\0!\0'\1#\0=\1\"\0006\0 \0009\0!\0'\1%\0=\1$\0006\0 \0009\0!\0+\1\1\0=\1&\0K\0\1\0\15foldenable\31nvim_treesitter#foldexpr()\rfoldexpr\texpr\15foldmethod\bopt\bvim\16textobjects\tmove\22goto_previous_end\1\0\3\a[F\20@function.outer\a[A\21@parameter.inner\a[C\17@class.outer\24goto_previous_start\1\0\3\a[f\20@function.outer\a[a\21@parameter.inner\a[c\17@class.outer\18goto_next_end\1\0\3\a]F\20@function.outer\a]A\21@parameter.inner\a]C\17@class.outer\20goto_next_start\1\0\3\a]c\17@class.outer\a]f\20@function.outer\a]a\21@parameter.inner\1\0\6\22goto_previous_end\0\24goto_previous_start\0\20goto_next_start\0\14set_jumps\2\18goto_next_end\0\venable\2\vselect\1\0\2\tmove\0\vselect\0\1\0\6\aif\20@function.inner\aib\17@block.inner\aac\17@class.outer\aaf\20@function.outer\aic\17@class.inner\aab\17@block.outer\1\0\3\fkeymaps\0\venable\2\14lookahead\2\26incremental_selection\fkeymaps\1\0\4\21node_decremental\t<bs>\19init_selection\14<C-space>\22scope_incremental\1\21node_incremental\14<C-space>\1\0\2\venable\2\fkeymaps\0\vindent\1\2\0\0\tyaml\1\0\2\venable\2\fdisable\0\14highlight\fdisable\0\1\0\3\fdisable\0\venable\2&additional_vim_regex_highlighting\1\21ensure_installed\1\0\6\21ensure_installed\0\vindent\0\17auto_install\2\14highlight\0\26incremental_selection\0\16textobjects\0\1#\0\0\15javascript\15typescript\btsx\bcss\thtml\tjson\tscss\fgraphql\thttp\nswift\trust\6c\bcpp\ago\ngomod\vgowork\ngosum\vpython\blua\bvim\vvimdoc\tbash\bsql\rmarkdown\20markdown_inline\14gitignore\15git_config\15git_rebase\14gitcommit\18gitattributes\tyaml\ttoml\bxml\ntypst\nsetup\27nvim-treesitter.config\frequire\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/nvim-treesitter",
    url = "https://github.com/nvim-treesitter/nvim-treesitter"
  },
  ["nvim-treesitter-textobjects"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-treesitter-textobjects",
    url = "https://github.com/nvim-treesitter/nvim-treesitter-textobjects"
  },
  ["nvim-ts-autotag"] = {
    config = { "\27LJ\2\n=\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\20nvim-ts-autotag\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-ts-autotag",
    url = "https://github.com/windwp/nvim-ts-autotag"
  },
  ["nvim-web-devicons"] = {
    config = { "\27LJ\2\nO\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\fdefault\2\nsetup\22nvim-web-devicons\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/nvim-web-devicons",
    url = "https://github.com/nvim-tree/nvim-web-devicons"
  },
  ["obsidian.nvim"] = {
    commands = { "ObsidianBacklinks", "ObsidianDailies", "ObsidianExtractNote", "ObsidianFollowLink", "ObsidianLink", "ObsidianLinkNew", "ObsidianLinks", "ObsidianNew", "ObsidianNewFromTemplate", "ObsidianOpen", "ObsidianPasteImg", "ObsidianQuickSwitch", "ObsidianRename", "ObsidianSearch", "ObsidianTags", "ObsidianTemplate", "ObsidianToday", "ObsidianToggleCheckbox", "ObsidianTomorrow", "ObsidianTOC", "ObsidianYesterday" },
    config = { "\27LJ\2\nU\0\1\4\0\4\0\a6\1\0\0'\3\1\0B\1\2\0029\1\2\0019\3\3\0B\1\2\1K\0\1\0\bbuf\26setup_markdown_buffer\20config.obsidian\frequire‡\2\1\0\6\0\17\0 6\0\0\0009\0\1\0009\0\2\0'\2\3\0005\3\4\0B\0\3\0026\1\0\0009\1\1\0019\1\5\1'\3\6\0005\4\a\0=\0\b\0043\5\t\0=\5\n\4B\1\3\0016\1\v\0'\3\f\0B\1\2\0029\1\r\1B\1\1\0026\2\v\0'\4\14\0B\2\2\0029\2\15\2\18\4\1\0B\2\2\0016\2\v\0'\4\f\0B\2\2\0029\2\16\2B\2\1\1K\0\1\0!patch_template_substitutions\nsetup\robsidian\topts\20config.obsidian\frequire\rcallback\0\ngroup\1\0\3\fpattern\rmarkdown\rcallback\0\ngroup\0\rFileType\24nvim_create_autocmd\1\0\1\nclear\2\28salar-obsidian-markdown\24nvim_create_augroup\bapi\bvim\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/obsidian.nvim",
    url = "https://github.com/epwalsh/obsidian.nvim"
  },
  ["oil.nvim"] = {
    commands = { "Oil" },
    config = { "\27LJ\2\nÀ\1\0\0\4\0\b\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\6\0=\3\a\2B\0\2\1K\0\1\0\fkeymaps\1\0\2\n<C-p>\1\n<C-c>\1\17view_options\1\0\1\16show_hidden\2\1\0\4\fkeymaps\0\17view_options\0\"skip_confirm_for_simple_edits\2\26default_file_explorer\2\nsetup\boil\frequire\0" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/oil.nvim",
    url = "https://github.com/stevearc/oil.nvim"
  },
  ["onedark.nvim"] = {
    config = { "\27LJ\2\nI\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\fonedark\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/onedark.nvim",
    url = "https://github.com/navarasu/onedark.nvim"
  },
  ["oxocarbon.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/oxocarbon.nvim",
    url = "https://github.com/nyoom-engineering/oxocarbon.nvim"
  },
  ["packer.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/packer.nvim",
    url = "https://github.com/wbthomason/packer.nvim"
  },
  ["plenary.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/plenary.nvim",
    url = "https://github.com/nvim-lua/plenary.nvim"
  },
  ["refactoring.nvim"] = {
    config = { "\27LJ\2\nÿ\5\0\0\6\0\30\0>6\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\a\0'\4\b\0005\5\t\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\n\0'\4\v\0005\5\f\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\r\0'\4\14\0005\5\15\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0005\2\16\0'\3\17\0'\4\18\0005\5\19\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\21\0'\4\22\0005\5\23\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\24\0'\4\25\0005\5\26\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\27\0'\4\28\0005\5\29\0B\0\5\1K\0\1\0\1\0\1\tdesc\26Extract block to file$:Refactor extract_block_to_file\16<leader>rbf\1\0\1\tdesc\18Extract block\28:Refactor extract_block\15<leader>rb\1\0\1\tdesc\20Inline function\26:Refactor inline_func\15<leader>rI\6n\1\0\1\tdesc\20Inline variable\25:Refactor inline_var\15<leader>ri\1\3\0\0\6n\6x\1\0\1\tdesc\21Extract variable\27:Refactor extract_var \15<leader>rv\1\0\1\tdesc\20Extract to file\31:Refactor extract_to_file \15<leader>rf\1\0\1\tdesc\21Extract function\23:Refactor extract \15<leader>re\6x\bset\vkeymap\bvim\nsetup\16refactoring\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/refactoring.nvim",
    url = "https://github.com/ThePrimeagen/refactoring.nvim"
  },
  ["rest.nvim"] = {
    commands = { "Rest" },
    config = { "\27LJ\2\n>\0\1\5\0\4\0\0066\1\0\0009\1\1\0019\1\2\0015\3\3\0\18\4\0\0D\1\3\0\1\5\0\0\ttidy\a-i\a-q\6-\vsystem\afn\bvimÇ\4\1\0\6\0\r\0\0176\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\6\0005\4\a\0003\5\b\0=\5\t\4=\4\n\3=\3\v\0024\3\0\0=\3\f\2B\0\2\1K\0\1\0\29custom_dynamic_variables\vresult\15formatters\thtml\0\1\0\2\tjson\ajq\thtml\0\1\0\6\15formatters\0\20show_statistics\1\17show_headers\2\19show_http_info\2\22show_curl_command\1\rshow_url\2\14highlight\1\0\2\ftimeout\3ñ\1\fenabled\2\1\0\f'stay_in_current_window_after_split\1\26result_split_in_place\1\vresult\0\renv_file\t.env\20jump_to_request\1\14highlight\0\28result_split_horizontal\1\29custom_dynamic_variables\0\17yank_dry_run\2\16search_back\2\15encode_url\2\26skip_ssl_verification\1\nsetup\14rest-nvim\frequire\0" },
    loaded = false,
    needs_bufread = true,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/rest.nvim",
    url = "https://github.com/rest-nvim/rest.nvim"
  },
  ["snacks.nvim"] = {
    config = { "\27LJ\2\nÅ\1\0\0\4\0\b\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\6\0=\3\a\2B\0\2\1K\0\1\0\vscroll\1\0\1\fenabled\1\vindent\1\0\2\vscroll\0\vindent\0\1\0\1\fenabled\1\nsetup\vsnacks\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/snacks.nvim",
    url = "https://github.com/folke/snacks.nvim"
  },
  sonokai = {
    config = { "\27LJ\2\n@\0\0\2\0\3\0\0056\0\0\0009\0\1\0)\1\1\0=\1\2\0K\0\1\0#sonokai_transparent_background\6g\bvim\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/sonokai",
    url = "https://github.com/sainnhe/sonokai"
  },
  ["supermaven-nvim"] = {
    config = { "\27LJ\2\n¿\1\0\0\4\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\2B\0\2\0016\0\6\0009\0\a\0+\1\2\0=\1\b\0K\0\1\0\vai_cmp\6g\bvim\fkeymaps\1\0\1\fkeymaps\0\1\0\3\21clear_suggestion\n<C-]>\16accept_word\f<M-C-j>\22accept_suggestion\n<C-a>\nsetup\20supermaven-nvim\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/supermaven-nvim",
    url = "https://github.com/supermaven-inc/supermaven-nvim"
  },
  ["telescope-file-browser.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/telescope-file-browser.nvim",
    url = "https://github.com/nvim-telescope/telescope-file-browser.nvim"
  },
  ["telescope-fzf-native.nvim"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/telescope-fzf-native.nvim",
    url = "https://github.com/nvim-telescope/telescope-fzf-native.nvim"
  },
  ["telescope.nvim"] = {
    config = { "\27LJ\2\nh\0\1\4\0\6\0\n6\1\0\0'\3\1\0B\1\2\0029\1\2\0019\1\3\0019\1\4\0019\1\5\1\18\3\0\0B\1\2\1K\0\1\0\vcreate\factions\17file_browser\15extensions\14telescope\frequireq\0\1\4\0\6\0\n6\1\0\0'\3\1\0B\1\2\0029\1\2\0019\1\3\0019\1\4\0019\1\5\1\18\3\0\0B\1\2\1K\0\1\0\20goto_parent_dir\factions\17file_browser\15extensions\14telescope\frequireI\0\1\b\1\1\0\n)\1\1\0)\2\n\0)\3\1\0M\1\5Ä-\5\0\0009\5\0\5\18\a\0\0B\5\2\1O\1˚\127K\0\1\0\1¿\28move_selection_previousE\0\1\b\1\1\0\n)\1\1\0)\2\n\0)\3\1\0M\1\5Ä-\5\0\0009\5\0\5\18\a\0\0B\5\2\1O\1˚\127K\0\1\0\1¿\24move_selection_nextS\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\vhidden\2\15find_files\22telescope.builtin\frequireD\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\15find_files\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14git_files\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14live_grep\22telescope.builtin\frequireà\1\0\0\6\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\a\0006\3\3\0009\3\4\0039\3\5\3'\5\6\0B\3\2\2=\3\b\2B\0\2\1K\0\1\0\vsearch\1\0\1\vsearch\0\fGrep > \ninput\afn\bvim\16grep_string\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14live_grep\22telescope.builtin\frequireâ\1\0\0\6\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\a\0006\3\3\0009\3\4\0039\3\5\3'\5\6\0B\3\2\2=\3\b\2B\0\2\1K\0\1\0\vsearch\1\0\1\vsearch\0\f<cWORD>\vexpand\afn\bvim\16grep_string\22telescope.builtin\frequireA\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\fbuffers\22telescope.builtin\frequire@\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\vresume\22telescope.builtin\frequireB\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\roldfiles\22telescope.builtin\frequireE\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\16diagnostics\22telescope.builtin\frequireD\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\15treesitter\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14help_tags\22telescope.builtin\frequire/\0\0\3\0\4\0\0056\0\0\0009\0\1\0009\0\2\0'\2\3\0D\0\2\0\n%:p:h\vexpand\afn\bvimœ\1\1\0\6\1\a\0\r3\0\0\0-\1\0\0009\1\1\0019\1\2\0019\1\2\0015\3\3\0\18\4\0\0B\4\1\2=\4\4\0035\4\5\0=\4\6\3B\1\2\1K\0\1\0\0¿\18layout_config\1\0\1\vheight\4≥ÊÃô\3≥Ê¨ˇ\3\bcwd\1\0\a\vhidden\2\14previewer\1\fgrouped\2\17initial_mode\vnormal\bcwd\0\18layout_config\0\tpath\n%:p:h\17file_browser\15extensions\0Ì\16\1\0\n\0^\0Æ\0016\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0005\4\21\0005\5\4\0005\6\6\0005\a\5\0=\a\a\0065\a\b\0=\a\t\0065\a\n\0=\a\v\6=\6\f\0055\6\18\0005\a\14\0009\b\r\1=\b\15\a9\b\16\1=\b\17\a=\a\19\6=\6\20\5=\5\22\0045\5\25\0005\6\23\0005\a\24\0=\a\f\6=\6\26\0055\6\27\0005\a\28\0=\a\29\6=\6\30\5=\5\31\0045\5!\0005\6 \0=\6\"\0055\6#\0005\a-\0005\b%\0003\t$\0=\t&\b3\t'\0=\t(\b3\t)\0=\t*\b3\t+\0=\t,\b=\b.\a=\a\20\6=\6/\5=\0050\4B\2\2\0019\0021\0'\4\"\0B\2\2\0019\0021\0'\4/\0B\2\2\0016\0022\0009\0023\0029\0024\2'\4.\0'\0055\0003\0066\0005\a7\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\0058\0003\0069\0005\a:\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5;\0003\6<\0005\a=\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5>\0003\6?\0005\a@\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5A\0003\6B\0005\aC\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5D\0003\6E\0005\aF\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5G\0003\6H\0B\2\4\0016\0022\0009\0023\0029\0024\2'\4.\0'\5I\0003\6J\0005\aK\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5L\0003\6M\0005\aN\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5O\0003\6P\0005\aQ\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5R\0003\6S\0005\aT\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5U\0003\6V\0005\aW\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5X\0003\6Y\0005\aZ\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5[\0003\6\\\0005\a]\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\17File browser\0\asf\1\0\1\tdesc\14Help tags\0\15<leader>vh\1\0\1\tdesc\23Treesitter symbols\0\a;s\1\0\1\tdesc\16Diagnostics\0\a;e\1\0\1\tdesc\17Recent files\0\15<leader>fr\1\0\1\tdesc\18Resume picker\0\a;;\1\0\1\tdesc\fBuffers\0\a\\\\\0\15<leader>fW\1\0\1\tdesc\"Fuzzy search words in project\0\15<leader>fw\1\0\1\tdesc\16Grep search\0\15<leader>ps\1\0\1\tdesc\14Live grep\0\a;r\1\0\1\tdesc\14Git files\0\n<C-S>\1\0\1\tdesc\15Find files\0\15<leader>ff\1\0\1\tdesc%Find files (respects .gitignore)\0\a;f\bset\vkeymap\bvim\19load_extension\15extensions\17file_browser\6n\1\0\1\6n\0\n<C-d>\0\n<C-u>\0\6h\0\6N\1\0\4\6h\0\n<C-u>\0\6N\0\n<C-d>\0\0\1\0\3\17hijack_netrw\2\rmappings\0\ntheme\rdropdown\bfzf\1\0\2\bfzf\0\17file_browser\0\1\0\4\25override_file_sorter\2\28override_generic_sorter\2\14case_mode\15smart_case\nfuzzy\2\fpickers\15find_files\17find_command\1\6\0\0\arg\f--files\r--hidden\v--glob\15!**/.git/*\1\0\2\vhidden\2\17find_command\0\16diagnostics\1\0\2\16diagnostics\0\15find_files\0\1\0\1\19preview_cutoff\3èN\1\0\3\17initial_mode\vnormal\18layout_config\0\ntheme\bivy\rdefaults\1\0\3\15extensions\0\rdefaults\0\fpickers\0\rmappings\6i\1\0\1\6i\0\n<C-k>\28move_selection_previous\n<C-j>\1\0\2\n<C-k>\0\n<C-j>\0\24move_selection_next\18layout_config\vcenter\1\0\3\20prompt_position\btop\vheight\4≥ÊÃô\3≥Êåˇ\3\nwidth\4◊«¬Î\3äÆØˇ\3\rvertical\1\0\4\vheight\4ö≥ÊÃ\tô≥¶ˇ\3\20prompt_position\btop\19preview_cutoff\3(\nwidth\4◊«¬Î\3äÆØˇ\3\15horizontal\1\0\3\rvertical\0\vcenter\0\15horizontal\0\1\0\4\18preview_width\4ö≥ÊÃ\tô≥Üˇ\3\20prompt_position\btop\vheight\4ö≥ÊÃ\tô≥¶ˇ\3\nwidth\4◊«¬Î\3äÆØˇ\3\1\0\a\19color_devicons\1\20layout_strategy\15horizontal\18layout_config\0\rwinblend\3\0\rmappings\0\21sorting_strategy\14ascending\17wrap_results\2\nsetup\22telescope.actions\14telescope\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/telescope.nvim",
    url = "https://github.com/nvim-telescope/telescope.nvim"
  },
  ["toggleterm.nvim"] = {
    config = { "\27LJ\2\nj\0\0\3\0\b\0\0176\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2\6\0\4\0X\1\bÄ\6\0\5\0X\1\6Ä\6\0\6\0X\1\4Ä\6\0\a\0X\1\2Ä+\1\1\0X\2\1Ä+\1\2\0L\1\2\0\6c\bcxx\acc\bcpp\b%:e\vexpand\afn\bvimD\0\1\3\0\1\0\4\18\1\0\0'\2\0\0&\1\2\1L\1\2\0001; echo ''; echo 'Press ENTER to close'; read∞\3\0\0\r\2\24\0009-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\0026\1\0\0009\1\6\0019\1\a\1'\3\t\0B\1\2\0026\2\0\0009\2\6\0029\2\a\2'\4\n\0B\2\2\2'\3\v\0&\2\3\2\a\1\f\0X\3\2Ä'\3\r\0X\4\1Ä'\3\14\0\18\4\3\0'\5\15\0\18\6\2\0'\a\16\0\18\b\0\0&\4\b\0046\5\17\0'\a\18\0B\5\2\0029\5\19\5\18\b\5\0009\6\20\0055\t\21\0-\n\1\0\18\f\4\0B\n\2\2=\n\22\tB\6\3\2\18\t\6\0009\a\23\6B\a\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\6 % -std=c++20 -Wall -Wextra -g -o \bc++\acc\6c\t.out\n%:p:r\b%:e\b%:p\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvim®\2\0\0\t\2\17\0$-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\2'\1\t\0&\0\1\0006\1\n\0'\3\v\0B\1\2\0029\1\f\1\18\4\1\0009\2\r\0015\5\14\0-\6\1\0\18\b\0\0B\6\2\2=\6\15\5B\2\3\2\18\5\2\0009\3\16\2B\3\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\t.out\n%:p:r\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvimΩ\3\0\0\r\2\25\0;-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\0026\1\0\0009\1\6\0019\1\a\1'\3\t\0B\1\2\0026\2\0\0009\2\6\0029\2\a\2'\4\n\0B\2\2\2'\3\v\0&\2\3\2\a\1\f\0X\3\2Ä'\3\r\0X\4\1Ä'\3\14\0\18\4\3\0'\5\15\0\18\6\2\0'\a\16\0\18\b\0\0'\t\17\0\18\n\2\0&\4\n\0046\5\18\0'\a\19\0B\5\2\0029\5\20\5\18\b\5\0009\6\21\0055\t\22\0-\n\1\0\18\f\4\0B\n\2\2=\n\23\tB\6\3\2\18\t\6\0009\a\24\6B\a\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\t && \6 % -std=c++20 -Wall -Wextra -g -o \bc++\acc\6c\t.out\n%:p:r\b%:e\b%:p\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvim›\3\1\0\b\0\21\0$3\0\0\0003\1\1\0006\2\2\0'\4\3\0B\2\2\0029\2\4\0025\4\5\0005\5\6\0=\5\a\4B\2\2\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\f\0003\6\r\0005\a\14\0B\2\5\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\15\0003\6\16\0005\a\17\0B\2\5\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\18\0003\6\19\0005\a\20\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\20Build & Run C++\0\15<leader>cB\1\0\1\tdesc\fRun C++\0\15<leader>cr\1\0\1\tdesc\14Build C++\0\15<leader>cb\6n\bset\vkeymap\bvim\15float_opts\1\0\2\vborder\frounded\rwinblend\3\3\1\0\n\tsize\3\20\14direction\nfloat\15float_opts\0\17persist_size\2\20insert_mappings\2\20start_in_insert\2\19shading_factor\3\2\20shade_terminals\2\17hide_numbers\2\17open_mapping\1\nsetup\15toggleterm\frequire\0\0\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/toggleterm.nvim",
    url = "https://github.com/akinsho/toggleterm.nvim"
  },
  ["tokyonight.nvim"] = {
    config = { "\27LJ\2\nX\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\2\16transparent\2\nstyle\nstorm\nsetup\15tokyonight\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/tokyonight.nvim",
    url = "https://github.com/folke/tokyonight.nvim"
  },
  ["trouble.nvim"] = {
    config = { "\27LJ\2\n¥\2\0\1\5\0\14\00029\1\0\0009\1\1\1\15\0\1\0X\2\1ÄK\0\1\0009\1\0\0009\1\2\1\15\0\1\0X\2\6Ä6\1\3\0'\3\4\0B\1\2\0029\1\5\1B\1\1\1X\1\"Ä9\1\0\0009\1\6\1\15\0\1\0X\1\5Ä9\1\0\0009\1\6\1)\2\0\0\1\2\1\0X\1\25Ä6\1\a\0006\3\b\0009\3\t\0039\3\n\3B\3\1\0A\1\0\2\15\0\1\0X\2\aÄ6\1\3\0'\3\4\0B\1\2\0029\1\v\1'\3\f\0B\1\2\1X\1\5Ä6\1\3\0'\3\4\0B\1\2\0029\1\5\1B\1\1\0016\1\3\0'\3\4\0B\1\2\0029\1\r\1B\1\1\1K\0\1\0\frefresh\rquickfix\topen\14getqflist\afn\bvim\tnext\16failedCount\nclose\ftrouble\frequire\fsuccess\14cancelled\tdataÊ\2\1\0\5\0\16\0\0226\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0006\3\4\0009\3\5\0039\3\6\0039\3\a\3=\3\6\2B\0\2\0016\0\4\0009\0\b\0009\0\t\0'\2\n\0005\3\f\0005\4\v\0=\4\r\0033\4\14\0=\4\15\3B\0\3\1K\0\1\0\rcallback\0\fpattern\1\0\2\fpattern\0\rcallback\0\1\3\0\0\28XcodebuildBuildFinished\28XcodebuildTestsFinished\tUser\24nvim_create_autocmd\bapi\nERROR\rseverity\15diagnostic\bvim\1\0\a\15auto_close\1\18cycle_results\1\tmode\rquickfix\14auto_jump\1\17auto_preview\2\14auto_open\1\rseverity\0\nsetup\ftrouble\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/trouble.nvim",
    url = "https://github.com/folke/trouble.nvim"
  },
  undotree = {
    config = { "\27LJ\2\n]\0\0\5\0\a\0\n6\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0006\4\0\0009\4\5\0049\4\6\4B\0\4\1K\0\1\0\19UndotreeToggle\bcmd\14<leader>u\6n\bset\vkeymap\bvim\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/undotree",
    url = "https://github.com/mbbill/undotree"
  },
  ["vim-apm"] = {
    config = { "\27LJ\2\nY\0\0\b\1\5\0\v6\0\0\0006\2\1\0009\2\2\2'\4\3\0-\5\0\0\18\a\5\0009\5\4\5B\5\2\0A\2\1\0A\0\0\1K\0\1\0\0¿\fget_apm\fAPM: %d\vformat\vstring\nprintê\1\1\0\a\0\n\0\0176\0\0\0'\2\1\0B\0\2\2\18\3\0\0009\1\2\0004\4\0\0B\1\3\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\a\0003\5\b\0005\6\t\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\rShow APM\0\16<leader>apm\6n\bset\vkeymap\bvim\nsetup\fvim-apm\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/vim-apm",
    url = "https://github.com/ThePrimeagen/vim-apm"
  },
  ["vim-dadbod"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/vim-dadbod",
    url = "https://github.com/tpope/vim-dadbod"
  },
  ["vim-dadbod-completion"] = {
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/vim-dadbod-completion",
    url = "https://github.com/kristijanhusak/vim-dadbod-completion"
  },
  ["vim-dadbod-ui"] = {
    commands = { "DBUI", "DBUIToggle", "DBUIAddConnection", "DBUIFindBuffer" },
    config = { "\27LJ\2\ni\0\0\5\0\6\0\b6\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0'\4\5\0B\0\4\1K\0\1\0+<cmd>tabnew<cr><bar><bar><cmd>DBUI<cr>\14<leader>d\6n\bset\vkeymap\bvim\0" },
    loaded = false,
    needs_bufread = true,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/vim-dadbod-ui",
    url = "https://github.com/kristijanhusak/vim-dadbod-ui"
  },
  ["vim-with-me"] = {
    commands = { "WithMe", "WithMeStart", "WithMeStop" },
    loaded = false,
    needs_bufread = false,
    only_cond = false,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/vim-with-me",
    url = "https://github.com/ThePrimeagen/vim-with-me"
  },
  ["xcodebuild.nvim"] = {
    config = { "\27LJ\2\n—\1\0\2\a\1\n\0#6\2\0\0'\4\1\0B\2\2\2-\3\0\0\15\0\3\0X\4\24Ä-\3\0\0=\0\2\3\18\5\0\0009\3\3\0'\6\4\0B\3\3\2\14\0\3\0X\3\20Ä-\3\0\0\18\5\3\0009\3\5\3B\3\2\0011\0\0\0006\3\6\0009\3\a\3\18\5\0\0B\3\2\2\6\3\b\0X\3\tÄ9\3\t\2\18\5\0\0\18\6\1\0B\3\3\1X\3\4Ä9\3\t\2\18\5\0\0\18\6\1\0B\3\3\1K\0\1\0\0Ä\vnotify\5\ttrim\bvim\vfinish\fLoading\tfind\fmessage\vfidget\frequireÕ\1\0\1\6\1\n\0\0216\1\0\0'\3\1\0B\1\2\2-\2\0\0\15\0\2\0X\3\6Ä-\2\0\0'\3\3\0=\3\2\2-\2\0\0=\0\4\2X\2\bÄ9\2\5\0019\2\6\0025\4\a\0=\0\4\0045\5\b\0=\5\t\4B\2\2\2.\0\2\0K\0\1\0\0Ä\15lsp_client\1\0\1\tname\20xcodebuild.nvim\1\0\2\fmessage\0\15lsp_client\0\vcreate\vhandle\fmessage\5\ntitle\20fidget.progress\frequireÒ\20\1\0\b\0R\0∫\1+\0\0\0006\1\0\0'\3\1\0B\1\2\0026\2\0\0'\4\2\0B\2\2\0029\2\3\0025\4\4\0005\5\5\0003\6\6\0=\6\a\0053\6\b\0=\6\t\5=\5\n\0045\5\v\0=\5\f\4B\2\2\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\17\0'\6\18\0005\a\19\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\20\0'\6\21\0005\a\22\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\23\0'\6\24\0005\a\25\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\26\0'\6\27\0005\a\28\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\29\0'\6\30\0005\a\31\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5 \0'\6!\0005\a\"\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4#\0'\5 \0'\6$\0005\a%\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5&\0'\6'\0005\a(\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5)\0'\6*\0005\a+\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5,\0'\6-\0005\a.\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5/\0'\0060\0005\a1\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0052\0'\0063\0005\a4\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0055\0'\0066\0005\a7\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0058\0'\0069\0005\a:\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5;\0'\6<\0005\a=\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5>\0'\6?\0005\a@\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5A\0'\6B\0005\aC\0B\2\5\0016\2\r\0009\2D\0029\2E\2'\4F\0009\5G\0015\6H\0B\2\4\0016\2\r\0009\2D\0029\2E\2'\4I\0009\5J\0015\6K\0B\2\4\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5L\0'\6M\0005\aN\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5O\0'\6P\0005\aQ\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc Clean up simulator runtimes)<cmd>XcodebuildCleanupSimulators<cr>\15<leader>xZ\1\0\1\tdesc\26Auto-select simulator\"<cmd>XcodebuildAutoDevice<cr>\15<leader>xz\1\0\1\tdesc7Remove unused simulator runtimes (asks permission)\23cleanup_simulators XcodebuildCleanupSimulators\1\0\1\tdesc*Auto-select first available simulator\23auto_select_device\25XcodebuildAutoDevice\29nvim_create_user_command\bapi\1\0\1\tdesc\22Show Code Actions#<cmd>XcodebuildCodeActions<cr>\15<leader>xa\1\0\1\tdesc\18Quickfix Line$<cmd>XcodebuildQuickfixLine<cr>\15<leader>xx\1\0\1\tdesc\21Select Test Plan&<cmd>XcodebuildSelectTestPlan<cr>\15<leader>xp\1\0\1\tdesc\18Select Device$<cmd>XcodebuildSelectDevice<cr>\15<leader>xd\1\0\1\tdesc\27Show Failing Snapshots(<cmd>XcodebuildFailingSnapshots<cr>\15<leader>xs\1\0\1\tdesc\25Toggle Test Explorer*<cmd>XcodebuildTestExplorerToggle<cr>\15<leader>xe\1\0\1\tdesc\30Show Code Coverage Report.<cmd>XcodebuildShowCodeCoverageReport<cr>\15<leader>xC\1\0\1\tdesc\25Toggle Code Coverage*<cmd>XcodebuildToggleCodeCoverage<cr>\15<leader>xc\1\0\1\tdesc\27Toggle Xcodebuild Logs\"<cmd>XcodebuildToggleLogs<cr>\15<leader>xl\1\0\1\tdesc\24Run This Test Class!<cmd>XcodebuildTestClass<cr>\15<leader>xT\1\0\1\tdesc\23Run Selected Tests$<cmd>XcodebuildTestSelected<cr>\6v\1\0\1\tdesc\14Run Tests\28<cmd>XcodebuildTest<cr>\15<leader>xt\1\0\1\tdesc\24Build & Run Project <cmd>XcodebuildBuildRun<cr>\15<leader>xr\1\0\1\tdesc\22Build For Testing'<cmd>XcodebuildBuildForTesting<cr>\15<leader>xB\1\0\1\tdesc\18Build Project\29<cmd>XcodebuildBuild<cr>\15<leader>xb\1\0\1\tdesc!Show Project Manager Actions&<cmd>XcodebuildProjectManager<cr>\15<leader>xf\1\0\1\tdesc\28Show Xcodebuild Actions\30<cmd>XcodebuildPicker<cr>\14<leader>X\6n\bset\vkeymap\bvim\18code_coverage\1\0\1\fenabled\2\tlogs\20notify_progress\0\vnotify\0\1\0\t\30auto_open_on_failed_tests\1\31auto_open_on_success_tests\1\vnotify\0\20notify_progress\0\17only_summary\2\29auto_close_on_app_launch\2\15auto_focus\1\30auto_open_on_failed_build\1\31auto_open_on_success_build\1\1\0\3\18code_coverage\0\tlogs\0\28show_build_progress_bar\1\nsetup\15xcodebuild\22config.xcodebuild\frequire\0" },
    loaded = true,
    path = "/Users/ansh/.local/share/nvim-packer/site/pack/packer/start/xcodebuild.nvim",
    url = "https://github.com/wojciech-kulik/xcodebuild.nvim"
  }
}

time([[Defining packer_plugins]], false)
local module_lazy_loads = {
  ["^oil"] = "oil.nvim",
  ["^vim%-with%-me"] = "vim-with-me"
}
local lazy_load_called = {['packer.load'] = true}
local function lazy_load_module(module_name)
  local to_load = {}
  if lazy_load_called[module_name] then return nil end
  lazy_load_called[module_name] = true
  for module_pat, plugin_name in pairs(module_lazy_loads) do
    if not _G.packer_plugins[plugin_name].loaded and string.match(module_name, module_pat) then
      to_load[#to_load + 1] = plugin_name
    end
  end

  if #to_load > 0 then
    require('packer.load')(to_load, {module = module_name}, _G.packer_plugins)
    local loaded_mod = package.loaded[module_name]
    if loaded_mod then
      return function(modname) return loaded_mod end
    end
  end
end

if not vim.g.packer_custom_loader_enabled then
  table.insert(package.loaders, 1, lazy_load_module)
  vim.g.packer_custom_loader_enabled = true
end

-- Setup for: vim-dadbod-ui
time([[Setup for vim-dadbod-ui]], true)
try_loadstring("\27LJ\2\n6\0\0\2\0\3\0\0056\0\0\0009\0\1\0)\1\1\0=\1\2\0K\0\1\0\25db_ui_use_nerd_fonts\6g\bvim\0", "setup", "vim-dadbod-ui")
time([[Setup for vim-dadbod-ui]], false)
-- Config for: fidget.nvim
time([[Config for fidget.nvim]], true)
try_loadstring("\27LJ\2\n˝\1\0\0\5\0\b\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\4\0005\4\3\0=\4\5\3=\3\a\2B\0\2\1K\0\1\0\17notification\1\0\1\17notification\0\vwindow\1\0\1\vwindow\0\1\0\n\15max_height\3\0\rrelative\veditor\rwinblend\3\0\nalign\vbottom\14y_padding\3\1\14x_padding\3\1\14normal_hl\vString\vborder\frounded\vzindex\3-\14max_width\3\0\nsetup\vfidget\frequire\0", "config", "fidget.nvim")
time([[Config for fidget.nvim]], false)
-- Config for: toggleterm.nvim
time([[Config for toggleterm.nvim]], true)
try_loadstring("\27LJ\2\nj\0\0\3\0\b\0\0176\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2\6\0\4\0X\1\bÄ\6\0\5\0X\1\6Ä\6\0\6\0X\1\4Ä\6\0\a\0X\1\2Ä+\1\1\0X\2\1Ä+\1\2\0L\1\2\0\6c\bcxx\acc\bcpp\b%:e\vexpand\afn\bvimD\0\1\3\0\1\0\4\18\1\0\0'\2\0\0&\1\2\1L\1\2\0001; echo ''; echo 'Press ENTER to close'; read∞\3\0\0\r\2\24\0009-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\0026\1\0\0009\1\6\0019\1\a\1'\3\t\0B\1\2\0026\2\0\0009\2\6\0029\2\a\2'\4\n\0B\2\2\2'\3\v\0&\2\3\2\a\1\f\0X\3\2Ä'\3\r\0X\4\1Ä'\3\14\0\18\4\3\0'\5\15\0\18\6\2\0'\a\16\0\18\b\0\0&\4\b\0046\5\17\0'\a\18\0B\5\2\0029\5\19\5\18\b\5\0009\6\20\0055\t\21\0-\n\1\0\18\f\4\0B\n\2\2=\n\22\tB\6\3\2\18\t\6\0009\a\23\6B\a\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\6 % -std=c++20 -Wall -Wextra -g -o \bc++\acc\6c\t.out\n%:p:r\b%:e\b%:p\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvim®\2\0\0\t\2\17\0$-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\2'\1\t\0&\0\1\0006\1\n\0'\3\v\0B\1\2\0029\1\f\1\18\4\1\0009\2\r\0015\5\14\0-\6\1\0\18\b\0\0B\6\2\2=\6\15\5B\2\3\2\18\5\2\0009\3\16\2B\3\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\t.out\n%:p:r\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvimΩ\3\0\0\r\2\25\0;-\0\0\0B\0\1\2\14\0\0\0X\0\tÄ6\0\0\0009\0\1\0'\2\2\0006\3\0\0009\3\3\0039\3\4\0039\3\5\3B\0\3\1K\0\1\0006\0\0\0009\0\6\0009\0\a\0'\2\b\0B\0\2\0026\1\0\0009\1\6\0019\1\a\1'\3\t\0B\1\2\0026\2\0\0009\2\6\0029\2\a\2'\4\n\0B\2\2\2'\3\v\0&\2\3\2\a\1\f\0X\3\2Ä'\3\r\0X\4\1Ä'\3\14\0\18\4\3\0'\5\15\0\18\6\2\0'\a\16\0\18\b\0\0'\t\17\0\18\n\2\0&\4\n\0046\5\18\0'\a\19\0B\5\2\0029\5\20\5\18\b\5\0009\6\21\0055\t\22\0-\n\1\0\18\f\4\0B\n\2\2=\n\23\tB\6\3\2\18\t\6\0009\a\24\6B\a\2\1K\0\1\0\0¿\1¿\vtoggle\bcmd\1\0\2\bcmd\0\14direction\nfloat\bnew\rTerminal\24toggleterm.terminal\frequire\t && \6 % -std=c++20 -Wall -Wextra -g -o \bc++\acc\6c\t.out\n%:p:r\b%:e\b%:p\vexpand\afn\tWARN\vlevels\blog\21Not a C/C++ file\vnotify\bvim›\3\1\0\b\0\21\0$3\0\0\0003\1\1\0006\2\2\0'\4\3\0B\2\2\0029\2\4\0025\4\5\0005\5\6\0=\5\a\4B\2\2\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\f\0003\6\r\0005\a\14\0B\2\5\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\15\0003\6\16\0005\a\17\0B\2\5\0016\2\b\0009\2\t\0029\2\n\2'\4\v\0'\5\18\0003\6\19\0005\a\20\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\20Build & Run C++\0\15<leader>cB\1\0\1\tdesc\fRun C++\0\15<leader>cr\1\0\1\tdesc\14Build C++\0\15<leader>cb\6n\bset\vkeymap\bvim\15float_opts\1\0\2\vborder\frounded\rwinblend\3\3\1\0\n\tsize\3\20\14direction\nfloat\15float_opts\0\17persist_size\2\20insert_mappings\2\20start_in_insert\2\19shading_factor\3\2\20shade_terminals\2\17hide_numbers\2\17open_mapping\1\nsetup\15toggleterm\frequire\0\0\0", "config", "toggleterm.nvim")
time([[Config for toggleterm.nvim]], false)
-- Config for: nvim
time([[Config for nvim]], true)
try_loadstring("\27LJ\2\nÜ\f\0\1\4\0>\0@5\1\1\0005\2\0\0=\2\2\0015\2\4\0009\3\3\0=\3\5\2=\2\6\0015\2\a\0=\2\b\0015\2\t\0=\2\n\0015\2\v\0=\2\f\0015\2\14\0009\3\r\0=\3\5\2=\2\15\0015\2\16\0=\2\17\0015\2\18\0=\2\19\0015\2\20\0=\2\21\0015\2\22\0=\2\23\0015\2\24\0=\2\25\0015\2\26\0=\2\27\0015\2\28\0=\2\29\0015\2\30\0=\2\31\0015\2 \0=\2!\0015\2\"\0=\2#\0015\2$\0=\2%\0015\2&\0=\2'\0015\2(\0=\2)\0015\2*\0=\2+\0015\2,\0=\2-\0015\2/\0009\3.\0=\0030\2=\0021\0015\0022\0=\0023\0015\0024\0=\0025\0015\0026\0=\0027\0015\0028\0=\0029\0015\2:\0=\2;\0015\2<\0=\2=\1L\1\2\0\15LazyNormal\1\0\1\abg\tNONE\16MasonNormal\1\0\1\abg\tNONE\21NotifyBackground\1\0\1\abg\tNONE\18WhichKeyFloat\1\0\1\abg\tNONE\18LspInfoBorder\1\0\1\abg\tNONE\16PmenuBorder\1\0\1\abg\tNONE\rPmenuSel\abg\1\0\1\abg\0\rsurface0\nPmenu\1\0\1\abg\tNONE\15FloatTitle\1\0\1\abg\tNONE\16FloatBorder\1\0\1\abg\tNONE\16NormalFloat\1\0\1\abg\tNONE\26TelescopePreviewTitle\1\0\1\abg\tNONE\27TelescopePreviewBorder\1\0\1\abg\tNONE\27TelescopePreviewNormal\1\0\1\abg\tNONE\26TelescopeResultsTitle\1\0\1\abg\tNONE\27TelescopeResultsBorder\1\0\1\abg\tNONE\27TelescopeResultsNormal\1\0\1\abg\tNONE\25TelescopePromptTitle\1\0\1\abg\tNONE\26TelescopePromptBorder\1\0\1\abg\tNONE\26TelescopePromptNormal\1\0\1\abg\tNONE\20TelescopeBorder\1\0\1\abg\tNONE\20TelescopeNormal\1\0\1\abg\tNONE\15MatchParen\1\0\3\abg\tNONE\afg\0\tbold\2\npeach\22LspReferenceWrite\1\0\1\abg\tNONE\21LspReferenceRead\1\0\1\abg\tNONE\21LspReferenceText\1\0\1\abg\tNONE\17CursorLineNr\afg\1\0\2\abg\tNONE\afg\0\rlavender\15CursorLine\1\0\28\27TelescopeResultsNormal\0\25TelescopePromptTitle\0\26TelescopePromptBorder\0\26TelescopePromptNormal\0\20TelescopeBorder\0\20TelescopeNormal\0\26TelescopeResultsTitle\0\15MatchParen\0\27TelescopeResultsBorder\0\21LspReferenceText\0\15CursorLine\0\18WhichKeyFloat\0\21NotifyBackground\0\15LazyNormal\0\16MasonNormal\0\17CursorLineNr\0\16FloatBorder\0\18LspInfoBorder\0\16PmenuBorder\0\16NormalFloat\0\rPmenuSel\0\nPmenu\0\15FloatTitle\0\26TelescopePreviewTitle\0\27TelescopePreviewBorder\0\27TelescopePreviewNormal\0\22LspReferenceWrite\0\21LspReferenceRead\0\1\0\1\abg\tNONEù\1\0\1\4\0\a\0\0166\1\0\0009\1\1\0019\1\2\0019\3\3\0009\3\4\3B\1\2\2\15\0\1\0X\2\aÄ9\2\5\0019\2\6\2\15\0\2\0X\3\3Ä9\2\5\1+\3\1\0=\3\6\2K\0\1\0\30documentHighlightProvider\24server_capabilities\14client_id\tdata\21get_client_by_id\blsp\bvim˝\n\1\0\a\0:\0O6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\a\0005\4\6\0=\4\b\0035\4\t\0=\4\n\0034\4\0\0=\4\v\0034\4\0\0=\4\f\0034\4\0\0=\4\r\0034\4\0\0=\4\14\0034\4\0\0=\4\15\0034\4\0\0=\4\16\0034\4\0\0=\4\17\0034\4\0\0=\4\18\0034\4\0\0=\4\19\0034\4\0\0=\4\20\3=\3\21\0024\3\0\0=\3\22\0023\3\23\0=\3\24\0025\3\25\0005\4\26\0=\4\27\0035\4\28\0=\4\29\0035\4\30\0005\5 \0005\6\31\0=\6!\0055\6\"\0=\6#\0055\6$\0=\6%\0055\6&\0=\6'\5=\5(\0045\5*\0005\6)\0=\6!\0055\6+\0=\6#\0055\6,\0=\6%\0055\6-\0=\6'\5=\5.\4=\4/\3=\0030\2B\0\2\0016\0001\0009\0002\0+\1\1\0=\0013\0006\0001\0009\0004\0009\0005\0'\0026\0005\0038\0003\0047\0=\0049\3B\0\3\1K\0\1\0\rcallback\1\0\1\rcallback\0\0\14LspAttach\24nvim_create_autocmd\bapi\15cursorline\bopt\bvim\17integrations\15native_lsp\15underlines\1\2\0\0\14underline\1\2\0\0\14underline\1\2\0\0\14underline\1\0\4\verrors\0\rwarnings\0\16information\0\nhints\0\1\2\0\0\14underline\17virtual_text\16information\1\2\0\0\vitalic\rwarnings\1\2\0\0\vitalic\nhints\1\2\0\0\vitalic\verrors\1\0\4\verrors\0\rwarnings\0\16information\0\nhints\0\1\2\0\0\vitalic\1\0\3\17virtual_text\0\fenabled\2\15underlines\0\14telescope\1\0\1\fenabled\2\tmini\1\0\2\22indentscope_color\5\fenabled\2\1\0\t\15treesitter\2\nmason\2\vnotify\2\15native_lsp\0\14which_key\2\14telescope\0\tmini\0\rgitsigns\2\bcmp\2\22custom_highlights\0\20color_overrides\vstyles\14operators\ntypes\15properties\rbooleans\fnumbers\14variables\fstrings\rkeywords\14functions\nloops\17conditionals\1\2\0\0\vitalic\rcomments\1\0\f\fnumbers\0\14variables\0\fstrings\0\rkeywords\0\14functions\0\nloops\0\17conditionals\0\rcomments\0\ntypes\0\15properties\0\14operators\0\rbooleans\0\1\2\0\0\vitalic\17dim_inactive\1\0\3\15percentage\4≥ÊÃô\3≥Êå˛\3\fenabled\1\nshade\tdark\1\0\f\17integrations\0\fflavour\vfrappe\20color_overrides\0\22custom_highlights\0\vstyles\0\17no_underline\1\fno_bold\1\14no_italic\1\17dim_inactive\0\16term_colors\1\23show_end_of_buffer\1\27transparent_background\2\nsetup\15catppuccin\frequire\0", "config", "nvim")
time([[Config for nvim]], false)
-- Config for: nightfox.nvim
time([[Config for nightfox.nvim]], true)
try_loadstring("\27LJ\2\nJ\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\rnightfox\frequire\0", "config", "nightfox.nvim")
time([[Config for nightfox.nvim]], false)
-- Config for: tokyonight.nvim
time([[Config for tokyonight.nvim]], true)
try_loadstring("\27LJ\2\nX\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\2\16transparent\2\nstyle\nstorm\nsetup\15tokyonight\frequire\0", "config", "tokyonight.nvim")
time([[Config for tokyonight.nvim]], false)
-- Config for: trouble.nvim
time([[Config for trouble.nvim]], true)
try_loadstring("\27LJ\2\n¥\2\0\1\5\0\14\00029\1\0\0009\1\1\1\15\0\1\0X\2\1ÄK\0\1\0009\1\0\0009\1\2\1\15\0\1\0X\2\6Ä6\1\3\0'\3\4\0B\1\2\0029\1\5\1B\1\1\1X\1\"Ä9\1\0\0009\1\6\1\15\0\1\0X\1\5Ä9\1\0\0009\1\6\1)\2\0\0\1\2\1\0X\1\25Ä6\1\a\0006\3\b\0009\3\t\0039\3\n\3B\3\1\0A\1\0\2\15\0\1\0X\2\aÄ6\1\3\0'\3\4\0B\1\2\0029\1\v\1'\3\f\0B\1\2\1X\1\5Ä6\1\3\0'\3\4\0B\1\2\0029\1\5\1B\1\1\0016\1\3\0'\3\4\0B\1\2\0029\1\r\1B\1\1\1K\0\1\0\frefresh\rquickfix\topen\14getqflist\afn\bvim\tnext\16failedCount\nclose\ftrouble\frequire\fsuccess\14cancelled\tdataÊ\2\1\0\5\0\16\0\0226\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0006\3\4\0009\3\5\0039\3\6\0039\3\a\3=\3\6\2B\0\2\0016\0\4\0009\0\b\0009\0\t\0'\2\n\0005\3\f\0005\4\v\0=\4\r\0033\4\14\0=\4\15\3B\0\3\1K\0\1\0\rcallback\0\fpattern\1\0\2\fpattern\0\rcallback\0\1\3\0\0\28XcodebuildBuildFinished\28XcodebuildTestsFinished\tUser\24nvim_create_autocmd\bapi\nERROR\rseverity\15diagnostic\bvim\1\0\a\15auto_close\1\18cycle_results\1\tmode\rquickfix\14auto_jump\1\17auto_preview\2\14auto_open\1\rseverity\0\nsetup\ftrouble\frequire\0", "config", "trouble.nvim")
time([[Config for trouble.nvim]], false)
-- Config for: undotree
time([[Config for undotree]], true)
try_loadstring("\27LJ\2\n]\0\0\5\0\a\0\n6\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0006\4\0\0009\4\5\0049\4\6\4B\0\4\1K\0\1\0\19UndotreeToggle\bcmd\14<leader>u\6n\bset\vkeymap\bvim\0", "config", "undotree")
time([[Config for undotree]], false)
-- Config for: incline.nvim
time([[Config for incline.nvim]], true)
try_loadstring("\27LJ\2\n«\3\0\1\n\0\25\00196\1\0\0009\1\1\0019\1\2\0016\3\0\0009\3\3\0039\3\4\0039\5\5\0B\3\2\2'\4\6\0B\1\3\0026\2\a\0'\4\b\0B\2\2\0029\2\t\2\18\4\1\0B\2\2\0026\3\0\0009\3\3\0039\3\n\3)\5\0\0005\6\v\0B\3\3\0029\4\f\3\14\0\4\0X\5\1Ä)\4\0\0009\5\r\3\14\0\5\0X\6\1Ä*\5\0\0006\6\0\0009\6\14\0069\a\5\0008\6\a\0069\6\15\0065\a\20\0\15\0\2\0X\b\6Ä5\b\16\0>\2\2\b=\4\17\b=\5\18\b\14\0\b\0X\t\1Ä'\b\19\0>\b\1\a5\b\22\0>\1\1\b\15\0\6\0X\t\2Ä'\t\21\0X\n\1Ä'\t\23\0=\t\24\b>\b\3\a=\4\17\aL\a\2\0\bgui\tbold\1\0\1\bgui\0\16bold,italic\1\5\1\0\0\6 \0\6 \nguibg\0\5\nguifg\nguibg\1\4\2\0\6 \0\6 \nguibg\0\nguifg\0\rmodified\abo\afg\abg\1\0\2\tlink\1\tname\vNormal\16nvim_get_hl\rget_icon\22nvim-web-devicons\frequire\a:t\bbuf\22nvim_buf_get_name\bapi\16fnamemodify\afn\bvim˛ˇˇ\15ü\1\1\0\5\0\n\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\3\0005\4\4\0=\4\5\3=\3\a\0023\3\b\0=\3\t\2B\0\2\1K\0\1\0\vrender\0\vwindow\1\0\2\vrender\0\vwindow\0\vmargin\1\0\1\15horizontal\3\0\1\0\2\fpadding\3\0\vmargin\0\nsetup\fincline\frequire\0", "config", "incline.nvim")
time([[Config for incline.nvim]], false)
-- Config for: kanagawa.nvim
time([[Config for kanagawa.nvim]], true)
try_loadstring("\27LJ\2\nJ\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\rkanagawa\frequire\0", "config", "kanagawa.nvim")
time([[Config for kanagawa.nvim]], false)
-- Config for: blink.cmp
time([[Config for blink.cmp]], true)
try_loadstring("\27LJ\2\nõ\1\0\1\a\0\t\0\0196\1\0\0006\3\1\0009\3\2\0039\3\3\3\18\4\0\0B\1\3\3\14\0\1\0X\3\nÄ6\3\1\0009\3\4\3'\5\5\0\18\6\2\0&\5\6\0056\6\1\0009\6\6\0069\6\a\0069\6\b\6B\3\3\1K\0\1\0\tWARN\vlevels\blog\28Snippet expand failed: \vnotify\vexpand\fsnippet\bvim\npcallÆ\b\1\0\a\0005\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\6\0005\3\3\0003\4\4\0=\4\5\3=\3\a\0025\3\b\0=\3\t\0025\3\r\0005\4\v\0005\5\n\0=\5\f\4=\4\14\0035\4\18\0005\5\16\0005\6\15\0=\6\17\5=\5\19\4=\4\20\0035\4\21\0=\4\22\0035\4\26\0006\5\23\0009\5\24\0059\5\25\5=\5\27\4=\4\28\3=\3\29\0025\3\31\0005\4\30\0=\4 \3=\3!\0025\3\"\0005\4$\0005\5#\0=\5%\0045\5&\0=\5'\4=\4(\3=\3)\0025\3*\0005\4+\0=\4%\0035\4,\0=\4'\0035\4-\0=\4.\3=\3(\0025\0030\0005\4/\0=\0041\0035\0042\0=\0043\3=\0034\2B\0\2\1K\0\1\0\nfuzzy\nsorts\1\4\0\0\nscore\14sort_text\tkind\rfrecency\1\0\3\nsorts\0\18use_proximity\2\rfrecency\0\1\0\1\fenabled\2\n<C-y>\1\2\0\0\22select_and_accept\1\3\0\0\16select_prev\rfallback\1\3\0\0\16select_next\rfallback\1\0\6\n<C-n>\0\n<C-y>\0\n<C-p>\0\vpreset\nenter\n<C-k>\0\n<C-j>\0\fcmdline\vkeymap\n<C-k>\1\2\0\0\16select_prev\n<C-j>\1\0\2\n<C-k>\0\n<C-j>\0\1\2\0\0\16select_next\1\0\2\vkeymap\0\fenabled\2\fsources\fdefault\1\0\1\fdefault\0\1\5\0\0\blsp\tpath\rsnippets\vbuffer\15completion\15ghost_text\fenabled\1\0\1\fenabled\0\vai_cmp\6g\bvim\18documentation\1\0\2\23auto_show_delay_ms\3»\1\14auto_show\2\tmenu\tdraw\1\0\1\tdraw\0\15treesitter\1\0\1\15treesitter\0\1\2\0\0\blsp\vaccept\1\0\4\18documentation\0\tmenu\0\vaccept\0\15ghost_text\0\18auto_brackets\1\0\1\18auto_brackets\0\1\0\1\fenabled\2\15appearance\1\0\2\28use_nvim_cmp_as_default\1\22nerd_font_variant\tmono\rsnippets\1\0\a\fsources\0\15appearance\0\fcmdline\0\15completion\0\rsnippets\0\vkeymap\0\nfuzzy\0\vexpand\0\1\0\2\vexpand\0\vpreset\fdefault\nsetup\14blink.cmp\frequire\0", "config", "blink.cmp")
time([[Config for blink.cmp]], false)
-- Config for: koda.nvim
time([[Config for koda.nvim]], true)
try_loadstring("\27LJ\2\nG\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0B\0\2\1K\0\1\0\14koda-dark\nsetup\16config.koda\frequire\0", "config", "koda.nvim")
time([[Config for koda.nvim]], false)
-- Config for: mini.pairs
time([[Config for mini.pairs]], true)
try_loadstring("\27LJ\2\n8\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\15mini.pairs\frequire\0", "config", "mini.pairs")
time([[Config for mini.pairs]], false)
-- Config for: nvim-web-devicons
time([[Config for nvim-web-devicons]], true)
try_loadstring("\27LJ\2\nO\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\fdefault\2\nsetup\22nvim-web-devicons\frequire\0", "config", "nvim-web-devicons")
time([[Config for nvim-web-devicons]], false)
-- Config for: nvim-lspconfig
time([[Config for nvim-lspconfig]], true)
try_loadstring("\27LJ\2\nÖ\1\2\0\6\0\a\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0'\3\4\0'\4\5\0'\5\6\0B\0\5\2G\2\0\0C\0\0\0\t.git\18jsconfig.json\18tsconfig.json\17package.json\17root_pattern\19lspconfig.util\frequireÛ\2\0\1\r\0\15\00096\1\0\0'\3\1\0B\1\2\0029\2\2\1'\4\3\0'\5\4\0B\2\3\2\18\4\0\0B\2\2\2\15\0\2\0X\3\1ÄL\2\2\0006\3\5\0009\3\6\0039\3\a\3\18\5\0\0B\3\2\2\15\0\3\0X\4!Ä\6\3\b\0X\4\31ÄU\4\30Ä6\4\5\0009\4\6\0049\4\t\4\18\6\3\0B\4\2\4X\a\15Ä\a\b\n\0X\t\rÄ\18\v\a\0009\t\v\a'\f\f\0B\t\3\2\14\0\t\0X\n\6Ä\18\v\a\0009\t\v\a'\f\r\0B\t\3\2\15\0\t\0X\n\1ÄL\3\2\0E\a\3\3R\aÔ\1276\4\5\0009\4\6\0049\4\a\4\18\6\3\0B\4\2\2\18\3\4\0X\4›\1279\4\2\1'\6\14\0B\4\2\2\18\6\0\0D\4\2\0\t.git\19%.xcworkspace$\17%.xcodeproj$\tfind\14directory\bdir\6/\fdirname\afs\bvim\18Package.swift\21buildServer.json\17root_pattern\19lspconfig.util\frequirek\0\2\4\0\5\0\0166\2\0\0009\2\1\0028\2\1\2)\3\4\0=\3\2\0026\2\0\0009\2\1\0028\2\1\2)\3\4\0=\3\3\0026\2\0\0009\2\1\0028\2\1\2+\3\2\0=\3\4\2K\0\1\0\14expandtab\15shiftwidth\ftabstop\abo\bvim™\1\2\0\a\0\b\0\f6\0\0\0'\2\1\0B\0\2\0029\0\2\0'\2\3\0'\3\4\0'\4\5\0'\5\6\0'\6\a\0B\0\6\2G\2\0\0C\0\0\0\t.git\22postcss.config.ts\22postcss.config.js\23tailwind.config.ts\23tailwind.config.js\17root_pattern\19lspconfig.util\frequireô\1\0\1\5\0\t\0\0186\1\0\0'\3\1\0B\1\2\0029\1\2\1'\3\3\0'\4\4\0B\1\3\2\18\3\0\0B\1\2\2\14\0\1\0X\2\6Ä6\1\5\0009\1\6\0019\1\a\1\18\3\0\0'\4\b\0B\1\3\2L\1\2\0\a:h\16fnamemodify\afn\bvim\t.git\15typst.toml\17root_pattern\19lspconfig.util\frequire∫\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand!tinymist.startDefaultPreview\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4|\0\0\4\0\6\0\t6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\0\0=\3\5\2B\0\2\1K\0\1\0\14arguments\1\0\2\fcommand\25tinymist.stopPreview\14arguments\0\20execute_command\bbuf\blsp\bvim∞\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand\23tinymist.exportPdf\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4∞\1\0\0\a\1\b\1\0156\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0004\3\3\0006\4\0\0009\4\5\0049\4\6\4-\6\0\0B\4\2\0?\4\0\0=\3\a\2B\0\2\1K\0\1\0\1¿\14arguments\22nvim_buf_get_name\bapi\1\0\2\fcommand\23tinymist.exportSvg\14arguments\0\20execute_command\bbuf\blsp\bvim\3ÄÄ¿ô\4y\0\0\5\0\b\0\0156\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2'\1\4\0&\0\1\0006\1\0\0009\1\1\0019\1\5\0015\3\6\0>\0\2\0035\4\a\0B\1\3\1K\0\1\0\1\0\1\vdetach\2\1\2\0\0\vsioyek\rjobstart\t.pdf\b%:r\vexpand\afn\bvim \3\1\2\b\0\20\0/6\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\4\0003\6\5\0005\a\6\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\b\0003\6\t\0005\a\n\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\v\0003\6\f\0005\a\r\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\14\0003\6\15\0005\a\16\0=\1\a\aB\2\5\0016\2\0\0009\2\1\0029\2\2\2'\4\3\0'\5\17\0003\6\18\0005\a\19\0=\1\a\aB\2\5\0012\0\0ÄK\0\1\0\1\0\2\tdesc\26Typst: open in sioyek\vbuffer\0\0\15<leader>tv\1\0\2\tdesc\22Typst: export SVG\vbuffer\0\0\15<leader>ts\1\0\2\tdesc\22Typst: export PDF\vbuffer\0\0\15<leader>te\1\0\2\tdesc\24Typst: stop preview\vbuffer\0\0\15<leader>tP\vbuffer\1\0\2\tdesc\25Typst: start preview\vbuffer\0\0\15<leader>tp\6n\bset\vkeymap\bvimê\1\0\0\4\0\t\0\0146\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\3\0009\0\4\0'\2\5\0006\3\3\0009\3\6\0039\3\a\0039\3\b\3B\0\3\1K\0\1\0\tINFO\vlevels\blog\27LSP servers configured\vnotify\bvim\nsetup\21config.lsp_setup\frequire»\2\0\0\b\0\r\1\0306\0\0\0006\2\1\0009\2\2\0029\2\3\0025\4\4\0B\2\2\0A\0\0\4X\3\aÄ\18\a\4\0009\5\5\4B\5\2\0016\5\1\0009\5\6\5'\a\a\0B\5\2\1E\3\3\3R\3˜\1276\0\1\0009\0\b\0009\0\t\0'\2\n\0B\0\2\2\t\0\0\0X\0\5Ä6\0\1\0009\0\b\0009\0\v\0005\2\f\0B\0\2\1K\0\1\0\1\4\0\0\23xcode-build-server\vconfig\15-overwrite\rjobstart\23xcode-build-server\15executable\afn@sourcekit-lsp stopped, will restart on next Swift file open\vnotify\tstop\1\0\1\tname\14sourcekit\16get_clients\blsp\bvim\vipairs\2©\3\0\0\v\0\20\00216\0\0\0009\0\1\0009\0\2\0005\2\3\0B\0\2\2\21\1\0\0\t\1\0\0X\1\tÄ6\1\0\0009\1\4\1'\3\5\0006\4\0\0009\4\6\0049\4\a\0049\4\b\4B\1\3\1K\0\1\0:\1\1\0009\2\t\0019\2\n\2\14\0\2\0X\3\1Ä'\2\v\0006\3\0\0009\3\f\0039\3\r\3\18\5\2\0'\6\14\0&\5\6\5B\3\2\2\b\3\1\0X\3\2Ä+\3\1\0X\4\1Ä+\3\2\0006\4\0\0009\4\4\0046\6\15\0009\6\16\6'\b\17\0\18\t\2\0\15\0\3\0X\n\2Ä'\n\18\0X\v\1Ä'\n\19\0B\6\4\0A\4\0\1K\0\1\0\ano\byes=sourcekit-lsp: running\n  Root: %s\n  buildServer.json: %s\vformat\vstring\22/buildServer.json\17filereadable\afn\bN/A\rroot_dir\vconfig\tWARN\vlevels\blog\31sourcekit-lsp: NOT running\vnotify\1\0\1\tname\14sourcekit\16get_clients\blsp\bvim\0\2v\0\4\v\1\6\0\f6\4\0\0009\4\1\0049\4\2\4\18\6\0\0\18\a\1\0\18\b\2\0005\t\3\0-\n\0\0=\n\4\t=\3\5\tB\4\5\1K\0\1\0\1¿\tdesc\vbuffer\1\0\4\tdesc\0\vbuffer\0\fnoremap\2\vsilent\2\bset\vkeymap\bvimK\0\0\4\0\4\0\a6\0\0\0009\0\1\0009\0\2\0)\2\0\0005\3\3\0B\0\3\1K\0\1\0\1\0\1\nscope\tline\15open_float\15diagnostic\bvimz\0\0\5\0\t\0\v6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\a\0005\3\5\0005\4\4\0=\4\6\3=\3\b\2B\0\2\1K\0\1\0\fcontext\1\0\1\fcontext\0\tonly\1\0\1\tonly\0\1\2\0\0\rquickfix\16code_action\bbuf\blsp\bvimÜ\2\0\0\5\0\v\0\0286\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\a\0005\3\5\0005\4\4\0=\4\6\3=\3\b\2B\0\2\2\15\0\0\0X\1\tÄ6\1\0\0009\1\t\0019\3\n\0\14\0\3\0X\4\1Ä4\3\0\0B\1\2\2\15\0\1\0X\2\6Ä6\1\0\0009\1\1\0019\1\2\0019\1\3\1B\1\1\2\18\0\1\0K\0\1\0\vresult\16tbl_isempty\fcontext\1\0\1\fcontext\0\tonly\1\0\1\tonly\0\1\4\0\0\27source.organizeImports\29source.addMissingImports\18source.fixAll\16code_action\bbuf\blsp\bvim@\0\0\3\0\5\0\a6\0\0\0009\0\1\0009\0\2\0009\0\3\0005\2\4\0B\0\2\1K\0\1\0\1\0\1\nasync\2\vformat\bbuf\blsp\bvim–\1\0\0\5\0\6\0\t6\0\0\0009\0\1\0009\0\2\0+\2\0\0005\3\3\0005\4\4\0=\4\5\3B\0\3\1K\0\1\0\17close_events\1\5\0\0\rBufLeave\16CursorMoved\16InsertEnter\14FocusLost\1\0\6\14focusable\1\vprefix\6 \nscope\vcursor\vborder\frounded\17close_events\0\vsource\valways\15open_float\15diagnostic\bvimÂ\v\1\1\n\0G\0±\0019\1\0\0003\2\1\0\18\3\2\0'\5\2\0'\6\3\0006\a\4\0009\a\5\a9\a\0\a9\a\6\a'\b\a\0B\3\5\1\18\3\2\0'\5\2\0'\6\b\0006\a\4\0009\a\5\a9\a\0\a9\a\t\a'\b\n\0B\3\5\1\18\3\2\0'\5\2\0'\6\v\0006\a\4\0009\a\5\a9\a\0\a9\a\f\a'\b\r\0B\3\5\1\18\3\2\0'\5\2\0'\6\14\0006\a\4\0009\a\5\a9\a\0\a9\a\f\a'\b\r\0B\3\5\1\18\3\2\0'\5\2\0'\6\15\0006\a\4\0009\a\5\a9\a\0\a9\a\16\a'\b\17\0B\3\5\1\18\3\2\0'\5\2\0'\6\18\0006\a\4\0009\a\5\a9\a\0\a9\a\19\a'\b\20\0B\3\5\1\18\3\2\0'\5\2\0'\6\21\0006\a\4\0009\a\5\a9\a\0\a9\a\22\a'\b\23\0B\3\5\1\18\3\2\0'\5\2\0'\6\24\0006\a\4\0009\a\5\a9\a\0\a9\a\25\a'\b\26\0B\3\5\1\18\3\2\0'\5\2\0'\6\27\0003\a\28\0'\b\29\0B\3\5\1\18\3\2\0'\5\2\0'\6\30\0006\a\4\0009\a\31\a9\a \a'\b!\0B\3\5\1\18\3\2\0'\5\2\0'\6\"\0006\a\4\0009\a\31\a9\a#\a'\b$\0B\3\5\1\18\3\2\0'\5\2\0'\6%\0006\a\4\0009\a\5\a9\a\0\a9\a&\a'\b'\0B\3\5\1\18\3\2\0005\5(\0'\6)\0003\a*\0'\b+\0B\3\5\1\18\3\2\0'\5\2\0'\6,\0003\a-\0'\b.\0B\3\5\1\18\3\2\0'\5\2\0'\6/\0006\a\4\0009\a\5\a9\a\0\a9\a\19\a'\b\20\0B\3\5\1\18\3\2\0'\5\2\0'\0060\0006\a\4\0009\a\5\a9\a\0\a9\a1\a'\b2\0B\3\5\1\18\3\2\0'\0053\0'\0064\0006\a\4\0009\a\5\a9\a\0\a9\a5\a'\b6\0B\3\5\1\18\3\2\0'\5\2\0'\0067\0003\a8\0'\b9\0B\3\5\0016\3\4\0009\3\5\0039\3:\0035\5;\0=\1<\5B\3\2\2\21\4\3\0)\5\0\0\1\5\4\0X\4\6Ä\18\4\2\0'\6\2\0'\a=\0'\b>\0'\t?\0B\4\5\0016\4\4\0009\4@\0049\4A\4'\6B\0005\aC\0=\1D\a3\bE\0=\bF\aB\4\3\0012\0\0ÄK\0\1\0\rcallback\0\vbuffer\1\0\2\rcallback\0\vbuffer\0\15CursorHold\24nvim_create_autocmd\bapi\27sourcekit-lsp: Restart\26:SourcekitRestart<CR>\15<leader>xr\nbufnr\1\0\2\tname\14sourcekit\nbufnr\0\16get_clients\16LSP: Format\0\14<leader>f\24LSP: Signature help\19signature_help\n<C-h>\6i\16LSP: Rename\vrename\16<leader>vrn\16<leader>vrr\21LSP: Fix imports\0\15<leader>vi\19LSP: Quick fix\0\15<leader>qf\1\3\0\0\6n\6x\21LSP: Code action\16code_action\16<leader>vca\25LSP: Next diagnostic\14goto_next\a]d\29LSP: Previous diagnostic\14goto_prev\15diagnostic\a[d\26LSP: Line diagnostics\0\15<leader>vd\26LSP: Workspace symbol\21workspace_symbol\16<leader>vws\15LSP: Hover\nhover\6K\20LSP: References\15references\agr\31LSP: Go to type definition\20type_definition\agy\agI\30LSP: Go to implementation\19implementation\agi\27LSP: Go to declaration\16declaration\agD\26LSP: Go to definition\15definition\blsp\bvim\15<leader>gd\6n\0\bbufü\1\0\0\5\0\t\0\0216\0\0\0009\0\1\0009\0\2\0\15\0\0\0X\1\15Ä6\0\0\0009\0\1\0009\0\2\0\18\2\0\0009\0\3\0'\3\4\0B\0\3\2\15\0\0\0X\1\6Ä6\0\5\0006\2\6\0'\4\a\0B\2\2\0029\2\b\2B\0\2\1K\0\1\0\napply\22config.monochrome\frequire\npcall\n^koda\nmatch\16colors_name\6g\bvimﬁ \1\0\14\0î\1\1Ù\0016\0\0\0006\2\1\0'\4\2\0B\2\2\0029\2\3\2B\0\2\0016\0\4\0009\0\5\0009\0\6\0009\0\a\0B\0\1\0026\1\0\0006\3\1\0'\4\b\0B\1\3\3\15\0\1\0X\3\4Ä9\3\t\2\18\5\0\0B\3\2\2\18\0\3\0009\3\n\0009\3\v\0039\3\f\3+\4\2\0=\4\r\0036\3\4\0009\3\14\0039\3\15\0035\5\16\0005\6\17\0=\6\18\0055\6\25\0004\a\0\0166\b\4\0009\b\14\b9\b\19\b9\b\20\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\22\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\23\b'\t\21\0<\t\b\a6\b\4\0009\b\14\b9\b\19\b9\b\24\b'\t\21\0<\t\b\a=\a\26\6=\6\27\0055\6\28\0=\6\29\5B\3\2\0015\3*\0005\4\30\0003\5\31\0=\5 \0045\5$\0005\6\"\0005\a!\0=\a#\6=\6%\0055\6'\0005\a&\0=\a#\6=\6(\5=\5)\4=\4+\0035\4,\0005\0054\0005\6.\0005\a-\0=\a/\0065\a0\0=\a1\0065\a2\0=\a3\6=\0065\5=\5)\4=\0046\0035\4;\0004\5\3\0006\6\4\0009\0067\0066\b\4\0009\b8\b9\b9\b'\n:\0B\b\2\0A\6\0\0?\6\0\0=\5<\0045\5=\0=\5>\0043\5?\0=\5 \0043\5@\0=\5A\4=\4B\0035\4C\0005\5E\0005\6D\0=\6F\5=\5)\4=\4G\0035\4H\0=\4I\0035\4J\0=\4K\0035\4L\0=\4M\0035\4N\0=\4O\0035\4P\0003\5Q\0=\5 \0045\5R\0=\5>\4=\4S\0035\4T\0005\5a\0005\6V\0005\aU\0=\aW\0065\aX\0=\a\v\0065\aY\0=\aZ\0065\a\\\0005\b[\0=\b]\a5\b^\0=\b_\a=\a`\6=\6b\5=\5)\4=\4c\0035\4d\0005\5h\0005\6f\0005\ae\0=\ag\6=\6i\5=\5)\4=\4i\0035\4j\0005\5k\0=\5<\4=\4l\0035\4m\0=\4n\0035\4o\0005\5p\0004\6\0\0=\6q\5=\5)\0043\5r\0=\5 \0043\5s\0=\5A\4=\4t\0034\4\0\0006\5u\0\18\a\3\0B\5\2\4H\b\aÄ\6\bB\0X\n\5Ä6\nv\0009\nw\n\18\f\4\0\18\r\b\0B\n\3\1F\b\3\3R\b˜\1276\5\1\0'\ax\0B\5\2\0029\5\3\0055\ay\0=\4z\aB\5\2\0016\5\4\0009\5{\0059\5|\5'\a}\0003\b~\0005\t\127\0B\5\4\0016\5\4\0009\5{\0059\5|\5'\aÄ\0003\bÅ\0005\tÇ\0B\5\4\0016\5\4\0009\5{\0059\5|\5'\aÉ\0003\bÑ\0005\tÖ\0B\5\4\0016\5\4\0009\5{\0059\5Ü\5'\aá\0005\bã\0006\t\4\0009\t{\t9\tà\t'\vâ\0005\fä\0B\t\3\2=\tå\b3\tç\0=\té\bB\5\3\0016\5\4\0009\5{\0059\5Ü\5'\aè\0005\bí\0006\t\4\0009\t{\t9\tà\t'\vê\0005\fë\0B\t\3\2=\tå\b3\tì\0=\té\bB\5\3\1K\0\1\0\0\1\0\2\rcallback\0\ngroup\0\1\0\1\nclear\2\25monochrome-overrides\16ColorScheme\rcallback\0\ngroup\1\0\2\rcallback\0\ngroup\0\1\0\1\nclear\2\18UserLspConfig\24nvim_create_augroup\14LspAttach\24nvim_create_autocmd\1\0\1\tdesc\31Check sourcekit-lsp status\0\20SourcekitStatus\1\0\1\tdesc:Restart sourcekit-lsp and regenerate buildServer.json\0\21SourcekitRestart\1\0\1\tdesc\27Set up all LSP servers\0\rLspSetup\29nvim_create_user_command\bapi\21ensure_installed\1\0\3\21automatic_enable\1\21ensure_installed\0\27automatic_installation\2\20mason-lspconfig\vinsert\ntable\npairs\rtinymist\0\0\14sysInputs\1\0\6\19previewFeature\venable\14sysInputs\0\18formatterMode\rtypstyle\15outputPath\16$root/$name\14exportPdf\vonSave\21defaultEntryFile\5\1\0\4\14on_attach\0\rroot_dir\0\rsettings\0\14autostart\2\bzls\1\0\1\14autostart\2\vclangd\1\a\0\0\vclangd\23xcode-build-server\23--background-index\17--clang-tidy\28--header-insertion=iwyu --completion-style=detailed\1\0\2\bcmd\0\14autostart\2\ngopls\1\0\1\ngopls\0\ranalyses\1\0\3\fgofumpt\2\16staticcheck\2\ranalyses\0\1\0\1\17unusedparams\2\1\0\2\rsettings\0\14autostart\2\vlua_ls\bLua\1\0\1\bLua\0\16diagnostics\fglobals\1\2\0\0\bvim\fdisable\1\0\2\fglobals\0\fdisable\0\1\3\0\0\29incomplete-signature-doc\19trailing-space\thint\1\0\6\fsetType\1\14paramName\fDisable\15arrayIndex\fDisable\14semicolon\fDisable\venable\2\14paramType\2\1\0\2\18workspaceWord\2\16callSnippet\tBoth\14workspace\1\0\4\thint\0\14workspace\0\16diagnostics\0\15completion\0\1\0\1\20checkThirdParty\1\1\0\3\rsettings\0\24single_file_support\2\14autostart\2\16tailwindcss\1\n\0\0\thtml\bcss\tscss\15javascript\20javascriptreact\15typescript\20typescriptreact\bvue\vsvelte\0\1\0\3\rroot_dir\0\14filetypes\0\14autostart\2\thtml\1\0\1\14autostart\2\ncssls\1\0\1\14autostart\2\vbashls\1\0\1\14autostart\2\vjsonls\1\0\1\14autostart\2\veslint\23workingDirectories\1\0\1\23workingDirectories\0\1\0\1\tmode\tauto\1\0\2\rsettings\0\14autostart\2\14sourcekit\14on_attach\0\0\14filetypes\1\4\0\0\nswift\tobjc\vobjcpp\bcmd\1\0\4\14on_attach\0\rroot_dir\0\bcmd\0\14filetypes\0\27xcrun -f sourcekit-lsp\vsystem\afn\ttrim\18rust_analyzer\18rust-analyzer\1\0\1\18rust-analyzer\0\14procMacro\1\0\1\venable\2\16checkOnSave\1\0\1\fcommand\vclippy\ncargo\1\0\3\14procMacro\0\16checkOnSave\0\ncargo\0\1\0\1\16allFeatures\2\1\0\2\rsettings\0\14autostart\2\nts_ls\1\0\14\bzls\0\thtml\0\vlua_ls\0\ngopls\0\vjsonls\0\vclangd\0\14sourcekit\0\18rust_analyzer\0\nts_ls\0\16tailwindcss\0\ncssls\0\vbashls\0\veslint\0\rtinymist\0\rsettings\15javascript\1\0\1\15inlayHints\0\1\0\a\"includeInlayVariableTypeHints\2+includeInlayFunctionParameterTypeHints\2:includeInlayParameterNameHintsWhenArgumentMatchesName\1#includeInlayParameterNameHints\ball%includeInlayEnumMemberValueHints\2,includeInlayFunctionLikeReturnTypeHints\2-includeInlayPropertyDeclarationTypeHints\2\15typescript\1\0\2\15javascript\0\15typescript\0\15inlayHints\1\0\1\15inlayHints\0\1\0\a\"includeInlayVariableTypeHints\2+includeInlayFunctionParameterTypeHints\2:includeInlayParameterNameHintsWhenArgumentMatchesName\1#includeInlayParameterNameHints\fliteral%includeInlayEnumMemberValueHints\2,includeInlayFunctionLikeReturnTypeHints\2-includeInlayPropertyDeclarationTypeHints\2\rroot_dir\0\1\0\4\rroot_dir\0\rsettings\0\24single_file_support\2\14autostart\2\nfloat\1\0\6\14focusable\1\vheader\5\vprefix\5\vborder\frounded\vsource\valways\nstyle\fminimal\nsigns\ttext\1\0\1\ttext\0\tINFO\tHINT\tWARN\6 \nERROR\rseverity\17virtual_text\1\0\3\vprefix\b‚óè\fspacing\3\4\vsource\fif_many\1\0\6\17virtual_text\0\nfloat\0\21update_in_insert\1\14underline\1\nsigns\0\18severity_sort\2\vconfig\15diagnostic\19snippetSupport\19completionItem\15completion\17textDocument\25get_lsp_capabilities\14blink.cmp\29make_client_capabilities\rprotocol\blsp\bvim\nsetup\nmason\frequire\npcall\3ÄÄ¿ô\4\0", "config", "nvim-lspconfig")
time([[Config for nvim-lspconfig]], false)
-- Config for: LuaSnip
time([[Config for LuaSnip]], true)
try_loadstring("\27LJ\2\n \0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\vexpand\"\0\0\3\1\1\0\5-\0\0\0009\0\0\0)\2\1\0B\0\2\1K\0\1\0\0¿\tjump\"\0\0\3\1\1\0\5-\0\0\0009\0\0\0)\2ˇˇB\0\2\1K\0\1\0\0¿\tjumpM\0\0\3\1\2\0\n-\0\0\0009\0\0\0B\0\1\2\15\0\0\0X\1\4Ä-\0\0\0009\0\1\0)\2\1\0B\0\2\1K\0\1\0\0¿\18change_choice\18choice_active≠\3\1\0\a\0\29\00036\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\1\3\0015\3\t\0006\4\4\0009\4\5\0049\4\6\4'\6\a\0B\4\2\2'\5\b\0&\4\5\4=\4\n\3B\1\2\0016\1\4\0009\1\v\0019\1\f\0015\3\r\0'\4\14\0003\5\15\0005\6\16\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\17\0'\4\18\0003\5\19\0005\6\20\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\21\0'\4\22\0003\5\23\0005\6\24\0B\1\5\0016\1\4\0009\1\v\0019\1\f\0015\3\25\0'\4\26\0003\5\27\0005\6\28\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\vsilent\2\0\n<C-E>\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>,\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>;\1\3\0\0\6i\6s\1\0\1\vsilent\2\0\v<C-s>e\1\2\0\0\6i\bset\vkeymap\npaths\1\0\1\npaths\0\14/snippets\vconfig\fstdpath\afn\bvim\14lazy_load luasnip.loaders.from_vscode\fluasnip\frequire\0", "config", "LuaSnip")
time([[Config for LuaSnip]], false)
-- Config for: nvim-ts-autotag
time([[Config for nvim-ts-autotag]], true)
try_loadstring("\27LJ\2\n=\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\nsetup\20nvim-ts-autotag\frequire\0", "config", "nvim-ts-autotag")
time([[Config for nvim-ts-autotag]], false)
-- Config for: alpha-nvim
time([[Config for alpha-nvim]], true)
try_loadstring("\27LJ\2\n\24\0\0\1\0\1\0\2'\0\0\0L\0\2\0\rgraphify≈\f\1\0\n\0$\1O6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0023\2\3\0009\3\4\0019\3\5\0035\4\a\0=\4\6\0039\3\4\0019\3\b\0034\4\a\0009\5\t\1'\a\n\0'\b\v\0'\t\f\0B\5\4\2>\5\1\0049\5\t\1'\a\r\0'\b\14\0'\t\15\0B\5\4\2>\5\2\0049\5\t\1'\a\16\0'\b\17\0'\t\18\0B\5\4\2>\5\3\0049\5\t\1'\a\19\0'\b\20\0'\t\21\0B\5\4\2>\5\4\0049\5\t\1'\a\22\0'\b\23\0'\t\24\0B\5\4\2>\5\5\0049\5\t\1'\a\25\0'\b\26\0'\t\27\0B\5\4\0?\5\0\0=\4\6\0039\3\4\0019\3\28\3\18\4\2\0B\4\1\2=\4\6\0039\3\4\0019\3\28\3'\4\30\0=\4\29\0039\3\4\0019\3\5\0039\3\31\3'\4!\0=\4 \0039\3\4\0019\3\b\0039\3\31\3'\4\"\0=\4 \0039\3\4\0019\3\28\0039\3\31\3'\4\30\0=\4 \0039\3#\0009\5\31\1B\3\2\1K\0\1\0\nsetup\17AlphaButtons\16AlphaHeader\ahl\topts\16AlphaFooter\14highlight\vfooter\f:qa<CR>\n Quit\6q\17:LazyGit<CR>\r LazyGit\a;c\27:Telescope buffers<CR>\r Buffers\a\\\\\29:Telescope live_grep<CR>\15 Live grep\a;r\30:Telescope find_files<CR>\15 Find file\a;f\31:ene <BAR> startinsert<CR>\14 New file\6e\vbutton\fbuttons\1\t\0\0:                                                     à\1  ‚ñà‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ïó‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ïó‚ñà‚ñà‚ïó‚ñà‚ñà‚ñà‚ïó   ‚ñà‚ñà‚ñà‚ïó í\1  ‚ñà‚ñà‚ñà‚ñà‚ïó  ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ïê‚ïê‚ïê‚ïê‚ïù‚ñà‚ñà‚ïî‚ïê‚ïê‚ïê‚ñà‚ñà‚ïó‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ïó ‚ñà‚ñà‚ñà‚ñà‚ïë å\1  ‚ñà‚ñà‚ïî‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó  ‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ñà‚ñà‚ñà‚ñà‚ïî‚ñà‚ñà‚ïë í\1  ‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïó‚ñà‚ñà‚ïë‚ñà‚ñà‚ïî‚ïê‚ïê‚ïù  ‚ñà‚ñà‚ïë   ‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïó ‚ñà‚ñà‚ïî‚ïù‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë‚ïö‚ñà‚ñà‚ïî‚ïù‚ñà‚ñà‚ïë î\1  ‚ñà‚ñà‚ïë ‚ïö‚ñà‚ñà‚ñà‚ñà‚ïë‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïó‚ïö‚ñà‚ñà‚ñà‚ñà‚ñà‚ñà‚ïî‚ïù ‚ïö‚ñà‚ñà‚ñà‚ñà‚ïî‚ïù ‚ñà‚ñà‚ïë‚ñà‚ñà‚ïë ‚ïö‚ïê‚ïù ‚ñà‚ñà‚ïë Ñ\1  ‚ïö‚ïê‚ïù  ‚ïö‚ïê‚ïê‚ïê‚ïù‚ïö‚ïê‚ïê‚ïê‚ïê‚ïê‚ïê‚ïù ‚ïö‚ïê‚ïê‚ïê‚ïê‚ïê‚ïù   ‚ïö‚ïê‚ïê‚ïê‚ïù  ‚ïö‚ïê‚ïù‚ïö‚ïê‚ïù     ‚ïö‚ïê‚ïù :                                                     \bval\vheader\fsection\0\27alpha.themes.dashboard\nalpha\frequire\rÄÄ¿ô\4\0", "config", "alpha-nvim")
time([[Config for alpha-nvim]], false)
-- Config for: vim-apm
time([[Config for vim-apm]], true)
try_loadstring("\27LJ\2\nY\0\0\b\1\5\0\v6\0\0\0006\2\1\0009\2\2\2'\4\3\0-\5\0\0\18\a\5\0009\5\4\5B\5\2\0A\2\1\0A\0\0\1K\0\1\0\0¿\fget_apm\fAPM: %d\vformat\vstring\nprintê\1\1\0\a\0\n\0\0176\0\0\0'\2\1\0B\0\2\2\18\3\0\0009\1\2\0004\4\0\0B\1\3\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\a\0003\5\b\0005\6\t\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\rShow APM\0\16<leader>apm\6n\bset\vkeymap\bvim\nsetup\fvim-apm\frequire\0", "config", "vim-apm")
time([[Config for vim-apm]], false)
-- Config for: refactoring.nvim
time([[Config for refactoring.nvim]], true)
try_loadstring("\27LJ\2\nÿ\5\0\0\6\0\30\0>6\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\a\0'\4\b\0005\5\t\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\n\0'\4\v\0005\5\f\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\6\0'\3\r\0'\4\14\0005\5\15\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0005\2\16\0'\3\17\0'\4\18\0005\5\19\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\21\0'\4\22\0005\5\23\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\24\0'\4\25\0005\5\26\0B\0\5\0016\0\3\0009\0\4\0009\0\5\0'\2\20\0'\3\27\0'\4\28\0005\5\29\0B\0\5\1K\0\1\0\1\0\1\tdesc\26Extract block to file$:Refactor extract_block_to_file\16<leader>rbf\1\0\1\tdesc\18Extract block\28:Refactor extract_block\15<leader>rb\1\0\1\tdesc\20Inline function\26:Refactor inline_func\15<leader>rI\6n\1\0\1\tdesc\20Inline variable\25:Refactor inline_var\15<leader>ri\1\3\0\0\6n\6x\1\0\1\tdesc\21Extract variable\27:Refactor extract_var \15<leader>rv\1\0\1\tdesc\20Extract to file\31:Refactor extract_to_file \15<leader>rf\1\0\1\tdesc\21Extract function\23:Refactor extract \15<leader>re\6x\bset\vkeymap\bvim\nsetup\16refactoring\frequire\0", "config", "refactoring.nvim")
time([[Config for refactoring.nvim]], false)
-- Config for: neotest
time([[Config for neotest]], true)
try_loadstring("\27LJ\2\nE\0\0\5\1\5\0\n-\0\0\0009\0\0\0009\0\0\0006\2\1\0009\2\2\0029\2\3\2'\4\4\0B\2\2\0A\0\0\1K\0\1\0\0¿\6%\vexpand\afn\bvim\brun!\0\0\2\1\1\0\5-\0\0\0009\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\brunQ\0\0\4\1\5\0\r-\0\0\0009\0\0\0009\0\0\0006\2\1\0009\2\2\2\14\0\2\0X\3\2Ä6\2\1\0009\2\3\0029\2\4\2B\2\1\0A\0\0\1K\0\1\0\0¿\bcwd\tloop\auv\bvim\brun*\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\rrun_last\brun,\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\vtoggle\fsummaryC\0\0\3\1\3\0\6-\0\0\0009\0\0\0009\0\1\0005\2\2\0B\0\2\1K\0\1\0\0¿\1\0\2\15auto_close\2\nenter\2\topen\voutput1\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\vtoggle\17output_panel&\0\0\2\1\2\0\5-\0\0\0009\0\0\0009\0\1\0B\0\1\1K\0\1\0\0¿\tstop\brun≤\4\1\0\a\0 \0J6\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\0016\0\0\0'\2\3\0B\0\2\0026\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\b\0003\5\t\0005\6\n\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\v\0003\5\f\0005\6\r\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\14\0003\5\15\0005\6\16\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\17\0003\5\18\0005\6\19\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\20\0003\5\21\0005\6\22\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\23\0003\5\24\0005\6\25\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\26\0003\5\27\0005\6\28\0B\1\5\0016\1\4\0009\1\5\0019\1\6\1'\3\a\0'\4\29\0003\5\30\0005\6\31\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\tStop\0\b;tS\1\0\1\tdesc\24Toggle Output Panel\0\b;tO\1\0\1\tdesc\16Show Output\0\b;to\1\0\1\tdesc\19Toggle Summary\0\b;ts\1\0\1\tdesc\rRun Last\0\b;tl\1\0\1\tdesc\23Run All Test Files\0\b;tT\1\0\1\tdesc\16Run Nearest\0\b;tr\1\0\1\tdesc\rRun File\0\b;tt\6n\bset\vkeymap\bvim\fneotest\nsetup\19config.neotest\frequire\0", "config", "neotest")
time([[Config for neotest]], false)
-- Config for: sonokai
time([[Config for sonokai]], true)
try_loadstring("\27LJ\2\n@\0\0\2\0\3\0\0056\0\0\0009\0\1\0)\1\1\0=\1\2\0K\0\1\0#sonokai_transparent_background\6g\bvim\0", "config", "sonokai")
time([[Config for sonokai]], false)
-- Config for: mason.nvim
time([[Config for mason.nvim]], true)
try_loadstring("\27LJ\2\n(\0\0\3\0\3\0\0056\0\0\0009\0\1\0'\2\2\0B\0\2\1K\0\1\0\tedit\bcmd\bvim-\1\0\4\0\3\0\0066\0\0\0009\0\1\0003\2\2\0)\3d\0B\0\3\1K\0\1\0\0\rdefer_fn\bvim \0\0\3\2\0\1\5-\0\0\0-\2\1\0\22\2\0\2B\0\2\1K\0\1\0\2\0\0¿\2√\1\1\1\a\3\a\1 -\1\0\0\21\1\1\0\1\1\0\0X\1\1Ä2\0\26Ä-\1\1\0009\1\0\1-\3\0\0008\3\0\3B\1\2\2\18\4\1\0009\2\1\1B\2\2\2\14\0\2\0X\2\vÄ6\2\2\0009\4\3\1\18\5\1\0B\2\3\3\14\0\2\0X\4\bÄ6\4\4\0009\4\5\0043\6\6\0B\4\2\1X\2\3Ä-\2\2\0\22\4\0\0B\2\2\0012\0\0ÄK\0\1\0K\0\1\0\0\0\1\0\0¿\0\rschedule\bvim\finstall\npcall\17is_installed\16get_package\2$\1\0\4\2\1\0\0063\0\0\0\18\1\0\0)\3\1\0B\1\2\0012\0\0ÄK\0\1\0\0¿\1¿\0‹\3\1\0\a\0\n\0\0195\0\0\0006\1\1\0'\3\2\0B\1\2\0029\1\3\1B\1\1\0016\1\1\0'\3\4\0B\1\2\2\18\4\1\0009\2\5\1'\5\6\0003\6\a\0B\2\4\0019\2\b\0013\4\t\0B\2\2\0012\0\0ÄK\0\1\0\0\frefresh\0\28package:install:success\aon\19mason-registry\nsetup\nmason\frequire\1\28\0\0\31typescript-language-server\15eslint-lsp\24lua-language-server\rjson-lsp tailwindcss-language-server\25bash-language-server\18rust-analyzer\ngopls\fcss-lsp\rhtml-lsp\16swiftformat\14swiftlint\rluacheck\15shellcheck\rprettier\vclangd\23xcode-build-server\vstylua\nshfmt\truff\fgofumpt\14goimports\vktlint\ntaplo\frubocop\rtinymist\25kotlin-debug-adapter\0", "config", "mason.nvim")
time([[Config for mason.nvim]], false)
-- Config for: nvim-notify
time([[Config for nvim-notify]], true)
try_loadstring("\27LJ\2\nè\1\0\0\4\0\5\0\f6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\0016\0\4\0006\1\0\0'\3\1\0B\1\2\2=\1\1\0K\0\1\0\bvim\1\0\3\22background_colour\f#000000\ftimeout\3à'\vrender\20wrapped-compact\nsetup\vnotify\frequire\0", "config", "nvim-notify")
time([[Config for nvim-notify]], false)
-- Config for: xcodebuild.nvim
time([[Config for xcodebuild.nvim]], true)
try_loadstring("\27LJ\2\n—\1\0\2\a\1\n\0#6\2\0\0'\4\1\0B\2\2\2-\3\0\0\15\0\3\0X\4\24Ä-\3\0\0=\0\2\3\18\5\0\0009\3\3\0'\6\4\0B\3\3\2\14\0\3\0X\3\20Ä-\3\0\0\18\5\3\0009\3\5\3B\3\2\0011\0\0\0006\3\6\0009\3\a\3\18\5\0\0B\3\2\2\6\3\b\0X\3\tÄ9\3\t\2\18\5\0\0\18\6\1\0B\3\3\1X\3\4Ä9\3\t\2\18\5\0\0\18\6\1\0B\3\3\1K\0\1\0\0Ä\vnotify\5\ttrim\bvim\vfinish\fLoading\tfind\fmessage\vfidget\frequireÕ\1\0\1\6\1\n\0\0216\1\0\0'\3\1\0B\1\2\2-\2\0\0\15\0\2\0X\3\6Ä-\2\0\0'\3\3\0=\3\2\2-\2\0\0=\0\4\2X\2\bÄ9\2\5\0019\2\6\0025\4\a\0=\0\4\0045\5\b\0=\5\t\4B\2\2\2.\0\2\0K\0\1\0\0Ä\15lsp_client\1\0\1\tname\20xcodebuild.nvim\1\0\2\fmessage\0\15lsp_client\0\vcreate\vhandle\fmessage\5\ntitle\20fidget.progress\frequireÒ\20\1\0\b\0R\0∫\1+\0\0\0006\1\0\0'\3\1\0B\1\2\0026\2\0\0'\4\2\0B\2\2\0029\2\3\0025\4\4\0005\5\5\0003\6\6\0=\6\a\0053\6\b\0=\6\t\5=\5\n\0045\5\v\0=\5\f\4B\2\2\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\17\0'\6\18\0005\a\19\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\20\0'\6\21\0005\a\22\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\23\0'\6\24\0005\a\25\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\26\0'\6\27\0005\a\28\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5\29\0'\6\30\0005\a\31\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5 \0'\6!\0005\a\"\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4#\0'\5 \0'\6$\0005\a%\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5&\0'\6'\0005\a(\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5)\0'\6*\0005\a+\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5,\0'\6-\0005\a.\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5/\0'\0060\0005\a1\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0052\0'\0063\0005\a4\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0055\0'\0066\0005\a7\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\0058\0'\0069\0005\a:\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5;\0'\6<\0005\a=\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5>\0'\6?\0005\a@\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5A\0'\6B\0005\aC\0B\2\5\0016\2\r\0009\2D\0029\2E\2'\4F\0009\5G\0015\6H\0B\2\4\0016\2\r\0009\2D\0029\2E\2'\4I\0009\5J\0015\6K\0B\2\4\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5L\0'\6M\0005\aN\0B\2\5\0016\2\r\0009\2\14\0029\2\15\2'\4\16\0'\5O\0'\6P\0005\aQ\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc Clean up simulator runtimes)<cmd>XcodebuildCleanupSimulators<cr>\15<leader>xZ\1\0\1\tdesc\26Auto-select simulator\"<cmd>XcodebuildAutoDevice<cr>\15<leader>xz\1\0\1\tdesc7Remove unused simulator runtimes (asks permission)\23cleanup_simulators XcodebuildCleanupSimulators\1\0\1\tdesc*Auto-select first available simulator\23auto_select_device\25XcodebuildAutoDevice\29nvim_create_user_command\bapi\1\0\1\tdesc\22Show Code Actions#<cmd>XcodebuildCodeActions<cr>\15<leader>xa\1\0\1\tdesc\18Quickfix Line$<cmd>XcodebuildQuickfixLine<cr>\15<leader>xx\1\0\1\tdesc\21Select Test Plan&<cmd>XcodebuildSelectTestPlan<cr>\15<leader>xp\1\0\1\tdesc\18Select Device$<cmd>XcodebuildSelectDevice<cr>\15<leader>xd\1\0\1\tdesc\27Show Failing Snapshots(<cmd>XcodebuildFailingSnapshots<cr>\15<leader>xs\1\0\1\tdesc\25Toggle Test Explorer*<cmd>XcodebuildTestExplorerToggle<cr>\15<leader>xe\1\0\1\tdesc\30Show Code Coverage Report.<cmd>XcodebuildShowCodeCoverageReport<cr>\15<leader>xC\1\0\1\tdesc\25Toggle Code Coverage*<cmd>XcodebuildToggleCodeCoverage<cr>\15<leader>xc\1\0\1\tdesc\27Toggle Xcodebuild Logs\"<cmd>XcodebuildToggleLogs<cr>\15<leader>xl\1\0\1\tdesc\24Run This Test Class!<cmd>XcodebuildTestClass<cr>\15<leader>xT\1\0\1\tdesc\23Run Selected Tests$<cmd>XcodebuildTestSelected<cr>\6v\1\0\1\tdesc\14Run Tests\28<cmd>XcodebuildTest<cr>\15<leader>xt\1\0\1\tdesc\24Build & Run Project <cmd>XcodebuildBuildRun<cr>\15<leader>xr\1\0\1\tdesc\22Build For Testing'<cmd>XcodebuildBuildForTesting<cr>\15<leader>xB\1\0\1\tdesc\18Build Project\29<cmd>XcodebuildBuild<cr>\15<leader>xb\1\0\1\tdesc!Show Project Manager Actions&<cmd>XcodebuildProjectManager<cr>\15<leader>xf\1\0\1\tdesc\28Show Xcodebuild Actions\30<cmd>XcodebuildPicker<cr>\14<leader>X\6n\bset\vkeymap\bvim\18code_coverage\1\0\1\fenabled\2\tlogs\20notify_progress\0\vnotify\0\1\0\t\30auto_open_on_failed_tests\1\31auto_open_on_success_tests\1\vnotify\0\20notify_progress\0\17only_summary\2\29auto_close_on_app_launch\2\15auto_focus\1\30auto_open_on_failed_build\1\31auto_open_on_success_build\1\1\0\3\18code_coverage\0\tlogs\0\28show_build_progress_bar\1\nsetup\15xcodebuild\22config.xcodebuild\frequire\0", "config", "xcodebuild.nvim")
time([[Config for xcodebuild.nvim]], false)
-- Config for: supermaven-nvim
time([[Config for supermaven-nvim]], true)
try_loadstring("\27LJ\2\n¿\1\0\0\4\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\2B\0\2\0016\0\6\0009\0\a\0+\1\2\0=\1\b\0K\0\1\0\vai_cmp\6g\bvim\fkeymaps\1\0\1\fkeymaps\0\1\0\3\21clear_suggestion\n<C-]>\16accept_word\f<M-C-j>\22accept_suggestion\n<C-a>\nsetup\20supermaven-nvim\frequire\0", "config", "supermaven-nvim")
time([[Config for supermaven-nvim]], false)
-- Config for: conform.nvim
time([[Config for conform.nvim]], true)
try_loadstring("\27LJ\2\nê\b\0\0\6\0008\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2.\0005\3\4\0005\4\3\0=\4\5\0035\4\6\0=\4\a\0035\4\b\0=\4\t\0035\4\n\0=\4\v\0035\4\f\0=\4\r\0035\4\14\0=\4\15\0035\4\16\0=\4\17\0035\4\18\0=\4\19\0035\4\20\0=\4\21\0035\4\22\0=\4\23\0035\4\24\0=\4\25\0035\4\26\0=\4\27\0035\4\28\0=\4\29\0035\4\30\0=\4\31\0035\4 \0=\4!\0035\4\"\0=\4#\0035\4$\0=\4%\0035\4&\0=\4'\0035\4(\0=\4)\0035\4*\0=\4+\0035\4,\0=\4-\3=\3/\0025\0033\0005\0040\0005\0051\0=\0052\4=\0044\3=\0035\0025\0036\0=\0037\2B\0\2\1K\0\1\0\19format_on_save\1\0\2\17lsp_fallback\2\15timeout_ms\3Ù\3\15formatters\rtypstyle\1\0\1\rtypstyle\0\targs\1\2\0\0\6-\1\0\3\fcommand\rtypstyle\targs\0\nstdin\2\21formatters_by_ft\1\0\3\15formatters\0\19format_on_save\0\21formatters_by_ft\0\ntypst\1\2\0\0\rtypstyle\truby\1\2\0\0\frubocop\ttoml\1\2\0\0\ntaplo\vkotlin\1\2\0\0\vktlint\nswift\1\2\0\0\16swiftformat\6c\1\2\0\0\17clang-format\bcpp\1\2\0\0\17clang-format\trust\1\2\0\0\frustfmt\rmarkdown\1\2\0\0\rprettier\tyaml\1\2\0\0\rprettier\bcss\1\2\0\0\rprettier\thtml\1\2\0\0\rprettier\tjson\1\2\0\0\rprettier\20typescriptreact\1\2\0\0\rprettier\20javascriptreact\1\2\0\0\rprettier\15typescript\1\2\0\0\rprettier\15javascript\1\2\0\0\rprettier\ago\1\3\0\0\fgofumpt\14goimports\vpython\1\2\0\0\16ruff_format\ash\1\2\0\0\nshfmt\blua\1\0\21\20javascriptreact\0\thtml\0\ago\0\nswift\0\ntypst\0\ttoml\0\15typescript\0\trust\0\6c\0\15javascript\0\rmarkdown\0\vkotlin\0\tjson\0\tyaml\0\blua\0\20typescriptreact\0\truby\0\ash\0\bcpp\0\bcss\0\vpython\0\1\2\0\0\vstylua\nsetup\fconform\frequire\0", "config", "conform.nvim")
time([[Config for conform.nvim]], false)
-- Config for: snacks.nvim
time([[Config for snacks.nvim]], true)
try_loadstring("\27LJ\2\nÅ\1\0\0\4\0\b\0\v6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\6\0=\3\a\2B\0\2\1K\0\1\0\vscroll\1\0\1\fenabled\1\vindent\1\0\2\vscroll\0\vindent\0\1\0\1\fenabled\1\nsetup\vsnacks\frequire\0", "config", "snacks.nvim")
time([[Config for snacks.nvim]], false)
-- Config for: gruvbox.nvim
time([[Config for gruvbox.nvim]], true)
try_loadstring("\27LJ\2\nN\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\21transparent_mode\2\nsetup\fgruvbox\frequire\0", "config", "gruvbox.nvim")
time([[Config for gruvbox.nvim]], false)
-- Config for: nvim-dap
time([[Config for nvim-dap]], true)
try_loadstring("\27LJ\2\nP\0\0\3\0\4\0\0056\0\0\0009\0\1\0009\0\2\0'\2\3\0D\0\2\0,Main class (e.g., com.example.MainKt): \ninput\afn\bvimı\4\0\0\a\2\30\0H-\0\0\0\14\0\0\0X\0DÄ1\0\2\0006\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0-\4\1\0009\4\5\0045\5\6\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\a\0-\4\1\0009\4\b\0045\5\t\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\n\0-\4\1\0009\4\v\0045\5\f\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\r\0-\4\1\0009\4\14\0045\5\15\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\16\0-\4\1\0009\4\17\0045\5\18\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0005\2\19\0'\3\20\0006\4\21\0'\6\22\0B\4\2\0029\4\23\0045\5\24\0B\0\5\0016\0\0\0009\0\1\0009\0\2\0005\2\25\0'\3\26\0006\4\21\0'\6\27\0B\4\2\0029\4\28\0045\5\29\0B\0\5\1K\0\1\0\3Ä\0¿\1\0\1\tdesc\tEval\teval\ndapui\15<Leader>de\1\3\0\0\6n\6v\1\0\1\tdesc\nHover\nhover\19dap.ui.widgets\frequire\15<Leader>dh\1\3\0\0\6n\6v\1\0\1\tdesc\rStep Out\rstep_out\15<leader>do\1\0\1\tdesc\14Step Into\14step_into\15<leader>di\1\0\1\tdesc\14Step Over\14step_over\15<leader>ds\1\0\1\tdesc\18Run To Cursor\18run_to_cursor\15<leader>dC\1\0\2\tdesc\rContinue\fnoremap\2\rcontinue\15<leader>dc\6n\bset\vkeymap\bvim≥\2\0\0\4\1\r\0/-\0\0\0\15\0\0\0X\1+Ä1\0\1\0006\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\4\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\5\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\6\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\a\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0'\2\3\0'\3\b\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0005\2\t\0'\3\n\0B\0\3\0016\0\0\0009\0\1\0009\0\2\0005\2\v\0'\3\f\0B\0\3\1K\0\1\0\3Ä\15<Leader>de\1\3\0\0\6n\6v\15<Leader>dh\1\3\0\0\6n\6v\15<leader>do\15<leader>di\15<leader>ds\15<leader>dC\15<leader>dc\6n\bdel\vkeymap\bvim{\0\0\3\1\a\0\f-\0\0\0009\0\0\0B\0\1\0016\0\1\0'\2\2\0B\0\2\0029\0\3\0009\0\4\0009\0\5\0009\0\6\0B\0\1\1K\0\1\0\1¿\ame\21event_terminated\nafter\14listeners\bdap\frequire\22terminate_sessionÂ\f\1\0\t\0<\0u6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\1B\2\1\0019\2\4\0005\3\6\0005\4\a\0=\4\b\3=\3\5\0029\2\t\0004\3\3\0005\4\n\0003\5\v\0=\5\f\4>\4\1\0035\4\r\0>\4\2\3=\3\5\0026\2\14\0009\2\15\0029\2\16\2\18\3\2\0'\5\17\0005\6\18\0B\3\3\1\18\3\2\0'\5\19\0005\6\20\0B\3\3\1\18\3\2\0'\5\21\0005\6\22\0B\3\3\1\18\3\2\0'\5\23\0005\6\24\0B\3\3\1+\3\1\0009\4\25\0009\5\26\0049\5\27\0053\6\29\0=\6\28\0059\5\26\0049\5\30\0053\6\31\0=\6\28\0052\3\0Ä6\3\0\0'\5\1\0B\3\2\0029\3 \0039\3!\3'\4#\0=\4\"\0036\3\14\0009\3$\0039\3%\3'\5&\0'\6'\0009\a(\0015\b)\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\6*\0009\a+\0015\b,\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\6-\0009\a.\0015\b/\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0060\0009\a1\0015\b2\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0063\0009\a4\0015\b5\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0066\0009\a7\0015\b8\0B\3\5\0016\3\14\0009\3$\0039\3%\3'\5&\0'\0069\0003\a:\0005\b;\0B\3\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\23Terminate debugger\0\15<leader>dx\1\0\1\tdesc\30Toggle Message Breakpoint\30toggle_message_breakpoint\14<leader>B\1\0\1\tdesc\22Toggle Breakpoint\22toggle_breakpoint\14<leader>b\1\0\1\tdesc\22Debug Class Tests\22debug_class_tests\15<leader>dT\1\0\1\tdesc\16Debug Tests\16debug_tests\15<leader>dt\1\0\1\tdesc\27Debug Without Building\24debug_without_build\15<leader>dr\1\0\1\tdesc\18Build & Debug\20build_and_debug\15<leader>dd\6n\bset\vkeymap\19usetab,uselast\14switchbuf\rfallback\rdefaults\0\21event_terminated\0\ame\22event_initialized\nafter\14listeners\1\0\4\vlinehl\5\ttext\5\vtexthl\19DiagnosticInfo\nnumhl\5\16DapLogPoint\1\0\4\vlinehl\5\ttext\5\vtexthl\17DiagnosticOk\nnumhl\5\15DapStopped\1\0\4\vlinehl\5\ttext\5\vtexthl\20DiagnosticError\nnumhl\5\26DapBreakpointRejected\1\0\4\vlinehl\5\ttext\5\vtexthl\20DiagnosticError\nnumhl\5\18DapBreakpoint\16sign_define\afn\bvim\1\0\a\16projectRoot\23${workspaceFolder}\ttype\vkotlin\ftimeout\3∞Í\1\tname\29Attach to Kotlin Process\rhostName\14localhost\frequest\vattach\tport\3ç'\14mainClass\0\1\0\5\16projectRoot\23${workspaceFolder}\ttype\vkotlin\frequest\vlaunch\tname\26Launch Kotlin Program\14mainClass\0\19configurations\foptions\1\0\1\"auto_continue_if_many_stopped\1\1\0\3\fcommand\25kotlin-debug-adapter\ttype\15executable\foptions\0\vkotlin\radapters\nsetup xcodebuild.integrations.dap\bdap\frequire\0", "config", "nvim-dap")
time([[Config for nvim-dap]], false)
-- Config for: neoconf.nvim
time([[Config for neoconf.nvim]], true)
try_loadstring("\27LJ\2\n≈\2\0\0\5\0\14\0\0176\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\4\0005\3\3\0=\3\5\0025\3\a\0005\4\6\0=\4\b\0035\4\t\0=\4\n\0035\4\v\0=\4\f\3=\3\r\2B\0\2\1K\0\1\0\fplugins\vlua_ls\1\0\2\30enabled_for_neovim_config\2\fenabled\2\vjsonls\1\0\2\28configured_servers_only\1\fenabled\2\14lspconfig\1\0\3\vjsonls\0\vlua_ls\0\14lspconfig\0\1\0\1\fenabled\2\vimport\1\0\4\19filetype_jsonc\2\vimport\0\16live_reload\2\fplugins\0\1\0\3\vvscode\2\tnlsp\1\bcoc\1\nsetup\fneoconf\frequire\0", "config", "neoconf.nvim")
time([[Config for neoconf.nvim]], false)
-- Config for: telescope.nvim
time([[Config for telescope.nvim]], true)
try_loadstring("\27LJ\2\nh\0\1\4\0\6\0\n6\1\0\0'\3\1\0B\1\2\0029\1\2\0019\1\3\0019\1\4\0019\1\5\1\18\3\0\0B\1\2\1K\0\1\0\vcreate\factions\17file_browser\15extensions\14telescope\frequireq\0\1\4\0\6\0\n6\1\0\0'\3\1\0B\1\2\0029\1\2\0019\1\3\0019\1\4\0019\1\5\1\18\3\0\0B\1\2\1K\0\1\0\20goto_parent_dir\factions\17file_browser\15extensions\14telescope\frequireI\0\1\b\1\1\0\n)\1\1\0)\2\n\0)\3\1\0M\1\5Ä-\5\0\0009\5\0\5\18\a\0\0B\5\2\1O\1˚\127K\0\1\0\1¿\28move_selection_previousE\0\1\b\1\1\0\n)\1\1\0)\2\n\0)\3\1\0M\1\5Ä-\5\0\0009\5\0\5\18\a\0\0B\5\2\1O\1˚\127K\0\1\0\1¿\24move_selection_nextS\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\vhidden\2\15find_files\22telescope.builtin\frequireD\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\15find_files\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14git_files\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14live_grep\22telescope.builtin\frequireà\1\0\0\6\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\a\0006\3\3\0009\3\4\0039\3\5\3'\5\6\0B\3\2\2=\3\b\2B\0\2\1K\0\1\0\vsearch\1\0\1\vsearch\0\fGrep > \ninput\afn\bvim\16grep_string\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14live_grep\22telescope.builtin\frequireâ\1\0\0\6\0\t\0\r6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\a\0006\3\3\0009\3\4\0039\3\5\3'\5\6\0B\3\2\2=\3\b\2B\0\2\1K\0\1\0\vsearch\1\0\1\vsearch\0\f<cWORD>\vexpand\afn\bvim\16grep_string\22telescope.builtin\frequireA\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\fbuffers\22telescope.builtin\frequire@\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\vresume\22telescope.builtin\frequireB\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\roldfiles\22telescope.builtin\frequireE\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\16diagnostics\22telescope.builtin\frequireD\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\15treesitter\22telescope.builtin\frequireC\0\0\3\0\3\0\0066\0\0\0'\2\1\0B\0\2\0029\0\2\0B\0\1\1K\0\1\0\14help_tags\22telescope.builtin\frequire/\0\0\3\0\4\0\0056\0\0\0009\0\1\0009\0\2\0'\2\3\0D\0\2\0\n%:p:h\vexpand\afn\bvimœ\1\1\0\6\1\a\0\r3\0\0\0-\1\0\0009\1\1\0019\1\2\0019\1\2\0015\3\3\0\18\4\0\0B\4\1\2=\4\4\0035\4\5\0=\4\6\3B\1\2\1K\0\1\0\0¿\18layout_config\1\0\1\vheight\4≥ÊÃô\3≥Ê¨ˇ\3\bcwd\1\0\a\vhidden\2\14previewer\1\fgrouped\2\17initial_mode\vnormal\bcwd\0\18layout_config\0\tpath\n%:p:h\17file_browser\15extensions\0Ì\16\1\0\n\0^\0Æ\0016\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0005\4\21\0005\5\4\0005\6\6\0005\a\5\0=\a\a\0065\a\b\0=\a\t\0065\a\n\0=\a\v\6=\6\f\0055\6\18\0005\a\14\0009\b\r\1=\b\15\a9\b\16\1=\b\17\a=\a\19\6=\6\20\5=\5\22\0045\5\25\0005\6\23\0005\a\24\0=\a\f\6=\6\26\0055\6\27\0005\a\28\0=\a\29\6=\6\30\5=\5\31\0045\5!\0005\6 \0=\6\"\0055\6#\0005\a-\0005\b%\0003\t$\0=\t&\b3\t'\0=\t(\b3\t)\0=\t*\b3\t+\0=\t,\b=\b.\a=\a\20\6=\6/\5=\0050\4B\2\2\0019\0021\0'\4\"\0B\2\2\0019\0021\0'\4/\0B\2\2\0016\0022\0009\0023\0029\0024\2'\4.\0'\0055\0003\0066\0005\a7\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\0058\0003\0069\0005\a:\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5;\0003\6<\0005\a=\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5>\0003\6?\0005\a@\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5A\0003\6B\0005\aC\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5D\0003\6E\0005\aF\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5G\0003\6H\0B\2\4\0016\0022\0009\0023\0029\0024\2'\4.\0'\5I\0003\6J\0005\aK\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5L\0003\6M\0005\aN\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5O\0003\6P\0005\aQ\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5R\0003\6S\0005\aT\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5U\0003\6V\0005\aW\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5X\0003\6Y\0005\aZ\0B\2\5\0016\0022\0009\0023\0029\0024\2'\4.\0'\5[\0003\6\\\0005\a]\0B\2\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\17File browser\0\asf\1\0\1\tdesc\14Help tags\0\15<leader>vh\1\0\1\tdesc\23Treesitter symbols\0\a;s\1\0\1\tdesc\16Diagnostics\0\a;e\1\0\1\tdesc\17Recent files\0\15<leader>fr\1\0\1\tdesc\18Resume picker\0\a;;\1\0\1\tdesc\fBuffers\0\a\\\\\0\15<leader>fW\1\0\1\tdesc\"Fuzzy search words in project\0\15<leader>fw\1\0\1\tdesc\16Grep search\0\15<leader>ps\1\0\1\tdesc\14Live grep\0\a;r\1\0\1\tdesc\14Git files\0\n<C-S>\1\0\1\tdesc\15Find files\0\15<leader>ff\1\0\1\tdesc%Find files (respects .gitignore)\0\a;f\bset\vkeymap\bvim\19load_extension\15extensions\17file_browser\6n\1\0\1\6n\0\n<C-d>\0\n<C-u>\0\6h\0\6N\1\0\4\6h\0\n<C-u>\0\6N\0\n<C-d>\0\0\1\0\3\17hijack_netrw\2\rmappings\0\ntheme\rdropdown\bfzf\1\0\2\bfzf\0\17file_browser\0\1\0\4\25override_file_sorter\2\28override_generic_sorter\2\14case_mode\15smart_case\nfuzzy\2\fpickers\15find_files\17find_command\1\6\0\0\arg\f--files\r--hidden\v--glob\15!**/.git/*\1\0\2\vhidden\2\17find_command\0\16diagnostics\1\0\2\16diagnostics\0\15find_files\0\1\0\1\19preview_cutoff\3èN\1\0\3\17initial_mode\vnormal\18layout_config\0\ntheme\bivy\rdefaults\1\0\3\15extensions\0\rdefaults\0\fpickers\0\rmappings\6i\1\0\1\6i\0\n<C-k>\28move_selection_previous\n<C-j>\1\0\2\n<C-k>\0\n<C-j>\0\24move_selection_next\18layout_config\vcenter\1\0\3\20prompt_position\btop\vheight\4≥ÊÃô\3≥Êåˇ\3\nwidth\4◊«¬Î\3äÆØˇ\3\rvertical\1\0\4\vheight\4ö≥ÊÃ\tô≥¶ˇ\3\20prompt_position\btop\19preview_cutoff\3(\nwidth\4◊«¬Î\3äÆØˇ\3\15horizontal\1\0\3\rvertical\0\vcenter\0\15horizontal\0\1\0\4\18preview_width\4ö≥ÊÃ\tô≥Üˇ\3\20prompt_position\btop\vheight\4ö≥ÊÃ\tô≥¶ˇ\3\nwidth\4◊«¬Î\3äÆØˇ\3\1\0\a\19color_devicons\1\20layout_strategy\15horizontal\18layout_config\0\rwinblend\3\0\rmappings\0\21sorting_strategy\14ascending\17wrap_results\2\nsetup\22telescope.actions\14telescope\frequire\0", "config", "telescope.nvim")
time([[Config for telescope.nvim]], false)
-- Config for: onedark.nvim
time([[Config for onedark.nvim]], true)
try_loadstring("\27LJ\2\nI\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\16transparent\2\nsetup\fonedark\frequire\0", "config", "onedark.nvim")
time([[Config for onedark.nvim]], false)
-- Config for: nvim-dap-ui
time([[Config for nvim-dap-ui]], true)
try_loadstring("\27LJ\2\n2\0\0\2\0\4\0\0056\0\0\0009\0\1\0'\1\3\0=\1\2\0K\0\1\0\neob: \14fillchars\awo\bvim2\0\0\2\0\4\0\0056\0\0\0009\0\1\0'\1\3\0=\1\2\0K\0\1\0\neob: \14fillchars\awo\bvim\30\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\topen\31\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\nclose\31\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\1¿\nclosew\0\0\4\1\b\0\0146\0\0\0009\0\1\0009\0\2\0'\2\3\0B\0\2\2\6\0\4\0X\1\6Ä-\1\0\0009\1\5\0019\1\6\0019\1\a\1\18\3\0\0B\1\2\1K\0\1\0\1¿\badd\fwatches\relements\5\23Watch expression: \ninput\afn\bvim9\0\0\2\1\3\0\6-\0\0\0009\0\0\0009\0\1\0009\0\2\0B\0\1\1K\0\1\0\1¿\vremove\fwatches\relements8\0\0\2\1\3\0\6-\0\0\0009\0\0\0009\0\1\0009\0\2\0B\0\1\1K\0\1\0\1¿\nclear\fwatches\relements¿\v\1\0\t\0?\0t6\0\0\0'\2\1\0B\0\2\0026\1\0\0'\3\2\0B\1\2\0029\2\3\0015\4\a\0005\5\4\0005\6\5\0=\6\6\5=\5\b\0045\5\t\0005\6\v\0005\a\n\0=\a\f\6=\6\r\5=\5\14\0045\5\15\0=\5\6\0044\5\3\0005\6\20\0004\a\5\0005\b\16\0>\b\1\a5\b\17\0>\b\2\a5\b\18\0>\b\3\a5\b\19\0>\b\4\a=\a\21\6>\6\1\0055\6\24\0004\a\3\0005\b\22\0>\b\1\a5\b\23\0>\b\2\a=\a\21\6>\6\2\5=\5\25\4B\2\2\0016\2\26\0009\2\27\0029\2\28\2'\4\29\0005\5\30\0B\2\3\0026\3\26\0009\3\27\0039\3\31\3'\5 \0005\6!\0=\2\"\0063\a#\0=\a$\6B\3\3\0016\3\26\0009\3\27\0039\3\31\3'\5 \0005\6%\0=\2\"\0063\a&\0=\a$\6B\3\3\0019\3'\0009\3(\0039\3)\0033\4*\0=\4\29\0039\3'\0009\3+\0039\3,\0033\4-\0=\4\29\0039\3'\0009\3+\0039\3.\0033\4/\0=\4\29\0036\3\26\0009\0030\0039\0031\3'\0052\0'\0063\0009\a4\0015\b5\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\0066\0003\a7\0005\b8\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\0069\0003\a:\0005\b;\0B\3\5\0016\3\26\0009\0030\0039\0031\3'\0052\0'\6<\0003\a=\0005\b>\0B\3\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\24DapUI clear watches\0\15<leader>dC\1\0\1\tdesc\23DapUI remove watch\0\15<leader>dW\1\0\1\tdesc\20DapUI add watch\0\15<leader>dw\1\0\1\tdesc\18DAP UI toggle\vtoggle\15<leader>du\6n\bset\vkeymap\0\17event_exited\0\21event_terminated\vbefore\0\22event_initialized\nafter\14listeners\0\1\0\3\fpattern\18\\[dap\\-repl\\]\rcallback\0\ngroup\0\rcallback\0\ngroup\1\0\3\fpattern\tDAP*\rcallback\0\ngroup\0\16BufWinEnter\24nvim_create_autocmd\1\0\1\nclear\2\17dapui_config\24nvim_create_augroup\bapi\bvim\flayouts\1\0\3\rposition\vbottom\relements\0\tsize\3\n\1\0\2\aid\fconsole\tsize\4≥ÊÃô\3≥Êåˇ\3\1\0\2\aid\trepl\tsize\4ö≥ÊÃ\tô≥Ê˛\3\relements\1\0\3\rposition\tleft\relements\0\tsize\3(\1\0\2\aid\fwatches\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\16breakpoints\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\vscopes\tsize\4\0ÄÄ¿˛\3\1\0\2\aid\vstacks\tsize\4\0ÄÄ¿˛\3\1\0\3\14collapsed\5\18current_frame\5\rexpanded\5\rfloating\rmappings\nclose\1\0\1\nclose\0\1\3\0\0\6q\n<Esc>\1\0\2\vborder\vsingle\rmappings\0\rcontrols\1\0\4\nicons\0\flayouts\0\rfloating\0\rcontrols\0\nicons\1\0\t\14step_into\tÛ∞Üπ\rstep_out\tÛ∞Ü∏\14step_over\5\14step_back\5\tplay\5\npause\v‚è∏Ô∏é\14terminate\v‚èπÔ∏é\rrun_last\5\15disconnect\5\1\0\3\nicons\0\fenabled\2\felement\trepl\nsetup\ndapui\bdap\frequire\0", "config", "nvim-dap-ui")
time([[Config for nvim-dap-ui]], false)
-- Config for: harpoon
time([[Config for harpoon]], true)
try_loadstring("\27LJ\2\n2\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\badd\tlistK\0\0\6\1\3\0\n-\0\0\0009\0\0\0\18\2\0\0009\0\1\0-\3\0\0\18\5\3\0009\3\2\3B\3\2\0A\0\1\1K\0\1\0\0¿\tlist\22toggle_quick_menu\aui9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\1\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\2\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\3\0B\0\3\1K\0\1\0\0¿\vselect\tlist9\0\0\4\1\2\0\t-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0)\3\4\0B\0\3\1K\0\1\0\0¿\vselect\tlist3\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\tprev\tlist3\0\0\3\1\2\0\b-\0\0\0\18\2\0\0009\0\0\0B\0\2\2\18\2\0\0009\0\1\0B\0\2\1K\0\1\0\0¿\tnext\tlist·\4\1\0\a\0\31\0H6\0\0\0'\2\1\0B\0\2\2\18\3\0\0009\1\2\0B\1\2\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\a\0003\5\b\0005\6\t\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\n\0003\5\v\0005\6\f\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\r\0003\5\14\0005\6\15\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\16\0003\5\17\0005\6\18\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\19\0003\5\20\0005\6\21\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\22\0003\5\23\0005\6\24\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\25\0003\5\26\0005\6\27\0B\1\5\0016\1\3\0009\1\4\0019\1\5\1'\3\6\0'\4\28\0003\5\29\0005\6\30\0B\1\5\0012\0\0ÄK\0\1\0\1\0\1\tdesc\18Harpoon: Next\0\n<C-N>\1\0\1\tdesc\22Harpoon: Previous\0\n<C-B>\1\0\1\tdesc\20Harpoon: File 4\0\14<leader>4\1\0\1\tdesc\20Harpoon: File 3\0\14<leader>3\1\0\1\tdesc\20Harpoon: File 2\0\14<leader>2\1\0\1\tdesc\20Harpoon: File 1\0\14<leader>1\1\0\1\tdesc\25Harpoon: Toggle menu\0\n<C-p>\1\0\1\tdesc\22Harpoon: Add file\0\14<leader>a\6n\bset\vkeymap\bvim\nsetup\fharpoon\frequire\0", "config", "harpoon")
time([[Config for harpoon]], false)
-- Config for: everforest
time([[Config for everforest]], true)
try_loadstring("\27LJ\2\nC\0\0\2\0\3\0\0056\0\0\0009\0\1\0)\1\1\0=\1\2\0K\0\1\0&everforest_transparent_background\6g\bvim\0", "config", "everforest")
time([[Config for everforest]], false)
-- Config for: dracula.nvim
time([[Config for dracula.nvim]], true)
try_loadstring("\27LJ\2\nL\0\0\3\0\4\0\a6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0B\0\2\1K\0\1\0\1\0\1\19transparent_bg\2\nsetup\fdracula\frequire\0", "config", "dracula.nvim")
time([[Config for dracula.nvim]], false)
-- Config for: nvim-lint
time([[Config for nvim-lint]], true)
try_loadstring("\27LJ\2\n\"\0\0\2\1\1\0\4-\0\0\0009\0\0\0B\0\1\1K\0\1\0\0¿\rtry_lintú\4\1\0\a\0\28\0$6\0\0\0'\2\1\0B\0\2\0025\1\4\0005\2\3\0=\2\5\0015\2\6\0=\2\a\0015\2\b\0=\2\t\0015\2\n\0=\2\v\0015\2\f\0=\2\r\0015\2\14\0=\2\15\0015\2\16\0=\2\17\1=\1\2\0006\1\18\0009\1\19\0019\1\20\1'\3\1\0005\4\21\0B\1\3\0026\2\18\0009\2\19\0029\2\22\0025\4\23\0005\5\24\0=\1\25\0053\6\26\0=\6\27\5B\2\3\0012\0\0ÄK\0\1\0\rcallback\0\ngroup\1\0\2\rcallback\0\ngroup\0\1\4\0\0\rBufEnter\17BufWritePost\16InsertLeave\24nvim_create_autocmd\1\0\1\nclear\2\24nvim_create_augroup\bapi\bvim\ash\1\2\0\0\15shellcheck\blua\1\2\0\0\rluacheck\nswift\1\2\0\0\14swiftlint\20typescriptreact\1\2\0\0\veslint\20javascriptreact\1\2\0\0\veslint\15typescript\1\2\0\0\veslint\15javascript\1\0\a\20typescriptreact\0\20javascriptreact\0\nswift\0\15javascript\0\blua\0\ash\0\15typescript\0\1\2\0\0\veslint\18linters_by_ft\tlint\frequire\0", "config", "nvim-lint")
time([[Config for nvim-lint]], false)
-- Config for: neovim
time([[Config for neovim]], true)
try_loadstring("\27LJ\2\nÛ\4\0\0\5\0\27\0;6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2\3\0005\3\4\0=\3\5\0025\3\a\0005\4\6\0=\4\b\3=\3\t\2B\0\2\0016\0\n\0009\0\v\0'\2\f\0B\0\2\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\15\0005\4\16\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\17\0005\4\18\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\19\0005\4\20\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\21\0005\4\22\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\23\0005\4\24\0B\0\4\0016\0\n\0009\0\r\0009\0\14\0)\2\0\0'\3\25\0005\4\26\0B\0\4\1K\0\1\0\1\0\2\tbold\2\afg\f#e0def4\17CursorLineNr\1\0\1\afg\f#6e6a86\vLineNr\1\0\1\abg\tnone\16EndOfBuffer\1\0\1\abg\tnone\15SignColumn\1\0\1\abg\tnone\16NormalFloat\1\0\1\abg\tnone\vNormal\16nvim_set_hl\bapi\26colorscheme rose-pine\bcmd\bvim\21highlight_groups\fComment\1\0\1\fComment\0\1\0\1\vitalic\1\vstyles\1\0\3\17transparency\2\vitalic\1\tbold\2\1\0\5\23disable_background\2\fvariant\tmoon\21highlight_groups\0\vstyles\0\29disable_float_background\2\nsetup\14rose-pine\frequire\0", "config", "neovim")
time([[Config for neovim]], false)
-- Config for: lualine.nvim
time([[Config for lualine.nvim]], true)
try_loadstring("\27LJ\2\n—\b\0\0\a\0-\0?6\0\0\0'\2\1\0B\0\2\0029\0\2\0005\2+\0005\3%\0005\4\n\0005\5\4\0005\6\3\0=\6\5\0055\6\6\0=\6\a\0055\6\b\0=\6\t\5=\5\v\0045\5\r\0005\6\f\0=\6\5\0055\6\14\0=\6\a\0055\6\15\0=\6\t\5=\5\16\0045\5\18\0005\6\17\0=\6\5\0055\6\19\0=\6\a\0055\6\20\0=\6\t\5=\5\21\0045\5\23\0005\6\22\0=\6\5\0055\6\24\0=\6\a\0055\6\25\0=\6\t\5=\5\26\0045\5\28\0005\6\27\0=\6\5\0055\6\29\0=\6\a\0055\6\30\0=\6\t\5=\5\31\0045\5!\0005\6 \0=\6\5\0055\6\"\0=\6\a\0055\6#\0=\6\t\5=\5$\4=\4&\0035\4'\0=\4(\0035\4)\0=\4*\3=\3,\2B\0\2\1K\0\1\0\foptions\1\0\1\foptions\0\23section_separators\1\0\2\tleft\5\nright\5\25component_separators\1\0\2\tleft\5\nright\5\ntheme\1\0\3\23section_separators\0\25component_separators\0\ntheme\0\rinactive\1\0\2\abg\f#101010\afg\f#474747\1\0\2\abg\f#101010\afg\f#474747\1\0\3\6a\0\6c\0\6b\0\1\0\2\abg\f#101010\afg\f#474747\fcommand\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\freplace\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vvisual\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vinsert\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\2\abg\f#101010\afg\f#b0b0b0\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\vnormal\1\0\6\vnormal\0\vinsert\0\fcommand\0\rinactive\0\freplace\0\vvisual\0\6c\1\0\2\abg\f#101010\afg\f#b0b0b0\6b\1\0\2\abg\f#101010\afg\f#b0b0b0\6a\1\0\3\6a\0\6c\0\6b\0\1\0\3\abg\f#101010\afg\f#b0b0b0\bgui\tbold\nsetup\flualine\frequire\0", "config", "lualine.nvim")
time([[Config for lualine.nvim]], false)
-- Config for: mini.hipatterns
time([[Config for mini.hipatterns]], true)
try_loadstring("\27LJ\2\nü\1\0\0\a\0\b\0\r6\0\0\0'\2\1\0B\0\2\0029\1\2\0005\3\6\0005\4\5\0009\5\3\0009\5\4\5B\5\1\2=\5\4\4=\4\a\3B\1\2\1K\0\1\0\17highlighters\1\0\1\17highlighters\0\1\0\1\14hex_color\0\14hex_color\20gen_highlighter\nsetup\20mini.hipatterns\frequire\0", "config", "mini.hipatterns")
time([[Config for mini.hipatterns]], false)

-- Command lazy-loads
time([[Defining lazy-load commands]], true)
pcall(vim.api.nvim_create_user_command, 'ObsidianQuickSwitch', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianQuickSwitch', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianQuickSwitch ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianSearch', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianSearch', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianSearch ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianTags', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianTags', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianTags ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianTemplate', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianTemplate', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianTemplate ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianToday', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianToday', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianToday ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianToggleCheckbox', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianToggleCheckbox', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianToggleCheckbox ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianTomorrow', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianTomorrow', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianTomorrow ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianTOC', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianTOC', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianTOC ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianYesterday', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianYesterday', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianYesterday ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Oil', function(cmdargs)
          require('packer.load')({'oil.nvim'}, { cmd = 'Oil', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'oil.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Oil ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'TSInstall', function(cmdargs)
          require('packer.load')({'nvim-treesitter'}, { cmd = 'TSInstall', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'nvim-treesitter'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('TSInstall ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'IncRename', function(cmdargs)
          require('packer.load')({'inc-rename.nvim'}, { cmd = 'IncRename', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'inc-rename.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('IncRename ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'TSUpdate', function(cmdargs)
          require('packer.load')({'nvim-treesitter'}, { cmd = 'TSUpdate', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'nvim-treesitter'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('TSUpdate ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'TSUpdateSync', function(cmdargs)
          require('packer.load')({'nvim-treesitter'}, { cmd = 'TSUpdateSync', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'nvim-treesitter'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('TSUpdateSync ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'TSInstallSync', function(cmdargs)
          require('packer.load')({'nvim-treesitter'}, { cmd = 'TSInstallSync', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'nvim-treesitter'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('TSInstallSync ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'WithMeStop', function(cmdargs)
          require('packer.load')({'vim-with-me'}, { cmd = 'WithMeStop', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-with-me'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('WithMeStop ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'LazyGit', function(cmdargs)
          require('packer.load')({'lazygit.nvim'}, { cmd = 'LazyGit', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'lazygit.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('LazyGit ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Rest', function(cmdargs)
          require('packer.load')({'rest.nvim'}, { cmd = 'Rest', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'rest.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Rest ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'DBUI', function(cmdargs)
          require('packer.load')({'vim-dadbod-ui'}, { cmd = 'DBUI', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-dadbod-ui'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('DBUI ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'DBUIToggle', function(cmdargs)
          require('packer.load')({'vim-dadbod-ui'}, { cmd = 'DBUIToggle', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-dadbod-ui'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('DBUIToggle ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'WithMe', function(cmdargs)
          require('packer.load')({'vim-with-me'}, { cmd = 'WithMe', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-with-me'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('WithMe ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'WithMeStart', function(cmdargs)
          require('packer.load')({'vim-with-me'}, { cmd = 'WithMeStart', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-with-me'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('WithMeStart ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'DBUIAddConnection', function(cmdargs)
          require('packer.load')({'vim-dadbod-ui'}, { cmd = 'DBUIAddConnection', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-dadbod-ui'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('DBUIAddConnection ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'DBUIFindBuffer', function(cmdargs)
          require('packer.load')({'vim-dadbod-ui'}, { cmd = 'DBUIFindBuffer', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'vim-dadbod-ui'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('DBUIFindBuffer ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianRename', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianRename', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianRename ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'Copilot', function(cmdargs)
          require('packer.load')({'copilot.lua'}, { cmd = 'Copilot', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'copilot.lua'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('Copilot ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianBacklinks', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianBacklinks', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianBacklinks ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianDailies', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianDailies', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianDailies ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianExtractNote', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianExtractNote', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianExtractNote ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianFollowLink', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianFollowLink', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianFollowLink ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianLink', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianLink', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianLink ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianLinkNew', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianLinkNew', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianLinkNew ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianLinks', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianLinks', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianLinks ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianNew', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianNew', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianNew ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianNewFromTemplate', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianNewFromTemplate', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianNewFromTemplate ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianOpen', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianOpen', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianOpen ', 'cmdline')
      end})
pcall(vim.api.nvim_create_user_command, 'ObsidianPasteImg', function(cmdargs)
          require('packer.load')({'obsidian.nvim'}, { cmd = 'ObsidianPasteImg', l1 = cmdargs.line1, l2 = cmdargs.line2, bang = cmdargs.bang, args = cmdargs.args, mods = cmdargs.mods }, _G.packer_plugins)
        end,
        {nargs = '*', range = true, bang = true, complete = function()
          require('packer.load')({'obsidian.nvim'}, {}, _G.packer_plugins)
          return vim.fn.getcompletion('ObsidianPasteImg ', 'cmdline')
      end})
time([[Defining lazy-load commands]], false)

-- Keymap lazy-loads
time([[Defining lazy-load keymaps]], true)
vim.cmd [[noremap <silent> S <cmd>lua require("packer.load")({'flash.nvim'}, { keys = "S", prefix = "" }, _G.packer_plugins)<cr>]]
vim.cmd [[noremap <silent> s <cmd>lua require("packer.load")({'flash.nvim'}, { keys = "s", prefix = "" }, _G.packer_plugins)<cr>]]
time([[Defining lazy-load keymaps]], false)

vim.cmd [[augroup packer_load_aucmds]]
vim.cmd [[au!]]
  -- Filetype lazy-loads
time([[Defining lazy-load filetype autocommands]], true)
vim.cmd [[au FileType kotlin ++once lua require("packer.load")({'kotlin-vim'}, { ft = "kotlin" }, _G.packer_plugins)]]
vim.cmd [[au FileType markdown ++once lua require("packer.load")({'obsidian.nvim'}, { ft = "markdown" }, _G.packer_plugins)]]
time([[Defining lazy-load filetype autocommands]], false)
  -- Event lazy-loads
time([[Defining lazy-load event autocommands]], true)
vim.cmd [[au BufReadPost * ++once lua require("packer.load")({'nvim-treesitter'}, { event = "BufReadPost *" }, _G.packer_plugins)]]
vim.cmd [[au BufNewFile * ++once lua require("packer.load")({'nvim-treesitter'}, { event = "BufNewFile *" }, _G.packer_plugins)]]
vim.cmd [[au InsertEnter * ++once lua require("packer.load")({'copilot.lua'}, { event = "InsertEnter *" }, _G.packer_plugins)]]
time([[Defining lazy-load event autocommands]], false)
vim.cmd("augroup END")
vim.cmd [[augroup filetypedetect]]
time([[Sourcing ftdetect script at: /Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/kotlin-vim/ftdetect/kotlin.vim]], true)
vim.cmd [[source /Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/kotlin-vim/ftdetect/kotlin.vim]]
time([[Sourcing ftdetect script at: /Users/ansh/.local/share/nvim-packer/site/pack/packer/opt/kotlin-vim/ftdetect/kotlin.vim]], false)
vim.cmd("augroup END")

_G._packer.inside_compile = false
if _G._packer.needs_bufread == true then
  vim.cmd("doautocmd BufRead")
end
_G._packer.needs_bufread = false

if should_profile then save_profiles() end

end)

if not no_errors then
  error_msg = error_msg:gsub('"', '\\"')
  vim.api.nvim_command('echohl ErrorMsg | echom "Error in packer_compiled: '..error_msg..'" | echom "Please check your config for correctness" | echohl None')
end
