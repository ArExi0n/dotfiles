local packer_path = vim.fn.stdpath("data") .. "/site/pack/packer/start/packer.nvim"

if vim.fn.empty(vim.fn.glob(packer_path)) > 0 then
  vim.fn.system({
    "git", "clone", "--depth", "1",
    "https://github.com/wbthomason/packer.nvim",
    packer_path,
  })
  vim.cmd("packadd packer.nvim")
end

vim.cmd("autocmd BufWritePost " .. vim.fn.stdpath("config") .. "/lua/config/packer.lua source " .. vim.fn.stdpath("config") .. "/lua/config/packer.lua")

-- Remove blink.cmp's auto-plugin file to prevent circular require loop
local blink_plugin = packer_path:gsub("packer.nvim$", "blink.cmp/plugin/blink-cmp.lua")
if vim.fn.filereadable(blink_plugin) == 1 then
  vim.fn.delete(blink_plugin)
end

local status_ok, packer = pcall(require, "packer")
if not status_ok then
  return
end

packer.init({
  git = {
    clone_timeout = 120,
  },
  auto_clean = true,
  compile_on_sync = true,
  display = {
    non_interactive = false,
    open_fn = function()
      return require("packer.util").float({ border = "rounded" })
    end,
  },
})

packer.startup(function(use)
  use "wbthomason/packer.nvim"

  -- Colorscheme plugins (loaded eagerly)
  local colorscheme_plugins = require("plugins.colorscheme")
  for _, spec in ipairs(colorscheme_plugins) do
    use(spec)
  end

  -- Plugin groups loaded from separate files
  local plugin_files = {
    "plugins.ai",
    "plugins.async",
    "plugins.alpha",
    "plugins.snippets",
    "plugins.blink",
    "plugins.cpp",
    "plugins.fidget",
    "plugins.gitsigns",
    "plugins.integrations",
    "plugins.kotlin",
    "plugins.legendary",
    "plugins.local",
    "plugins.neoconf",
    "plugins.lsp",
    "plugins.nvim-dap",
    "plugins.nvim-dapui",
    "plugins.extra",
    "plugins.obsidian",
    "plugins.oil",
    "plugins.refactoring",
    "plugins.snacks",
    "plugins.telescope",
    "plugins.testing",
    "plugins.treesitter",
    "plugins.trouble",
    "plugins.ui",
    "plugins.undotree",
    "plugins.xcode-build",
  }

  for _, mod in ipairs(plugin_files) do
    local ok, specs = pcall(require, mod)
    if ok and type(specs) == "table" then
      if type(specs[1]) == "table" then
        for _, spec in ipairs(specs) do
          use(spec)
        end
      else
        use(specs)
      end
    end
  end
end)
