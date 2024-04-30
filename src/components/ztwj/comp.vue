<!--
 * @Descripttion: 单位泄密情况TOP5
  name: "nrxmAttackedUnitTop5",

-->
<template>
  <div style="width: 450px; height: 200px">
    <div class="attacked-unit-top5">
      <div
        v-for="(item, index) in topFiveData"
        :key="item.deptId"
        class="attacked-unit-top5-item"
      >
        <div class="item-name">
          <div class="index">{{ index + 1 }}</div>
          <div
            class="name"
            @mouseover="toolTipOver($event, item.name)"
            @mouseout="toolTipOut"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div @click="clickEvent(item, item.value)" class="item-value">
          {{ item.value && Number(item.value).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../../mixins.js";
export default {
  name: "dwxmqk111",
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
      data02: "project.data02",
    },
  },
  watch: {
    data02: {
      handler: function () {
        this.getData();
      },
    },
  },
  methods: {
    clickEvent(item, values) {
      const params = {
        model: "ztwj",
        params: {
          theme: item.name,
        },
      };
      this.showPanel(params, values);
    },
    showPanel(params, values) {
      this.addMaskPanel({
        component: "bmDialog",
        title: "文件密级 ",
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
.attacked-unit-top5 {
  .attacked-unit-top5-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    margin-top: 7px;
    padding: 0 22px 0 17px;
    font-size: 18px;
    font-weight: 400;
    color: #fff;

    margin-bottom: 15px;
    background: url(../../assets/编组39备份.png) no-repeat top center;
    padding-left: 76px;
    padding-top: 5px;
  }

  .attacked-unit-top5-item::before {
    top: 0;
    right: 0;
  }
  .attacked-unit-top5-item::after {
    bottom: 0;
    right: 0;
  }

  .item-name {
    flex: 1;
    width: 100%;
    display: flex;
    .index {
      font-weight: 400;
      margin-right: 16px;
      color: #f5e964;
    }
    .name {
      flex: 1;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .item-value {
    cursor: pointer;
  }
}
</style>
<style lang="less">
.tooltip-style {
  position: absolute;
  z-index: 15;

  padding: 0 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 417px;
  height: auto;
  min-height: 55px;

  font-family: MicrosoftYaHei;
  font-size: 24px;
  color: #ffffff;
  background-color: rgba(17, 17, 17, 0.9);
  border-radius: 10px;
  border: 2px solid rgb(28, 101, 143);
  box-sizing: border-box;

  word-wrap: break-word;
  word-break: break-all;
}
</style>