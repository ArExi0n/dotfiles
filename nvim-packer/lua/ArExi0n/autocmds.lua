vim.o.autoread = true
vim.api.nvim_create_autocmd({ "FocusGained", "BufEnter", "CursorHold", "CursorHoldI" }, {
  callback = function()
    vim.cmd("checktime")
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = {
    "rust", "python", "py", "c", "cpp", "h", "hpp",
    "swift", "kotlin", "java", "zig",
  },
  callback = function()
    vim.bo.tabstop = 4
    vim.bo.softtabstop = 4
    vim.bo.shiftwidth = 4
    vim.bo.expandtab = true
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = { "go" },
  callback = function()
    vim.bo.tabstop = 4
    vim.bo.shiftwidth = 4
    vim.bo.softtabstop = 4
    vim.bo.expandtab = false
  end,
})

vim.api.nvim_create_autocmd("InsertLeave", {
  callback = function()
    local ok, api = pcall(require, "supermaven-nvim.api")
    if ok then api.clear_suggestion() end
  end,
})

require("ArExi0n.diag-blob").setup()

vim.api.nvim_create_autocmd("FileType", {
  pattern = { "yaml", "yml", "typst" },
  callback = function()
    vim.bo.tabstop = 2
    vim.bo.softtabstop = 2
    vim.bo.shiftwidth = 2
    vim.bo.expandtab = true
  end,
})
