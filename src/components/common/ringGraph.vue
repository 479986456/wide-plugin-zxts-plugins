<template>
  <div class="graph-wrapper">
    <div ref="ringChart" class="ringChart"></div>
  </div>
</template>

<script>
import ringChartBg from "../../assets/documentPie.png";
import ringChartBg_1 from "../../assets/xmPie.png";
import legend0 from "../../assets/xmlegend/5.png";
import legend1 from "../../assets/xmlegend/4.png";
import legend2 from "../../assets/xmlegend/3.png";
import legend3 from "../../assets/xmlegend/2.png";
import legend4 from "../../assets/xmlegend/1.png";
import legend05 from "../../assets/xmlegend/5.png";
import legend6 from "../../assets/xmlegend/4.png";
const legendImgs = [
  legend0,
  legend1,
  legend2,
  legend3,
  legend4,
  legend05,
  legend6,
];
export default {
  name: "ringGraph",
  props: {
    rightChartData: {
      type: Object,
      default: {},
    },
    tooltip_name: {
      type: String,
      default: "事件数量",
    },
    outerRadius: {
      type: String,
      default: "69%",
    },
    _padding: {
      type: Array,
      default: [0, 0, 0, 0],
    },
  },
  data() {
    return {
      colorList: [
        "#FFAB5B",
        "#FFD300",
        "#2E6CE5",
        "#00CEFF",
        "#2CFFF3",
        "#FFAB5B",
        "#FFD300",
        "#2E6CE5",
        "#00CEFF",
        "#2CFFF3",
      ],
      chartData: [
        {
          name: "预警1",
          value: 20,
        },
        {
          name: "预警2",
          value: 30,
        },
        {
          name: "预警3",
          value: 40,
        },
      ],
      getName: [],
      getRate: [],
      chartDataList: [],
      options: {},
      totalNum: 0,
      instance: null,
    };
  },
  watch: {
    rightChartData: {
      immediate: true,
      handler(val) {
        this.chartData = val;
        this.totalNum = 0;
        this.getRate.length = 0;
        this.getName.length = 0;
        this.chartDataList.length = 0;

        for (let i = 0; i < this.chartData.length; i++) {
          this.totalNum += this.chartData[i].value;
        }
        for (let i = 0; i < this.chartData.length; i++) {
          // this.getRate.push(
          //   ((this.chartData[i].value / this.totalNum) * 100).toFixed(0)
          // );
          this.getName.push(this.chartData[i].name);
          this.chartDataList.push(
            {
              value: this.chartData[i].value,
              name: this.chartData[i].name,
              id: this.chartData[i].code,
              itemStyle: {
                normal: {
                  borderWidth: 4,
                  borderColor: this.colorList[i],
                },
              },
            }
            // {
            //   value: this.totalNum * 0.02,
            //   name: "环形间隔",
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: false,
            //       },
            //       labelLine: {
            //         show: false,
            //       },
            //       color: "rgba(0, 0, 0, 0)",
            //     },
            //   },
            // }
          );
          if (this.chartData[i].value > 0) {
            this.chartDataList.push({
              value: this.totalNum * 0.02,
              name: "环形间隔",
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            });
          }
        }
        this.instance && this.instance.clear();
        this.$nextTick(() => {
          this.paint(this.outerRadius, this._padding);
        });
      },
    },
  },
  methods: {
    paint(outerRadius = "69%", _padding = "[0,0,0,0]") {
      let seriesOption = [
        {
          name: "外圆",
          type: "pie",
          clockWise: true,
          radius: ["70%", outerRadius],
          center: ["30%", "50%"],
          hoverAnimation: true,
          label: {
            normal: {
              show: true,
              position: "center",
              formatter: () => {
                return "{value|总数" + "\n" + "} {total|" + this.totalNum + "}";
              },
              rich: {
                value: {
                  color: "#B7D5F8",
                  fontSize: 18,
                  lineHeight: 20,
                  fontFamily: "PingFangSC-Regular",
                },
                total: {
                  color: "#ffffff",
                  fontSize: 24,
                  lineHeight: 24,
                  padding: [0, 0, 20, 0],
                  fontFamily: "PingFangSC-Regular",
                },
              },
            },
          },
          itemStyle: {
            emphasis: {
              itemStyle: {
                color: "inherit",
              },
              scale:true,
              scaleSize: 8,
             
            },
          },
          data: this.chartDataList,
        },
      ];
      let legendData = [];
      for (var i = 0; i < this.getName.length; i++) {
        legendData.push({
          icon: "image://" + legendImgs[i] || legendImgs[0],
          name: this.getName[i],
        });
      }
      this.options = {
        backgroundColor: "transparent",
        color: this.colorList,
        graphic: {
          elements: [
            {
              name: "中间图片",
              type: "image",
              x: 0,
              y: 0,
              z: -1,
              style: {
                image: outerRadius == "69%" ? ringChartBg : ringChartBg_1, // 引入的图片
                width: 145,
                height: 145,
              },
              left: "14%",
              top: "center",
              position: [100, 100],
            },
          ],
        },
        tooltip: {
          show: true,
          // 鼠标经过饼图外圈的时候 取消显示提示框
          formatter: (params, a, b) => {
            // 返回name 换行 和value
            return `${params.data.name }<br> ${this.tooltip_name}:   ${params.data.value}`;
          },
          // trigger: "",
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          x: "52%",
          y: "center",
          // data: this.getName,
          // selectedMode: false,
          data: legendData,
          itemWidth: 12,
          itemHeight: 12,
          right: 340,
          bottom: 150,
          align: "left",
          itemGap: 10,
          // 使用echarts实现鼠标经过legend显示全称

          // tooltip: {
          //   show: true,
          //   trigger: "item",
          // },

          formatter: (name) => {
            // return "{title|" + name + "}{value|起}";
            for (var i = 0; i < this.getName.length; i++) {
              if (name == this.chartData[i].name) {
                // if (name.length > 5) {
                //   return (
                //     "{title|" +
                //     name.substring(0, 5) +
                //     "... " +
                //     "}{rate|" +
                //     "  " +
                //     this.chartData[i].value +
                //     "}"
                //   );
                // }
                return (
                  "{title|" + name + "}{rate|" + this.chartData[i].value + "}"
                );
              }
            }
          },

          textStyle: {
            rich: {
              title: {
                fontSize: 18,
                lineHeight: 24,
                width: 100,
                color: "#b7d5f8",
              },
              rate: {
                fontSize: 18,
                lineHeight: 24,
                color: "#ffffff",
                padding: _padding,
              },
            },
          },
        },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      };
      if (!this.instance && this.$refs.ringChart) {
        this.instance = this.WIDE_LIB.echarts.init(this.$refs.ringChart);
      }
      this.instance.setOption(this.options, true);
      this.instance.off("click");
      this.instance.on("click", (param, arg) => {
        this.$emit("click", param);
      });
      this.instance.off("legendselectchanged");
      this.instance.on("legendselectchanged", (params) => {
        this.$nextTick(() => {
          // 取消点击图例之后，饼图对应部分消失的效果
          this.instance.dispatchAction({
            type: "legendSelect",
            name: params.name,
          });

          this.$emit("legendClick", params);
        });
      });
      this.instance.on("mouseover", (e) => {
        // if (params.componentType == "trigger") {
        //   // 让tooltip隐藏
        //   var elementDiv = document.querySelector("#extension");
        //   elementDiv.style.cssText = "display:none";
        // }
        this.instance.dispatchAction({
          type: "highlight", //取消突出高亮显示;
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });
      this.instance.on("mouseout", (e) => {
        //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        // if (params.componentType == "trigger") {
        //   var elementDiv = document.querySelector("#extension");

        //   elementDiv.style.cssText = "display:none";
        // }
        this.instance.dispatchAction({
          type: "downplay", //突出高亮显示;
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.graph-wrapper {
  width: 100%;
  height: 100%;
  .ringChart {
    width: 100%;
    height: 100%;
  }
}
</style>
