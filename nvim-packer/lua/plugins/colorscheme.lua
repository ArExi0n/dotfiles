return {
	{
		"oskarnurm/koda.nvim",
		name = "koda",
		config = function()
			require("config.koda").setup("koda-dark")
		end,
	},
	{
		"folke/tokyonight.nvim",
		config = function()
			require("tokyonight").setup({
				style = "storm",
				transparent = true,
			})
		end,
	},
	{
		"rebelot/kanagawa.nvim",
		config = function()
			require("kanagawa").setup({
				transparent = true,
			})
		end,
	},
	{
		"rose-pine/neovim",
		name = "rose-pine",
		priority = 1000,
		config = function()
			require("rose-pine").setup({
				variant = "moon",
				disable_background = true,
				disable_float_background = true,

				styles = {
					bold = true,
					italic = false,
					transparency = true,
				},

				highlight_groups = {
					Comment = { italic = false },
				},
			})

			vim.cmd("colorscheme rose-pine")

			vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
			vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
			vim.api.nvim_set_hl(0, "SignColumn", { bg = "none" })
			vim.api.nvim_set_hl(0, "EndOfBuffer", { bg = "none" })
			vim.api.nvim_set_hl(0, "LineNr", { fg = "#6e6a86" })
			vim.api.nvim_set_hl(0, "CursorLineNr", { fg = "#e0def4", bold = true })
		end,
	},
	{
		"ellisonleao/gruvbox.nvim",
		config = function()
			require("gruvbox").setup({
				transparent_mode = true,
			})
		end,
	},
	{
		"navarasu/onedark.nvim",
		config = function()
			require("onedark").setup({
				transparent = true,
			})
		end,
	},
	{
		"EdenEast/nightfox.nvim",
		config = function()
			require("nightfox").setup({
				transparent = true,
			})
		end,
	},
	{
		"sainnhe/everforest",
		config = function()
			vim.g.everforest_transparent_background = 1
		end,
	},
	{
		"sainnhe/sonokai",
		config = function()
			vim.g.sonokai_transparent_background = 1
		end,
	},
	{
		"Mofiqul/dracula.nvim",
		config = function()
			require("dracula").setup({
				transparent_bg = true,
			})
		end,
	},
	{
		"nyoom-engineering/oxocarbon.nvim",
	},
	{
		"catppuccin/nvim",
		name = "catppuccin",
		config = function()
			require("catppuccin").setup({
				flavour = "frappe",
				transparent_background = true,
				show_end_of_buffer = false,
				term_colors = false,
				dim_inactive = {
					enabled = false,
					shade = "dark",
					percentage = 0.15,
				},
				no_italic = false,
				no_bold = false,
				no_underline = false,
				styles = {
					comments = { "italic" },
					conditionals = { "italic" },
					loops = {},
					functions = {},
					keywords = {},
					strings = {},
					variables = {},
					numbers = {},
					booleans = {},
					properties = {},
					types = {},
					operators = {},
				},
				color_overrides = {},
				custom_highlights = function(colors)
					return {
						CursorLine = { bg = "NONE" },
						CursorLineNr = { fg = colors.lavender, bg = "NONE" },
						LspReferenceText = { bg = "NONE" },
						LspReferenceRead = { bg = "NONE" },
						LspReferenceWrite = { bg = "NONE" },
						MatchParen = { fg = colors.peach, bg = "NONE", bold = true },
						TelescopeNormal = { bg = "NONE" },
						TelescopeBorder = { bg = "NONE" },
						TelescopePromptNormal = { bg = "NONE" },
						TelescopePromptBorder = { bg = "NONE" },
						TelescopePromptTitle = { bg = "NONE" },
						TelescopeResultsNormal = { bg = "NONE" },
						TelescopeResultsBorder = { bg = "NONE" },
						TelescopeResultsTitle = { bg = "NONE" },
						TelescopePreviewNormal = { bg = "NONE" },
						TelescopePreviewBorder = { bg = "NONE" },
						TelescopePreviewTitle = { bg = "NONE" },
						NormalFloat = { bg = "NONE" },
						FloatBorder = { bg = "NONE" },
						FloatTitle = { bg = "NONE" },
						Pmenu = { bg = "NONE" },
						PmenuSel = { bg = colors.surface0 },
						PmenuBorder = { bg = "NONE" },
						LspInfoBorder = { bg = "NONE" },
						WhichKeyFloat = { bg = "NONE" },
						NotifyBackground = { bg = "NONE" },
						MasonNormal = { bg = "NONE" },
						LazyNormal = { bg = "NONE" },
					}
				end,
				integrations = {
					cmp = true,
					gitsigns = true,
					treesitter = true,
					notify = true,
					mini = {
						enabled = true,
						indentscope_color = "",
					},
					telescope = {
						enabled = true,
					},
					which_key = true,
					native_lsp = {
						enabled = true,
						virtual_text = {
							errors = { "italic" },
							hints = { "italic" },
							warnings = { "italic" },
							information = { "italic" },
						},
						underlines = {
							errors = { "underline" },
							hints = { "underline" },
							warnings = { "underline" },
							information = { "underline" },
						},
					},
					mason = true,
				},
			})
			vim.opt.cursorline = false
			vim.api.nvim_create_autocmd("LspAttach", {
				callback = function(args)
					local client = vim.lsp.get_client_by_id(args.data.client_id)
					if client and client.server_capabilities.documentHighlightProvider then
						client.server_capabilities.documentHighlightProvider = false
					end
				end,
			})
		end,
	},
}
