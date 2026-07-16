return {
	{
		"nvim-neotest/neotest",
		requires = {
			"nvim-lua/plenary.nvim",
			"nvim-neotest/nvim-nio",
			"antoinemadec/FixCursorHold.nvim",
			"nvim-treesitter/nvim-treesitter",
			"nvim-neotest/neotest-jest",
			"nvim-neotest/neotest-plenary",
			"weilbith/neotest-gradle",
		},
		config = function()
			require("config.neotest").setup()

			local neotest = require("neotest")

			vim.keymap.set("n", ";tt", function()
				neotest.run.run(vim.fn.expand("%"))
			end, { desc = "Run File" })

			vim.keymap.set("n", ";tr", function()
				neotest.run.run()
			end, { desc = "Run Nearest" })

			vim.keymap.set("n", ";tT", function()
				neotest.run.run((vim.uv or vim.loop).cwd())
			end, { desc = "Run All Test Files" })

			vim.keymap.set("n", ";tl", function()
				neotest.run.run_last()
			end, { desc = "Run Last" })

			vim.keymap.set("n", ";ts", function()
				neotest.summary.toggle()
			end, { desc = "Toggle Summary" })

			vim.keymap.set("n", ";to", function()
				neotest.output.open({ enter = true, auto_close = true })
			end, { desc = "Show Output" })

			vim.keymap.set("n", ";tO", function()
				neotest.output_panel.toggle()
			end, { desc = "Toggle Output Panel" })

			vim.keymap.set("n", ";tS", function()
				neotest.run.stop()
			end, { desc = "Stop" })
		end,
	},
}
