local ensure_packer = function()
	local fn = vim.fn
	local install_path = fn.stdpath("data") .. "/site/pack/packer/start/packer.nvim"
	if fn.empty(fn.glob(install_path)) > 0 then
		fn.system({ "git", "clone", "--depth", "1", "https://github.com/wbthomason/packer.nvim", install_path })
		vim.cmd([[packadd packer.nvim]])
		return true
	end
	return false
end

local packer_bootstrap = ensure_packer()

return require("packer").startup(function(use)
	use("wbthomason/packer.nvim")

	use({
		"nvim-telescope/telescope.nvim",
		tag = "0.1.8",
		requires = { { "nvim-lua/plenary.nvim" } },
	})

	use({
		"catppuccin/nvim",
		as = "catppuccin",
		config = function()
			vim.cmd("colorscheme catppuccin-frappe")
		end,
	})

	use("nvim-treesitter/nvim-treesitter", { run = ":TSUpdate" })
	use("nvim-treesitter/playground")
	use("tpope/vim-fugitive")
	use("mbbill/undotree")
	use("neovim/nvim-lspconfig")
	use("williamboman/mason.nvim")
	use("williamboman/mason-lspconfig.nvim")
	use("hrsh7th/nvim-cmp")
	use("VonHeikemen/lsp-zero.nvim")
	use("hrsh7th/cmp-nvim-lsp")
	use("hrsh7th/cmp-buffer")
	use("hrsh7th/cmp-path")
	use("L3MON4D3/LuaSnip")
	use("saadparwaiz1/cmp_luasnip")
	use("theprimeagen/harpoon")

	use({
		"nvim-lualine/lualine.nvim",
		requires = { "nvim-tree/nvim-web-devicons", opt = true },
	})

	use({
		"nvim-tree/nvim-tree.lua",
		requires = {
			"nvim-tree/nvim-web-devicons",
		},
	})

	use({
		"zbirenbaum/copilot.lua",
		cmd = "Copilot",
		event = "InsertEnter",
		config = function()
			require("copilot").setup({
				suggestion = {
					enabled = true,
					auto_trigger = true,
					debounce = 75,
					keymap = {
						accept = "<Tab>",
						accept_word = "<C-Right>",
						accept_line = "<C-l>",
						next = "<C-]>",
						prev = "<C-[>",
						dismiss = "<C-e>",
					},
				},
				panel = { enabled = false },
			})
		end,
	})

	use({
		"zbirenbaum/copilot-cmp",
		after = { "copilot.lua" },
		config = function()
			require("copilot_cmp").setup()
		end,
	})

	use({
		"CopilotC-Nvim/CopilotChat.nvim",
		branch = "main",
		requires = {
			{ "zbirenbaum/copilot.lua" },
			{ "nvim-lua/plenary.nvim" },
		},
		config = function()
			local map = vim.keymap.set
			local opts = { noremap = true, silent = true }

			require("CopilotChat").setup({
				debug = false,
				window = {
					layout = "float",
					relative = "editor",
					width = 0.45,
					height = 0.6,
					border = "rounded",
				},
			})

			map("n", "<leader>cc", "<cmd>CopilotChatToggle<CR>", opts)
			map("n", "<leader>cx", "<cmd>CopilotChatReset<CR>", opts)
			map("n", "gr", "<cmd>CopilotChatRefresh<CR>", opts)
			map("n", "<M-CR>", "<cmd>CopilotChatToggle<CR>", opts)
			map("n", "<leader>ce", "<cmd>CopilotChatExplain<CR>", opts)
			map("n", "<leader>cf", "<cmd>CopilotChatFix<CR>", opts)
			map("n", "<leader>cF", "<cmd>CopilotChatDiagnostics<CR>", opts)
			map("v", "<leader>ce", "<cmd>CopilotChatExplain<CR>", opts)
			map("v", "<leader>co", "<cmd>CopilotChatOptimize<CR>", opts)
			map("v", "<leader>cr", "<cmd>CopilotChatReview<CR>", opts)
			map("n", "<leader>cq", "<cmd>CopilotChatQuick<CR>", opts)
			map("n", "<leader>cd", "<cmd>CopilotChatDocs<CR>", opts)
			map("n", "<leader>ct", "<cmd>CopilotChatTests<CR>", opts)
			map("n", "[[", "<cmd>CopilotChatPrev<CR>", opts)
			map("n", "]]", "<cmd>CopilotChatNext<CR>", opts)
		end,
	})
	vim.opt.shiftwidth = 4
	vim.opt.tabstop = 4
	vim.opt.softtabstop = 4
	vim.opt.smartindent = true

	-- Automatically set up your configuration after cloning packer.nvim
	if packer_bootstrap then
		require("packer").sync()
	end
	-- === LazyVim-like UI Core ===
	use({
		"folke/noice.nvim",
		event = "VeryLazy",
		requires = {
			"MunifTanjim/nui.nvim",
			"rcarriga/nvim-notify",
		},
		config = function()
			require("notify").setup({
				stages = "fade_in_slide_out",
				timeout = 2000,
				render = "default",
				background_colour = "#1a1b26",
			})
			vim.notify = require("notify")

			require("noice").setup({
				lsp = {
					override = {
						["vim.lsp.util.convert_input_to_markdown_lines"] = true,
						["vim.lsp.util.stylize_markdown"] = true,
						["cmp.entry.get_documentation"] = true,
					},
				},
				presets = {
					bottom_search = true, -- position search at bottom
					command_palette = true, -- cmdline + popupmenu together
					long_message_to_split = true,
					inc_rename = false,
					lsp_doc_border = true,
				},
			})
			vim.o.cmdheight = 0 -- makes Noice take over cmdline UI
		end,
	})

	-- === Telescope (LazyVim style) ===
	use({
		"nvim-telescope/telescope.nvim",
		requires = { "nvim-lua/plenary.nvim", "nvim-telescope/telescope-fzf-native.nvim", run = "make" },
		config = function()
			local telescope = require("telescope")
			telescope.setup({
				defaults = {
					sorting_strategy = "ascending",
					layout_strategy = "horizontal",
					layout_config = {
						prompt_position = "top",
						preview_width = 0.6,
						width = 0.9,
						height = 0.85,
					},
					border = true,
					borderchars = {
						prompt = { "─", "│", " ", "│", "╭", "╮", "│", "│" },
						results = { "─", "│", "─", "│", "├", "┤", "╯", "╰" },
						preview = { "─", "│", "─", "│", "╭", "╮", "╯", "╰" },
					},
					winblend = 10,
				},
			})
			telescope.load_extension("fzf")
		end,
	})

	-- === Pretty LSP popups (rounded borders) ===
	use({
		"neovim/nvim-lspconfig",
		config = function()
			-- make LSP popups look like LazyVim
			local border = {
				{ "┌", "FloatBorder" },
				{ "─", "FloatBorder" },
				{ "┐", "FloatBorder" },
				{ "│", "FloatBorder" },
				{ "┘", "FloatBorder" },
				{ "─", "FloatBorder" },
				{ "└", "FloatBorder" },
				{ "│", "FloatBorder" },
			}
			vim.diagnostic.config({
				float = { border = "rounded" },
			})
			require("lspconfig.ui.windows").default_options.border = "rounded"
		end,
	})

	-- === Statusline (Minimal LazyVim-like) ===
	use({
		"nvim-lualine/lualine.nvim",
		requires = { "nvim-tree/nvim-web-devicons" },
		config = function()
			require("lualine").setup({
				options = {
					theme = "auto",
					section_separators = "",
					component_separators = "",
					globalstatus = true,
				},
			})
		end,
	})
end)
