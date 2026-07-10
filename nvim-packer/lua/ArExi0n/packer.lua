vim.cmd([[packadd packer.nvim]])

return require("packer").startup(function(use)
  -- Plugin Manager
  use("wbthomason/packer.nvim")

  -- ========================
  -- Colorschemes
  -- ========================
  use({ "oskarnurm/koda.nvim", as = "koda" })
  use("catppuccin/nvim")
  use({ "folke/tokyonight.nvim", as = "tokyonight" })
  use("rebelot/kanagawa.nvim")
  use({ "rose-pine/neovim", as = "rose-pine" })
  use("ellisonleao/gruvbox.nvim")
  use("navarasu/onedark.nvim")
  use("EdenEast/nightfox.nvim")
  use("sainnhe/everforest")
  use("sainnhe/sonokai")
  use("Mofiqul/dracula.nvim")
  use("nyoom-engineering/oxocarbon.nvim")

  -- ========================
  -- UI
  -- ========================
  use("MunifTanjim/nui.nvim")
  use({ "rcarriga/nvim-notify", config = [[require('notify').setup({ timeout = 5000, background_colour = '#000000', render = 'wrapped-compact' })]] })
  use({
    "nvim-lualine/lualine.nvim",
    config = function()
      require("lualine").setup({
        options = { theme = "auto", component_separators = "", section_separators = { left = "", right = "" } },
      })
    end,
  })
  use({
    "b0o/incline.nvim",
    config = function()
      require("incline").setup({
        window = { padding = 0, margin = { horizontal = 0 } },
        render = function(props)
          local filename = vim.fn.fnamemodify(vim.api.nvim_buf_get_name(props.buf), ":t")
          local ft_icon = require("nvim-web-devicons").get_icon(filename)
          local normal = vim.api.nvim_get_hl(0, { name = "Normal", link = false })
          local bg = normal.bg or 0x000000
          local modified = vim.bo[props.buf].modified
          local buffer = {
            ft_icon and { " ", ft_icon, " ", guibg = bg } or "",
            " ", { filename, gui = modified and "bold,italic" or "bold" }, " ", guibg = bg,
          }
          return buffer
        end,
      })
    end,
    requires = { "nvim-tree/nvim-web-devicons" },
  })
  use({ "goolord/alpha-nvim", config = function()
    local dashboard = require("alpha.themes.dashboard")
    dashboard.section.buttons.val = {
      dashboard.button("f", "  Find File", "<cmd>lua require('telescope.builtin').find_files({ hidden = true })<CR>"),
      dashboard.button("r", "  Recent Files", "<cmd>lua require('telescope.builtin').buffers()<CR>"),
      dashboard.button("g", "  Live Grep", "<cmd>lua require('telescope.builtin').live_grep()<CR>"),
      dashboard.button("n", "  New File", "<cmd>ene <BAR> startinsert<CR>"),
      dashboard.button("h", "  Help", "<cmd>lua require('telescope.builtin').help_tags()<CR>"),
      dashboard.button("q", "  Quit", "<cmd>qa<CR>"),
    }
    dashboard.opts.layout = {
      { type = "padding", val = 4 },
      dashboard.section.header,
      { type = "padding", val = 3 },
      dashboard.section.buttons,
      { type = "padding", val = 2 },
      dashboard.section.footer,
    }
    require("alpha").setup(dashboard.opts)
  end })
  use({ "akinsho/bufferline.nvim", disable = true })

  -- ========================
  -- Editor
  -- ========================
  use("nvim-lua/plenary.nvim")
  use("lewis6991/async.nvim")
  use({
    "nvim-telescope/telescope.nvim",
    tag = "0.1.5",
    requires = {
      "nvim-lua/plenary.nvim",
      { "nvim-telescope/telescope-fzf-native.nvim", run = "make" },
      "nvim-telescope/telescope-file-browser.nvim",
    },
    config = function()
      local telescope = require("telescope")
      local actions = require("telescope.actions")
      local fb_actions = telescope.extensions.file_browser.actions

      telescope.setup({
        defaults = {
          color_devicons = false, wrap_results = true,
          sorting_strategy = "ascending", winblend = 0,
          layout_strategy = "horizontal",
          layout_config = {
            horizontal = { prompt_position = "top", preview_width = 0.55, width = 0.87, height = 0.80 },
            vertical = { prompt_position = "top", preview_cutoff = 40, width = 0.87, height = 0.80 },
            center = { prompt_position = "top", width = 0.87, height = 0.60 },
          },
          mappings = { i = { ["<C-j>"] = actions.move_selection_next, ["<C-k>"] = actions.move_selection_previous } },
        },
        pickers = {
          diagnostics = { theme = "ivy", initial_mode = "normal", layout_config = { preview_cutoff = 9999 } },
          find_files = { hidden = true, find_command = { "rg", "--files", "--hidden", "--glob", "!**/.git/*" } },
        },
        extensions = {
          fzf = { fuzzy = true, override_generic_sorter = true, override_file_sorter = true, case_mode = "smart_case" },
          file_browser = {
            theme = "dropdown", hijack_netrw = true,
            mappings = { n = { ["N"] = fb_actions.create, ["h"] = fb_actions.goto_parent_dir } },
          },
        },
      })
      telescope.load_extension("fzf")
      telescope.load_extension("file_browser")
    end,
  })
  use({
    "nvim-treesitter/nvim-treesitter",
    run = ":TSUpdate",
    requires = { "nvim-treesitter/nvim-treesitter-textobjects" },
    config = function()
      require("nvim-treesitter.config").setup({
        ensure_installed = {
          "javascript", "typescript", "tsx", "css", "html", "json", "scss", "graphql", "http",
          "swift", "rust", "c", "cpp", "go", "python",
          "lua", "vim", "vimdoc", "bash", "sql",
          "markdown", "markdown_inline",
          "gitignore", "git_config", "git_rebase", "gitcommit", "gitattributes",
          "yaml", "toml", "xml",
        },
        auto_install = true,
        highlight = {
          enable = true,
          disable = function(lang, buf)
            local max_filesize = 100 * 1024
            local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
            if ok and stats and stats.size > max_filesize then return true end
          end,
          additional_vim_regex_highlighting = false,
        },
        indent = { enable = true, disable = { "yaml" } },
        incremental_selection = {
          enable = true,
          keymaps = { init_selection = "<C-space>", node_incremental = "<C-space>", scope_incremental = false, node_decremental = "<bs>" },
        },
        textobjects = {
          select = { enable = true, lookahead = true, keymaps = { ["af"] = "@function.outer", ["if"] = "@function.inner", ["ac"] = "@class.outer", ["ic"] = "@class.inner" } },
          move = {
            enable = true, set_jumps = true,
            goto_next_start = { ["]f"] = "@function.outer", ["]c"] = "@class.outer" },
            goto_next_end = { ["]F"] = "@function.outer", ["]C"] = "@class.outer" },
            goto_previous_start = { ["[f"] = "@function.outer", ["[c"] = "@class.outer" },
            goto_previous_end = { ["[F"] = "@function.outer", ["[C"] = "@class.outer" },
          },
        },
      })
      vim.opt.foldmethod = "expr"
      vim.opt.foldexpr = "nvim_treesitter#foldexpr()"
      vim.opt.foldenable = false
    end,
  })
  use({ "folke/which-key.nvim", config = function() require("which-key").setup() end })
  use({
    "folke/trouble.nvim",
    requires = "nvim-tree/nvim-web-devicons",
    config = function()
      require("trouble").setup({ auto_open = false, auto_close = false, auto_preview = true, auto_jump = false, mode = "quickfix", severity = vim.diagnostic.severity.ERROR, cycle_results = false })
      vim.api.nvim_create_autocmd("User", {
        pattern = { "XcodebuildBuildFinished", "XcodebuildTestsFinished" },
        callback = function(event)
          if event.data.cancelled then return end
          if event.data.success then require("trouble").close()
          elseif not event.data.failedCount or event.data.failedCount > 0 then
            if next(vim.fn.getqflist()) then require("trouble").open("quickfix") else require("trouble").close() end
            require("trouble").refresh()
          end
        end,
      })
    end,
  })
  use("folke/todo-comments.nvim")
  use({
    "folke/flash.nvim",
    config = function() require("flash").setup() end,
  })
  use({
    "folke/persistence.nvim",
    config = function() require("persistence").setup() end,
  })
  use({
    "folke/neoconf.nvim",
    cmd = "Neoconf",
    config = function()
      require("neoconf").setup({ import = { vscode = true, coc = false, nlsp = false }, live_reload = true, filetype_jsonc = true, plugins = { lspconfig = { enabled = true }, jsonls = { enabled = true, configured_servers_only = false }, lua_ls = { enabled = true, enabled_for_neovim_config = true } } })
    end,
  })
  use("folke/lazydev.nvim")
  use({
    "j-hui/fidget.nvim",
    config = function()
      require("fidget").setup({ notification = { window = { normal_hl = "String", winblend = 0, border = "rounded", zindex = 45, max_width = 0, max_height = 0, x_padding = 1, y_padding = 1, align = "bottom", relative = "editor" } } })
    end,
  })
  use("mbbill/undotree")
  use({
    "ThePrimeagen/harpoon",
    branch = "harpoon2",
    requires = "nvim-lua/plenary.nvim",
    config = function()
      local harpoon = require("harpoon")
      harpoon:setup()
      vim.keymap.set("n", "<leader>a", function() harpoon:list():add() end, { desc = "Harpoon: Add file" })
      vim.keymap.set("n", "<C-p>", function() harpoon.ui:toggle_quick_menu(harpoon:list()) end, { desc = "Harpoon: Toggle menu" })
      vim.keymap.set("n", "<leader>1", function() harpoon:list():select(1) end, { desc = "Harpoon: File 1" })
      vim.keymap.set("n", "<leader>2", function() harpoon:list():select(2) end, { desc = "Harpoon: File 2" })
      vim.keymap.set("n", "<leader>3", function() harpoon:list():select(3) end, { desc = "Harpoon: File 3" })
      vim.keymap.set("n", "<leader>4", function() harpoon:list():select(4) end, { desc = "Harpoon: File 4" })
      vim.keymap.set("n", "<C-B>", function() harpoon:list():prev() end, { desc = "Harpoon: Previous" })
      vim.keymap.set("n", "<C-N>", function() harpoon:list():next() end, { desc = "Harpoon: Next" })
    end,
  })
  use({ "ThePrimeagen/vim-apm", config = function() require("vim-apm"):setup({}) end })
  use({ "ThePrimeagen/vim-with-me", cmd = { "WithMe", "WithMeStart", "WithMeStop" } })
  use({ "ThePrimeagen/refactoring.nvim", requires = { "nvim-lua/plenary.nvim", "nvim-treesitter/nvim-treesitter", "lewis6991/async.nvim" }, keys = { { "v", "<leader>r" } }, config = function() require("refactoring").setup() end })
  use({
    "smjonas/inc-rename.nvim",
    cmd = "IncRename",
    config = function()
      vim.keymap.set("n", "<leader>rn", function()
        return ":IncRename " .. vim.fn.expand("<cword>")
      end, { desc = "Incremental rename", expr = true })
      require("inc_rename").setup()
    end,
  })

  -- ========================
  -- LSP
  -- ========================
  use({ "williamboman/mason.nvim", config = [[require('mason').setup()]] })
  use("williamboman/mason-lspconfig.nvim")
  use({ "neovim/nvim-lspconfig" })
  use({ "hrsh7th/nvim-cmp" })
  use({ "hrsh7th/cmp-nvim-lsp", opt = true })
  use({ "hrsh7th/cmp-buffer", opt = true })
  use({ "hrsh7th/cmp-path", opt = true })
  use({ "hrsh7th/cmp-cmdline", opt = true })
  use({ "saadparwaiz1/cmp_luasnip", opt = true })
  use("rafamadriz/friendly-snippets")
  use({
    "mfussenegger/nvim-lint",
    config = function()
      local lint = require("lint")
      lint.linters_by_ft = {
        javascript = { "eslint" }, typescript = { "eslint" }, javascriptreact = { "eslint" }, typescriptreact = { "eslint" },
        swift = { "swiftlint" }, lua = { "luacheck" }, sh = { "shellcheck" },
      }
      local group = vim.api.nvim_create_augroup("lint", { clear = true })
      vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
        group = group, callback = function() lint.try_lint() end,
      })
    end,
  })
  use({
    "stevearc/conform.nvim",
    config = function()
      require("conform").setup({
        formatters_by_ft = {
          lua = { "stylua" }, sh = { "shfmt" }, python = { "ruff_format" },
          go = { "gofumpt", "goimports" },
          javascript = { "prettier" }, typescript = { "prettier" }, javascriptreact = { "prettier" }, typescriptreact = { "prettier" },
          json = { "prettier" }, html = { "prettier" }, css = { "prettier" },
          yaml = { "prettier" }, markdown = { "prettier" },
          rust = { "rustfmt" }, cpp = { "clang-format" }, c = { "clang-format" },
          swift = { "swiftformat" }, kotlin = { "ktlint" }, toml = { "taplo" }, ruby = { "rubocop" },
        },
        format_on_save = { timeout_ms = 500, lsp_fallback = true },
      })
    end,
  })

  -- ========================
  -- DAP
  -- ========================
  use("mfussenegger/nvim-dap")
  use({ "rcarriga/nvim-dap-ui", requires = { "mfussenegger/nvim-dap", "nvim-neotest/nvim-nio" }, config = function()
    local dap = require("dap")
    local dapui = require("dapui")
    dapui.setup({
      controls = { element = "repl", enabled = true, icons = { disconnect = "", run_last = "", terminate = "⏹︎", pause = "⏸︎", play = "", step_into = "󰆹", step_out = "󰆸", step_over = "", step_back = "" } },
      floating = { border = "single", mappings = { close = { "q", "<Esc>" } } },
      icons = { collapsed = "", expanded = "", current_frame = "" },
      layouts = {
        { elements = { { id = "stacks", size = 0.25 }, { id = "scopes", size = 0.25 }, { id = "breakpoints", size = 0.25 }, { id = "watches", size = 0.25 } }, position = "left", size = 40 },
        { elements = { { id = "repl", size = 0.4 }, { id = "console", size = 0.6 } }, position = "bottom", size = 10 },
      },
    })
    local group = vim.api.nvim_create_augroup("dapui_config", { clear = true })
    vim.api.nvim_create_autocmd("BufWinEnter", { group = group, pattern = "DAP*", callback = function() vim.wo.fillchars = "eob: " end })
    vim.api.nvim_create_autocmd("BufWinEnter", { group = group, pattern = "\\[dap\\-repl\\]", callback = function() vim.wo.fillchars = "eob: " end })
    dap.listeners.after.event_initialized["dapui_config"] = function() dapui.open() end
    dap.listeners.before.event_terminated["dapui_config"] = function() dapui.close() end
    dap.listeners.before.event_exited["dapui_config"] = function() dapui.close() end
    vim.keymap.set("n", "<leader>du", dapui.toggle, { desc = "DAP UI toggle" })
    vim.keymap.set("n", "<leader>dw", function() local expr = vim.fn.input("Watch expression: "); if expr ~= "" then dapui.elements.watches.add(expr) end end, { desc = "DapUI add watch" })
    vim.keymap.set("n", "<leader>dW", function() dapui.elements.watches.remove() end, { desc = "DapUI remove watch" })
    vim.keymap.set("n", "<leader>dC", function() dapui.elements.watches.clear() end, { desc = "DapUI clear watches" })
  end })
  use("nvim-neotest/nvim-nio")

  -- ========================
  -- Testing
  -- ========================
  use({
    "nvim-neotest/neotest",
    requires = {
      "nvim-lua/plenary.nvim", "antoinemadec/FixCursorHold.nvim", "nvim-treesitter/nvim-treesitter",
      "nvim-neotest/neotest-jest", "nvim-neotest/neotest-plenary", "weilbith/neotest-gradle",
    },
    config = function()
      require("neotest").setup({
        adapters = {
          require("neotest-plenary"),
          require("neotest-gradle"),
          require("neotest-jest")({
            jestConfigFile = function()
              local file = vim.fn.expand("%:p")
              if string.find(file, "/packages/") then return string.match(file, "(.-/[^/]+/)src") .. "jest.config.ts" end
              return vim.fn.getcwd() .. "/jest.config.ts"
            end,
            cwd = function()
              local file = vim.fn.expand("%:p")
              if string.find(file, "/packages/") then return string.match(file, "(.-/[^/]+/)src") end
              return vim.fn.getcwd()
            end,
          }),
        },
        status = { virtual_text = true },
        output = { open_on_run = true },
      })
    end,
  })

  -- ========================
  -- File Explorer
  -- ========================
  use({
    "stevearc/oil.nvim",
    requires = { "nvim-tree/nvim-web-devicons" },
    config = function()
      require("oil").setup({
        default_file_explorer = true,
        skip_confirm_for_simple_edits = true,
        view_options = { show_hidden = true },
        keymaps = { ["<C-p>"] = false, ["<C-c>"] = false },
      })
    end,
  })
  use("nvim-tree/nvim-web-devicons")

  -- ========================
  -- Git
  -- ========================
  use({
    "kdheepak/lazygit.nvim",
    requires = "nvim-lua/plenary.nvim",
    cmd = "LazyGit",
  })
  use({ "lewis6991/gitsigns.nvim", disable = true })

  -- ========================
  -- Language Support
  -- ========================
  use({
    "akinsho/toggleterm.nvim",
    cmd = "ToggleTerm",
    config = function()
      require("toggleterm").setup({ size = 20, open_mapping = false, hide_numbers = true, shade_terminals = true, shading_factor = 2, start_in_insert = true, insert_mappings = true, persist_size = true, direction = "float", float_opts = { border = "rounded", winblend = 3 } })
    end,
  })

  -- ========================
  -- Obsidian
  -- ========================
  use({
    "epwalsh/obsidian.nvim",
    tag = "*",
    requires = { "nvim-lua/plenary.nvim", "nvim-telescope/telescope.nvim", "hrsh7th/nvim-cmp" },
    ft = "markdown",
    cmd = { "ObsidianBacklinks", "ObsidianDailies", "ObsidianExtractNote", "ObsidianFollowLink", "ObsidianLink", "ObsidianLinkNew", "ObsidianLinks", "ObsidianNew", "ObsidianNewFromTemplate", "ObsidianOpen", "ObsidianPasteImg", "ObsidianQuickSwitch", "ObsidianRename", "ObsidianSearch", "ObsidianTags", "ObsidianTemplate", "ObsidianToday", "ObsidianToggleCheckbox", "ObsidianTomorrow", "ObsidianTOC", "ObsidianYesterday" },
    config = function()
      require("obsidian").setup(require("ArExi0n.obsidian").opts())
      require("ArExi0n.obsidian").patch_template_substitutions()
    end,
  })

  -- ========================
  -- Xcode
  -- ========================
  use({
    "wojciech-kulik/xcodebuild.nvim",
    requires = { "nvim-telescope/telescope.nvim", "MunifTanjim/nui.nvim" },
    config = function()
      local progress_handle
      require("xcodebuild").setup({
        show_build_progress_bar = false,
        logs = {
          auto_open_on_success_tests = false, auto_open_on_failed_tests = false,
          auto_open_on_success_build = false, auto_open_on_failed_build = false,
          auto_focus = false, auto_close_on_app_launch = true, only_summary = true,
          notify = function(message, severity)
            local fidget = require("fidget")
            if progress_handle then
              progress_handle.message = message
              if not message:find("Loading") then
                progress_handle:finish()
                progress_handle = nil
                if vim.trim(message) ~= "" then fidget.notify(message, severity) end
              end
            else
              fidget.notify(message, severity)
            end
          end,
          notify_progress = function(message)
            local progress = require("fidget.progress")
            if progress_handle then
              progress_handle.title = ""
              progress_handle.message = message
            else
              progress_handle = progress.handle.create({ message = message, lsp_client = { name = "xcodebuild.nvim" } })
            end
          end,
        },
        code_coverage = { enabled = true },
      })
    end,
  })

  -- ========================
  -- Kotlin
  -- ========================
  use("udalov/kotlin-vim")

  -- ========================
  -- AI
  -- ========================
  use({
    "supermaven-inc/supermaven-nvim",
    config = function()
      require("supermaven-nvim").setup({ keymaps = { accept_suggestion = "<C-a>", clear_suggestion = "<C-]>", accept_word = "<M-C-j>" } })
      vim.g.ai_cmp = true
    end,
  })

  -- ========================
  -- Other
  -- ========================
  use("mrjones2014/legendary.nvim")
  use({ "rest-nvim/rest.nvim", requires = "nvim-lua/plenary.nvim", config = function()
    require("rest-nvim").setup({ result_split_horizontal = false, result_split_in_place = false, stay_in_current_window_after_split = false, skip_ssl_verification = false, encode_url = true, highlight = { enabled = true, timeout = 150 }, result = { show_url = true, show_curl_command = false, show_http_info = true, show_headers = true, show_statistics = false, formatters = { json = "jq", html = function(body) return vim.fn.system({ "tidy", "-i", "-q", "-" }, body) end } }, jump_to_request = false, env_file = ".env", custom_dynamic_variables = {}, yank_dry_run = true, search_back = true })
  end })
  use({ "vim-dadbod/vim-dadbod", lazy = true })
  use({ "kristijanhusak/vim-dadbod-ui", cmd = { "DBUI", "DBUIToggle", "DBUIAddConnection", "DBUIFindBuffer" }, requires = { "tpope/vim-dadbod", { "kristijanhusak/vim-dadbod-completion", ft = { "sql", "mysql", "plsql" } } }, init = function() vim.g.db_ui_use_nerd_fonts = 1 end })
  use("eandrju/cellular-automaton.nvim")
  use("MagicDuck/grug-far.nvim")
  use("saeedashoori/crates.nvim")
  use("folke/snacks.nvim")
  use("b0o/schemastore.nvim")

  -- ========================
  -- Snippets (local)
  -- ========================
  use({
    "L3MON4D3/LuaSnip",
    run = "make install jsregexp",
    requires = "rafamadriz/friendly-snippets",
    config = function()
      local ls = require("luasnip")
      require("luasnip.loaders.from_vscode").lazy_load({ paths = vim.fn.stdpath("config") .. "/snippets" })
      vim.keymap.set({ "i" }, "<C-s>e", function() ls.expand() end, { silent = true })
      vim.keymap.set({ "i", "s" }, "<C-s>;", function() ls.jump(1) end, { silent = true })
      vim.keymap.set({ "i", "s" }, "<C-s>,", function() ls.jump(-1) end, { silent = true })
      vim.keymap.set({ "i", "s" }, "<C-E>", function() if ls.choice_active() then ls.change_choice(1) end end, { silent = true })
    end,
  })

end)
