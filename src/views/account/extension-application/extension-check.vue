<template>
  <div id="application">
    <account-heard :data="accountHeardData" @handleClick @returnClick="$router.go(-1);"></account-heard>
    <Card style="margin-top:70px">
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
          <account-card title="展期查看" class="content-b-m">
            <div slot="content" class="account-content">
              <div class="cardItem">
                <div class="infoDetail" style="display: block;">
                  <span class="detailTitle">账户:</span>
                  <span
                    @click="$router.push({name:'open-account-check'})"
                    class="checkDetail"
                  >{{formValidate.accId}}</span>
                </div>
                <div class="infoDetail infoTextarea">
                  <span class="detailTitle">新到期日:</span>
                  <span>
                    <span v-if="formValidate.deferDueDate">{{formValidate.deferDueDate}}</span>
                    <span v-else>空</span>
                  </span>
                  <span>
                    （原到期日：
                    <span>
                      <span v-if="formValidate.deferDueDate">{{formValidate.deferOriDate}}</span>
                      <span v-else>空</span>
                    </span>）
                  </span>
                </div>
                <div class="infoDetail infoTextarea">
                  <span class="detailTitle">展期原因:</span>
                  <span>
                    <span v-if="formValidate.deferDueDate">{{formValidate.deferRea}}</span>
                    <span v-else>无</span>
                  </span>
                </div>
              </div>
            </div>
          </account-card>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import selectInput from "@/views/my-components/account/select-input.vue";
import accountHeard from "@/components/header/account-heard";
import { requestSuccess } from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import { generateNum } from "@/api/index.js";
import { extensionCheck } from "@/api/account/extension.js";
import { extension } from "@/views/account/data/form.js";
import { accountHeader } from "@/libs/array.js";
import { isStore } from "@/libs/tool.js";
export default {
  components: {
    selectInput,
    accountHeard,
    cardDiv,
    accountCard
  },
  name: "extension-check",
  data() {
    return {
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      formValidate: extension.formValidate,
      accountHeardData: accountHeader.slice(0, 2),
      getData: "",
      thawData: ["新到期日"],
      modal: false
    };
  },
  methods: {
    init() {
      this.getList();
    },
    isStore: isStore,
    async getList() {
      let id = this.isStore();
      this.getData = requestSuccess(this, await generateNum(), false);
      this.formValidate = requestSuccess(this, await extensionCheck(id), false);
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
