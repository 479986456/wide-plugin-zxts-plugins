import comp from './comp.vue'

const compConfig = {
  name: 'zxrwkzqk',
  component: comp,
  thumbnail: {
    type: 'text',
    value: "专项任务开展情况"
  },
  config: {
    basic: {

    },
    props: {
      tableData: {
        label: "数据",
        type: ['object'],
        default: {
          headers: ["告警事件类型", "事件总数", "未处置"],
          data: [
            ["市级告警事件", "0", "0"],
            ["区县告警事件", "0", "0"],
          ],
        },
      },
      isBottom: {
        label: "是否底部",
        type: "boolean",
        default: false,
      }
    },
    events: {

    }
  }
}

export default compConfig