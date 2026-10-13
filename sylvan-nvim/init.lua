vim.g.mapleader = " "
vim.g.maplocalleader = " "
-- Reuse main nvim's Mason servers (NVIM_APPNAME isolates data dirs, so
-- sylvan's own mason dir is empty). Prepending keeps single installs working
-- for lua_ls, pyright, ts_ls, gopls, etc. without duplicating them.
do
	local main_mason_bin = vim.fn.expand("~/.local/share/nvim/mason/bin")
	if vim.fn.isdirectory(main_mason_bin) == 1 and not string.find(vim.env.PATH or "", main_mason_bin, 1, true) then
		vim.env.PATH = main_mason_bin .. ":" .. (vim.env.PATH or "")
	end
end
vim.cmd([[set mouse=]])
vim.cmd([[set noswapfile]])
vim.cmd([[hi @lsp.type.number gui=bold]])
vim.opt.winborder = "rounded"
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.showtabline = 2
vim.opt.signcolumn = "yes"
vim.opt.wrap = false
vim.opt.breakindent = true
vim.opt.breakindentopt = { "shift:2", "min:20" }
vim.opt.linebreak = true
vim.opt.showbreak = ""
-- j/k move by screen line (glide through wrapped parts of the same long line).
-- With a count (e.g. 3j) they still move by real lines.
vim.keymap.set({ "n", "x" }, "j", function()
	return vim.v.count == 0 and "gj" or "j"
end, { expr = true, desc = "Down (screen line)" })
vim.keymap.set({ "n", "x" }, "k", function()
	return vim.v.count == 0 and "gk" or "k"
end, { expr = true, desc = "Up (screen line)" })
vim.opt.cursorcolumn = false
vim.opt.ignorecase = true
vim.opt.smartindent = true
vim.opt.termguicolors = true
vim.opt.undofile = true
vim.opt.number = true

local function source_local_session()
	if vim.g.local_session_loaded or vim.fn.argc() ~= 0 then
		return
	end

	local cwd = vim.uv.cwd()
	if not cwd then
		return
	end

	local session = vim.fs.joinpath(cwd, "Session.vim")
	if vim.fn.filereadable(session) == 1 then
		vim.g.local_session_loaded = true
		vim.cmd.source(vim.fn.fnameescape(session))
	end
end

vim.api.nvim_create_autocmd("VimEnter", {
	group = vim.api.nvim_create_augroup("local_session_auto_source", { clear = true }),
	once = true,
	callback = source_local_session,
})

-- Persist UI toggles across restarts: `:set wrap` (and friends) stays set.
-- Saved to stdpath("state") on change/exit, restored at startup (before
-- plugins), so you never re-do it. Session.vim (per-cwd) still wins when present.
vim.opt.sessionoptions:append("options")
local sylvan_ui_opts = { "wrap", "number", "relativenumber", "spell", "cursorline", "cursorcolumn", "list" }
local sylvan_ui_state = vim.fs.joinpath(vim.fn.stdpath("state"), "sylvan-ui-opts.json")
local function sylvan_save_ui_opts()
	local data = {}
	for _, name in ipairs(sylvan_ui_opts) do
		local ok, val = pcall(vim.api.nvim_get_option_value, name, { scope = "global" })
		if ok then
			data[name] = val
		end
	end
	pcall(vim.fn.mkdir, vim.fs.dirname(sylvan_ui_state), "p")
	pcall(vim.fn.writefile, { vim.json.encode(data) }, sylvan_ui_state)
end
local function sylvan_load_ui_opts()
	if vim.fn.filereadable(sylvan_ui_state) ~= 1 then
		return
	end
	local ok, lines = pcall(vim.fn.readfile, sylvan_ui_state)
	if not ok or not lines or #lines == 0 then
		return
	end
	local ok2, data = pcall(vim.json.decode, table.concat(lines, "\n"))
	if not ok2 or type(data) ~= "table" then
		return
	end
	for _, name in ipairs(sylvan_ui_opts) do
		if data[name] ~= nil then
			pcall(vim.api.nvim_set_option_value, name, data[name], { scope = "global" })
			-- Window-local opts (wrap, number, ...) must also hit existing windows:
			-- the global value alone doesn't change already-open windows.
			for _, win in ipairs(vim.api.nvim_list_wins()) do
				pcall(vim.api.nvim_set_option_value, name, data[name], { scope = "local", win = win })
			end
		end
	end
end
sylvan_load_ui_opts()
-- Re-apply to windows opened later / after Session.vim sourcing.
local sylvan_ui_group = vim.api.nvim_create_augroup("sylvan_ui_persist", { clear = true })
vim.api.nvim_create_autocmd("VimEnter", {
	group = sylvan_ui_group,
	once = true,
	callback = function()
		vim.schedule(sylvan_load_ui_opts)
	end,
})
vim.api.nvim_create_autocmd("OptionSet", {
	group = sylvan_ui_group,
	callback = function(args)
		if vim.tbl_contains(sylvan_ui_opts, args.match) then
			sylvan_save_ui_opts()
		end
	end,
})
vim.api.nvim_create_autocmd({ "VimLeavePre", "FocusLost" }, {
	group = sylvan_ui_group,
	callback = sylvan_save_ui_opts,
})

vim.pack.add({
	{ src = "https://github.com/folke/flash.nvim" },
	{ src = "https://github.com/stevearc/conform.nvim" },
	{ src = "https://github.com/folke/trouble.nvim" },
	{ src = "https://github.com/windwp/nvim-autopairs" },
	{ src = "https://github.com/sainnhe/everforest" },
	{ src = "https://github.com/chentoast/marks.nvim" },
	{ src = "https://github.com/stevearc/oil.nvim" },
	{ src = "https://github.com/nvim-tree/nvim-web-devicons" },
	{ src = "https://github.com/nvim-treesitter/nvim-treesitter", version = "main" },
	{ src = "https://github.com/aznhe21/actions-preview.nvim" },
	{ src = "https://github.com/nvim-treesitter/nvim-treesitter-textobjects" },
	{ src = "https://github.com/nvim-telescope/telescope.nvim" },
	{ src = "https://github.com/nvim-telescope/telescope-ui-select.nvim" },
	{ src = "https://github.com/nvim-lua/plenary.nvim" },
	{ src = "https://github.com/chomosuke/typst-preview.nvim" },
	{ src = "https://github.com/hat0uma/csvview.nvim" },
	{ src = "https://github.com/neovim/nvim-lspconfig" },
	{ src = "https://github.com/mason-org/mason.nvim" },
	{ src = "https://github.com/L3MON4D3/LuaSnip" },
	{ src = "https://github.com/saghen/blink.cmp", version = "v1.10.2" },
	{ src = "https://github.com/rafamadriz/friendly-snippets" },
	{ src = "https://github.com/mfussenegger/nvim-dap" },
	{ src = "https://github.com/rcarriga/nvim-dap-ui" },
	{ src = "https://github.com/theHamsta/nvim-dap-virtual-text" },
	{ src = "https://github.com/julianolf/nvim-dap-lldb" },
	{ src = "https://github.com/nvim-neotest/nvim-nio" },
})

require("typst-preview").setup()

-- Auto-close (), [], {}, quotes when you type the opener.
pcall(function()
	require("nvim-autopairs").setup({})
end)

-- Formatter (same table as main nvim): <leader>f formats, incl. on save.
pcall(function()
	require("conform").setup({
		formatters_by_ft = {
			lua = { "stylua" },
			sh = { "shfmt" },
			python = { "ruff_format" },
			go = { "gofumpt", "goimports" },
			javascript = { "prettier" },
			typescript = { "prettier" },
			javascriptreact = { "prettier" },
			typescriptreact = { "prettier" },
			json = { "prettier" },
			html = { "prettier" },
			css = { "prettier" },
			yaml = { "prettier" },
			markdown = { "prettier" },
			rust = { "rustfmt" },
			cpp = { "clang-format" },
			c = { "clang-format" },
			swift = { "swiftformat" },
			kotlin = { "ktlint" },
			toml = { "taplo" },
			ruby = { "rubocop" },
		},
		format_on_save = {
			timeout_ms = 2000,
			lsp_fallback = true,
		},
		notify_on_error = true,
	})
end)

-- Quickfix UI (same as main nvim): <leader>tt toggles it.
pcall(function()
	require("trouble").setup({
		auto_open = false,
		auto_close = false,
		auto_preview = true,
		auto_jump = false,
		mode = "quickfix",
		severity = vim.diagnostic.severity.ERROR,
		cycle_results = false,
	})
end)

require("csvview").setup({
	parser = {
		comments = { "#", "//" },
	},
	keymaps = {
		textobject_field_inner = { "if", mode = { "o", "x" } },
		textobject_field_outer = { "af", mode = { "o", "x" } },
		jump_next_field_end = { "<Tab>", mode = { "n", "v" } },
		jump_prev_field_end = { "<S-Tab>", mode = { "n", "v" } },
		jump_next_row = { "<Enter>", mode = { "n", "v" } },
		jump_prev_row = { "<S-Enter>", mode = { "n", "v" } },
	},
})

vim.api.nvim_create_autocmd("FileType", {
	pattern = { "csv", "tsv" },
	group = vim.api.nvim_create_augroup("csvview_auto_enable", { clear = true }),
	callback = function(args)
		vim.schedule(function()
			if vim.api.nvim_buf_is_valid(args.buf) then
				vim.cmd.CsvViewEnable()
			end
		end)
	end,
})

require("dap-lldb").setup()
local dap, dapui = require("dap"), require("dapui")

dap.listeners.after.event_initialized["dapui_config"] = function()
	dapui.open()
end
dap.listeners.before.event_terminated["dapui_config"] = function()
	dapui.close()
end
dap.listeners.before.event_exited["dapui_config"] = function()
	dapui.close()
end

require("marks").setup({
	builtin_marks = { "<", ">", "^" },
})

vim.api.nvim_create_autocmd("FileType", {
	pattern = {
		"svelte",
		"markdown",
		"lua",
		"odin",
		"rust",
		"typst",
		"typescript",
		"javascript",
		"c",
		"cpp",
		"glsl",
		"zig",
		"python",
		"typescriptreact",
		"react",
	},
	callback = function(args)
		if vim.bo[args.buf].buftype ~= "" or not vim.bo[args.buf].buflisted then
			return
		end

		pcall(vim.treesitter.start, args.buf)
	end,
})

require("mason").setup()
vim.lsp.config("ols", dofile(vim.fs.joinpath(vim.fn.stdpath("config"), "lsp", "ols.lua")))
vim.lsp.config("ocamllsp", { cmd = { "opam", "exec", "--", "ocamllsp" } })

local telescope = require("telescope")
local default_color = "everforest"
telescope.setup({
	defaults = {
		preview = { treesitter = true },
		color_devicons = true,
		sorting_strategy = "ascending",
		borderchars = {
			"", -- top
			"", -- right
			"", -- bottom
			"", -- left
			"", -- top-left
			"", -- top-right
			"", -- bottom-right
			"", -- bottom-left
		},
		path_displays = { "smart" },
		layout_config = {
			height = 100,
			width = 400,
			prompt_position = "top",
			preview_cutoff = 40,
		},
	},
})
telescope.load_extension("ui-select")

require("actions-preview").setup({
	backend = { "telescope" },
	telescope = vim.tbl_extend("force", require("telescope.themes").get_dropdown(), {}),
})

vim.api.nvim_create_autocmd("LspAttach", {
	group = vim.api.nvim_create_augroup("my.lsp", {}),
	callback = function(args)
		local client = assert(vim.lsp.get_client_by_id(args.data.client_id))
		if client:supports_method("textDocument/completion") then
			if client.name == "ols" then
				local chars = client.server_capabilities.completionProvider.triggerCharacters or {}
				local seen = {}

				for _, char in ipairs(chars) do
					seen[char] = true
				end

				for char in ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"):gmatch(".") do
					if not seen[char] then
						table.insert(chars, char)
						seen[char] = true
					end
				end

				client.server_capabilities.completionProvider.triggerCharacters = chars
			end

			vim.lsp.completion.enable(false, client.id, args.buf, { autotrigger = false })
		end
	end,
})

vim.opt.autocomplete = false
vim.opt.completeopt = { "menuone", "noselect", "popup" }
-- Manual trigger: blink first (LSP+snippets+path+buffer), fallback to LSP, then keyword.
vim.keymap.set("i", "<C-Space>", function()
	local ok, blink = pcall(require, "blink.cmp")
	if ok and blink.show then
		blink.show()
		return
	end
	pcall(vim.lsp.completion.get)
end, { desc = "Trigger completion" })
vim.keymap.set("i", "<CR>", function()
	local ok, blink = pcall(require, "blink.cmp")
	if ok and blink.is_visible and blink.is_visible() then
		return blink.accept and "<C-y>" or "<C-y>"
	end
	return vim.fn.pumvisible() == 1 and "<C-y>" or "<CR>"
end, { expr = true, desc = "Accept completion or insert newline" })
-- Ctrl-j/k: blink menu first (same as main nvim), snippet jump second, manual trigger last.
-- This is why bare <C-j> always pops suggestions while typing, matching blink.cmp feel.
-- NOTE: with blink installed, the menu you see while typing is blink (LSP+snippets),
-- not Vim's keyword 'autocomplete' — that's why we set autocomplete=false above.
local function sylvan_feed(keys)
	vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes(keys, true, false, true), "n", false)
end
local function sylvan_cmpl_next()
	local ok, blink = pcall(require, "blink.cmp")
	if ok and blink.is_visible and blink.is_visible() then
		blink.select_next()
		return
	end
	if vim.fn.pumvisible() == 1 then
		sylvan_feed("<C-n>")
	elseif require("luasnip").jumpable(1) then
		require("luasnip").jump(1)
	elseif ok and blink.show then
		blink.show()
	elseif #vim.lsp.get_clients({ bufnr = 0, method = "textDocument/completion" }) > 0 then
		pcall(vim.lsp.completion.get)
	else
		sylvan_feed("<C-n>")
	end
end
local function sylvan_cmpl_prev()
	local ok, blink = pcall(require, "blink.cmp")
	if ok and blink.is_visible and blink.is_visible() then
		blink.select_prev()
		return
	end
	if vim.fn.pumvisible() == 1 then
		sylvan_feed("<C-p>")
	elseif require("luasnip").jumpable(-1) then
		require("luasnip").jump(-1)
	elseif ok and blink.show then
		blink.show()
	elseif #vim.lsp.get_clients({ bufnr = 0, method = "textDocument/completion" }) > 0 then
		pcall(vim.lsp.completion.get)
	else
		sylvan_feed("<C-p>")
	end
end
vim.keymap.set(
	{ "i", "s" },
	"<C-j>",
	sylvan_cmpl_next,
	{ silent = true, desc = "Next completion / snippet jump / trigger" }
)
vim.keymap.set(
	{ "i", "s" },
	"<C-k>",
	sylvan_cmpl_prev,
	{ silent = true, desc = "Prev completion / snippet jump / trigger" }
)

vim.lsp.enable({
	"lua_ls",
	"cssls",
	"svelte",
	"tinymist",
	"tclint",
	"rust_analyzer",
	"clangd",
	"ruff",
	"ols",
	"ocamllsp",
	"glsl_analyzer",
	"haskell-language-server",
	"hlint",
	"intelephense",
	"tailwindcss",
	"ts_ls",
	"emmet_language_server",
	"emmet_ls",
	"solargraph",
	"zls",
	"pyright",
})

require("oil").setup({
	lsp_file_methods = {
		enabled = true,
		timeout_ms = 1000,
		autosave_changes = true,
	},
	columns = {
		"icon",
	},
	float = {
		max_width = 0.3,
		max_height = 0.6,
		border = "rounded",
	},
})

vim.o.background = "dark"
vim.g.everforest_background = "medium"
vim.g.everforest_transparent_background = 2
vim.g.everforest_better_performance = 1
vim.g.everforest_enable_italic = 1
vim.cmd.colorscheme(default_color)
-- Muted syntax: keep every hue, just desaturate it (nothing goes flat grey).
vim.api.nvim_create_autocmd("ColorScheme", {
	pattern = "everforest",
	group = vim.api.nvim_create_augroup("sylvan_muted_everforest", { clear = true }),
	callback = function()
		local MUTE = 0.55 -- 0 = original, 1 = full grey. 0.5-0.65 is the sweet spot.
		local DIM = 0.96 -- slight dim so muted tones sit back.
		local function mute_one(name)
			local ok, hl = pcall(vim.api.nvim_get_hl, 0, { name = name })
			if not ok or not hl or hl.link or hl.fg == nil then
				return
			end
			local fg = hl.fg
			local r = math.floor(fg / 65536) % 256
			local g = math.floor(fg / 256) % 256
			local b = fg % 256
			local avg = (r + g + b) / 3
			local function ch(c)
				return math.floor((((c * (1 - MUTE)) + (avg * MUTE)) * DIM) + 0.5)
			end
			local nr, ng, nb = ch(r), ch(g), ch(b)
			-- Preserve everything else (bold/italic/underline/bg), only swap fg.
			local keep = {}
			for k, v in pairs(hl) do
				if k ~= "fg" and k ~= "bg" then
					keep[k] = v
				end
			end
			keep.fg = string.format("#%02x%02x%02x", nr, ng, nb)
			-- nvim_set_hl dislikes some resolved keys (e.g. `ctermfg` as table);
			-- keep only settable attrs.
			local clean = { fg = keep.fg }
			for _, k in ipairs({
				"bg",
				"bold",
				"italic",
				"underline",
				"undercurl",
				"strikethrough",
				"nocombine",
				"reverse",
			}) do
				if keep[k] ~= nil then
					clean[k] = keep[k]
				end
			end
			pcall(vim.api.nvim_set_hl, 0, name, clean)
		end
		-- Mute every syntax/treesitter/semantic group; skip pure UI chrome.
		-- NOTE: Lua patterns have no `|` alternation, so use a set + prefixes.
		local exact = {
			Comment = true,
			String = true,
			Character = true,
			Number = true,
			Boolean = true,
			Float = true,
			Constant = true,
			Identifier = true,
			Function = true,
			Statement = true,
			Keyword = true,
			Conditional = true,
			Repeat = true,
			Label = true,
			Operator = true,
			Exception = true,
			Type = true,
			StorageClass = true,
			Structure = true,
			Typedef = true,
			Special = true,
			SpecialChar = true,
			PreProc = true,
			Include = true,
			Define = true,
			Macro = true,
			PreCondit = true,
			Delimiter = true,
			Todo = true,
			Underlined = true,
			Error = true,
			Title = true,
			-- everforest palette (TS* groups link here, e.g. TSKeyword->Red)
			Red = true,
			Green = true,
			Yellow = true,
			Blue = true,
			Purple = true,
			Aqua = true,
			Orange = true,
			Grey = true,
			Fg = true,
		}
		local function want(name)
			if exact[name] then
				return true
			end
			local c1 = name:sub(1, 1)
			if c1 == "@" then
				return true -- all treesitter captures
			end
			-- prefixed families
			for _, pre in ipairs({
				"TS",
				"Treesitter",
				"Diagnostic",
				"Lsp",
				"Trouble",
				"GitSigns",
				"Diff",
				"lua",
				"vim",
				"python",
				"rust",
				"cpp",
			}) do
				if name:sub(1, #pre) == pre then
					return true
				end
			end
			return false
		end
		local function is_ui(name)
			for _, pre in ipairs({
				"Normal",
				"FloatBorder",
				"WinSeparator",
				"VertSplit",
				"StatusLine",
				"TabLine",
				"Pmenu",
				"Cursor",
				"Visual",
				"Search",
				"IncSearch",
				"Folded",
				"SignColumn",
				"LineNr",
				"CursorLine",
			}) do
				if name:sub(1, #pre) == pre then
					return true
				end
			end
			return false
		end
		for _, name in ipairs(vim.fn.getcompletion("", "highlight")) do
			if not is_ui(name) and want(name) then
				mute_one(name)
			end
		end
	end,
})
-- Apply once for initial load too.
vim.api.nvim_exec_autocmds("ColorScheme", { pattern = "everforest" })

-- Transparent floats like main nvim: completion menu, notifications, hover boxes.
local function sylvan_apply_transparent_floats()
	for _, g in ipairs({
		"NormalFloat", "FloatBorder", "FloatTitle",
		"Pmenu", "PmenuSel", "PmenuSbar", "PmenuThumb",
		"BlinkCmpMenu", "BlinkCmpDoc",
		"NotifyBackground",
	}) do
		pcall(vim.api.nvim_set_hl, 0, g, { bg = "NONE" })
	end
end
vim.api.nvim_create_autocmd("ColorScheme", {
	group = vim.api.nvim_create_augroup("sylvan_float_transparency", { clear = true }),
	callback = sylvan_apply_transparent_floats,
})
sylvan_apply_transparent_floats()
require("luasnip").setup({ enable_autosnippets = true })
-- NOTE (sylvan-nvim): upstream hardcoded "~/.config/nvim/snippets/" which
-- breaks under NVIM_APPNAME isolation (and `~` never expands in Lua).
-- Use this config's own snippets dir instead.
pcall(require("luasnip.loaders.from_lua").load, { paths = vim.fn.stdpath("config") .. "/snippets" })
-- Friendly-snippets (same as main nvim's LuaSnip dependency): VSCode collection.
pcall(require("luasnip.loaders.from_vscode").lazy_load)

-- Blink.cmp (same engine as main nvim, no AI): menu shows WHILE typing
-- (show_on_keyword), not just after backspace. Sources mirror main nvim
-- (lsp, path, snippets) + buffer so plain words also complete.
-- Toggle: <leader>tc flips vim.g.sylvan_cmp_enabled. Manual trigger: <C-Space>.
vim.g.sylvan_cmp_enabled = true
pcall(function()
	local blink = require("blink.cmp")
	blink.setup({
		enabled = function()
			return vim.g.sylvan_cmp_enabled ~= false
		end,
		snippets = { preset = "luasnip" },
		sources = {
			default = { "lsp", "path", "snippets", "buffer" },
		},
		completion = {
			menu = { auto_show = true, auto_show_delay_ms = 0 },
			trigger = {
				show_on_keyword = true,
				show_on_trigger_character = true,
				show_on_insert = false,
				show_on_backspace = false,
			},
			documentation = { auto_show = false },
		},
		signature = { enabled = false },
		keymap = {
			["<C-j>"] = { "select_next", "snippet_forward", "fallback" },
			["<C-k>"] = { "select_prev", "snippet_backward", "fallback" },
			["<C-Space>"] = { "show", "show_documentation", "hide_documentation" },
			["<C-e>"] = { "cancel", "fallback" },
			["<CR>"] = { "accept", "fallback" },
			["<Tab>"] = { "snippet_forward", "fallback" },
			["<S-Tab>"] = { "snippet_backward", "fallback" },
		},
		cmdline = {
			enabled = false,
			keymap = {
				["<C-j>"] = { "select_next" },
				["<C-k>"] = { "select_prev" },
			},
		},
	})
end)
vim.keymap.set("n", "<leader>tc", function()
	vim.g.sylvan_cmp_enabled = not vim.g.sylvan_cmp_enabled
	if vim.g.sylvan_cmp_enabled then
		vim.notify("Completion: ON (shows while typing)", vim.log.levels.INFO)
	else
		pcall(function()
			require("blink.cmp").hide()
		end)
		vim.notify("Completion: OFF", vim.log.levels.INFO)
	end
end, { desc = "Toggle completion suggestions" })

-- ~/.config/nvim/init.lua

local function pack_clean()
	local active_plugins = {}
	local unused_plugins = {}

	for _, plugin in ipairs(vim.pack.get()) do
		active_plugins[plugin.spec.name] = plugin.active
	end

	for _, plugin in ipairs(vim.pack.get()) do
		if not active_plugins[plugin.spec.name] then
			table.insert(unused_plugins, plugin.spec.name)
		end
	end

	if #unused_plugins == 0 then
		print("No unused plugins.")
		return
	end

	local choice = vim.fn.confirm("Remove unused plugins?", "&Yes\n&No", 2)
	if choice == 1 then
		vim.pack.del(unused_plugins)
	end
end

vim.keymap.set("n", "<leader>pc", pack_clean)
local colors = {}
local ls = require("luasnip")
local builtin = require("telescope.builtin")
local map = vim.keymap.set
local current = 1

local function open_current_html()
	local path = vim.api.nvim_buf_get_name(0)
	if path == "" then
		vim.notify("Preview requires a saved HTML file", vim.log.levels.ERROR)
		return
	end

	vim.cmd.update()

	local result = vim.system({ "open", path }, { text = true }):wait()
	if result.code ~= 0 then
		local output = result.stderr ~= "" and result.stderr or result.stdout
		if output == "" then
			output = "Failed to open " .. path
		end
		vim.notify(output, vim.log.levels.ERROR)
	end
end

local function preview_current_file()
	local filetype = vim.bo.filetype
	if filetype == "typst" then
		vim.cmd.TypstPreviewToggle()
	elseif filetype == "html" then
		open_current_html()
	else
		vim.notify("No preview action configured for filetype: " .. filetype, vim.log.levels.WARN)
	end
end

map({ "n", "x" }, "<leader>y", '"+y')
-- map({ "n", "x" }, "<leader>d", '"+d')
map({ "i", "s" }, "<C-e>", function()
	ls.expand_or_jump(1)
end, { silent = true })
-- NOTE: <C-j>/<C-k> smart maps (pumvisible -> <C-n>/<C-p>, else luasnip)
-- are defined near vim.lsp.completion setup AND re-applied after user_keymaps
-- so they always win. Do not add luasnip-only <C-j>/<C-k> here.
map({ "n", "t" }, "<Leader>t", "<Cmd>split<CR> <Cmd>term<CR>i")
map({ "n", "t" }, "<Leader>x", "<Cmd>tabclose<CR>")
map("n", "<C-c>", "<Cmd>qa!<CR>", { desc = "Quit Neovim" })

vim.cmd([[
	nnoremap g= g+| " g=g=g= is less awkward than g+g+g+
	nnoremap gK @='ddkPJ'<cr>| " join lines but reversed. `@=` so [count] works
	xnoremap gK <esc><cmd>keeppatterns '<,'>-global/$/normal! ddpkJ<cr>
	noremap! <c-r><c-d> <c-r>=strftime('%F')<cr>
	noremap! <c-r><c-t> <c-r>=strftime('%T')<cr>
	noremap! <c-r><c-f> <c-r>=expand('%:t')<cr>
	noremap! <c-r><c-p> <c-r>=expand('%:p')<cr>
	xnoremap <expr> . "<esc><cmd>'<,'>normal! ".v:count1.'.<cr>'
]])

for i = 1, 8 do
	map({ "n", "t" }, "<Leader>" .. i, "<Cmd>tabnext " .. i .. "<CR>")
end

local opts = { noremap = true, silent = true }
vim.keymap.set("n", "yag", ":%y<CR>", opts)
vim.keymap.set("n", "vag", "ggVG", opts)
vim.keymap.set("n", "<leader>m", "<Cmd>make<CR>", opts)
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")
vim.keymap.set("v", "<", "<gv", opts)
vim.keymap.set("v", ">", ">gv", opts)
vim.keymap.set("n", "<ESC>", ":nohlsearch<CR>", opts)
map("n", "gl", "$", { desc = "Jump: End of line" })

map({ "n", "v", "x" }, "<CR>", ":", { desc = "Self explanatory" })

map({ "n", "v", "x" }, "<leader>r", ":edit!<CR>", { desc = "Reload current file" })
map({ "n", "v", "x" }, "<leader>v", "<Cmd>edit $MYVIMRC<CR>", { desc = "Edit " .. vim.fn.expand("$MYVIMRC") })
map({ "n", "v", "x" }, "<leader>z", "<Cmd>e ~/.config/zsh/.zshrc<CR>", { desc = "Edit .zshrc" })
map({ "n", "v", "x" }, "<leader>n", ":norm ", { desc = "ENTER NORM COMMAND." })
map({ "n", "v", "x" }, "<leader>o", "<Cmd>source %<CR>", { desc = "Source " .. vim.fn.expand("$MYVIMRC") })
map({ "n", "v", "x" }, "<leader>O", "<Cmd>restart<CR>", { desc = "Restart vim." })
map({ "n", "v", "x" }, "<C-s>", [[:s/\V]], { desc = "Enter substitue mode in selection" })
map({ "n", "v", "x" }, "<leader>i", [[<Cmd>tabedit .gitignore<CR>]], { desc = "Enter substitue mode in selection" })
map({ "n", "v", "x" }, "<leader>lf", vim.lsp.buf.format, { desc = "Format current buffer" })
map({ "v", "x", "n" }, "<C-y>", '"+y', { desc = "System clipboard yank." })
map({ "n" }, "<leader>p", preview_current_file, { desc = "Preview current file" })
map({ "n" }, "<leader>f", builtin.find_files, { desc = "Telescope live grep" })

function git_files()
	builtin.find_files({ no_ignore = true })
end

map({ "n" }, "<leader>g", builtin.live_grep)
map({ "n" }, "<leader>sg", git_files)
map({ "n" }, "<leader>sb", builtin.buffers)
map({ "n" }, "<leader>si", builtin.grep_string)
map({ "n" }, "<leader>so", builtin.oldfiles)
map({ "n" }, "<leader>sh", builtin.help_tags)
map({ "n" }, "<leader>sm", builtin.man_pages)
map({ "n" }, "<leader>G", builtin.git_commits)
map({ "n" }, "<leader>sr", builtin.lsp_references)
map({ "n" }, "<leader>sd", builtin.diagnostics)
-- map({ "n" }, "<leader>si", builtin.lsp_implementations)
map({ "n" }, "<leader>sT", builtin.lsp_type_definitions)
map({ "n" }, "<leader>ss", builtin.current_buffer_fuzzy_find)
map({ "n" }, "<leader>st", builtin.builtin)
-- map({ "n" }, "<leader>sc", builtin.git_bcommits)
map({ "n" }, "<leader>sk", builtin.keymaps)
-- NOTE: LinArcX/telescope-env.nvim was deleted upstream (404), so the
-- `:Telescope env` extension no longer exists. Minimal local replacement:
-- pick an env var with Telescope, <CR> inserts NAME, <C-y> copies value.
local function telescope_env_picker()
	local pickers = require("telescope.pickers")
	local finders = require("telescope.finders")
	local conf = require("telescope.config").values
	local actions = require("telescope.actions")
	local action_state = require("telescope.actions.state")

	local env = {}
	for k, v in pairs(vim.fn.environ()) do
		table.insert(env, { name = k, value = v, display = k .. "=" .. v, ordinal = k .. "=" .. v })
	end
	table.sort(env, function(a, b)
		return a.name < b.name
	end)

	pickers
		.new({}, {
			prompt_title = "Environment",
			finder = finders.new_table({
				results = env,
				entry_maker = function(entry)
					return {
						value = entry,
						display = entry.display,
						ordinal = entry.ordinal,
					}
				end,
			}),
			sorter = conf.generic_sorter({}),
			previewer = conf.qflist_previewer({}),
			attach_mappings = function(prompt_bufnr, map_fn)
				actions.select_default:replace(function()
					local selection = action_state.get_selected_entry()
					actions.close(prompt_bufnr)
					if selection then
						vim.api.nvim_put({ selection.value.name }, "", true, true)
					end
				end)
				map_fn("i", "<C-y>", function()
					local selection = action_state.get_selected_entry()
					actions.close(prompt_bufnr)
					if selection then
						vim.fn.setreg("+", selection.value.value)
						vim.notify(selection.value.name .. " value yanked", vim.log.levels.INFO)
					end
				end)
				map_fn("n", "<C-y>", function()
					local selection = action_state.get_selected_entry()
					actions.close(prompt_bufnr)
					if selection then
						vim.fn.setreg("+", selection.value.value)
						vim.notify(selection.value.name .. " value yanked", vim.log.levels.INFO)
					end
				end)
				return true
			end,
		})
		:find()
end
map({ "n" }, "<leader>se", telescope_env_picker, { desc = "Telescope env (builtin replacement)" })
map({ "n" }, "<leader>sa", require("actions-preview").code_actions)
map({ "n" }, "<M-n>", "<cmd>resize +2<CR>")
map({ "n" }, "<M-e>", "<cmd>resize -2<CR>")
map({ "n" }, "<M-i>", "<cmd>vertical resize +5<CR>")
map({ "n" }, "<M-m>", "<cmd>vertical resize -5<CR>")
map({ "n" }, "<leader>e", "<cmd>Oil<CR>")
map({ "n" }, "<leader>c", "1z=")
map({ "n" }, "<C-q>", ":copen<CR>", { silent = true })
map({ "n" }, "<leader>w", "<Cmd>update<CR>", { desc = "Write the current buffer." })
map({ "n" }, "<leader>q", "<Cmd>:quit<CR>", { desc = "Quit the current buffer." })
map({ "n" }, "<leader>Q", "<Cmd>:wqa<CR>", { desc = "Quit all buffers and write." })
map({ "n" }, "<C-f>", "<Cmd>Open .<CR>", { desc = "Open current directory in Finder." })
map({ "n" }, "<leader>a", ":edit #<CR>", { desc = "Switch to the alternate buffer" })
map({ "t" }, "<Esc>", "<C-\\><C-n>", { desc = "Make terminal mode appear normal" })

vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

vim.api.nvim_create_autocmd("BufWinEnter", {
	pattern = "*.jsx,*.tsx",
	group = vim.api.nvim_create_augroup("TS", { clear = true }),
	callback = function()
		vim.cmd([[set filetype=typescriptreact]])
	end,
})
vim.cmd("colorscheme " .. default_color)

-- USER IMPORTS: keybinds + templates (snippets) from the main nvim config.
-- This config runs isolated via NVIM_APPNAME=sylvan-nvim, so it uses
--   ~/.config/sylvan-nvim  ~/.local/share/sylvan-nvim  ~/.cache/sylvan-nvim
-- and never writes to the main nvim's dirs. Everything below only *reads*
-- from the main config, so the main `nvim` setup is untouched.
-- Load order matters: these come last, so your keybinds win on conflicts.
local ok_keys, err_keys = pcall(require, "user_keymaps")
if not ok_keys then
	vim.notify("sylvan-nvim: user keymaps not loaded: " .. tostring(err_keys), vim.log.levels.WARN)
end

-- 2. Templates/snippets from the main config: snippets_user/ is a symlink to
--    ~/.config/nvim/snippets (VSCode JSON format), loaded lazily exactly
--    like the main nvim does. Sylvan's own Lua snippets stay in snippets/.
pcall(function()
	require("luasnip.loaders.from_vscode").lazy_load({
		paths = vim.fn.stdpath("config") .. "/snippets_user",
	})
end)

-- Telescope: C-j/k move selection (insert + normal), mirrors blink.cmp feel.
pcall(function()
	local actions = require("telescope.actions")
	telescope.setup({
		defaults = {
			mappings = {
				i = {
					["<C-j>"] = actions.move_selection_next,
					["<C-k>"] = actions.move_selection_previous,
				},
				n = {
					["<C-j>"] = actions.move_selection_next,
					["<C-k>"] = actions.move_selection_previous,
				},
			},
		},
	})
end)

-- Completion: re-assert smart C-j/k AFTER user_keymaps (it defines
-- quickfix <C-j>/<C-k> in normal mode only, but we must kill any
-- luasnip-only insert maps it may have brought in).
vim.keymap.set(
	{ "i", "s" },
	"<C-j>",
	sylvan_cmpl_next,
	{ silent = true, desc = "Next completion / snippet jump / trigger" }
)
vim.keymap.set(
	{ "i", "s" },
	"<C-k>",
	sylvan_cmpl_prev,
	{ silent = true, desc = "Prev completion / snippet jump / trigger" }
)

-- Flash.nvim on bare `s` / `S` (upstream defaults). This shadows the
-- builtin substitute (s = cl, S = cc) — use `cl`/`cc` for those instead.
pcall(function()
	require("flash").setup({
		modes = {
			char = { enabled = true },
			search = { enabled = false },
		},
	})
end)
-- Drop the old <leader>s / <leader>S flash maps, claim bare keys.
pcall(vim.keymap.del, { "n", "x", "o" }, "<leader>s")
pcall(vim.keymap.del, "n", "<leader>s")
pcall(vim.keymap.del, { "n", "x", "o" }, "<leader>S")
vim.keymap.set({ "n", "x", "o" }, "s", function()
	require("flash").jump()
end, { desc = "Flash jump" })
vim.keymap.set({ "n", "x", "o" }, "S", function()
	require("flash").treesitter()
end, { desc = "Flash treesitter" })
-- Restore your original whole-file replace on <leader>s (it was displaced
-- by flash; <leader>sw stays as an alias).
local function sylvan_replace_word()
	local old = vim.fn.expand("<cword>")
	if old == "" then
		return
	end
	local new = vim.fn.input("Replace '" .. old .. "' with: ")
	if new == "" then
		return
	end
	vim.cmd(string.format("%%s/\\V\\<%s\\>/%s/gI", vim.pesc(old), new:gsub("/", "\\/")))
end
vim.keymap.set("n", "<leader>s", sylvan_replace_word, { desc = "Search & replace word (whole file)" })
vim.keymap.set("n", "<leader>sw", sylvan_replace_word, { desc = "Search & replace word (whole file)" })

-- Find files on <leader>ff (same as main nvim; <leader>f is format there).
vim.keymap.set("n", "<leader>ff", builtin.find_files, { desc = "Find files" })
-- <leader>f = Find files too. user_keymaps maps the global <leader>f to
-- conform-format, so this must sit in the overrides section to win, and the
-- LspAttach block below must also re-map it (buffer-local beats global).
vim.keymap.set("n", "<leader>f", builtin.find_files, { desc = "Find files" })

-- ============================================================================
-- LSP QUICKFIX MAPS (mirrors main nvim's LspAttach exactly): buffer-local,
-- so they take precedence over the global "no LSP" fallbacks from user_keymaps.
-- ============================================================================
vim.api.nvim_create_autocmd("LspAttach", {
	group = vim.api.nvim_create_augroup("sylvan.lspkeys", { clear = true }),
	callback = function(ev)
		local bufnr = ev.buf
		local function map(mode, lhs, rhs, desc)
			vim.keymap.set(mode, lhs, rhs, { buffer = bufnr, desc = desc, silent = true, noremap = true })
		end

		map("n", "<leader>gd", vim.lsp.buf.definition, "LSP: Go to definition")
		map("n", "gD", vim.lsp.buf.declaration, "LSP: Go to declaration")
		map("n", "gi", vim.lsp.buf.implementation, "LSP: Go to implementation")
		map("n", "gr", vim.lsp.buf.references, "LSP: References")
		map("n", "K", vim.lsp.buf.hover, "LSP: Hover")
		map("n", "<leader>vws", vim.lsp.buf.workspace_symbol, "LSP: Workspace symbol")
		map("n", "<leader>vd", function()
			vim.diagnostic.open_float(0, { scope = "line" })
		end, "LSP: Line diagnostics")
		map("n", "[d", vim.diagnostic.goto_prev, "LSP: Previous diagnostic")
		map("n", "]d", vim.diagnostic.goto_next, "LSP: Next diagnostic")
		map("n", "<leader>vca", vim.lsp.buf.code_action, "LSP: Code action")

		-- Filtered code actions, without ever going silent: if the server
		-- offers nothing of that kind here, say so and fall back to the
		-- full action list instead of showing nothing.
		local function filtered_code_action(only, empty_msg)
			local cbuf = vim.api.nvim_get_current_buf()
			local clients = vim.lsp.get_clients({ bufnr = cbuf })
			if #clients == 0 then
				vim.notify("No LSP client attached — no code actions available", vim.log.levels.WARN)
				return
			end
			local params = vim.lsp.util.make_range_params(0, clients[1].offset_encoding or "utf-8")
			params.context = {
				only = only,
				triggerKind = vim.lsp.protocol.CodeActionTriggerKind.Invoked,
				diagnostics = vim.tbl_map(function(d)
					return d.user_data and d.user_data.lsp or d
				end, vim.diagnostic.get(cbuf)),
			}
			local function kind_wanted(kind)
				if not kind then
					return false
				end
				for _, o in ipairs(only) do
					if kind == o or vim.startswith(kind, o .. ".") then
						return true
					end
				end
				return false
			end
			local function apply_action(action, client, ctx)
				if action.edit then
					vim.lsp.util.apply_workspace_edit(action.edit, client.offset_encoding)
				end
				local a_cmd = action.command
				if a_cmd then
					client:exec_cmd(type(a_cmd) == "table" and a_cmd or action, ctx)
				end
			end
			local function on_user_choice(choice)
				if not choice then
					return
				end
				local client = assert(vim.lsp.get_client_by_id(choice.ctx.client_id))
				local action = choice.action
				local abuf = assert(choice.ctx.bufnr, "Must have buffer number")
				if type(action.title) == "string" and type(action.command) == "string" then
					apply_action(action, client, choice.ctx)
					return
				end
				if action.disabled then
					vim.notify(action.disabled.reason, vim.log.levels.ERROR)
					return
				end
				if not (action.edit and action.command) and client:supports_method("codeAction/resolve") then
					client:request("codeAction/resolve", action, function(err, resolved)
						if err then
							if action.edit or action.command then
								apply_action(action, client, choice.ctx)
							else
								vim.notify(err.code .. ": " .. err.message, vim.log.levels.ERROR)
							end
						else
							apply_action(resolved, client, choice.ctx)
						end
					end, abuf)
				else
					apply_action(action, client, choice.ctx)
				end
			end
			local function format_item(item)
				local title = item.action.title:gsub("\r\n", "\\r\\n"):gsub("\n", "\\n")
				if item.action.disabled then
					title = title .. " (disabled)"
				end
				if #vim.lsp.get_clients({ bufnr = item.ctx.bufnr }) == 1 then
					return title
				end
				local source = assert(vim.lsp.get_client_by_id(item.ctx.client_id)).name
				return ("%s [%s]"):format(title, source)
			end
			vim.lsp.buf_request_all(cbuf, "textDocument/codeAction", params, function(results)
				local actions = {}
				for _, r in pairs(results or {}) do
					for _, action in pairs(r.result or {}) do
						if kind_wanted(action.kind) then
							table.insert(actions, { action = action, ctx = r.context })
						end
					end
				end
				if vim.tbl_isempty(actions) then
					vim.notify(empty_msg, vim.log.levels.INFO)
					vim.lsp.buf.code_action()
					return
				end
				vim.ui.select(actions, {
					prompt = "Code actions:",
					kind = "codeaction",
					format_item = format_item,
				}, on_user_choice)
			end)
		end

		map({ "n", "x" }, "<leader>qf", function()
			filtered_code_action({ "quickfix" }, "No quickfix actions here — showing all code actions")
		end, "LSP: Quick fix")
		map("n", "<leader>vi", function()
			filtered_code_action(
				{ "source.organizeImports", "source.addMissingImports", "source.fixAll" },
				"No organize-imports actions from LSP — showing all code actions"
			)
		end, "LSP: Fix imports")
		map("n", "<leader>vrr", vim.lsp.buf.references, "LSP: References")
		map("n", "<leader>vrn", vim.lsp.buf.rename, "LSP: Rename")
		map("i", "<C-h>", vim.lsp.buf.signature_help, "LSP: Signature help")
		-- <leader>f = Find files, matching the override above. Buffer-local is
		-- required: the global conform-format <leader>f from user_keymaps would
		-- otherwise win. Formatting stays on <leader>lf + format_on_save.
		map("n", "<leader>f", builtin.find_files, "Find files")
	end,
})
