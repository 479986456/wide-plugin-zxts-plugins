<!--
 * @Descripttion: 泄密文件密级分布  
-->
<template>
  <div style="width: 450px; height: 200px">
    <div class="vis-pie" v-if="chartData && chartData.length > 0">
      <div class="split-line"></div>
      <div class="mask" @click="clickFunction"></div>
      <ringGraph
        tooltip_name="文件数量"
        outerRadius="78%"
        @legendClick="legendClick"
        :rightChartData="chartData"
        @click="clickFunction"
      />
    </div>
    <div v-else class="no-data_ringChart">暂无数据</div>
  </div>
</template>
<script>
import mixins from "../../mixins.js";
import ringGraph from "../common/ringGraph.vue";

// import { store, mutations } from "../../store.js";
export default {
  name: "confidentialDocumentLevel",
  components: { ringGraph },
  mixins: [mixins],
  data() {
    return {
      chartData: [],
      xmListData: [],
      _name: "",
      popTitle: "泄密文件",
    };
  },
  fdx: {
    states: {
      data01: "project.data01",
    },
  },
 
  created() {
    // this.chartData = this.data01.items;
    this.chartData = [];
    // setTimeout(() => {
    //   console.log('执行了');
    //   this.reName(0,'hhh')
    // }, 5000);
  },
  watch: {
    data01: {
      immediate:true,
      deep:true,
      handler (val) {
        this.chartData = this.data01.items;
      },
    },
  },
  methods: {
    legendClick(pra) {
      let data = this.chartData.find((item) => item.name === pra.name);
      this.popTitle = data.name;
      this.clickFunction({
        data: {
          // id: data.code,
          name: data.name,
          value: data.value,
        },
      });
    },
    clickFunction(row) {
      const params = {
        model: "mjfb",
        params: {
          "level":row.data.name
        },
      };
      // this.popTitle = row.name
      if (row && row.data && row.data.id)
        params.params.file_level = row.data.id;
      this.showPanel(params, row.value || row.data.value);
    },
    showPanel(params, value) {
      this.addMaskPanel({
        component: "bmDialog",
        title: "文件密级",
        param: {
          path: "../common/bmDialog", // 组件加载路径
        },
        width: "50%",
        height: "auto",
        requestParams: params,
      });
    },
  },
  // computed: {
  //   comps() {
  //     return store.compList;
  //   },
  //   tot(){
  //     return store.total
  //   }
  // },
};
</script>

<style lang="less" scoped>
.vis-pie {
  position: relative;
  width: 100%;
  height: 100%;
  .mask {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    z-index: 9;
    cursor: pointer;
  }
  .split-line {
    position: absolute;
    width: 98px;
    height: 1px;
    background: #979797;
    opacity: 0.2;
    left: 30%;
    top: calc(50% + 2px);
    transform: translate(-50%, -50%);
  }
}
.no-data_ringChart {
  width: 100%;
  height: 100%;
  background: url("./icon/nodata.png") 100% 100%;
  background-repeat: no-repeat;
  background-size: auto 80%;
  background-position: center center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgb(187, 188, 185);
}
</style>
