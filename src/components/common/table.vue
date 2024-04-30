<!--
 * @Descripttion: table公用组件
 * @version: 
 * @Author: taocy
 * @Date: 2022-01-07 14:00:56
 * @LastEditors: lixiufei lixiufei@qianxin.com
 * @LastEditTime: 2023-11-27 10:20:27
-->
<template>
  <div class="latest-alarm">
    <vui-table
      :columns="columns"
      :data="data"
      width="100%"
      class="init-table-alarm close-body"
    ></vui-table>
    <vui-table
      v-if="maxHeight"
      :columns="columns"
      :data="data"
      :max-height="scrollHeightVal"
      width="100%"
      :class="['init-table-alarm close-header',{'scrollbar':isScrollShow}]"
      @on-row-click="rowClick"
    ></vui-table>
    <vue-seamless-scroll v-else :data="data" :key="keys" class="table-roll-warp" :style="`height: ${heightVal}px;`" :class-option="classOption">
      <vui-table
        :columns="columns"
        :data="data"
        width="100%"
        @on-row-click="rowClick"
        class="init-table-alarm close-header"
      ></vui-table>
    </vue-seamless-scroll>

  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {vueSeamlessScroll},
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          title: '最近发生时间',
          key: 'age'
        }, {
          title: '告警类型',
          key: 'address'
        }, {
          title: '源IP',
          key: 'address'
        }, {
          title: '目的IP',
          key: 'address'
        }, {
          title: '告警级别',
          key: 'address'
        }, {
          title: '设备类型',
          key: 'address'
        }, {
          title: '设备责任人',
          key: 'address',
          render: (h, params) => {
            return h('div', [
              h('div', {
              }, params.row.address),
            ])
          }
        } 
      ]
    },
    data: {
      type: Array,
      default: () => []
    },
    heightVal: {
      type: Number,
      default: 185
    },
    scrollHeightVal: {
      type: Number,
      default: 320
    },
    maxHeight: {
      type: Boolean,
      default: false
    },
    isScrollShow:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      classOption: {
        step: 0.5
      },
      height: document.body.clientHeight,
      keys: 0,
      timer: null
    }
  },
  watch: {
    height: {
      handler(val) {
        if(val == 1080) {
          this.heightVal = 180
        } else {
          this.heightVal = 185
        }
      },
      deep: true,
      immediate: true
    },
    data: {
      handler(val) {
        if(val && val.length > 0) {
          // this.timer = setInterval(() => {
            ++this.keys
          // }, val.length * 1000 *1.3)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    rowClick(row){
      this.$emit("rowClick",row)
    }
  },
  created() {
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less">
.table-roll-warp{
  overflow: hidden;
}
.init-table-alarm{
  max-height: 520px;
  overflow: auto;
  .vui-table{
    background:transparent !important;
    border:transparent !important;
  }
  .vui-table__body{
    table{
      width: 100%!important;
    }
  }
  .vui-table__header{
    th{
      border-bottom: none!important;
      border-top: none!important;
      font-weight: normal !important;
      font-size: 16px !important;
      color: #fff !important;
    }
  }
  .vui-table__body{
    .vui-table-row:nth-child(2n-1){
      background: url(../../assets/self/table-tr-bg.png) no-repeat !important;
      background-size: 100%!important;
    }
    td{
      height: 46px!important;
      border-bottom: none !important;
      font-size: 14px !important;
      color: #fff !important;
    }
    td:first-child {
      padding: 0 0 0 10px !important;
    }
    td:last-child{
      padding: 0 10px 0 0 !important;
    }
  }
}
// 左侧文件列表样式
.init-table-alarm-file-left{
  .vui-table{
    background:transparent !important;
    border: none;
  }
  .vui-table.vui-table--1{
    border-right: none;
  }

  .vui-table.vui-table--1 .vui-table__header{
    border-bottom: 1px solid rgba(43, 90, 176, .5) !important;
  }

  .vui-table__body{
    table{
      width: 100%!important;
    }
  }
  .vui-table__header{
    th{
      border-bottom: none!important;
      border-top: none!important;
      font-weight: normal !important;
      font-size: 16px !important;
      color: #fff !important;
    }
  }
  .vui-table__body{
    .vui-table-row:nth-child(2n-1){
      // background: url(../../assets/self/table-tr-bg.png) no-repeat !important;
      // background-size: 150% 100% !important;
    }
    td{
      height: 46px!important;
      border-right: 1px solid rgba(43, 90, 176, .5) !important;
      font-size: 14px !important;
      color: #fff !important;
    }
    td:first-child {
      padding: 0 0 0 10px !important;
    }
    td:last-child{
      padding: 0 10px 0 0 !important;
      border-right: none !important;
    }
  }
}
// 右侧事件列表样式
.init-table-alarm-file-right{
  .vui-table{
    background:transparent !important;
    border: none;
  }
  
  .vui-table.vui-table--1{
    border-left: none;
  }

  .vui-table.vui-table--1 .vui-table__header{
    border-bottom: 1px solid rgba(43, 90, 176, .5) !important;
  }

  .vui-table__body{
    table{
      width: 100%!important;
    }
  }
  .vui-table__header{
    th{
      border-bottom: none!important;
      border-top: none!important;
      font-weight: normal !important;
      font-size: 16px !important;
      color: #fff !important;
    }
  }
  .vui-table__body{
    .vui-table-row:nth-child(2n-1){
      // background: url(../../assets/self/table-tr-bg.png) no-repeat !important;
      // background-size: 150% 100% !important;
    }
    td{
      height: 46px!important;
      border-left: 1px solid rgba(43, 90, 176, .5) !important;
      font-size: 14px !important;
      color: #fff !important;
    }
    td:first-child {
      padding: 0 0 0 10px !important;
    }
    td:last-child{
      padding: 0 10px 0 0 !important;
    }
  }
}
.close-body{
  .vui-table__body{
    display: none!important;
  }
  .vui-table__tip{
    display: none!important;
  }
}
.close-header{
  overflow-y: hidden;
  overflow-x: hidden;
  height: 320px !important;
  .vui-table__header{
    display: none!important;
  }
  .vui-table__no-data:before{
    display: none!important;
  }
}
.scrollbar{
  overflow-y: auto;
}
</style>