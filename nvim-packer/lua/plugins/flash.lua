return {
	{
		"folke/flash.nvim",
		keys = { "s", "S" },
		config = function()
			require("flash").setup({
				modes = {
					char = { enabled = false },
				},
			})
			vim.keymap.set({ "n", "x", "o" }, "s", function()
				require("flash").jump()
			end, { desc = "Flash" })
			vim.keymap.set({ "n", "x", "o" }, "S", function()
				require("flash").treesitter()
			end, { desc = "Flash Treesitter" })
		end,
	},
}
