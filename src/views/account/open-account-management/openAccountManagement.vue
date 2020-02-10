<template>
  <div class="search openAccount">
    <Card>
      <Row class="add">
        <common-button
          class="commonButton"
          size="large"
          type="click-primary"
          @handleClick="buttonClick"
          :data="sortContent1"
        ></common-button>
      </Row>
      <Row v-show="openSearch" class="openSearch">
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          @keydown.native.enter.prevent="keyDownEvent"
        >
          <Form-item label="关键字:">
            <Input
              search
              enter-button
              v-model="searchForm.keyWord"
              placeholder="搜索账号或户名"
              style="width: 200px"
              @on-search="handleSearch"
            />
          </Form-item>
          <Form-item :label-width="0">
            <icon-button
              pattern="single"
              type="button-down"
              size="18"
              name="更多"
              selectIcon="ios-arrow-down"
              :color="iconColor"
              @mouseover.native="iconColor='#2d8cf0'"
              @mouseout.native="iconColor='#666666'"
              @changeClick="changeShow"
            ></icon-button>
          </Form-item>
          <List class="openSearch-child" border v-if="isSearchList">
            <div>
              <Form-item label="账户性质:">
                <Select v-model="searchForm.accPro" style="width:200px">
                  <Option value="x" :key="'-1'">全部</Option>
                  <Option
                    v-for="item in getDicData.acc_pro"
                    :value="item.value"
                    :key="item.id"
                  >{{item.title}}</Option>
                </Select>
              </Form-item>
              <Form-item label="账户用途:">
                <Select v-model="searchForm.accUse" style="width:200px">
                  <Option value="x" :key="'-1'">全部</Option>
                  <Option
                    v-for="item in getDicData.acc_use"
                    :value="item.value"
                    :key="item.id"
                  >{{item.title}}</Option>
                </Select>
              </Form-item>
              <Form-item label="开户日期:">
                <Row class="date-line">
                  <pickerDate
                    v-model="searchForm.openAccBeginDate"
                    type="date"
                    class="date-w"
                    placeholder="开始时间"
                    :options="startDateOption"
                    @change="onstartDateChange"
                  ></pickerDate>
                </Row>
                <Row class="date-line1">至</Row>
                <Row class="date-line">
                  <pickerDate
                    type="date"
                    class="date-w"
                    placeholder="结束时间"
                    :options="endDateOption"
                    @change="onendDateChange"
                    v-model="searchForm.openAccEndDate"
                  ></pickerDate>
                </Row>
              </Form-item>
            </div>
            <div>
              <Form-item label="收支属性:">
                <Select v-model="searchForm.balanceAttribute" style="width:200px">
                  <Option value="x" :key="'-1'">全部</Option>
                  <Option
                    v-for="item in getDicData.balance_att"
                    :value="item.value"
                    :key="item.id"
                  >{{item.title}}</Option>
                </Select>
              </Form-item>
              <Form-item label="管理属性:">
                <Select v-model="searchForm.acManageAttribute" style="width:200px">
                  <Option value="x" :key="'-1'">全部</Option>
                  <Option
                    v-for="item in getDicData.acc_manage_att"
                    :value="item.value"
                    :key="item.id"
                  >{{item.title}}</Option>
                </Select>
              </Form-item>
              <Form-item label="组织机构:">
                <Select v-model="searchForm.departmentId" class="date-w1">
                  <Option value="x" :key="'-1'">全部</Option>
                  <Option
                    v-for="item in getDicData.accManageUnit"
                    :value="item.value"
                    :key="item.id"
                  >{{item.title}}</Option>
                </Select>
              </Form-item>
            </div>
          </List>
          <Form-item style="margin-left:-35px;float: right" class="br" label="状态:">
            <common-button @handleClick="handleClick" :data="sortContent" type="array-click"></common-button>
          </Form-item>
        </Form>
      </Row>
      <Row>
        <Table
          :loading="loading1"
          border
          :columns="columns"
          :data="data"
          ref="table"
          sortable="custom"
          @on-selection-change="selectionChange"
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
    <modal-information v-model="modal" footer-hide="true" modalWidth="800" title="展期登记">
      <extensionRegistration
        :id="selectall"
        :modal="modal"
        @change="changeVal(...arguments,'modal')"
      ></extensionRegistration>
    </modal-information>
    <modal-information v-model="modal1" footer-hide="true" modalWidth="670" title="冻结登记">
      <accountFreeze :id="selectall" :modal="modal1" @change="changeVal(...arguments,'modal1')"></accountFreeze>
    </modal-information>
    <modal-information v-model="modal2" footer-hide="true" modalWidth="670" title="解冻登记">
      <thawRegistration :id="selectall" :modal="modal2" @change="changeVal(...arguments,'modal2')"></thawRegistration>
    </modal-information>
    <modal-information v-model="modal3" footer-hide="true" modalWidth="670" title="久悬登记">
      <suspensionRegistration
        :id="selectall"
        :modal="modal3"
        @change="changeVal(...arguments,'modal3')"
      ></suspensionRegistration>
    </modal-information>
    <modal-information v-model="modal4" footer-hide="true" modalWidth="670" title="久悬解除">
      <relieveSuspensionRegistration
        :id="selectall"
        :modal="modal4"
        @change="changeVal(...arguments,'modal4')"
      ></relieveSuspensionRegistration>
    </modal-information>
    <modal-information v-model="modal5" footer-hide="true" modalWidth="670" title="注销登记">
      <cancellationRegistration
        :id="selectall"
        :modal="modal5"
        @change="changeVal(...arguments,'modal5')"
      ></cancellationRegistration>
    </modal-information>
  </div>
</template>

<script>
import { openAccount } from "@/api/account/account.js";
import commonList from "@/components/list/commonList.vue";
import commonButton from "@/components/button/common-button.vue";
import extensionRegistration from "@/views/account/accountRegistration/extensionRegistration.vue";
import thawRegistration from "@/views/account/accountRegistration/thawRegistration.vue";
import accountFreeze from "@/views/account/open-account-management/pages-details/check/account-freeze.vue";
import suspensionRegistration from "@/views/account/accountRegistration/suspensionRegistration.vue";
import relieveSuspensionRegistration from "@/views/account/accountRegistration/relieveSuspensionRegistration.vue";
import cancellationRegistration from "@/views/account/accountRegistration/cancellationRegistration.vue";
import { statusBack, statusRouter, getIndex } from "@/libs/tool.js";
import { statusAccount, accountShow } from "@/views/account/data/status.js";
import iconButton from "@/components/button/icon-button.vue";
import { requestSuccess } from "@/libs/tool.js";
import { dictData } from "@/api/index.js";
export default {
  name: "open-account-management",
  components: {
    commonList,
    commonButton,
    iconButton,
    extensionRegistration,
    accountFreeze,
    thawRegistration,
    suspensionRegistration,
    relieveSuspensionRegistration,
    cancellationRegistration
  },
  created() {},
  data() {
    return {
      //以这个页面：logManage
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      iconColor: "#666666",
      _index: null,
      startDateOption: {},
      endDateOption: {},
      sortContent: [
        { title: "全部", index: 0 },
        { title: "正常", index: 1 },
        { title: "冻结", index: 4 },
        { title: "久悬", index: 3 },
        { title: "已注销", index: 5 }
      ],
      sortContent1: [
        { title: "开户登记", content: "accountRegistration" },
        { title: "变更登记", content: "changeRegistration" },
        { title: "展期登记", content: 1 },
        { title: "冻结登记", content: 2 },
        { title: "解冻登记", content: 3 },
        { title: "久悬登记", content: 4 },
        { title: "久悬解除", content: 5 },
        { title: "注销登记", content: 6 }
      ],
      selectall: {},
      buttonStatusIndex: null, //按钮状态
      loading1: true,
      openSearch: true,
      isSearchList: false,
      data: [],
      total: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "开户银行",
          key: "bankid",
          align: "left"
        },
        {
          title: "账号",
          key: "accId",
          align: "left"
        },
        {
          title: "用户",
          key: "accName",
          align: "left"
        },
        {
          title: "使用单位",
          key: "unitId",
          align: "left"
        },
        {
          title: "使用项目",
          key: "projectId",
          align: "left"
        },
        {
          title: "开户单位",
          key: "openAccId",
          align: "left"
        },
        {
          title: "账户性质",
          key: "accPro",
          width: 110,
          align: "left"
        },
        {
          title: "账户用途",
          key: "accUse",
          width: 110,
          align: "left"
        },
        {
          title: "账户状态",
          key: "fcAccSta",
          align: "left",
          render: (h, params) => {
            let status = params.row.fcAccSta;
            let content = accountShow(status).content;
            let bColor = accountShow(status).color;
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
            let id = params.row.id;
            return h(
              "div",
              {
                class: "actionName",
                style: {
                  textAlign: "right",
                  color: "#2d8cf0"
                },
                on: {}
              },
              [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "10px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "accountChange-information", //路由名
                          params: { id: id }
                        });
                      }
                    }
                  },
                  " 查看"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "10px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "acc-operation-log", //路由名
                          params: { id: params.row }
                        });
                      }
                    }
                  },
                  " 操作记录"
                )
              ]
            );
          }
        }
      ],
      searchKey: "",
      commonListWidth: "120px",
      commonList: statusAccount,
      commonList1: [
        "查看",
        "开户登记",
        "",
        "变更申请",
        "展期申请",
        "展期登记",
        "久悬登记",
        "久悬解除申请",
        "久悬解除登记",
        "冻结",
        "解冻",
        "销户申请",
        "销户登记",
        "删除"
      ],
      getDicData: {},
      commonListIndex: null,
      searchForm: {
        keyWord: "",
        current: 1, //页号
        size: 10, //页面大小
        accPro: "x",
        accUse: "x",
        balanceAttribute: "x",
        acManageAttribute: "x",
        openAccBeginDate: "",
        openAccEndDate: "",
        departmentId: "x",
        status: "" //排序字段
      }
    };
  },
  methods: {
    init() {
      this.getLogList();
      this.dicData("acc_pro"); // 账户性质
      this.dicData("acc_use"); //账户用途
      this.dicData("balance_att"); //账户收支属性
      this.dicData("acc_manage_att"); //账户管理属性
      this.dicData("accManageUnit"); //管理单位
    },
    async getLogList() {
      let item = "";
      this.loading1 = true;
      item = requestSuccess(
        this,
        await openAccount(this.searchForm),
        false,
        "loading1"
      );
      this.data = item.records;
      this.total = item.total;
      if (this._index == null) {
        //回显选中项
      } else {
        this.data[this._index]._checked = true;
      }
    },
    async dicData(item) {
      this.getDicData[item] = requestSuccess(this, await dictData(item), false);
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
      //重置搜索
      this.searchForm.keyWord = "";
      this.searchForm.status = "";
      this.getLogList();
    },
    selectionChange(item) {
      console.log(item);
      if (item.length == 1) {
        this.switch = true; //开关头部接受一个id
        this.selectall = item[0]; //传递id
        this._index = getIndex(this.data, item[0]);
      } else {
        this.switch = false; //不唯一失效
        this.selectall = {};
        this._index = null;
      }
    },
    buttonClick(item) {
      if (this.switch) {
        if (!(typeof item == "number")) {
          this.$router.push({
            name: item,
            params: { id: this.selectall.id }
          });
        } else {
          if (item == 1) {
            this.modal = true;
          } else if (item == 2) {
            this.modal1 = true;
          } else if (item == 3) {
            this.modal2 = true;
          } else if (item == 4) {
            this.modal3 = true;
          } else if (item == 5) {
            this.modal4 = true;
          } else if (item == 6) {
            this.modal5 = true;
          }
        }
      } else {
        this.$Message.error("请选择一条信息进行操作!");
      }
    },
    changeShow() {
      this.isSearchList = !this.isSearchList;
    },
    handleClick() {
      //查询条件
      let [index] = arguments;
      if (!index) {
        this.searchForm.status = "";
      } else {
        this.searchForm.status = index;
      }
      this.getLogList();
    },
    onstartDateChange(startDate) {
      this.endDateOption = {
        disabledDate(endDate) {
          return endDate < new Date(startDate);
        }
      };
    },
    onendDateChange(endDate) {
      this.startDateOption = {
        disabledDate(startDate) {
          return startDate > new Date(endDate);
        }
      };
    },
    changeVal() {
      let [content, key] = arguments;
      this[key] = false;
      console.log(content);
      if (content != "noRef") {
        this.getLogList();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped lang="less">
.openAccount {
  &/deep/ .ivu-table-wrapper {
    overflow: visible;
  }

  &/deep/ .ivu-table {
    overflow: visible;
  }

  .actionName {
    position: relative;
  }
  &/deep/ .ivu-table-cell {
    overflow: visible;
  }
}
.openSearch {
  position: relative;
  &-child {
    position: absolute;
    top: 40px;
    padding: 24px 10px 0 10px;
    left: 300px;
    background: white;
    z-index: 2;
  }
}
.date-line {
  display: inline-block;
}
.date-line1 {
  display: inline-block;
  margin: 0 6px;
}
.date-w {
  width: 120px;
}
.date-w1 {
  width: 266px;
}
// &/deep/ .ivu-table-header table thead tr .ivu-checkbox-wrapper {
//   //全选样式
//   display: none;
// }
</style>
<style scoped lang="less">
@import "openAccountManagement.less";
</style>
