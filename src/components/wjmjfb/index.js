import comp from './comp.vue'

const compConfig = {
  name: 'wjmjfb',        // 插件注册名称 必须英文 不能以数字开头
  component: comp,      // 插件组件
  thumbnail: {          // 插件缩略图
    type: 'text',
    value: '文件密级分布'
  },
  config: {             // 插件表单配置
   
    props: {                   // 属性表单
    },
    events: {}                  // 事件表单
  }
}

export default compConfig