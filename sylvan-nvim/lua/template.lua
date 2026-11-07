-- Provides a Telescope picker to insert templates with dynamic variable substitution
-- Works in any file type, not just Obsidian

local M = {}

-- Default template directory (Obsidian vault's Extra/Template)
local function default_template_dir()
	local vault = M.find_vault_root()
	if vault then
		return vim.fs.joinpath(vault, "Extra", "Template")
	end
	-- Fallback to local templates directory
	local config_dir = vim.fn.stdpath("config")
	return vim.fs.joinpath(config_dir, "templates")
end

-- Find Obsidian vault root by looking for .obsidian directory
function M.find_vault_root(start_path)
	start_path = start_path or vim.uv.cwd()
	local root = vim.fs.find(".obsidian", { path = start_path, upward = true, type = "directory", limit = 1 })[1]
	if root then
		return vim.fs.dirname(root)
	end
	return nil
end

-- Variable substitution map (similar to Obsidian's format)
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

local function translate_fmt(format)
	return format:gsub("%w+", function(m)
		return fmt_map[m] or m
	end)
end

-- Built-in variable resolvers
local function make_resolvers(title)
	local now = os.time()
	local slug = title and title:lower():gsub("[^%w%s-]", ""):gsub("%s+", "-"):gsub("%-+", "-") or ""

	return {
		-- Date/time variables (Obsidian-style: {{date:FORMAT}}, {{time:FORMAT}})
		date = function(format)
			return os.date(translate_fmt(format or "%Y-%m-%d"), now)
		end,
		time = function(format)
			return os.date(translate_fmt(format or "%H:%M"), now)
		end,
		-- Shorthand
		["date:"] = function(format)
			return os.date(translate_fmt(format), now)
		end,
		["time:"] = function(format)
			return os.date(translate_fmt(format), now)
		end,
		-- Title and slug
		title = function()
			return title or ""
		end,
		slug = function()
			return slug
		end,
		-- ISO timestamp
		iso = function()
			return os.date("!%Y-%m-%dT%H:%M:%SZ", now)
		end,
		-- File info
		filename = function()
			return vim.fn.expand("%:t")
		end,
		filepath = function()
			return vim.fn.expand("%:p")
		end,
		cwd = function()
			return vim.uv.cwd() or ""
		end,
		-- Custom: execute Lua code and return result
		-- Usage: {{lua:return os.getenv("USER")}}
		lua = function(code)
			local fn, err = load("return " .. code)
			if not fn then
				fn, err = load(code)
			end
			if fn then
				local ok, result = pcall(fn)
				if ok then
					return tostring(result)
				end
			end
			return err or ""
		end,
		-- Environment variables: {{env:VAR_NAME}}
		env = function(name)
			return vim.env[name] or ""
		end,
		-- Random UUID
		uuid = function()
			local random = vim.fn.system("uuidgen"):gsub("\n", "")
			if random == "" then
				-- Fallback
				random = string.format(
					"%08x-%04x-%04x-%04x-%012x",
					math.random(0xffffffff),
					math.random(0xffff),
					math.random(0x0fff) + 0x4000,
					math.random(0x3fff) + 0x8000,
					math.random(0xffffffffffff)
				)
			end
			return random
		end,
	}
end

-- Render template content with variable substitution
function M.render_template(content, title)
	local resolvers = make_resolvers(title)

	-- Handle {{var:format}} and {{var}} patterns
	content = content:gsub("{{%s*([%w_]+):([^}]+)%s*}}", function(var, fmt)
		local resolver = resolvers[var]
		if resolver then
			return resolver(fmt) or ""
		end
		-- Try var:fmt as a single key (e.g., "date:%Y-%m-%d")
		resolver = resolvers[var .. ":"]
		if resolver then
			return resolver(fmt) or ""
		end
		return "{{" .. var .. ":" .. fmt .. "}}"
	end)

	-- Handle {{var}} patterns (no format)
	content = content:gsub("{{%s*([%w_]+)%s*}}", function(var)
		local resolver = resolvers[var]
		if resolver then
			return resolver() or ""
		end
		return "{{" .. var .. "}}"
	end)

	-- Handle { var:format } patterns (Obsidian alt syntax)
	content = content:gsub("{%s*([%w_]+):([^}]+)%s*}", function(var, fmt)
		local resolver = resolvers[var]
		if resolver then
			return resolver(fmt) or ""
		end
		resolver = resolvers[var .. ":"]
		if resolver then
			return resolver(fmt) or ""
		end
		return "{ " .. var .. ":" .. fmt .. " }"
	end)

	-- Handle { var } patterns
	content = content:gsub("{%s*([%w_]+)%s*}", function(var)
		local resolver = resolvers[var]
		if resolver then
			return resolver() or ""
		end
		return "{ " .. var .. " }"
	end)

	return content
end

-- Get list of template files
function M.list_templates(template_dir)
	template_dir = template_dir or default_template_dir()
	if vim.fn.isdirectory(template_dir) ~= 1 then
		return {}
	end

	local templates = {}
	for _, file in ipairs(vim.fn.readdir(template_dir)) do
		local path = vim.fs.joinpath(template_dir, file)
		if vim.fn.filereadable(path) == 1 then
			table.insert(templates, {
				name = file,
				path = path,
				display = file,
			})
		end
	end
	table.sort(templates, function(a, b)
		return a.name < b.name
	end)
	return templates
end

-- Insert template at cursor position
function M.insert_template(template_path, title)
	local lines = vim.fn.readfile(template_path)
	if #lines == 0 then
		vim.notify("Template is empty: " .. template_path, vim.log.levels.WARN)
		return
	end

	local content = table.concat(lines, "\n")
	content = M.render_template(content, title)

	local bufnr = vim.api.nvim_get_current_buf()
	local cursor = vim.api.nvim_win_get_cursor(0)
	local row = cursor[1]
	local col = cursor[2]

	-- Check if buffer is empty (single empty line)
	local line_count = vim.api.nvim_buf_line_count(bufnr)
	local first_line = vim.api.nvim_buf_get_lines(bufnr, 0, 1, false)[1] or ""

	if line_count == 1 and first_line == "" then
		-- Replace the empty line
		vim.api.nvim_buf_set_lines(bufnr, 0, 1, false, vim.split(content, "\n"))
		vim.api.nvim_win_set_cursor(0, { vim.api.nvim_buf_line_count(bufnr), 0 })
	else
		-- Insert at cursor position
		local content_lines = vim.split(content, "\n")
		vim.api.nvim_buf_set_lines(bufnr, row, row, false, content_lines)
		vim.api.nvim_win_set_cursor(0, { row + #content_lines, 0 })
	end
end

-- Telescope picker for templates
function M.pick_template(opts)
	opts = opts or {}
	local template_dir = opts.template_dir or default_template_dir()
	local templates = M.list_templates(template_dir)

	if #templates == 0 then
		vim.notify("No templates found in " .. template_dir, vim.log.levels.WARN)
		return
	end

	local pickers = require("telescope.pickers")
	local finders = require("telescope.finders")
	local conf = require("telescope.config").values
	local actions = require("telescope.actions")
	local action_state = require("telescope.actions.state")
	local previewers = require("telescope.previewers")

	pickers
		.new({}, {
			prompt_title = "Templates (" .. vim.fs.basename(template_dir) .. ")",
			finder = finders.new_table({
				results = templates,
				entry_maker = function(entry)
					return {
						value = entry,
						display = entry.display,
						ordinal = entry.name,
						path = entry.path,
					}
				end,
			}),
			sorter = conf.generic_sorter({}),
			previewer = previewers.new_buffer_previewer({
				title = "Template Preview",
				define_preview = function(self, entry, status)
					local lines = vim.fn.readfile(entry.path)
					vim.api.nvim_buf_set_lines(self.state.bufnr, 0, -1, false, lines)
					-- Try to detect filetype for syntax highlighting
					local ft = vim.filetype.match({ filename = entry.path })
					if ft then
						vim.bo[self.state.bufnr].filetype = ft
					end
				end,
			}),
			attach_mappings = function(prompt_bufnr, map)
				actions.select_default:replace(function()
					local selection = action_state.get_selected_entry()
					actions.close(prompt_bufnr)
					if selection then
						-- Prompt for title if template contains {{title}} or {{slug}}
						local content = table.concat(vim.fn.readfile(selection.path), "\n")
						local needs_title = content:match("{{%s*title%s*}}")
							or content:match("{{%s*slug%s*}}")
							or content:match("{ title }")
							or content:match("{ slug }")
						local title = ""
						if needs_title then
							title = vim.fn.input("Title: ")
							if title == "" then
								return
							end
						end
						M.insert_template(selection.path, title)
					end
				end)
				-- Allow inserting without title prompt (use filename as title)
				map("i", "<C-y>", function()
					local selection = action_state.get_selected_entry()
					actions.close(prompt_bufnr)
					if selection then
						local title = vim.fs.basename(selection.path):gsub("%.%w+$", "")
						M.insert_template(selection.path, title)
					end
				end)
				return true
			end,
		})
		:find()
end

-- Command to pick and insert template
function M.setup_commands()
	vim.api.nvim_create_user_command("TemplatePick", function(opts)
		local dir = opts.args ~= "" and opts.args or nil
		M.pick_template({ template_dir = dir })
	end, { nargs = "?", complete = "dir", desc = "Pick and insert template" })

	vim.api.nvim_create_user_command("TemplateInsert", function(opts)
		local template_dir = default_template_dir()
		local path = vim.fs.joinpath(template_dir, opts.args)
		if vim.fn.filereadable(path) == 1 then
			M.insert_template(path, "")
		else
			vim.notify("Template not found: " .. path, vim.log.levels.ERROR)
		end
	end, {
		nargs = 1,
		complete = function()
			return vim.tbl_map(function(t)
				return t.name
			end, M.list_templates())
		end,
		desc = "Insert template by name",
	})
end

-- Setup keymaps
function M.setup_keymaps()
	-- <leader>ot - Open Template picker (like Obsidian's template picker)
	vim.keymap.set("n", "<leader>ot", function()
		M.pick_template()
	end, { desc = "Pick and insert template" })

	-- <leader>oT - Pick template from specific directory
	vim.keymap.set("n", "<leader>oT", function()
		local dir = vim.fn.input("Template directory: ", default_template_dir(), "dir")
		if dir ~= "" then
			M.pick_template({ template_dir = dir })
		end
	end, { desc = "Pick template from directory" })
end

-- Setup everything
function M.setup(opts)
	opts = opts or {}
	if opts.template_dir then
		M.template_dir = opts.template_dir
	end
	M.setup_commands()
	M.setup_keymaps()
end

return M

