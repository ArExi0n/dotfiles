return {
	{
		"folke/neoconf.nvim",
		config = function()
			require("neoconf").setup({
				import = {
					vscode = true,
					coc = false,
					nlsp = false,
				},
				live_reload = true,
				filetype_jsonc = true,
				plugins = {
					lspconfig = {
						enabled = true,
					},
					jsonls = {
						enabled = true,
						configured_servers_only = false,
					},
					lua_ls = {
						enabled = true,
						enabled_for_neovim_config = true,
					},
				},
			})
		end,
	},
}
