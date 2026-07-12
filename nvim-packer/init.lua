local _print = vim.print

_G.dd = function(...)
	_print(...)
end

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
