return {
	{
		"supermaven-inc/supermaven-nvim",
		config = function()
			require("supermaven-nvim").setup({
				keymaps = {
					accept_suggestion = "<C-a>",
					clear_suggestion = "<C-]>",
					accept_word = "<M-C-j>",
				},
			})
			vim.g.ai_cmp = true
		end,
	},
}
