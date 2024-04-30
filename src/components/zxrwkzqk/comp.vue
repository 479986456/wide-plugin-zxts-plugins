<template>
  <div :key="componentKey" class="commontable">
    <div class="header">
      <div v-for="(item, index) in column" :key="index" class="head">
        {{ item }}
      </div>
    </div>
    <div :key="componentKey + '__'" class="outer">
      <vis-scroll-seamless :data="datas" :class-option="defaultOption">
        <div class="tablecontent">
          <div v-for="(item, index) in datas" :key="index" class="item">
            <div
              @click="clickHandler(item.name, item.id)"
              v-if="!isSonNode && item.name"
              :title="item.name"
              :class="['task_name', 'head']"
            >
              {{ item.name }}
            </div>
            <div
              v-if="!isSonNode && item.begin_time"
              :title="item.begin_time"
              :class="['start_time', 'head']"
            >
              {{ item.begin_time }}
            </div>
            <div
              v-if="item.end_time"
              :title="item.end_time"
              :class="['end_time', 'head']"
            >
              {{ item.end_time }}
            </div>
            <div
              v-if="item.event_num || item.event_num == 0"
              :title="item.event_num"
              :class="['task_num', 'head']"
            >
              {{ item.event_num }}
            </div>
            <div
              v-if="!isSonNode && item.status"
              :title="item.status"
              :style="getStatusStyle(item.status)"
              :class="['task_status', 'head']"
            >
              {{ item.status }}
            </div>

            <div
              v-if="isSonNode"
              :title="item.type"
              :class="['task_type', 'head']"
            >
              {{ item.type || " " }}
            </div>
            <div
              v-if="isSonNode && item.name"
              :title="item.name"
              :class="['task_title', 'head']"
            >
              {{ item.name }}
            </div>
            <div
              v-if="isSonNode && item.event_time"
              :title="item.event_time"
              :class="['task_time', 'head']"
            >
              {{ item.event_time }}
            </div>
          </div>
        </div>
      </vis-scroll-seamless>
    </div>
    <div class="bottom" v-if="isBottom" />
  </div>
</template>
<script>
export default {
  name: "zxrwkzqk",
  props: ["tableData", "isBottom"],
  data() {
    return {
      componentKey: 0,
      datas: [],
      column: [],
      column1: ["任务名称", "开始时间", "结束时间", "事件数量", "任务状态"],
      column2: ["事件类型", "事件名称", "事件发生时间"],
    };
  },
  fdx: {
    states: {
      isSonNode: "project.isSonNode",
      data03: "project.data03",
      currentIndex: "project.currentIndex",
      data03Z: "project.data03Z",
    },
    actions: {
      get03Dataz: "project.get03Dataz",
      get03Data: "project.get03Data",
    },
  },
  watch: {
    isSonNode: {
      immediate: true,
      handler(val) {
        this.datas = [];
        this.$nextTick(() => {
          if (val) {
            this.column = this.column2;
            this.get03Dataz().then((res) => {
              this.datas = res.items;
            });
          } else {
            this.column = this.column1;
            this.get03Data().then((res) => {
              this.datas = res.items;
            });
          }
        });
        this.componentKey++;
      },
    },
  },
  computed: {
    column() {
      return {};
    },
    defaultOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        showScrollBar: false, // 移入移出是否显示滚动条
      };
    },
    getStatusStyle() {
      return function (val) {
        return val == "进行中" ? "color: #ffb964" : "color: #ffffff";
      };
    },
  },
  methods: {
    clickHandler(name, id) {
      this.$fdx.project.setState("isSonNode", !this.isSonNode);
      this.$fdx.project.setState("currentIndex", name);
      this.$fdx.project.setState("taskId", id);
      this.get03Dataz().then((res) => {
        this.$fdx.project.setState("data03Z", res.items);
      });
    },
    calcHeadStyle(val, valcon) {
      const isqual =
        val.typestyle == val.namestyle && val.namestyle == val.valuestyle;
      return isqual ? "width: 33.3%" : `width:${val}px;`;
    },
  },
};
</script>
<style lang="less" scoped>
.commontable {
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  .bottom {
    width: 100%;
    height: 4px;
    background: rgba(28, 134, 207, 0.5);
    position: absolute;
  }

  .header {
    width: 100%;
    height: 44px;
    background: rgba(33, 67, 123, 0.52);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #3e88df; /* 设置绿色上边框 */

    .head {
      width: 380px;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #ffffff;
      font-weight: 400;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    .head:first-child {
      text-align: left;
      padding-left: 42px;
    }
  }

  .outer {
    height: calc(100% - 44px);
    overflow: hidden;
  }

  .tablecontent {
    font-size: 16px;

    .item {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .head {
        width: 380px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        font-weight: 400;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        height: 30px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        line-height: 30px;
        text-overflow: ellipsis;
      }
      .task_name {
        text-align: left;
        padding-left: 44px;
      }
      .task_name::before {
        content: "";
        position: absolute;
        left: 19px;
        top: 16px;
        width: 13px;
        height: 13px;
        background: url(../../assets/icon.png) no-repeat top center;
        background-size: 13px 13px;
        padding-right: 10px;
      }
      .task_type {
        text-align: left;
        padding-left: 44px;
      }

      // .type {
      //   text-align: center;
      // }

      // .name,
      // .value {
      //   padding-left: 23px;
      // }
    }

    .item:nth-child(even) {
      background: rgba(33, 67, 123, 0.52);
      border-left: 2px solid #419bf9;
    }
  }
}
</style>
