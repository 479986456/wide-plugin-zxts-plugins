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
            @mouseover="toolTipOver($event, item.title)"
            @mouseout="toolTipOut"
          >
            <span>{{ item.deptName }}</span>
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
  created() {
    this.getData();
  },
  fdx: {
    states: {
      data04: "project.data04",
    },
  },
  watch: {
    data04: {
      handler: function () {
        this.getData();
      },
    },
  },
  methods: {
    clickEvent(item, values) {
      const params = {
        model: "bgjdw",
        params: {
          unit: item.name,
        },
      };
      this.showPanel(params, values);
    },
    showPanel(params, values) {
      this.addMaskPanel({
        component: "bmDialog",
        title: "攻击窃密事件 ",
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
        list: this.data04.items || [],
      };
      this.loaded = true;
      this.total = res.total || 0;
      let datas = res;
      this._name = datas.title;
      datas.list.forEach((it) => {
        it.title = it.name;
        it.deptName =
          it.name.length > 14 ? it.name.slice(0, 14) + "..." : it.name;
      });
      this.topFiveData = defaultValue.map((item, index) => {
        return datas.list[index] || item;
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
  margin-top: 22px;
  padding-left: 22px;
  .attacked-unit-top5-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-top: 7px;
    padding: 0 22px 0 17px;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    background: rgba(0, 53, 138, 0.36);
    border: 1px solid rgba(75, 211, 253, 0.24);
    border-left: 2px solid rgba(75, 211, 253);
  }

  .attacked-unit-top5-item::before,
  .attacked-unit-top5-item::after {
    content: "";
    position: absolute;
    width: 1px; /* 点的宽度，可以根据需要调整 */
    height: 1px; /* 点的高度，可以根据需要调整 */
    background-color: rgba(75, 211, 253); /* 点的颜色，可以根据需要调整 */
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
      font-weight: 600;
      margin-right: 16px;
      color: #3dffe7;
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