_G.dd = function(...)
  vim.print(...)
end

require("ArExi0n")

vim.api.nvim_create_autocmd("UIEnter", {
  once = true,
  callback = function()
    vim.opt.cursorline = false
    vim.opt.cursorcolumn = false
  end,
})
