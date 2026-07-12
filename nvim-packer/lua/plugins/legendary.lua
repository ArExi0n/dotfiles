return {
	{
		"folke/which-key.nvim",
		config = function()
			vim.api.nvim_create_autocmd("UIEnter", {
				once = true,
				callback = function()
					require("which-key").setup({
						icons = {
							breadcrumb = "»",
							separator = "➜",
							group = "+",
						},
						presets = {
							operators = true,
							motions = true,
							text_objects = true,
							windows = true,
							nav = true,
							z = true,
							g = true,
						},
					})
				end,
			})
		end,
	},
	{
		"mrjones2014/legendary.nvim",
		requires = { "folke/which-key.nvim" },
		config = function()
			require("legendary").setup({
				which_key = {
					auto_register = true,
				},
			})
			vim.keymap.set("n", "<leader>?", "<cmd>Legendary<CR>", { desc = "Find keybindings" })
		end,
	},
}
