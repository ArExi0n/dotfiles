require("ArExi0n.set")
require("ArExi0n.remap")
require("ArExi0n.autocmds")
require("ArExi0n.packer")

vim.schedule(function()
  require("ArExi0n.theme").setup({ default = "koda" })
end)
