vim.g.mapleader = " "

vim.keymap.set("n", "vv", "V", { desc = "Select current line" })

vim.keymap.set("n", "<leader>wh", "<C-w>h", { desc = "Window: go left" })
vim.keymap.set("n", "<leader>wj", "<C-w>j", { desc = "Window: go down" })
vim.keymap.set("n", "<leader>wk", "<C-w>k", { desc = "Window: go up" })
vim.keymap.set("n", "<leader>wl", "<C-w>l", { desc = "Window: go right" })
vim.keymap.set("n", "<leader>wH", "<C-w><", { desc = "Window: shrink width" })
vim.keymap.set("n", "<leader>wL", "<C-w>>", { desc = "Window: grow width" })
vim.keymap.set("n", "<leader>wJ", "<C-w>-", { desc = "Window: shrink height" })
vim.keymap.set("n", "<leader>wK", "<C-w>+", { desc = "Window: grow height" })
vim.keymap.set("n", "<leader>wv", "<C-w>v", { desc = "Window: split vertical" })
vim.keymap.set("n", "<leader>ws", "<C-w>s", { desc = "Window: split horizontal" })
vim.keymap.set("n", "<leader>wq", "<C-w>q", { desc = "Window: close" })
vim.keymap.set("n", "<leader>w=", "<C-w>=", { desc = "Window: equalize" })
vim.keymap.set("n", "<leader>-", "<C-W>s", { desc = "Split window below" })
vim.keymap.set("n", "<leader>|", "<C-W>v", { desc = "Split window right" })
vim.keymap.set("n", "<leader>wd", "<C-W>c", { desc = "Delete window" })
vim.keymap.set("n", "<leader>wm", function()
	vim.o.winfixwidth = not vim.o.winfixwidth
	vim.o.winfixheight = not vim.o.winfixheight
	vim.cmd("wincmd _ | wincmd |")
end, { desc = "Toggle window zoom" })
vim.keymap.set("n", "<C-h>", "<C-w>h", { desc = "Window: go left" })
vim.keymap.set("n", "<C-j>", "<C-w>j", { desc = "Window: go down" })
vim.keymap.set("n", "<C-k>", "<C-w>k", { desc = "Window: go up" })
vim.keymap.set("n", "<C-l>", "<C-w>l", { desc = "Window: go right" })

-- Buffer navigation
vim.keymap.set("n", "[b", "<Cmd>bprev<CR>", { desc = "Prev buffer" })
vim.keymap.set("n", "]b", "<Cmd>bnext<CR>", { desc = "Next buffer" })
vim.keymap.set("n", "<S-h>", "<Cmd>bprev<CR>", { desc = "Prev buffer" })
vim.keymap.set("n", "<S-l>", "<Cmd>bnext<CR>", { desc = "Next buffer" })
vim.keymap.set("n", "<leader>bb", "<Cmd>e #<CR>", { desc = "Switch to other buffer" })
vim.keymap.set("n", "<leader>`", "<Cmd>e #<CR>", { desc = "Switch to other buffer" })
vim.keymap.set("n", "<leader>bd", function()
	local bufnr = vim.api.nvim_get_current_buf()
	vim.api.nvim_buf_delete(bufnr, { force = true })
end, { desc = "Delete buffer" })
vim.keymap.set("n", "<leader>bD", "<Cmd>bd<CR>", { desc = "Delete buffer and window" })

vim.keymap.set("n", "<leader>e", function()
	if vim.bo.filetype == "oil" then
		local prev = vim.g.oil_prev_buf
		if prev and vim.api.nvim_buf_is_valid(prev) then
			vim.api.nvim_win_set_buf(0, prev)
			return
		end
		vim.cmd("b#")
	else
		vim.g.oil_prev_buf = vim.api.nvim_get_current_buf()
		local dir = vim.fn.expand("%:p:h")
		if dir == "" then
			dir = vim.fn.getcwd()
		end
		require("oil").open(dir)
	end
end, { desc = "Toggle file explorer" })

vim.keymap.set("n", "<A-j>", ":m .+1<CR>==", { desc = "Move line down" })
vim.keymap.set("n", "<A-k>", ":m .-2<CR>==", { desc = "Move line up" })
vim.keymap.set("i", "<A-j>", "<Esc>:m .+1<CR>==gi", { desc = "Move line down" })
vim.keymap.set("i", "<A-k>", "<Esc>:m .-2<CR>==gi", { desc = "Move line up" })
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
vim.keymap.set("v", "<A-j>", ":m '>+1<CR>gv=gv", { desc = "Move line down" })
vim.keymap.set("v", "<A-k>", ":m '<-2<CR>gv=gv", { desc = "Move line up" })

vim.keymap.set("n", "<Tab>", "<cmd>BufferLineCycleNext<CR>", { desc = "Go to next buffer" })
vim.keymap.set("n", "<S-Tab>", "<cmd>BufferLineCyclePrev<CR>", { desc = "Go to previous buffer" })
vim.keymap.set("n", "<leader>x", "<cmd>bdelete<CR>", { desc = "Close current buffer" })
vim.keymap.set("n", "<leader>n", "<cmd>tabnew<CR>", { desc = "New tab" })

vim.api.nvim_set_keymap("n", "<leader>tf", "<Plug>PlenaryTestFile", { noremap = false, silent = false })

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")
vim.keymap.set("n", "=ap", "ma=ap'a")

vim.keymap.set("n", "<leader>zig", "<cmd>LspRestart<cr>", { desc = "Restart LSP" })

vim.keymap.set("n", "<leader>vwm", function()
	require("vim-with-me").StartVimWithMe()
end, { desc = "Start Vim With Me" })

vim.keymap.set("n", "<leader>svwm", function()
	require("vim-with-me").StopVimWithMe()
end, { desc = "Stop Vim With Me" })

vim.keymap.set("x", "<leader>p", [["_dP]])
vim.keymap.set({ "n", "v" }, "<leader>y", [["+y]])
vim.keymap.set("n", "<leader>Y", [["+Y]])
vim.keymap.set({ "n", "v" }, "<leader>d", '"_d')

vim.keymap.set({ "n", "x", "o" }, "e", "$", { desc = "Go to end of line" })
vim.keymap.set("n", "E", "e", { desc = "Forward to end of word" })

vim.keymap.set("n", "a", "A", { desc = "Append at end of line" })
vim.keymap.set("n", "A", "a", { desc = "Append after cursor" })

vim.keymap.set("i", "<C-c>", "<Esc>")
vim.keymap.set({ "i", "n", "s" }, "<Esc>", function()
	vim.cmd("nohlsearch")
	pcall(vim.snippet.stop)
	return "<Esc>"
end, { expr = true, desc = "Escape and clear hlsearch" })
vim.keymap.set({ "i", "x", "n", "s" }, "<C-s>", "<Cmd>w<CR><Esc>", { desc = "Save file" })

vim.keymap.set("i", ",", ",<C-g>u", { desc = "Add undo break-point" })
vim.keymap.set("i", ".", ".<C-g>u", { desc = "Add undo break-point" })
vim.keymap.set("i", ";", ";<C-g>u", { desc = "Add undo break-point" })

vim.keymap.set("x", "<", "<gv", { desc = "Better indent left" })
vim.keymap.set("x", ">", ">gv", { desc = "Better indent right" })

vim.keymap.set("n", "Q", "<nop>")

vim.keymap.set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer<CR>")
vim.keymap.set("n", "<M-h>", "<cmd>silent !tmux-sessionizer -s 0 --vsplit<CR>")
vim.keymap.set("n", "<M-H>", "<cmd>silent !tmux neww tmux-sessionizer -s 0<CR>")

vim.keymap.set("n", "]q", "<cmd>cnext<CR>zz", { desc = "Next quickfix" })
vim.keymap.set("n", "[q", "<cmd>cprev<CR>zz", { desc = "Previous quickfix" })
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz", { desc = "Next location" })
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz", { desc = "Previous location" })
vim.keymap.set("n", "<leader>tt", "<cmd>Trouble quickfix toggle<cr>", { desc = "Toggle trouble quickfix" })
vim.keymap.set("n", "<leader>qx", "<cmd>Telescope quickfix<cr>", { desc = "Show quickfix list" })
vim.keymap.set("n", "<leader>xL", "<cmd>Trouble loclist toggle<cr>", { desc = "Trouble loclist" })
vim.keymap.set("n", "<leader>xQ", "<cmd>Trouble qflist toggle<cr>", { desc = "Trouble quickfix list" })
vim.keymap.set("n", "<leader>xx", "<cmd>Trouble diagnostics toggle<cr>", { desc = "Trouble diagnostics" })
vim.keymap.set("n", "<leader>xX", "<cmd>Trouble diagnostics toggle filter.buf=0<cr>", { desc = "Trouble buffer diagnostics" })

vim.keymap.set("n", "<leader>s", function()
	local old = vim.fn.expand("<cword>")
	if old == "" then
		return
	end
	local new = vim.fn.input("Replace '" .. old .. "' with: ")
	if new == "" then
		return
	end
	vim.cmd(string.format("%%s/\\V\\<%s\\>/%s/gI", vim.pesc(old), new:gsub("/", "\\/")))
	vim.fn.feedkeys("ci", "n")
end, { desc = "Search & replace word (whole file)" })

vim.keymap.set("n", "<leader>r", function()
	local nlines = vim.fn.input("Number of lines (0 = current only): ")
	if nlines == "" then
		return
	end
	local count = tonumber(nlines)
	if not count then
		return
	end
	local old = vim.fn.expand("<cword>")
	if old == "" then
		vim.notify("No word under cursor", vim.log.levels.ERROR)
		return
	end
	local new = vim.fn.input("Replace '" .. old .. "' with: ")
	if new == "" then
		return
	end
	vim.cmd(string.format(".,.+%ss/\\V\\<%s\\>/%s/gc", count, vim.pesc(old), new:gsub("/", "\\/")))
end, { desc = "Replace word under cursor on N lines" })

vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true, desc = "Make file executable" })

vim.keymap.set("n", "<leader>ee", "oif err != nil {<CR>}<Esc>Oreturn err<Esc>", { desc = "Insert error check" })
vim.keymap.set("n", "<leader>ea", 'oassert.NoError(err, "")<Esc>F";a', { desc = "Insert assert.NoError" })
vim.keymap.set(
	"n",
	"<leader>ef",
	'oif err != nil {<CR>}<Esc>Olog.Fatalf("error: %s\\n", err.Error())<Esc>jj',
	{ desc = "Insert log.Fatalf" }
)
vim.keymap.set(
	"n",
	"<leader>el",
	'oif err != nil {<CR>}<Esc>O.logger.Error("error", "error", err)<Esc>F.;i',
	{ desc = "Insert logger.Error" }
)

local ai_state = {
	copilot = true,
	supermaven = true,
}
vim.keymap.set("n", "<leader>aid", function()
	local label = function(name, enabled)
		return (enabled and "[x] " or "[ ] ") .. name
	end
	local items = {
		{ label = label("Copilot", ai_state.copilot), key = "copilot" },
		{ label = label("Supermaven", ai_state.supermaven), key = "supermaven" },
		{ label = "---", key = "sep" },
		{ label = "Enable all", key = "enable_all" },
		{ label = "Disable all", key = "disable_all" },
	}
	vim.ui.select(items, {
		prompt = "AI providers:",
		format_item = function(item)
			return item.label
		end,
	}, function(choice)
		if not choice then
			return
		end
		local function set_copilot(on)
			pcall(function()
				if on then
					require("copilot.suggestion").enable()
				else
					require("copilot.suggestion").disable()
				end
			end)
			ai_state.copilot = on
		end
		local function set_supermaven(on)
			pcall(function()
				if on then
					require("supermaven-nvim.api").start()
				else
					require("supermaven-nvim.api").stop()
				end
			end)
			ai_state.supermaven = on
		end
		if choice.key == "copilot" then
			set_copilot(not ai_state.copilot)
		elseif choice.key == "supermaven" then
			set_supermaven(not ai_state.supermaven)
		elseif choice.key == "enable_all" then
			set_copilot(true)
			set_supermaven(true)
		elseif choice.key == "disable_all" then
			set_copilot(false)
			set_supermaven(false)
		end
		vim.g.ai_cmp = ai_state.copilot or ai_state.supermaven
		vim.notify(string.format("Copilot: %s, Supermaven: %s",
			ai_state.copilot and "on" or "off",
			ai_state.supermaven and "on" or "off"), vim.log.levels.INFO)
	end)
end, { desc = "Toggle AI provider(s)" })

vim.keymap.set("n", "gd", function()
	vim.diagnostic.open_float()
end, { desc = "Line diagnostics" })
vim.keymap.set("n", "<leader>gd", function()
	vim.lsp.buf.definition()
end, { desc = "Go to definition" })
vim.keymap.set("n", "gD", function()
	vim.lsp.buf.declaration()
end, { desc = "Go to declaration" })
vim.keymap.set("n", "gi", function()
	vim.lsp.buf.implementation()
end, { desc = "Go to implementation" })
vim.keymap.set("n", "gr", function()
	vim.lsp.buf.references()
end, { desc = "References" })
vim.keymap.set("n", "H", function()
	vim.lsp.buf.hover()
end, { desc = "Hover documentation" })
vim.keymap.set("n", "<leader>vws", function()
	require("telescope.builtin").lsp_workspace_symbols()
end, { desc = "Workspace symbols" })
vim.keymap.set("n", "[d", function()
	vim.diagnostic.goto_prev()
end, { desc = "Previous diagnostic" })
vim.keymap.set("n", "]d", function()
	vim.diagnostic.goto_next()
end, { desc = "Next diagnostic" })
vim.keymap.set("n", "<leader>vca", function()
	vim.lsp.buf.code_action()
end, { desc = "Code action" })
vim.keymap.set("n", "<leader>vrr", function()
	vim.lsp.buf.references()
end, { desc = "References" })
vim.keymap.set("n", "<leader>vrn", function()
	vim.lsp.buf.rename()
end, { desc = "Rename symbol" })
vim.keymap.set("i", "<C-h>", function()
	vim.lsp.buf.signature_help()
end, { desc = "Signature help" })

vim.keymap.set("n", "<leader>f", function()
	vim.lsp.buf.format({ async = true })
end, { desc = "Format buffer" })

vim.keymap.set("n", "<leader>ca", function()
	require("cellular-automaton").start_animation("make_it_rain")
end, { desc = "Make it rain" })

vim.keymap.set("n", "<leader><leader>", function()
	vim.cmd("so")
end, { desc = "Reload config" })

vim.keymap.set("n", "<leader>tp", function()
	vim.lsp.buf.execute_command({
		command = "tinymist.startDefaultPreview",
		arguments = { vim.api.nvim_buf_get_name(0) },
	})
end, { desc = "Typst: start preview" })

vim.keymap.set("n", "<leader>tP", function()
	vim.lsp.buf.execute_command({
		command = "tinymist.stopPreview",
		arguments = {},
	})
end, { desc = "Typst: stop preview" })

vim.keymap.set("n", "<leader>te", function()
	vim.lsp.buf.execute_command({
		command = "tinymist.exportPdf",
		arguments = { vim.api.nvim_buf_get_name(0) },
	})
end, { desc = "Typst: export PDF" })

vim.keymap.set("n", "<leader>tv", function()
	local pdf = vim.fn.expand("%:r") .. ".pdf"
	if vim.fn.filereadable(pdf) == 1 then
		vim.fn.jobstart({ "sioyek", pdf }, { detach = true })
	else
		vim.notify("PDF not found: " .. pdf, vim.log.levels.ERROR)
	end
end, { desc = "Typst: open in sioyek" })

vim.keymap.set("n", "<leader>ts", "<cmd>Theme<CR>", { desc = "Select theme" })
vim.keymap.set("n", "<leader>tn", "<cmd>ThemeNext<CR>", { desc = "Next theme" })

-- UI toggles
vim.keymap.set("n", "<leader>us", function()
	vim.opt.spell = not vim.opt.spell:get()
end, { desc = "Toggle spell" })
vim.keymap.set("n", "<leader>uw", function()
	vim.opt.wrap = not vim.opt.wrap:get()
end, { desc = "Toggle wrap" })
vim.keymap.set("n", "<leader>uL", function()
	vim.opt.relativenumber = not vim.opt.relativenumber:get()
end, { desc = "Toggle relative number" })
vim.keymap.set("n", "<leader>ul", function()
	vim.opt.number = not vim.opt.number:get()
end, { desc = "Toggle line number" })
vim.keymap.set("n", "<leader>ud", function()
	vim.diagnostic.enable(not vim.diagnostic.is_enabled())
end, { desc = "Toggle diagnostics" })
vim.keymap.set("n", "<leader>uc", function()
	vim.opt.conceallevel = vim.opt.conceallevel:get() == 0 and 2 or 0
end, { desc = "Toggle conceal" })
vim.keymap.set("n", "<leader>uT", function()
	require("nvim-treesitter").toggle()
end, { desc = "Toggle treesitter" })
vim.keymap.set("n", "<leader>ub", function()
	if vim.o.background == "dark" then
		vim.o.background = "light"
	else
		vim.o.background = "dark"
	end
end, { desc = "Toggle dark/light background" })
vim.keymap.set("n", "<leader>ur", function()
	vim.cmd("nohlsearch")
	vim.cmd("diffupdate")
	vim.cmd("normal! <C-L>")
end, { desc = "Redraw / clear hlsearch" })
vim.keymap.set("n", "<leader>uZ", function()
	vim.o.winfixwidth = not vim.o.winfixwidth
	vim.o.winfixheight = not vim.o.winfixheight
	vim.cmd("wincmd _ | wincmd |")
end, { desc = "Toggle zoom" })
vim.keymap.set("n", "<leader>ui", function()
	vim.show_pos()
end, { desc = "Inspect pos" })

-- Diagnostic navigation
vim.keymap.set("n", "]e", function()
	vim.diagnostic.goto_next({ severity = vim.diagnostic.severity.ERROR })
end, { desc = "Next error" })
vim.keymap.set("n", "[e", function()
	vim.diagnostic.goto_prev({ severity = vim.diagnostic.severity.ERROR })
end, { desc = "Prev error" })
vim.keymap.set("n", "]w", function()
	vim.diagnostic.goto_next({ severity = vim.diagnostic.severity.WARN })
end, { desc = "Next warning" })
vim.keymap.set("n", "[w", function()
	vim.diagnostic.goto_prev({ severity = vim.diagnostic.severity.WARN })
end, { desc = "Prev warning" })
vim.keymap.set("n", "<leader>cd", function()
	vim.diagnostic.open_float(nil, { scope = "line" })
end, { desc = "Line diagnostics" })

-- Code operations
vim.keymap.set("n", "gI", function()
	vim.lsp.buf.implementation()
end, { desc = "Go to implementation" })
vim.keymap.set("n", "gy", function()
	vim.lsp.buf.type_definition()
end, { desc = "Go to type definition" })
vim.keymap.set({ "n", "x" }, "<leader>cf", function()
	vim.lsp.buf.format({ async = true })
end, { desc = "Format" })
vim.keymap.set("n", "<leader>cm", "<Cmd>Mason<CR>", { desc = "Mason" })
vim.keymap.set({ "n", "x" }, "<leader>cc", function()
	vim.lsp.codelens.run()
end, { desc = "Run codelens" })
vim.keymap.set("n", "<leader>cC", function()
	vim.lsp.codelens.refresh()
end, { desc = "Refresh codelens" })
vim.keymap.set("n", "<leader>co", function()
	vim.lsp.buf.code_action({
		context = { only = { "source.organizeImports" } },
		apply = true,
	})
end, { desc = "Organize imports" })
vim.keymap.set({ "n", "x" }, "<leader>cA", function()
	vim.lsp.buf.code_action({
		context = { only = { "source" }, diagnostics = {} },
	})
end, { desc = "Source action" })
vim.keymap.set("n", "<leader>cR", function()
	local old = vim.fn.expand("%:t")
	local new = vim.fn.input("Rename file to: ", old)
	if new and new ~= "" and new ~= old then
		vim.cmd("saveas " .. new)
		vim.cmd("bdelete! " .. old)
	end
end, { desc = "Rename file" })
vim.keymap.set("n", "<leader>fn", "<Cmd>enew<CR>", { desc = "New file" })

-- Tabs
vim.keymap.set("n", "<leader><tab><tab>", "<Cmd>tabnew<CR>", { desc = "New tab" })
vim.keymap.set("n", "<leader><tab>d", "<Cmd>tabclose<CR>", { desc = "Close tab" })
vim.keymap.set("n", "<leader><tab>l", "<Cmd>tablast<CR>", { desc = "Last tab" })
vim.keymap.set("n", "<leader><tab>f", "<Cmd>tabfirst<CR>", { desc = "First tab" })
vim.keymap.set("n", "<leader><tab>]", "<Cmd>tabnext<CR>", { desc = "Next tab" })
vim.keymap.set("n", "<leader><tab>[", "<Cmd>tabprevious<CR>", { desc = "Prev tab" })
vim.keymap.set("n", "<leader><tab>o", "<Cmd>tabonly<CR>", { desc = "Close other tabs" })

-- Quit / Session
vim.keymap.set("n", "<leader>qq", "<Cmd>qa<CR>", { desc = "Quit all" })
vim.keymap.set("n", "<leader>qw", "<Cmd>wqa<CR>", { desc = "Save and quit all" })

-- Git
vim.keymap.set("n", "<leader>gg", "<Cmd>LazyGit<CR>", { desc = "Lazygit (root dir)" })

-- Terminal
vim.keymap.set("n", "<leader>ft", "<Cmd>terminal<CR>", { desc = "Terminal (root dir)" })
vim.keymap.set("t", "<C-h>", "<Cmd>wincmd h<CR>", { desc = "Terminal: window left" })
vim.keymap.set("t", "<C-j>", "<Cmd>wincmd j<CR>", { desc = "Terminal: window down" })
vim.keymap.set("t", "<C-k>", "<Cmd>wincmd k<CR>", { desc = "Terminal: window up" })
vim.keymap.set("t", "<C-l>", "<Cmd>wincmd l<CR>", { desc = "Terminal: window right" })

local fmt_map = {
	["YYYY"] = "%Y",
	["YY"] = "%y",
	["MMMM"] = "%B",
	["MMM"] = "%b",
	["MM"] = "%m",
	["M"] = "%-m",
	["dddd"] = "%A",
	["ddd"] = "%a",
	["DD"] = "%d",
	["D"] = "%-d",
	["HH"] = "%H",
	["H"] = "%-H",
	["hh"] = "%I",
	["h"] = "%-I",
	["mm"] = "%M",
	["ss"] = "%S",
	["A"] = "%p",
	["a"] = "%p",
}

local function vault_root()
	return vim.fs.dirname(
		vim.fs.find(".obsidian", { path = vim.uv.cwd(), upward = true, type = "directory", limit = 1 })[1]
	)
end

local function render_content(content, title)
	local slug = title:lower():gsub("[^%w%s-]", ""):gsub("%s+", "-"):gsub("%-+", "-")
	local function fmt(s)
		return s:gsub("%w+", function(m)
			return fmt_map[m] or m
		end)
	end
	local now = os.time()
	for _, pat in ipairs({ "{ date:([^}]+) }", "{ time:([^}]+) }", "{{date:([^}]+)}}", "{{time:([^}]+)}}" }) do
		content = content:gsub(pat, function(f)
			return os.date(fmt(f), now)
		end)
	end
	content = content:gsub("{{title}}", title)
	content = content:gsub("{{slug}}", slug)
	return content
end

local function new_obsidian_note(subdir, template_file, prompt, auto_title)
	return function()
		local title = auto_title or vim.fn.input(prompt .. ": ")
		if title == "" then
			return
		end
		local root = vault_root()
		if not root then
			vim.notify("No vault found", vim.log.levels.ERROR)
			return
		end

		local slug = title:lower():gsub("[^%w%s-]", ""):gsub("%s+", "-"):gsub("%-+", "-")
		local filepath = vim.fs.joinpath(root, subdir, slug .. ".md")
		if vim.fn.filereadable(filepath) == 1 then
			vim.cmd("edit " .. filepath)
			return
		end

		local tpl_path = vim.fs.joinpath(root, "Extra", "Template", template_file)
		local content
		if vim.fn.filereadable(tpl_path) == 1 then
			content = render_content(table.concat(vim.fn.readfile(tpl_path), "\n"), title)
		else
			content = "---\ntags: []\n---\n\n# " .. title
		end

		vim.fn.mkdir(vim.fs.dirname(filepath), "p")
		vim.fn.writefile(vim.split(content, "\n"), filepath)
		vim.cmd("edit " .. filepath)
	end
end

vim.keymap.set("n", "<leader>on", new_obsidian_note("Notes", "notes.md", "Note title"), { desc = "New note in Notes" })
vim.keymap.set(
	"n",
	"<leader>oj",
	new_obsidian_note("Journal", "journal.md", nil, os.date("%Y-%m-%d")),
	{ desc = "New journal entry" }
)
vim.keymap.set("n", "<leader>op", new_obsidian_note("Extra", "projects.md", "Project title"), { desc = "New project" })
vim.keymap.set("n", "<leader>obk", new_obsidian_note("Books", "book-note.md", "Book title"), { desc = "New book note" })
vim.keymap.set("n", "<leader>ou", new_obsidian_note("Uni", "uni-note.md", "Note title"), { desc = "New uni note" })

vim.keymap.set("n", "<leader>ob", "<cmd>ObsidianBacklinks<CR>", { desc = "Obsidian backlinks" })
vim.keymap.set("n", "<leader>od", "<cmd>ObsidianToday<CR>", { desc = "Obsidian daily note" })
vim.keymap.set("n", "<leader>ol", "<cmd>ObsidianLinks<CR>", { desc = "Obsidian note links" })
vim.keymap.set("n", "<leader>oo", "<cmd>ObsidianOpen<CR>", { desc = "Open in Obsidian" })
vim.keymap.set("n", "<leader>oq", "<cmd>ObsidianQuickSwitch<CR>", { desc = "Obsidian quick switch" })
vim.keymap.set("n", "<leader>os", "<cmd>ObsidianSearch<CR>", { desc = "Search Obsidian notes" })
vim.keymap.set("n", "<leader>ot", "<cmd>ObsidianTemplate<CR>", { desc = "Insert Obsidian template" })
vim.keymap.set("n", "<leader>oT", "<cmd>ObsidianTOC<CR>", { desc = "Obsidian table of contents" })

vim.api.nvim_create_user_command("Bookshelf", function()
	require("config.bookshelf").picker()
end, { desc = "Browse bookshelf" })
vim.api.nvim_create_user_command("BookshelfRefresh", function()
	require("config.bookshelf").generate_bookshelf()
end, { desc = "Refresh bookshelf catalog" })
vim.api.nvim_create_user_command("BookshelfOpen", function(opts)
	require("config.bookshelf").open_pdf_in_sioyek(opts.args)
end, { nargs = 1, desc = "Open PDF in sioyek" })

vim.keymap.set("n", "\\r", "<cmd>Rest run<CR>", { desc = "Run HTTP request under cursor" })

vim.keymap.set("n", "<leader>bb", function()
	require("config.bookshelf").picker()
end, { desc = "Bookshelf: browse books (Telescope)" })
vim.keymap.set("n", "<leader>bc", function()
	require("config.bookshelf").generate_bookshelf()
end, { desc = "Bookshelf: refresh catalog & covers" })
vim.keymap.set("n", "<leader>bo", function()
	require("config.bookshelf").open_pdf_under_cursor()
end, { desc = "Bookshelf: open PDF under cursor" })
vim.keymap.set("n", "<leader>bO", function()
	require("config.bookshelf").open_pdf_in_sioyek(vim.fn.expand("%:p"))
end, { desc = "Bookshelf: open current file in sioyek" })
vim.keymap.set("n", "<leader>bm", "<cmd>e Books/Bookshelf.md<CR>", { desc = "Bookshelf: open markdown catalog" })

vim.keymap.set("n", "<leader>bd", function()
	local db = require("config.bookshelf").load_db()
	if #db.books == 0 then
		vim.notify("No books", vim.log.levels.INFO)
		return
	end
	local items = vim.tbl_map(function(b)
		return b.id .. "  (" .. b.name .. ")"
	end, db.books)
	vim.ui.select(items, { prompt = "Select book to describe:" }, function(choice)
		if not choice then
			return
		end
		local id = choice:match("^(%S+)")
		if id then
			require("config.bookshelf").set_description(id)
		end
	end)
end, { desc = "Bookshelf: edit book description" })

vim.keymap.set("n", ";c", "<cmd>LazyGit<CR>", { desc = "LazyGit" })
