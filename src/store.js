import vue from 'vue'
export const store = vue.observable({
  compList: [
    {
      name: 'dwxmqk',
      thumbnail: {
        type: 'text',
        value: "单位泄密情况"
      }
    },
    {
      name: 'smwjgsjlxfb',
      thumbnail: {
        type: 'text',
        value: "涉密网监管事件类型分布"
      }
    },
    {
      name: 'wjmjfb',
      thumbnail: {
        type: 'text',
        value: "文件密级分布"
      }
    }
  ],
  total: 3
})

export const mutations = {
  addComp(comp) {
    store.compList.push(comp)
  },
  setCompName(index, name) {
    store.compList[index].name = name
  },
  setCompTotal(total) {
    store.total = total
  }
}

// 导出 store 和 mutations
export default {
  store,
  mutations
}