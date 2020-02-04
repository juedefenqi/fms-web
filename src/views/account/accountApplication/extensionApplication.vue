<template>
  <div id="application">
    <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard>
    <Card style="margin-top:70px">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="content">
          <Row style="padding-top: 10px">
            <card-div
              title="登记单位 :"
              :content="getData.applyUnitId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="登记人 :"
              :content="getData.staffId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="日期 :"
              :content="getData.applyDate"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="登记单号 :"
              :content="getData.applyId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
          </Row>
          <Row>
            <account-card title="展期申请" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div class="infoDetail" style="display: block;">
                    <FormItem label="账户 :">
                      <Button
                        @click="$router.push({name:'open-account-check'})"
                        class="checkDetail"
                      >{{formValidate.accId}}</Button>
                    </FormItem>
                  </div>
                  <FormItem label="到期日 :">
                    <picker-date v-model="formValidate.accDueDate" style="width: 200px"></picker-date>
                    <span>
                      （原到期日：
                      <span v-if="formValidate.deferOriDate">{{formValidate.deferOriDate}}</span>
                      <span v-else>空</span> ）
                    </span>
                  </FormItem>
                  <div class="infoDetail infoTextarea">
                    <FormItem label="展期原因 :">
                      <Input
                        v-model="formValidate.deferRea"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请输入展期原因"
                      />
                    </FormItem>
                  </div>
                </div>
              </div>
            </account-card>
          </Row>
        </div>
      </Form>
    </Card>
  </div>
</template>

<script>
import selectInput from "@/views/my-components/account/select-input.vue";
import accountHeard from "@/components/header/account-heard";
import { requestSuccess, isStore, objectAttr } from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import { accountHeader } from "@/libs/array.js";
import { extensionInfo, extensionSave } from "@/api/account/extension.js";
import { extension } from "@/views/account/data/form.js";
import { generateNum } from "@/api/index.js";
export default {
  name: "extensionApplication",
  components: {
    selectInput,
    accountHeard,
    cardDiv,
    accountCard
  },
  data() {
    return {
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      accountHeardData: accountHeader.slice(0, 2),
      getData: "",
      getInfo: "",
      modal: false,
      formValidate: extension.formValidate,
      ruleValidate: extension.ruleValidate
    };
  },
  methods: {
    init() {
      this.inIf();
      this.getList();
    },
    isStore: isStore,
    async getList() {
      this.getData = requestSuccess(this, await generateNum(), false);
      objectAttr(this.formValidate, this.getData); //添加对象a得到b的属性
      console.log(this.getData);
      console.log(this.formValidate);
    },
    async inIf() {
      //已有信息回显
      let id = this.isStore();
      this.formValidate = requestSuccess(this, await extensionInfo(id), false);
    },
    async insertOrUpdate(item) {
      let data = {};
      if (item.id) {
        //存在id 就走修改
        requestSuccess(this, await extensionSave(item), true);
        console.log(this.formValidate);
      } else {
        this.$Message.error("提交失败!");
      }
    },
    handleSave(name) {
      //保存校验
      this.insertOrUpdate(this[name]);
      // this.$refs[name].validate(valid => {
      //        console.log(2222);
      //   if (valid) {
      //     this.insertOrUpdate(this[name]);
      //   } else {
      //     this.$Message.error("提交失败!");
      //   }
      // });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleClick(item) {
      let [index] = arguments;
      if (index == 0) {
        //保存功能
        this.handleSave("formValidate");
      }
      if (index == 1) {
        //提交功能
        //   this.handleSubmit("formValidate");
      }
    },
    contentClick() {
      window.location.href = "https://www.iviewui.com/docs/introduce";
    },
    baseInfoDetail() {
      this.modal1 = true;
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#application {
  .header {
    position: fixed;
    top: 102px;
    z-index: 999;
    height: 62px;
    width: 100%;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 0px;
    line-height: 62px;
    padding-left: 20px;
  }
  .accountBtn {
    margin-right: 20px;
  }
  .btnReturn {
    position: absolute;
    right: 258px;
    top: 17px;
  }
  .content {
    font-size: 14px;
    padding-top: 10px;
    height: 100%;
  }
  .applicationInfo {
    height: 41px;
    margin: 0 20px;
    line-height: 20px;
  }
  .applicationInfo div {
    float: left;
    margin-right: 20px;
  }
  .userInfoVal {
    font-family: "微软雅黑";
    color: #000000;
    padding-left: 6px;
  }
  .applicationUnit {
    border: none;
    background-color: rgba(242, 242, 242, 1);
    padding-left: 0;
    margin-top: 20px;
  }
  .baseInfo {
    background-color: #fff;
    margin: 0 20px;
    margin-bottom: 20px;
  }
  .baseTitle {
    padding: 10px 20px;
    border-bottom: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-weight: 700;
  }
  .infoContent {
    border-top: 1px solid rgba(228, 228, 228, 1);
    padding: 30px 19px;
  }
  .infoDetail {
    padding: 10px 0px 10px 0px;
    display: inline-block;
  }
  .infoDetail .radio {
    margin-right: 20px;
    border-radius: 4px !important;
  }
  .detailTitle {
    width: 123px;
    text-align: right;
    display: inline-block;
    margin-right: 8px;
    color: #999999;
  }
  .infoTextarea {
    display: block;
  }
  &/deep/ .infoTextarea .ivu-input-wrapper {
    width: 58.3% !important;
  }
  .checkDetail {
    border: none;
    color: #199ed8;
    cursor: pointer;
  }
  @import "./index";
}
</style>
