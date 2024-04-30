<!--
 * @Descripttion: 涉密人员岗位分布
-->
<template>
  <div ref="container" style="width: 450px; height: 250px">
    <lc-rose
      v-if="chartData.length > 0"
      type="basicRose"
      :data="chartData"
      :encode="encode_0"
      :mIdOption="mIdOption_0"
      renderer="svg"
      @click="clickEvent"
      :beforeRender="beforeRender"
      style="width: 100%; height: 100%"
    />
    <div v-else class="nodata"></div>
  </div>
</template>
<script>
import mixins from "../../mixins.js";
import legend_1 from "../../assets/charts/rose-legend-1.png";
import legend_2 from "../../assets/charts/rose-legend-2.png";
import legend_3 from "../../assets/charts/rose-legend-3.png";
import legend_4 from "../../assets/charts/rose-legend-4.png";
import legend_5 from "../../assets/charts/rose-legend-5.png";
import legend_6 from "../../assets/charts/rose-legend-6.png";

const legendImgs = [legend_1, legend_2, legend_3, legend_4, legend_5, legend_6];

export default {
  name: "confidentPersonnelDistribution",
  mixins: [mixins],
  data() {
    const _self = this;
    // 富化值展示形式
    const customValues = new Array(6)
      .fill()
      .map((item, index) => ({
        name: `customValue_${index + 1}`,
        width: 92,
        height: 8,
        lineHeight: 25,
        backgroundColor: {
          image: legendImgs[index],
        },
        padding: [0, -16, 0, 0],
        fontFamily: "PingFangSC-Regular",
        fontSize: 18,
        align: "right",
      }))
      .reduce((acc, curr) => {
        acc[curr.name] = curr;
        return acc;
      }, {});

    // 富化名称展示形式
    const customName = {
      width: 86,
      height: 25,
      lineHeight: 25,
      fontFamily: "PingFangSC-Regular",
      fontSize: 18,
      color: "#B7D5F8",
    };
    // 动态计算宽高
    this.$refs.container;

    return {
      listData: [],
      encode_0: {
        name: "name",
        value: "value",
        code: "code",
      },
      chartData: [],
      mIdOption_0: {
        tooltip: {
          show: true,
          fontFamily: "VUI-LCD",
          formatter: (params, a, b) => {
            // 返回name 换行 和value
            return `${params.data.name}<br>事件数量:  ${params.data.value}`;
          },
          fontSize: 18,
          color: "#D3D3D3",
          nameFormat: "none",
          valueFormat: "none",
          textStyle: {
            fontFamily: "Microsoft YaHei",
            fontSize: 12,
            color: "#D3D3D3",
          },
          borderColor: "#333333",
          borderWidth: 1,
          backgroundColor: "#323232",
        },
        legend: {
          show: true,
          fontFamily: "VUI-LCD",
          fontSize: 18,
          color: "#D3D3D3",
          top: "center",
          right: 10,
          orient: "vertical",
          itemGap: 8,
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          textStyle: {
            rich: {
              ...customValues,
              customName,
            },
          },
          formatter: function (name) {
            const data = _self.chartData.find((item) => item.name === name);
            return (
              `{customName|${name}}` +
              `{customValue_${data.sort}|${data.value}}`
            );
          },
          name: false,
          value: false,
          percent: false,
          pageTextStyle: {
            fontFamily: "Microsoft YaHei",
            color: "#999999",
            fontSize: 12,
          },
          pageIconSize: 12,
          pageIconColor: "#FFFFFF",
          pageIconInactiveColor: "#9BA2B0",
          pageIcons: {
            horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
            vertical: ["M0,0L10,0L5,-6z", "M0,0L10,0L5,6z"],
          },
          type: "plain",
        },
        centerTitle: {
          show: false,
          name: {
            text: "总量",
            textStyle: {
              color: "#fff",
              fontSize: 18,
              fontFamily: "Microsoft YaHei",
            },
          },
          value: {
            textStyle: {
              color: "#fff",
              fontSize: 18,
              fontFamily: "Microsoft YaHei",
            },
            format: "none",
          },
        },
        angle: [0, 360],
        seriesStyle: {
          orderBy: "asc",
          emphasis: {
            itemStyle: {
              color: "inherit",
            },
            scale: true,
            scaleSize: 8,
          },
          decorate: {
            show: true,
            size: 6,
          },
          label: {
            show: false,
            position: "outside",
            name: {
              show: true,
              textStyle: {
                fontSize: 12,
                fontFamily: "Microsoft YaHei",
                color: "auto",
              },
            },
            value: {
              show: false,
              textStyle: {
                fontSize: 14,
                fontFamily: "Microsoft YaHei",
                color: "auto",
              },
            },
            percent: {
              show: false,
              format: "percent",
              textStyle: {
                fontSize: 14,
                fontFamily: "Microsoft YaHei",
                color: "auto",
              },
            },
          },
          radius: ["16%", "80%"],
          center: ["40%", "50%"],
          labelLine: {
            length: 25,
            length2: 20,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.2)",
            },
          },
          angle: [180, 360],
          background: "style2",
          // "backLayerColor": "#00daea"
        },
        color: [
          "rgba(255, 144, 99, 0.6)",
          "rgba(255, 241, 100, 0.6)",
          "rgba(37, 255, 233, 0.6)",
          "rgba(76, 214, 255, 0.6)",
          "rgba(0, 160, 240, 0.6)",
          "rgba(53, 123, 238, 0.6)",
        ],
        graphic: [
          {
            type: "sector",
            shape: {
              cx: 179, // _self.$refs.container.offsetWidth * 0.4(需要动态计算)
              cy: 116.5, //_self.$refs.container.offsetWidth * 0.5,
              r: 100,
              startAngle: Math.PI / 2,
              endAngle: -Math.PI / 2,
            },
            style: {
              fill: "rgba(204,204,204,0.1)",
            },
          },
        ],
      },
      popTitle: "涉密人员",
      // stotre: store,
    };
  },
  fdx: {
    states: {
      data05: "project.data05",
    },
  },
  watch: {
    data05: {
      handler(val) {
        this.getData();
      },
    },
  },
  created() {
    this.getData();
    // this.addComp({
    //   name: 'this._name',
    // });
    // this.setCompTotal(this.compTotal + 1);
  },
  methods: {
    // addComp: mutations.addComp,
    // setCompName: mutations.setCompName,
    // setCompTotal: mutations.setCompTotal,
    beforeRender(options, dv, echarts, instance) {
      instance.off("legendselectchanged");
      instance.on("legendselectchanged", (params) => {
        this.$nextTick(() => {
          // 取消点击图例之后，饼图对应部分消失的效果
          instance.dispatchAction({
            type: "legendSelect",
            name: params.name,
          });
          let res = this.chartData.find((item) => item.name === params.name);
          this.clickEvent("", {
            name: params.name,
            stage: res.stage,
            value: res.value,
          });
        });
      });
    },
    getData() {
      let datas = {
        title: "在岗在职/离岗离职/上岗入职",
        list: this.data05.items || [],
      };
      datas.list.forEach((it, index) => {
        it.code = index;
      });
      if (datas.list && Array.isArray(datas.list) && datas.list.length === 0) {
        this.chartData = [];
      } else {
        this.chartData = datas.list
          .sort((curr, next) => next.value - curr.value)
          .map((item, index) => {
            // 图例颜色映射计算（因要保证玫瑰图从下到上颜色依次为橘、黄、绿、浅蓝...）
            const firstIndex = datas.list.findIndex(
              (_item) => _item.value === item.value
            );
            const lastIndex = datas.list
              .map((_item) => _item.value)
              .lastIndexOf(item.value);
            const reverse = new Array(lastIndex - firstIndex + 1)
              .fill(0)
              .map((item, index) => firstIndex + index)
              .reverse();
            item.sort =
              legendImgs.length -
              (datas.list.length - 1 - reverse[index - firstIndex]);
            return item;
          });
      }
    },
    clickEvent(arg, row) {
      this.popTitle = row.name;
      const params = {
        model: "lxfb",
        params:{
          cause: this.popTitle,
        }
      };
      this.showPanel(params, row.value || 0);
    },
    showPanel(params, value) {
      this.addMaskPanel({
        component: "bmDialog",
        title: "涉密网事件",
        param: {
          path: "../common/bmDialog", // 组件加载路径
        },
        width: "60%",
        height: "auto",
        requestParams: params,
      });
    },
  },
};
</script>
<style scoped>
.nodata {
  width: 100%;
  height: 100%;
  background: url("../../assets/nodata1.png");
  background-position: center;
  background-repeat: no-repeat;
}
</style>