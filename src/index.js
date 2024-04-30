/**
 * 插件入口文件
 */
import maskPanel from './components/common/maskPanel.vue';
import './style/common.less';

import { ajax } from './api/baseUrl.js';
window.Vue && (window.Vue.prototype.$ajax = ajax);


import wjmjfb from './components/wjmjfb/index.js'

import dwxmqk from './components/dwxmqk/index.js'

import ztwj from './components/ztwj/index.js'
import smwjgsjlxfb from './components/smwjgsjlxfb/index.js'
import overView from './components/overView/index.js'
import zxrwkzqk from './components/zxrwkzqk/index.js'
import total from './components/total/index.js'

import PopupPlugin from "@vislab/fmap3d-popup-vue-plugin";
import "@vislab/fmap3d-popup-vue-plugin/dist/fmap3d-popup-vue-plugin.min.css";
window.Vue && window.Vue.use(PopupPlugin)
export default {
  install(sdk) {
    sdk.registerWidgets({     // 注册插件
      label: '示例插件',       // 插件列表左侧tab名称
      children: [
        wjmjfb, dwxmqk, ztwj, smwjgsjlxfb, overView, zxrwkzqk, total
      ]
    })
  }
}

window.dynamicCompList = []

window.Vue && window.Vue.component('hd-maskPanel', maskPanel);
dynamicCompList.push({ compName: 'hd-maskPanel', name: 'hd-maskPanel' });