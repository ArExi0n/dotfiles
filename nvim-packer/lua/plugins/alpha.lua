return {
  {
    "goolord/alpha-nvim",
    config = function()
      local alpha = require("alpha")
      local dashboard = require("alpha.themes.dashboard")

      local function footer()
        return "graphify"
      end

      dashboard.section.header.val = {
        "                                                     ",
        "  ███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗ ",
        "  ████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║ ",
        "  ██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║ ",
        "  ██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║ ",
        "  ██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║ ",
        "  ╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝ ",
        "                                                     ",
      }

      dashboard.section.buttons.val = {
        dashboard.button("e", " New file", ":ene <BAR> startinsert<CR>"),
        dashboard.button(";f", " Find file", ":Telescope find_files<CR>"),
        dashboard.button(";r", " Live grep", ":Telescope live_grep<CR>"),
        dashboard.button("\\\\", " Buffers", ":Telescope buffers<CR>"),
        dashboard.button(";c", " LazyGit", ":LazyGit<CR>"),
        dashboard.button("q", " Quit", ":qa<CR>"),
      }

      dashboard.section.footer.val = footer()
      dashboard.section.footer.highlight = "AlphaFooter"

      dashboard.section.header.opts.hl = "AlphaHeader"
      dashboard.section.buttons.opts.hl = "AlphaButtons"
      dashboard.section.footer.opts.hl = "AlphaFooter"

      alpha.setup(dashboard.opts)
    end,
  },
}
