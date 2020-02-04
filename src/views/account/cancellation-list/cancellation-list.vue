<template>
  <div class="search openAccount">
    <Card>
      <Row class="add">
        <Button
          @click="$router.push({ name: 'cancellationApplication' ,params: { id: isStore() }})"
          type="primary"
          icon="md-add"
        >注销申请</Button>
      </Row>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="关键字:">
            <Input
              type="text"
              v-model="searchForm.keyWord"
              clearable
              placeholder="请输入关键字"
              style="width: 200px"
            />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
          <Form-item style="margin-left:-35px;float: right" class="br" label="状态:">
            <common-button @handleClick="handleClick" :data="sortContent" type="array-click"></common-button>
          </Form-item>
        </Form>
      </Row>
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
      <Row type="flex" justify="end" class="page">
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
    </Card>
  </div>
</template>
<script>
import { cancellationList } from "@/api/account/cancellation.js";
import commonList from "@/components/list/commonList.vue";
import commonButton from "@/components/button/common-button.vue";
import { statusBack, statusRouter ,isStore} from "@/libs/tool.js";
import { cancellationApply, Approval } from "@/views/account/data/status.js";
export default {
  name: "cancellation-list",
  components: {
    commonList,
    commonButton
  },
  created() {},
  data() {
    return {
      //以这个页面：logManage
      sortContent: [
        { title: "全部", index: 0 },
        { title: "暂存", index: 1 },
        { title: "待审批", index: 2 },
        { title: "审批中", index: 3 },
        { title: "通过", index: 4 },
        { title: "驳回", index: 5 }
      ],
      buttonStatusIndex: null, //按钮状态
      loading: true,
      openSearch: true,
      data: [],
      total: 0,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "申请单号",
          key: "applyId",
          align: "left"
        },
        {
          title: "申请单位",
          key: "applyUnitId",
          align: "left"
        },
        {
          title: "申请人",
          key: "staffId",
          align: "left"
        },
        {
          title: "申请注销日期",
          key: "ciCancelDate",
          align: "left",
          render: (h, params) => {
            let content = params.row.ciCancelDate;
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
          title: "申请日期",
          key: "applyDate",
          align: "left"
        },
        {
          title: "审批状态",
          key: "fcOpSta",
          align: "left",
          render: (h, params) => {
            let status = params.row.fcOpSta;
            let content = Approval(status).content;
            let bColor = Approval(status).color;
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer"
                    }
                  },
                  [
                    h("span", {
                      style: {
                        height: "10px",
                        width: "10px",
                        display: "inline-block",
                        borderRadius: "50%",
                        backgroundColor: bColor,
                        marginRight: "5px"
                      }
                    }),
                    h(
                      "span",
                      {
                        style: {
                          color: bColor
                        }
                      },
                      content
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "operate",
          width: 180,
          align: "center",
          className: "",
          render: (h, params) => {
            let statusArr = params.row.operate;
            let data = [];
            let that = this;
            let List = [];
            let Str = this.commonList;
            let id = params.row.id;
            if (statusArr.length > 0) {
              statusArr.forEach((status, index) => {
                let content = Str[status].title;
                statusBack(status, List, status, Str[status].title); //状态添加 list
                if (index < 2) {
                  data.push(
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            if (index == 0) {
                              that.$router.push({
                                name: Str[statusArr[0]].name, //路由名
                                params: { id: id }
                              });
                            } else if (index == 1) {
                              that.$router.push({
                                name: Str[statusArr[1]].name,
                                params: { id: id }
                              });
                            }
                          }
                        }
                      },
                      content
                    )
                  );
                }
              });
            }
            data.push(
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    position: " relative",
                    opacity: statusArr.length > 2 ? 1 : 0,
                    top: "5px",
                    padding: "0 4px",
                    cursor: "pointer"
                  },
                  on: {
                    click: e => {
                      //开关功能
                      let name = "listAction" + params.row._index; //我是第几
                      let oldName = "listAction" + this.commonListIndex; //上次的位置
                      if (this.commonListIndex != null) {
                        //第一次的时候没有前一次初始值为null我们跳过去
                        if (this.commonListIndex != params.row._index) {
                          //没有换行就没必要清空了
                          this.$refs[oldName].style.display = "none";
                        }
                      }
                      if (this.$refs[name].style.display == "none") {
                        //点击开关
                        this.$refs[name].style.display = "block";
                      } else {
                        this.$refs[name].style.display = "none";
                      }
                      this.commonListIndex = params.row._index; //记录位置
                    }
                  }
                },
                [
                  //大于2个显示
                  h("span", {
                    style: {
                      display: "block",
                      height: "4px",
                      width: "4px",
                      backgroundColor: "#999999",
                      marginBottom: "4px"
                    }
                  }),
                  h("span", {
                    style: {
                      display: "block",
                      height: "4px",
                      width: "4px",
                      backgroundColor: "#999999",
                      marginBottom: "4px"
                    }
                  }),
                  h("span", {
                    style: {
                      display: "block",
                      height: "4px",
                      width: "4px",
                      backgroundColor: "#999999"
                    }
                  })
                ]
              )
            );
            if (statusArr.length > 2) {
              //显示更多  大于2个显示更多
              data.push(
                this.$createElement(
                  "div",
                  {
                    ref: "listAction" + params.row._index,
                    class: "listAction",
                    style: {
                      display: "none"
                    }
                  },
                  [
                    h(commonList, {
                      props: {
                        Width: this.commonListWidth,
                        data: List
                      },
                      on: {
                        handleClick: (item, i) => {
                          statusArr.forEach((status, index) => {
                            statusRouter(
                              item,
                              Str[status].title,
                              this.$router,
                              {
                                //遍历状态进行路由跳转路由
                                name: Str[status].name, //查看
                                params: { id: id }
                              }
                            );
                          });
                        }
                      }
                    })
                  ]
                )
              );
            }

            return h(
              "div",
              {
                class: "actionName",
                style: {
                  textAlign: "right",
                  color: "#2d8cf0"
                },
                on: {
                  mouseout: e => {}
                }
              },
              [...data]
            );
          }
        }
      ],
      searchKey: "",
      commonListWidth: "120px",
      commonList: cancellationApply,
      commonListIndex: null,
      searchForm: {
        order: "",//排序方式 asc/desc
        pageNumber: 1, //页号
        pageSize: 10, //页面大小
        sort: "" //排序字段
      }
    };
  },
  methods: {
    init() {
      this.getLogList();
    },
    isStore: isStore,
    getLogList() {
      this.loading = true;
      cancellationList(this.searchForm).then(res => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.records;
          this.total = res.result.total;
        }
      });
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSort(e) {
      //排序
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getLogList();
    },
    changePage(v) {
      this.searchForm.current = v;
      this.getLogList();
      this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getLogList();
    },
    handleSearch() {
      this.searchForm.current = 1;
      this.searchForm.size = 10;
      this.getLogList();
    },
    handleReset() {
      this.searchForm.keyWord = "";
      this.searchForm.status = "";
      this.getLogList();
    },
    handleClick() {
      let [index] = arguments;
      if (!index) {
        this.searchForm.status = "";
      } else {
        this.searchForm.status = index;
      }
      this.getLogList();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
.openAccount {
  .ivu-table-wrapper {
    overflow: visible;
  }

  .ivu-table {
    overflow: visible;
  }
  .actionName {
    position: relative;
  }

  .ivu-table-cell {
    overflow: visible;
  }
}
</style>
<style scoped lang="less">
@import "./cancellation-list.less";
</style>

