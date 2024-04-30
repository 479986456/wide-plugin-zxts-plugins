<!--
 * @Descripttion: 单位泄密情况TOP5
  name: "nrxmAttackedUnitTop5",

-->
<template>
  <div class="container">
    <div
      class="container-item"
      v-for="item in datas"
      :key="item"
      :style="item.style"
      @click="clickEvent(item)"
    >
      <div class="total">{{ item.value }}</div>
      <div class="bot">
        <div class="icon">
          <img :src="item.icon" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../../mixins.js";
import icon1 from "../../assets/下载.png";
import icon2 from "../../assets/违规外联备份.png";
import icon3 from "../../assets/下载 (1).png";
import icon4 from "../../assets/Icon-电磁空间事件.png";
import bg1 from "../../assets/1.png";
import bg2 from "../../assets/2.png";
import bg3 from "../../assets/3.png";
import bg4 from "../../assets/4.png";
export default {
  name: "dwxmqk111",
  mixins: [mixins],
  data() {
    return {
      icon1,
      icon2,
      icon3,
      icon4,
      bg1,
      bg2,
      bg3,
      bg4,
      datas: [
        {
          name: "涉密网事件",
          value: "0",
          icon: icon1,
          style: {
            color: "#fd7d7d",
            background: `url(${bg1}) no-repeat top center`,
          },
        },
        {
          name: "泄密事件",
          value: "0",
          icon: icon2,
          style: {
            color: "#90ff7c",
            background: `url(${bg2}) no-repeat top center`,
          },
        },
        {
          name: "窃密事件",
          value: "0",
          icon: icon3,
          style: {
            color: "#ebe081",
            background: `url(${bg3}) no-repeat top center`,
          },
        },
        {
          name: "电磁空间事件",
          value: "0",
          icon: icon4,
          style: {
            color: "#ebb28a",
            background: `url(${bg4}) no-repeat top center`,
          },
        },
      ],
    };
  },
  fdx: {
    states: {
      smxx: "project.smxx",
      smw: "project.smw",
      gjqm: "project.gjqm",
      dc: "project.dc",
      cause: "project.cause",
      level: "project.level",
      theme: "project.theme",
      unit: "project.unit",
    },
  },
  watch: {
    smxx: {
      immediate:true,
      handler: function (val) {
        this.datas[0]['value'] = (val && val.total) || 0;
      },
    },

    smw: {
      immediate:true,
      handler: function (val) {
        this.datas[1]['value'] = (val && val.total) || 0;
      },
    },
    gjqm: {
      immediate:true,
      handler: function (val) {
        this.datas[2]['value'] = (val && val.total) || 0;
      },
    },
    dc: {
      immediate:true,
      handler: function (val) {
        this.datas[3]['value'] = (val && val.total) || 0;
      },
    },
  },
  created() {},
  methods: {
    clickEvent(item, values) {
      let mod = ''
      let title = ''
      switch(item.name){
        case '涉密网事件':
          mod = 'smxx'
          title = '涉密网事件'
          this.$fdx.project.setState("cause",' ')
          break;
        case '泄密事件':
          mod = 'smw'
          title = '泄密事件'
          this.$fdx.project.setState("level",' ')
          this.$fdx.project.setState("theme",' ')

          break;
        case '窃密事件':
          mod = 'gjqm'
          title = '攻击窃密事件'
          this.$fdx.project.setState("unit",' ')

          break;
        case '电磁空间事件':
          mod = 'dc'
          title = '电磁监管事件'
          break;
      }
      const params = {
        model: mod,
        name: title,
        params: {
          department_id: item.code,
          dept_id: item.code,
          type: "department",
        },
      };
      this.showPanel(params, values);
    },
    showPanel(params, values) {
      this.addMaskPanel({
        component: "bmDialog",
        title: params.name,
        param: {
          path: "../common/bmDialog", // 组件加载路径
        },
        width: "50%",
        height: "auto",
        requestParams: params,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 1030px;
  height: 91px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &-item {
    width: 244px;
    height: 91px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .total {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      letter-spacing: 0;
      font-weight: 500;
    }
    .bot {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .name {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
      }
      .icon {
        width: 18px;
        height: 22px;
        margin-right: 10px;
        img {
          width: 18px;
          height: 22px;
        }
      }
    }
  }
}
</style>
