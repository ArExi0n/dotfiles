local M = {}

M.capabilities = vim.lsp.protocol.make_client_capabilities()

local ok, blink = pcall(require, "blink.cmp")
if ok then
	M.capabilities = blink.get_lsp_capabilities(M.capabilities)
end
M.capabilities.textDocument.completion.completionItem.snippetSupport = true

M.servers = {
	ts_ls = {
		autostart = true,
		root_dir = function(...)
			return require("lspconfig.util").root_pattern("package.json", "tsconfig.json", "jsconfig.json", ".git")(...)
		end,
		single_file_support = true,
		settings = {
			typescript = {
				inlayHints = {
					includeInlayParameterNameHints = "literal",
					includeInlayParameterNameHintsWhenArgumentMatchesName = false,
					includeInlayFunctionParameterTypeHints = true,
					includeInlayVariableTypeHints = true,
					includeInlayPropertyDeclarationTypeHints = true,
					includeInlayFunctionLikeReturnTypeHints = true,
					includeInlayEnumMemberValueHints = true,
				},
			},
			javascript = {
				inlayHints = {
					includeInlayParameterNameHints = "all",
					includeInlayParameterNameHintsWhenArgumentMatchesName = false,
					includeInlayFunctionParameterTypeHints = true,
					includeInlayVariableTypeHints = true,
					includeInlayPropertyDeclarationTypeHints = true,
					includeInlayFunctionLikeReturnTypeHints = true,
					includeInlayEnumMemberValueHints = true,
				},
			},
		},
	},
	sourcekit = {
		cmd = { vim.trim(vim.fn.system("xcrun -f sourcekit-lsp")) },
		filetypes = { "swift", "objc", "objcpp" },
		root_dir = function(filename)
			local util = require("lspconfig.util")
			local root = util.root_pattern("buildServer.json", "Package.swift")(filename)
			if root then
				return root
			end
			local dir = vim.fs.dirname(filename)
			while dir and dir ~= "/" do
				for entry, type in vim.fs.dir(dir) do
					if type == "directory" and (entry:find("%.xcodeproj$") or entry:find("%.xcworkspace$")) then
						return dir
					end
				end
				dir = vim.fs.dirname(dir)
			end
			return util.root_pattern(".git")(filename)
		end,
		on_attach = function(_, bufnr)
			vim.bo[bufnr].tabstop = 4
			vim.bo[bufnr].shiftwidth = 4
			vim.bo[bufnr].expandtab = true
		end,
	},
	eslint = {
		autostart = true,
		settings = { workingDirectories = { mode = "auto" } },
	},
	jsonls = { autostart = true },
	bashls = { autostart = true },
	cssls = { autostart = true },
	html = { autostart = true },
	tailwindcss = {
		autostart = true,
		root_dir = function(...)
			return require("lspconfig.util").root_pattern(
				"tailwind.config.js",
				"tailwind.config.ts",
				"postcss.config.js",
				"postcss.config.ts",
				".git"
			)(...)
		end,
		filetypes = { "html", "css", "scss", "javascript", "javascriptreact", "typescript", "typescriptreact", "vue", "svelte" },
	},
	lua_ls = {
		autostart = true,
		single_file_support = true,
		settings = {
			Lua = {
				workspace = { checkThirdParty = false },
				completion = { workspaceWord = true, callSnippet = "Both" },
				hint = {
					enable = true,
					setType = false,
					paramType = true,
					paramName = "Disable",
					semicolon = "Disable",
					arrayIndex = "Disable",
				},
				diagnostics = {
					disable = { "incomplete-signature-doc", "trailing-space" },
					globals = { "vim" },
				},
			},
		},
	},
	gopls = {
		autostart = true,
		settings = {
			gopls = {
				analyses = { unusedparams = true },
				staticcheck = true,
				gofumpt = true,
			},
		},
	},
	clangd = {
		autostart = true,
		cmd = { "clangd", "xcode-build-server", "--background-index", "--clang-tidy", "--header-insertion=iwyu", "--completion-style=detailed" },
	},
	zls = { autostart = true },
	rust_analyzer = {
		autostart = true,
	},
	tinymist = {
		autostart = true,
		settings = {
			defaultEntryFile = "",
			exportPdf = "onSave",
			outputPath = "$root/$name",
			formatterMode = "typstyle",
			previewFeature = "enable",
			sysInputs = {},
		},
		root_dir = function(fname)
			return require("lspconfig.util").root_pattern("typst.toml", ".git")(fname)
				or vim.fn.fnamemodify(fname, ":h")
		end,
		on_attach = function(_, bufnr)
			vim.keymap.set("n", "<leader>tp", function()
				vim.lsp.buf.execute_command({
					command = "tinymist.startDefaultPreview",
					arguments = { vim.api.nvim_buf_get_name(bufnr) },
				})
			end, { buffer = bufnr, desc = "Typst: start preview" })
			vim.keymap.set("n", "<leader>tP", function()
				vim.lsp.buf.execute_command({
					command = "tinymist.stopPreview",
					arguments = {},
				})
			end, { buffer = bufnr, desc = "Typst: stop preview" })
			vim.keymap.set("n", "<leader>te", function()
				vim.lsp.buf.execute_command({
					command = "tinymist.exportPdf",
					arguments = { vim.api.nvim_buf_get_name(bufnr) },
				})
			end, { buffer = bufnr, desc = "Typst: export PDF" })
			vim.keymap.set("n", "<leader>ts", function()
				vim.lsp.buf.execute_command({
					command = "tinymist.exportSvg",
					arguments = { vim.api.nvim_buf_get_name(bufnr) },
				})
			end, { buffer = bufnr, desc = "Typst: export SVG" })
			vim.keymap.set("n", "<leader>tv", function()
				local pdf = vim.fn.expand("%:r") .. ".pdf"
				vim.fn.jobstart({ "sioyek", pdf }, { detach = true })
			end, { buffer = bufnr, desc = "Typst: open in sioyek" })
		end,
	},
}

function M.setup()
	for server_name, server_opts in pairs(M.servers) do
		if server_name ~= "sourcekit" then
			server_opts = vim.tbl_deep_extend("force", {}, server_opts)
			server_opts.capabilities =
				vim.tbl_deep_extend("force", {}, M.capabilities, server_opts.capabilities or {})
			local ok, err = pcall(function()
				require("lspconfig")[server_name].setup(server_opts)
			end)
			if not ok then
				vim.notify("LSP setup failed for " .. server_name .. ": " .. tostring(err), vim.log.levels.WARN)
			end
		end
	end

	local sk_opts = vim.tbl_deep_extend("force", M.servers.sourcekit or {}, {
		capabilities = M.capabilities,
	})
	local ok, err = pcall(function()
		require("lspconfig").sourcekit.setup(sk_opts)
	end)
	if not ok then
		vim.notify("sourcekit setup failed: " .. tostring(err), vim.log.levels.WARN)
	end
end

return M
