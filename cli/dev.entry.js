/**
 * development 模式下的入口文件
 */
import { pluginId } from '../wide.config.json'
import plugin from '../src/index.js'

window.WIDE && window.WIDE.use(plugin, {
  pluginId
})

if (module.hot) {
  module.hot.accept()
}
