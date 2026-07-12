return {
	{
		"ThePrimeagen/harpoon",
		branch = "harpoon2",
		requires = { "nvim-lua/plenary.nvim" },
		config = function()
			local harpoon = require("harpoon")
			harpoon:setup()

			vim.keymap.set("n", "<leader>a", function()
				harpoon:list():add()
			end, { desc = "Harpoon: Add file" })

			vim.keymap.set("n", "<C-p>", function()
				harpoon.ui:toggle_quick_menu(harpoon:list())
			end, { desc = "Harpoon: Toggle menu" })

			vim.keymap.set("n", "<leader>1", function()
				harpoon:list():select(1)
			end, { desc = "Harpoon: File 1" })

			vim.keymap.set("n", "<leader>2", function()
				harpoon:list():select(2)
			end, { desc = "Harpoon: File 2" })

			vim.keymap.set("n", "<leader>3", function()
				harpoon:list():select(3)
			end, { desc = "Harpoon: File 3" })

			vim.keymap.set("n", "<leader>4", function()
				harpoon:list():select(4)
			end, { desc = "Harpoon: File 4" })

			vim.keymap.set("n", "<C-B>", function()
				harpoon:list():prev()
			end, { desc = "Harpoon: Previous" })

			vim.keymap.set("n", "<C-N>", function()
				harpoon:list():next()
			end, { desc = "Harpoon: Next" })
		end,
	},
	{
		"ThePrimeagen/vim-apm",
		config = function()
			local apm = require("vim-apm")
			apm:setup({})

			vim.keymap.set("n", "<leader>apm", function()
				print(string.format("APM: %d", apm:get_apm()))
			end, { desc = "Show APM" })
		end,
	},
	{
		"ThePrimeagen/vim-with-me",
		cmd = { "WithMe", "WithMeStart", "WithMeStop" },
		module = "vim-with-me",
	},
}
