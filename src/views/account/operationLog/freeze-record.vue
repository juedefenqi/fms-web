<template>
  <div class="">
    <Row>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        sortable="custom"
      ></Table>
    </Row>
    <Row type="flex" justify="end" class="acc-record-page">
      <Page
        :current="searchForm.current"
        :total="total"
        :page-size="searchForm.size"
        @on-change="changePage"
        @on-page-size-change="changesize"
        :page-size-opts="[10, 20, 50]"
        size="small"
        show-total
        show-elevator
        show-sizer
      ></Page>
    </Row>
  </div>
</template>
<script>
import { accLogFreeze } from "@/api/account/accLog.js";
import { requestSuccess } from "@/libs/tool.js";
import { dateDay } from "@/libs/date.js";
import { accountFreezeType } from "@/views/account/data/status.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "freeze-record",
  props: {
    id: {
      type: Number | String,
      default: ""
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      total: 0,
      loading: false,
      data: [],

      columns: [
        {
          title: "冻结操作日期",
          key: "createTime",
          align: "left",
          render: (h, params) => {
            let time = dateDay(params.row.createTime);
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {}
                  },
                  time
                )
              ]
            );
          }
        },
        {
          title: "冻结操作人",
          key: "freezePerson",
          align: "left"
        },
        {
          title: "冻结类型",
          key: "freezeType",
          align: "left",
          render: (h, params) => {
            let status = params.row.freezeType;
            let content =
              status == accountFreezeType[0].value
                ? accountFreezeType[0].name
                : status == accountFreezeType[1].value
                ? accountFreezeType[1].name
                : status == accountFreezeType[2].value
                ? accountFreezeType[2].name
                : "";
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {}
                  },
                  content
                )
              ]
            );
          }
        },
        {
          title: "冻结金额(元)",
          key: "freezeAmount",
          align: "left"
        },
        {
          title: "冻结期限",
          key: "",
          align: "left",
            render: (h, params) => {
            let time = dateDay(params.row.freezeBeginDate);
                let time2 = dateDay(params.row.freezeEndnDate);
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {}
                  },
                  time
                ), h(
                  "span",
                  {
                    style: {
                        margin:'0 10px'
                    }
                  },
                 "至"
                ), h(
                  "span",
                  {
                    style: {}
                  },
                  time2
                )
              ]
            );
          }
        },
        {
          title: "冻结原因",
          key: "freezeRea",
          align: "left"
        },
         {
          title: "解冻日期",
          key: "unFreezeDate",
          align: "left",
          render: (h, params) => {
            let time = dateDay(params.row.unFreezeDate);
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {}
                  },
                  time
                )
              ]
            );
          }
        },
           {
          title: "解冻原因",
          key: "unfreezeRea",
          align: "left"
        },
         {
          title: "解冻操作日期",
          key: "updateTime",
          align: "left",
          render: (h, params) => {
            let time = dateDay(params.row.updateTime);
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {}
                  },
                  time
                )
              ]
            );
          }
        },
         {
          title: "解冻操作人",
          key: "unfreezePerson",
          align: "left"
        },
      ],
      searchForm: {
        current: 1, //页号
        size: 10 //页面大小
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    id(val) {
      this.getList();
    }
  },
  //方法集合
  methods: {
    async getList() {
      let item = "";
      console.log(this.id);
      this.searchForm.accId = this.id;
      if (this.id) {
        this.loading = true;
        item = requestSuccess(this, await accLogFreeze(this.searchForm), false);
        this.data = item.records;
        this.total = item.total;
      }
    },
    changePage(v) {
      this.searchForm.current = v;
      this.getList();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getList();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getList();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import ''; //引入公共css类
.acc-record-page {
  padding-top: 15px;
}
</style>
