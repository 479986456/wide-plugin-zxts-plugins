<template>
  <div :key="keyVal" class="bm-dialog-body">
    <vui-loading
      class="vloading"
      ref="showloading"
      :overlap="false"
      :show="!loadFinshed"
    ></vui-loading>
    <div class="tit-con">
      <div>
        <vui-table
          v-if="loadFinshed"
          :columns="fileColumns"
          :data="tableData"
          width="100%"
          class="init-table-alarm-file-left"
          @on-row-click="clickEvent"
        ></vui-table>
      </div>
      <!-- <vui-pagination
        v-if="loadFinshed"
        :total="total"
        ref="pagination"
        @on-change-page="changePage"
      ></vui-pagination> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileColumns: [],
      columns: [],
      total: 100,
      loading: false,
      loadFinshed: false,
      datas: [],
      keyVal: 0,
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  fdx: {
    states: {
      smxx: "project.smxx",
      smw: "project.smw",
      gjqm: "project.gjqm",
      dc: "project.dc",
    },
  },
  methods: {
    changePage(page) {
      console.log(page, "0000000000000000000000");
      // this.getData(page);
    },
    trStyles(index) {
      // 文件列表样式
      return {
        height: this.tableData[index].event_list.length * (34 + 12) + "px",
      };
    },
    getData(page = 1) {
      let model = this.data.model;
      const params = this.data.params;
      const data = {
        // page: page,
        // pageSize: 10,
        ...params,
      };
      switch (model) {
        case "total":
          this.getFileLevelList(data);
          break;
        case "smxx":
          this.getSmxxList(data);
          break;
        case "smw":
          this.getSmwList(data);
          break;
        case "gjqm":
          this.getGjqmList(data);
          break;
        case "dc":
          this.getDcList(data);
          break;
        case "lxfb":
          this.getLxfbList(data);
          break;
        case "mjfb":
          this.getMjfbList(data);
          break;

        case "ztwj":
          this.getZtwjList(data);
          break;
        case "bgjdw":
          this.getBgjdwList(data);
          break;
        default:
          break;
      }
    },
    getZtwjList(data) {
      this.smxxHandler(data);
    },
    getMjfbList(data) {
      this.smxxHandler(data);
    },
    getLxfbList(data) {
      this.smwHandler(data);
    },
    getSmwList(data) {
      this.smwHandler(data);
    },
    getBgjdwList(data) {
      this.gjqmHandler(data);
    },
    getGjqmList(data) {
      this.gjqmHandler(data);
    },
    getDcList(data) {
      this.fileColumns = [
        {
          title: "序号",
          key: "index",
        },
        {
          title: "时间",
          key: "time",
          ellipsis: true,
        },
        {
          title: "告警地点",
          key: "place",
          ellipsis: true,
        },
        {
          title: "事件类型",
          key: "type",
          ellipsis: true,
        },
      ];
      let list = [];
      if (this.dc) {
        list = (this.dc && this.dc.items.length && this.dc.items) || [];
      }
      list.length &&
        list.forEach((item, index) => {
          item.index = index + 1;
        });
      this.keyVal++;
      this.$nextTick(() => {
        this.tableData = list || [];
      });

      this.loadFinshed = true; // 初始化完成后再渲染，优化交互（初始化会先闪现暂无数据）
    },
    getSmxxList(data) {
      this.smxxHandler(data);
    },
    getFileLevelList(data) {
      let params = "";
      for (let key in data) {
        params += `${key}=${data[key]}&`;
      }
      params = params.slice(0, -1);

      this.fileColumns = [
        {
          title: "任务名称",
          key: "name",
          ellipsis: true,
        },
        {
          title: "开始时间",
          key: "begin_time",
        },
        {
          title: "结束时间",
          key: "end_time",
        },
        {
          title: "事件数量",
          key: "source",
        },
        {
          title: "任务状态",
          key: "status",
        },
      ];

      this.$ajax.get("/situation/task?" + params).then((res) => {
        let datas = res && res.data && res.data.data;
        let list = [];
        if (datas) {
          list = (datas && datas.items.length && datas.items) || [];
        }
        list.length &&
          list.forEach((item, index) => {
            item.index = index + 1;
          });
        this.keyVal++;
        this.$nextTick(() => {
          //   this.tableData = this.datas.slice((page - 1) * 10, page * 10);
          this.tableData = list || [];
        });
        this.loadFinshed = true; // 初始化完成后再渲染，优化交互（初始化会先闪现暂无数据））
      });
    },
    clickEvent(row) {
      this.$emit("clickEvent", row);
    },
    gjqmHandler(data) {
      let params = "";
      for (let key in data) {
        params += `${key}=${data[key]}&`;
      }
      params = params.slice(0, -1);

      this.fileColumns = [
        {
          title: "序号",
          key: "index",
        },
        {
          title: "时间",
          key: "time",
          ellipsis: true,
        },
        {
          title: "攻击组织",
          key: "organization",
          ellipsis: true,
        },
        {
          title: "被攻击单位",
          key: "unit",
          ellipsis: true,
        },
      ];

      this.$ajax.get("/situation/gjqm/list?" + params).then((res) => {
        let datas = res && res.data && res.data.data;
        let list = [];
        if (datas) {
          list = (datas && datas.items.length && datas.items) || [];
        }
        list.length &&
          list.forEach((item, index) => {
            item.index = index + 1;
          });
        this.keyVal++;
        this.$nextTick(() => {
          //   this.tableData = this.datas.slice((page - 1) * 10, page * 10);
          this.tableData = list || [];
        });
        this.loadFinshed = true; // 初始化完成后再渲染，优化交互（初始化会先闪现暂无数据））
      });
    },
    smxxHandler(data) {
      let params = "";
      for (let key in data) {
        params += `${key}=${data[key]}&`;
      }
      params = params.slice(0, -1);
      this.fileColumns = [
        {
          title: "时间",
          key: "event_time",
          ellipsis: true,
        },
        {
          title: "事件名称",
          key: "name",
          ellipsis: true,
        },
        {
          title: "文件名称",
          key: "file_name",
        },
        {
          title: "文件密级",
          key: "level",
        },
      ];
      this.$ajax.get("/situation/smxx/list?" + params).then((res) => {
        let datas = res && res.data && res.data.data;
        let list = [];
        if (datas) {
          list = (datas && datas.items.length && datas.items) || [];
        }
        // list里面的files里面的属性展开到list里面
        list.length &&
          list.forEach((item) => {
            item.file &&
              item.files.forEach((file) => {
                item.fileName = file.fileName;
                item.fileClassified = file.fileClassified;
                item.status = file.status;
              });
          });
        if (!list) {
          this.tableData = [];
          this.keyVal++;
          this.loadFinshed = true;
          return;
        }
        this.keyVal++;
        this.$nextTick(() => {
          //   this.tableData = this.datas.slice((page - 1) * 10, page * 10);
          this.tableData = list;
        });

        this.loadFinshed = true; // 初始化完成后再渲染，优化交互（初始化会先闪现暂无数据）
      });
    },
    smwHandler(data) {
      let params = "";
      for (let key in data) {
        params += `${key}=${data[key]}&`;
      }
      params = params.slice(0, -1);
      this.fileColumns = [
        {
          title: "序号",
          key: "index",
        },
        {
          title: "时间",
          key: "time",
          ellipsis: true,
        },
        {
          title: "单位名称",
          key: "unit_name",
          ellipsis: true,
        },
      ];

      this.$ajax.get("/situation/smw/list?" + params).then((res) => {
        let datas = res && res.data && res.data.data;
        let list = [];
        if (datas) {
          list = (datas && datas.items.length && datas.items) || [];
        }
        list.length &&
          list.forEach((item, index) => {
            item.index = index + 1;
          });
        this.keyVal++;
        this.$nextTick(() => {
          //   this.tableData = this.datas.slice((page - 1) * 10, page * 10);
          this.tableData = list || [];
        });
        this.loadFinshed = true; // 初始化完成后再渲染，优化交互（初始化会先闪现暂无数据））
      });
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .vui-table__cell {
  white-space: nowrap !important;
}
.vui-table {
  margin-top: 16px;
}
.tit-con {
  max-height: 520px;
  overflow: auto;
}
.pie-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.comp-title {
  cursor: pointer;
  text-align: left;
  padding-left: 42px;
  display: block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  border-image-source: url(../../assets/comp-title.png);
  border-image-slice: 5 100 12 100 fill;
  border-image-width: 0 100px 0 100px;
}
.vui-pagination {
  margin-top: 16px;
  text-align: right !important;
  margin-bottom: 20px;
}
.table-roll-warp {
  overflow: hidden;
}
.init-table-alarm {
  ::v-deep .vui-table td {
    cursor: pointer;
  }
  .vui-table {
    background: transparent !important;
    border: transparent !important;
  }
  .vui-table__body {
    table {
      width: 100% !important;
    }
  }
  .vui-table__header {
    th {
      border-bottom: none !important;
      border-top: none !important;
      font-weight: normal !important;
      font-size: 16px !important;
      color: #fff !important;
      &:first-child {
        width: 60px;
      }
    }
  }
  .vui-table__body {
    .vui-table-row:nth-child(2n-1) {
      background: url(../../assets/self/table-tr-bg.png) no-repeat top center !important;
      background-size: 100% !important;
    }
    td {
      height: 46px !important;
      border-bottom: none !important;
      font-size: 14px !important;
      color: #fff !important;
    }
    td:first-child {
      padding: 0 0 0 10px !important;
    }
    td:last-child {
      padding: 0 10px 0 0 !important;
    }
  }
}
.close-body {
  .vui-table__body {
    display: none !important;
  }
  .vui-table__tip {
    display: none !important;
  }
}
.close-header {
  overflow-y: hidden;
  overflow-x: hidden;
  height: 320px !important;
  .vui-table__header {
    display: none !important;
  }
  .vui-table__no-data:before {
    display: none !important;
  }
}
.scrollbar {
  overflow-y: auto;
}
.bm-dialog-body {
  min-height: 200px;
}
/deep/.connect_status {
  padding-left: 15px;
  position: relative;
  &.active {
    &::before {
      content: " ";
      position: absolute;
      border-radius: 5px;
      width: 10px;
      height: 10px;
      background: greenyellow;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  &::before {
    content: " ";
    position: absolute;
    border-radius: 5px;
    width: 10px;
    height: 10px;
    background: red;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>