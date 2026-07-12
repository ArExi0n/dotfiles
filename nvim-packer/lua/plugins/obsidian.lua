return {
	{
		"epwalsh/obsidian.nvim",
		requires = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope.nvim",
			"hrsh7th/nvim-cmp",
		},
		ft = "markdown",
		cmd = {
			"ObsidianBacklinks",
			"ObsidianDailies",
			"ObsidianExtractNote",
			"ObsidianFollowLink",
			"ObsidianLink",
			"ObsidianLinkNew",
			"ObsidianLinks",
			"ObsidianNew",
			"ObsidianNewFromTemplate",
			"ObsidianOpen",
			"ObsidianPasteImg",
			"ObsidianQuickSwitch",
			"ObsidianRename",
			"ObsidianSearch",
			"ObsidianTags",
			"ObsidianTemplate",
			"ObsidianToday",
			"ObsidianToggleCheckbox",
			"ObsidianTomorrow",
			"ObsidianTOC",
			"ObsidianYesterday",
		},

		config = function()
			local group = vim.api.nvim_create_augroup("salar-obsidian-markdown", { clear = true })

			vim.api.nvim_create_autocmd("FileType", {
				group = group,
				pattern = "markdown",
				callback = function(args)
					require("config.obsidian").setup_markdown_buffer(args.buf)
				end,
			})

			local opts = require("config.obsidian").opts()
			require("obsidian").setup(opts)
			require("config.obsidian").patch_template_substitutions()
		end,
	},
}
