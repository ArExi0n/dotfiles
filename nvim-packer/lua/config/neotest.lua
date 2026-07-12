local M = {}

function M.setup()
	local has_trouble = pcall(require, "trouble")
	local neotest_ns = vim.api.nvim_create_namespace("neotest")
	vim.diagnostic.config({
		virtual_text = {
			format = function(diagnostic)
				local message = diagnostic.message:gsub("\n", " "):gsub("\t", " "):gsub("%s+", " "):gsub("^%s+", "")
				return message
			end,
		},
	}, neotest_ns)

	local opts = {
		adapters = {
			require("neotest-plenary"),
			require("neotest-jest")({
				jestConfigFile = function()
					local file = vim.fn.expand("%:p")
					if string.find(file, "/packages/") then
						return string.match(file, "(.-/[^/]+/)src") .. "jest.config.ts"
					end
					return vim.fn.getcwd() .. "/jest.config.ts"
				end,
				cwd = function()
					local file = vim.fn.expand("%:p")
					if string.find(file, "/packages/") then
						return string.match(file, "(.-/[^/]+/)src")
					end
					return vim.fn.getcwd()
				end,
			}),
			require("neotest-gradle"),
		},
		status = { virtual_text = true },
		output = { open_on_run = true },
		quickfix = {
			open = function()
				if has_trouble then
					require("trouble").open({ mode = "quickfix", focus = false })
				else
					vim.cmd("copen")
				end
			end,
		},
	}

	if has_trouble then
		opts.consumers = opts.consumers or {}
		opts.consumers.trouble = function(client)
			client.listeners.results = function(adapter_id, results, partial)
				if partial then
					return
				end
				local tree = assert(client:get_position(nil, { adapter = adapter_id }))

				local failed = 0
				for pos_id, result in pairs(results) do
					if result.status == "failed" and tree:get_key(pos_id) then
						failed = failed + 1
					end
				end
				vim.schedule(function()
					local trouble = require("trouble")
					if trouble.is_open() then
						trouble.refresh()
						if failed == 0 then
							trouble.close()
						end
					end
				end)
				return {}
			end
		end
	end

	require("neotest").setup(opts)

	vim.keymap.set("n", ";tt", function() require("neotest").run.run(vim.fn.expand("%")) end, { desc = "Run File" })
	vim.keymap.set("n", ";tr", function() require("neotest").run.run() end, { desc = "Run Nearest" })
	vim.keymap.set("n", ";tT", function() require("neotest").run.run((vim.uv or vim.loop).cwd()) end, { desc = "Run All Test Files" })
	vim.keymap.set("n", ";tl", function() require("neotest").run.run_last() end, { desc = "Run Last" })
	vim.keymap.set("n", ";ts", function() require("neotest").summary.toggle() end, { desc = "Toggle Summary" })
	vim.keymap.set("n", ";to", function() require("neotest").output.open({ enter = true, auto_close = true }) end, { desc = "Show Output" })
	vim.keymap.set("n", ";tO", function() require("neotest").output_panel.toggle() end, { desc = "Toggle Output Panel" })
	vim.keymap.set("n", ";tS", function() require("neotest").run.stop() end, { desc = "Stop" })
end

return M
