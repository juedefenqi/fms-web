<template>
  <div id="application">
    <!-- <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard> -->
    <!-- <Card style="margin-top:70px"> -->
    <Card>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="content">
          <Row style="padding-top: 10px">
            <card-div
              title="申请单位 :"
              :content="formValidate.applyUnitId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="申请人 :"
              :content="formValidate.staffId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="日期 :"
              :content="formValidate.applyDate"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
            <card-div
              title="申请单号 :"
              :content="formValidate.applyId"
              :width="cardDIvWidth"
              display="inline-block"
            ></card-div>
          </Row>
          <Row>
            <account-card title="注销申请" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div class="infoDetail" style="display: block;">
                    <FormItem label="账户 :">
                      {{formValidate.accId}}
                    </FormItem>
                  </div>
                  <FormItem label="预计注销日期 :">
                    {{formValidate.esCancelDate}}
                  </FormItem>
                  <div class="infoDetail infoTextarea">
                    <FormItem label="注销原因 :">
                      {{formValidate.cancelRea}}
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
import { cancellationGetName} from "@/api/account/cancellation.js";
import { extension } from "@/views/account/data/form.js";
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
      accountHeardData: accountHeader.slice(0,0),
      getData: "",
      getInfo: "",
      modal: false,
      formValidate: extension.formValidate,
      ruleValidate: extension.ruleValidate
    };
  },
  methods: {
    init() {
      this.cancellationInfo();
    },
    isStore: isStore,
    async cancellationInfo() {
      let id = this.isStore();
      this.formValidate = requestSuccess(this, await cancellationGetName(id), false);
    },
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
  @import "../accountApplication/index.less";
}
</style>
