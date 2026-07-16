return {
	{
		"folke/snacks.nvim",
		config = function()
			require("snacks").setup({
				indent = { enabled = false },
				scroll = { enabled = false },
			})
		end,
	},
}
