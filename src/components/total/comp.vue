<!--
 * @Descripttion: 单位泄密情况TOP5
  name: "nrxmAttackedUnitTop5",

-->
<template>
  <div ref="itemsss" class="custom-container">
    <!-- 你的 html 片段 -->

    <div v-if="!isSonNode" @click="clickHandler(0)" class="left">
      保障任务总量 <span>{{ overviewData.total || 0 }}</span>
    </div>
    <div v-if="isSonNode" class="center">{{ currentIndex || " " }}</div>
    <div v-if="!isSonNode" @click="clickHandler(1)" class="right">
      正在进行任务<span>{{ overviewData.running || 0 }}</span>
    </div>
  </div>
</template>

<script>
import mixins from "../../mixins.js";
export default {
  name: "total",
  mixins: [mixins],
  data() {
    return {
      scrollAnimation: true,
      loaded: false,
      topFiveData: [],
      _name: "",
    };
  },
  created() {},
  fdx: {
    states: {
      isSonNode: "project.isSonNode",
      overviewData: "project.overviewData",
      currentIndex: "project.currentIndex",
      isTotal: "project.isTotal",
    },
  },
  watch: {
    isSonNode: {
      handler(val) {
        let item = this.$refs.itemsss;
        this.$nextTick().then(() => {
          if (val) {
            item.style.justifyContent = "center";
          } else {
            item.style.justifyContent = "space-between";
          }
        });
      },
    },
  },
  methods: {
    clickHandler(index) {
      this.$fdx.project.setState("isTotal", index);
      let title = index == 0 ? "任务总量" : "正在进行任务";
      this.clickEvent(index,title);
    },
    clickEvent(index, values) {
      const params = {
        model: "total",
        params: {
          status: index,
        },
      };
      this.showPanel(params, values);
    },
    showPanel(params, values) {
      this.addMaskPanel({
        component: "bmDialog",
        title: values ,
        param: {
          path: "../common/bmDialog", // 组件加载路径
        },
        width: "50%",
        height: "auto",
        requestParams: params,
      });
    },
    getData() {
      // 确保空数据时，正常渲染
      const defaultValue = new Array(5).fill({});
      const params = {};
      let res = {
        title: "单位泄密文件",
        list: [
          {
            category: null,
            code: "64bfb0fae4b0debb05e1efec",
            lat: "40.05484",
            lng: "116.27009",
            name: "告警权限测试单位",
            offline: 0,
            online: 0,
            stage: null,
            total: 0,
            type: null,
            value: 5,
            title: "告警权限测试单位",
            deptName: "告警权限测试单位",
          },
          {
            category: null,
            code: "65728476e4b05dbc2b21728c",
            lat: "22",
            lng: "111",
            name: "wwh-up-222",
            offline: 0,
            online: 0,
            stage: null,
            total: 0,
            type: null,
            value: 1,
            title: "wwh-up-222",
            deptName: "wwh-up-222",
          },
        ],
      };
      this.loaded = true;
      this.total = res.total || 0;
      let datas = this.data02;
      this._name = "主体文件TOP5";
      datas.forEach((it) => {
        it.title = it.name;
        it.deptName =
          it.name.length > 14 ? it.name.slice(0, 14) + "..." : it.name;
      });
      this.topFiveData = defaultValue.map((item, index) => {
        return datas[index] || item;
      });
      this.loaded = false;
    },
    toolTipOver(e, title) {
      const showText = title || e.target.innerText;
      if (!showText) return;
      this.scrollAnimation = false;
      this.$nextTick(() => {
        let toolTip = document.createElement("div");
        toolTip.className = "toolTipWrapper";
        const body = document.querySelector("body");
        toolTip.innerHTML = `<div class='tooltip-style'>${showText}</div>`;
        if (body.append) {
          body.append(toolTip);
        } else {
          body.appendChild(toolTip);
        }
        let widths =
          document.getElementsByClassName("tooltip-style")[0].offsetWidth;
        let changeNum = e.x + widths - 1920;
        if (changeNum > 0) {
          document.getElementsByClassName("tooltip-style")[0].style.left =
            e.x - changeNum + "px";
        } else
          document.getElementsByClassName("tooltip-style")[0].style.left =
            e.x + 10 + "px";

        document.getElementsByClassName("tooltip-style")[0].style.top =
          e.y + 10 + "px";
      });
    },
    toolTipOut(e) {
      this.scrollAnimation = true;
      document.getElementsByClassName("toolTipWrapper")[0] &&
        document.getElementsByClassName("toolTipWrapper")[0].remove();
    },
  },
};
</script>
<style lang="less" scoped>
.custom-container {
  width: 994px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #ffffff;
  font-weight: 400;
  span {
    color: #ffe000;
    margin-left: 10px;
  }
  .left {
    width: 285px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    background:  url(../../assets/左统计备份2.png) top center no-repeat;
    cursor: pointer;
  }
  .center {
    width: 325px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    background: url(../../assets/编组33备份.png) top center no-repeat;
    margin: 0 45px;
    cursor: pointer;
  }
  .right {
    width: 285px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    background:  url(../../assets/左统计备份3.png) top center no-repeat;
    cursor: pointer;
  }
}
</style>