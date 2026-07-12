return {
	{
		"stevearc/oil.nvim",
		requires = { "nvim-tree/nvim-web-devicons" },
		cmd = { "Oil" },
		module = "oil",
		config = function()
			require("oil").setup({
				default_file_explorer = true,
				skip_confirm_for_simple_edits = true,
				view_options = {
					show_hidden = true,
				},
				keymaps = {
					["<C-p>"] = false,
					["<C-c>"] = false,
				},
			})
		end,
	},
}
