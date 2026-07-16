local _print = vim.print

_G.dd = function(...)
	_print(...)
end

local nvim_data = vim.fn.expand("~/.local/share/nvim")
local packer_data = vim.fn.stdpath("data")
for _, parser in ipairs(vim.fn.readdir(nvim_data .. "/site/parser")) do
	local dest = packer_data .. "/site/parser/" .. parser
	if vim.fn.filereadable(dest) == 0 then
		vim.fn.system({ "cp", "-n", nvim_data .. "/site/parser/" .. parser, dest })
	end
end

pcall(function()
	require("neoconf").setup({
		import = { vscode = true, coc = false, nlsp = false },
		live_reload = true,
		filetype_jsonc = true,
		plugins = {
			lspconfig = { enabled = true },
			jsonls = { enabled = true, configured_servers_only = false },
			lua_ls = { enabled = true, enabled_for_neovim_config = true },
		},
	})
end)

local orig_deprecate = vim.deprecate
vim.deprecate = function(name, alternative, version, plugin, backtrace)
	if plugin == "nvim-lspconfig" then
		return
	end
	return orig_deprecate(name, alternative, version, plugin, backtrace)
end

require("config.autocmds")
require("config.options")
require("config.packer")

require("config.lsp_setup").setup()

require("config.keymaps")

require("config.theme").setup({
	default = "rose-pine",
})

vim.api.nvim_create_autocmd("UIEnter", {
	once = true,
	callback = function()
		vim.opt.cursorline = false
		vim.opt.cursorcolumn = false
		require("config.theme").load()
	end,
})
