const config = require('../cli/config')

window.onload = () => {
  const a = document.createElement('a')
  const port = location.port
  const queryString = `wide_plugin_id=${config.pluginId}&wide_port=${port}`
  const href = `${config.debugUrl}?${queryString}`
  a.href = href
  setTimeout(() => {
    a.click()
  }, 1000)
}