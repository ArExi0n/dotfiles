local M = {}

local function get_available_simulators()
  local handle = io.popen("xcrun simctl list devices available --json 2>/dev/null")
  if not handle then return {} end
  local result = handle:read("*a")
  handle:close()
  local ok, data = pcall(vim.json.decode, result)
  if not ok or not data or not data.devices then return {} end
  local devices = {}
  for runtime, list in pairs(data.devices) do
    for _, device in ipairs(list) do
      if device.isAvailable then
        local major, minor = runtime:match("iOS%-(%d+)%-(%d+)")
        local os_ver = major and (major .. "." .. minor) or ""
        table.insert(devices, {
          id = device.udid,
          name = device.name,
          os = os_ver,
          runtime = runtime,
        })
      end
    end
  end
  return devices
end

function M.auto_select_device()
  local config = require("xcodebuild.project.config")
  local devices = get_available_simulators()
  if #devices == 0 then
    vim.notify("No available simulators found", vim.log.levels.WARN)
    return
  end
  local current_name = config.settings.deviceName
  if current_name then
    for _, d in ipairs(devices) do
      if d.name == current_name then
        vim.notify("Device already selected: " .. d.name)
        return
      end
    end
  end
  config.set_destination({
    id = devices[1].id,
    platform = "iOS Simulator",
    name = devices[1].name,
    os = devices[1].os,
  })
  vim.notify("Selected device: " .. devices[1].name)
end

function M.cleanup_simulators()
  local handle = io.popen("xcrun simctl delete unavailable 2>&1")
  if handle then
    handle:read("*a")
    handle:close()
  end
  local rh = io.popen("xcrun simctl list runtimes --json 2>/dev/null")
  if not rh then return end
  local result = rh:read("*a")
  rh:close()
  local ok, data = pcall(vim.json.decode, result)
  if not ok or not data or not data.runtimes then return end
  local to_delete = {}
  for _, rt in ipairs(data.runtimes) do
    if rt.isAvailable and rt.platform == "iOS" then
      local major = tonumber(rt.version:match("^(%d+)")) or 0
      if major < 17 and major > 0 then
        table.insert(to_delete, rt)
      end
    end
  end
  if #to_delete == 0 then
    vim.notify("No old simulator runtimes to clean up")
    return
  end
  local names = vim.tbl_map(function(rt) return rt.name end, to_delete)
  local msg = "Delete " .. #to_delete .. " old simulator runtime(s) to free space?\n" .. table.concat(names, "\n")
  vim.ui.select({ "Yes, delete them", "Cancel" }, {
    prompt = msg,
  }, function(choice)
    if not choice or choice ~= "Yes, delete them" then
      vim.notify("Cleanup cancelled")
      return
    end
    for _, rt in ipairs(to_delete) do
      pcall(function()
        vim.fn.system({ "xcrun", "simctl", "runtime", "delete", rt.identifier })
        vim.notify("Deleted: " .. (rt.name or rt.identifier))
      end)
    end
    vim.notify("Simulator cleanup complete")
  end)
end

return M
