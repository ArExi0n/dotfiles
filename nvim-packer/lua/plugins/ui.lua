return {
	{
		"sphamba/smear-cursor.nvim",
		disable = true,
	},
	{
		"nvim-lualine/lualine.nvim",
		config = function()
			require("lualine").setup({
				options = {
					theme = "auto",
					component_separators = { left = "", right = "" },
					section_separators = { left = "", right = "" },
				},
			})
		end,
	},
	{
		"rcarriga/nvim-notify",
		config = function()
			require("notify").setup({
				timeout = 5000,
				background_colour = "#000000",
				render = "wrapped-compact",
			})
			vim.notify = require("notify")
		end,
	},
	{
		"akinsho/bufferline.nvim",
		disable = true,
	},
	{
		"b0o/incline.nvim",
		config = function()
			require("incline").setup({
				window = {
					padding = 0,
					margin = { horizontal = 0 },
				},
				render = function(props)
					local filename = vim.fn.fnamemodify(vim.api.nvim_buf_get_name(props.buf), ":t")
					local ft_icon = require("nvim-web-devicons").get_icon(filename)
					local normal = vim.api.nvim_get_hl(0, { name = "Normal", link = false })
					local bg = normal.bg or 0x000000
					local fg = normal.fg or 0xffffff
					local modified = vim.bo[props.buf].modified
					local buffer = {
						ft_icon and { " ", ft_icon, " ", guibg = bg, guifg = fg } or "",
						" ",
						{ filename, gui = modified and "bold,italic" or "bold" },
						" ",
						guibg = bg,
					}
					return buffer
				end,
			})
		end,
	},
	{
		"kdheepak/lazygit.nvim",
		requires = { "nvim-lua/plenary.nvim" },
		cmd = "LazyGit",
	},
	{
		"kristijanhusak/vim-dadbod-ui",
		requires = {
			"tpope/vim-dadbod",
			"kristijanhusak/vim-dadbod-completion",
		},
		cmd = {
			"DBUI",
			"DBUIToggle",
			"DBUIAddConnection",
			"DBUIFindBuffer",
		},
		setup = function()
			vim.g.db_ui_use_nerd_fonts = 1
		end,
		config = function()
			vim.keymap.set("n", "<leader>d", "<cmd>tabnew<cr><bar><bar><cmd>DBUI<cr>")
		end,
	},
}
