return {
	{
		"saghen/blink.cmp",
		run = function()
			require("blink.cmp").build():pwait()
		end,
		requires = {
			"L3MON4D3/LuaSnip",
			"rafamadriz/friendly-snippets",
			"saghen/blink.lib",
		},
		config = function()
			require("blink.cmp").setup({
				snippets = {
					preset = "default",
					expand = function(snippet)
						local ok, err = pcall(vim.snippet.expand, snippet)
						if not ok then
							vim.notify("Snippet expand failed: " .. err, vim.log.levels.WARN)
						end
					end,
				},
				appearance = {
					use_nvim_cmp_as_default = false,
					nerd_font_variant = "mono",
				},
				completion = {
					accept = {
						auto_brackets = { enabled = true },
					},
					menu = {
						draw = {
							treesitter = { "lsp" },
						},
					},
					documentation = {
						auto_show = true,
						auto_show_delay_ms = 200,
					},
					ghost_text = {
						enabled = vim.g.ai_cmp,
					},
				},
				sources = {
					default = { "lsp", "path", "snippets", "buffer" },
				},
				cmdline = {
					enabled = true,
					keymap = {
						["<C-j>"] = { "select_next" },
						["<C-k>"] = { "select_prev" },
					},
				},
				keymap = {
					preset = "enter",
					["<C-j>"] = { "select_next", "fallback" },
					["<C-k>"] = { "select_prev", "fallback" },
					["<C-n>"] = nil,
					["<C-p>"] = nil,
					["<C-y>"] = { "select_and_accept" },
				},
				fuzzy = {
					frecency = { enabled = true },
					use_proximity = true,
					sorts = { "score", "sort_text", "kind" },
				},
			})
		end,
	},
}
