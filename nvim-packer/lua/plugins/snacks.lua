return {
	{
		"folke/snacks.nvim",
		config = function()
			require("snacks").setup({
				scroll = { enabled = false },
			})
		end,
	},
}
