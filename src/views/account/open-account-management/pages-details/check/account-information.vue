<template>
  <div id="internet-banking">
    <Card class="content-b-m">
      <p class="title">
        <span style="margin-right: 30px">{{getData.accName}}</span>
        <span>{{getData.accId}}</span>
        <span class="colo4">({{getData.bankid}})</span>
        <span class="title-right">
          <span class="title-right-account">
            <span class="span">账户状态:</span>
            <span class="colo2" v-if="getData.fcAccSta==1">暂存</span>
            <span class="colo5" v-else-if="getData.fcAccSta==2">待复核</span>
            <span class="colo3" v-else-if="getData.fcAccSta==3">复核未通过</span>
            <span class="colo1" v-else-if="getData.fcAccSta==4">正常</span>
            <span class="colo3" v-else-if="getData.fcAccSta==5">冻结</span>
            <span class="colo3" v-else-if="getData.fcAccSta==6">久悬</span>
            <span class="colo3" v-else></span>
          </span>
          <span class="title-right-action">
            <span class="span">操作状态:</span>
            <span class="colo6">正常 未开发</span>
          </span>
        </span>
      </p>
    </Card>
    <account-card class="content-b-m" title="基本信息">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="使用单位 :" :content="getData.unitId" :width="cardDIvWidth"></card-div>
            <card-div title="资金单位 :" :content="getData.moneyCenterId" :width="cardDIvWidth" class></card-div>
          </div>
        </div>
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="管理单位 :" :content="getData.manageId" :width="cardDIvWidth"></card-div>
            <div>
              <card-div
                title="使用项目 :"
                :content="getData.projectId"
                :width="cardDIvWidth"
                class
                display="inline-block"
              ></card-div>
              <span class="colo1 check">查看</span>
            </div>
          </div>
        </div>
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="开户单位 :" :content="getData.openAccId" :width="cardDIvWidth" class></card-div>
          </div>
        </div>
      </div>
    </account-card>
    <account-card class="content-b-m" title="账户信息">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="账号 :" :content="getData.accId" :width="cardDIvWidth"></card-div>
            <card-div title="账户性质 :" :content="getData.accPro" :width="cardDIvWidth"></card-div>
            <card-div title="开户银行 :" :content="getData.bankid" :width="cardDIvWidth"></card-div>
            <card-div
              title="收支属性 :"
              :content="getData.balanceAttribute"
              :width="cardDIvWidth"
              class
            ></card-div>
          </div>
        </div>
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="户名 :" :content="getData.accName" :width="cardDIvWidth"></card-div>
            <card-div title="开户日期 :" :content="getData.accOpenDate" :width="cardDIvWidth"></card-div>
            <card-div title="币别 :" :content="getData.currency" :width="cardDIvWidth"></card-div>
            <card-div
              title="账户管理属性 :"
              :content="getData.acManageAttribute"
              :width="cardDIvWidth"
              class
            ></card-div>
          </div>
        </div>
        <div class="cardItem">
          <div class="account-content-container">
            <card-div title="简称 :" :content="getData.accAbb" :width="cardDIvWidth"></card-div>
            <card-div title="到期日 :" :content="getData.accDueDate" :width="cardDIvWidth"></card-div>
            <card-div title="账户用途 :" :content="getData.accUse" :width="cardDIvWidth"></card-div>
          </div>
        </div>
      </div>
    </account-card>
    <account-card class="content-b-m" title="管理信息">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <div class="account-content-container">
            <div>
              <card-div
                title="银企直连 :"
                :content="getData.isBankUnit==1?'是':'否'"
                :width="cardDIvWidth"
                display="inline-block"
              ></card-div>
              <card-div
                v-if="getData.isBankUnit!=1"
                title="未直连原因 :"
                :content="getData.noLinkRe"
                :width="cardDIvWidth"
                display="inline-block"
                style="margin-left: 10px"
              ></card-div>
            </div>
            <div>
              <card-div
                title="开通网银 :"
                :content="getData.isOpenEbank==1?'是':'否'"
                :width="cardDIvWidth"
                display="inline-block"
              ></card-div>
              <card-div
                v-if="getData.isOpenEbank!=1"
                title="未直连原因 :"
                :content="getData.noEbankRe"
                :width="cardDIvWidth"
                display="inline-block"
                style="margin-left: 10px"
              ></card-div>
            </div>
            <div>
              <card-div
                title="开通密码器 :"
                :content="getData.isOpenCipherware==1?'是':'否'"
                :width="cardDIvWidth"
                display="inline-block"
                class
              ></card-div>
              <card-div
                title="未直连原因 :"
                v-if="getData.isOpenCipherware!=1"
                :content="getData.noCipherwareRe"
                :width="cardDIvWidth"
                display="inline-block"
                style="margin-left: 10px"
                class
              ></card-div>
            </div>
          </div>
        </div>
        <div class="cardItem">
          <div class>
            <div>
              <card-div
                title="重大监管账户 :"
                :content="getData.isSuperviseAcc==1?'是':'否'"
                :width="cardDIvWidth2"
              ></card-div>
              <card-div
                title="重大监管原因 :"
                v-if="getData.isSuperviseAcc==1"
                :content="getData.superviseAcc"
                :width="cardDIvWidth2"
              ></card-div>
            </div>
            <div>
              <card-div
                title="被归集户 :"
                :content="getData.isUnderAcc==1?'是':'否'"
                :width="cardDIvWidth2"
              ></card-div>
              <card-div
                v-if="getData.isUnderAcc==1"
                title="归集主账户 :"
                :content="getData.collectionAcc"
                :width="cardDIvWidth2"
              ></card-div>
              <card-div
                v-if="getData.isUnderAcc!=1"
                title="未归集原因 :"
                :content="getData.collectionRea"
                :width="cardDIvWidth2"
              ></card-div>
            </div>
            <div>
              <card-div
                title="虚拟户 :"
                :content="getData.isVirtualAcc==1?'是':'否'"
                :width="cardDIvWidth2"
              ></card-div>
              <card-div
                v-if="getData.isVirtualAcc==1"
                title="关联实体账户 :"
                :content="getData.entityAcc"
                :width="cardDIvWidth2"
                class
              ></card-div>
            </div>
          </div>
        </div>
        <div class="cardItem">
          <div class>
            <div>
              <card-div
                title="允许透支 :"
                :content="getData.isAllowOver==1?'是':'否'"
                :width="cardDIvWidth1"
                display="inline-block"
              ></card-div>
              <card-div
                v-if="getData.isAllowOver==1"
                title="透支限额 :"
                :content="getData.overAmount +'元'"
                :width="cardDIvWidth1"
                display="inline-block"
                style="margin-left: 10px"
              ></card-div>
            </div>
            <div>
              <card-div
                title="被抵押或限制使用 :"
                :content="getData.isControlAcc==1?'是':'否'"
                :width="cardDIvWidth1"
                display="inline-block"
              ></card-div>
              <card-div
                v-if="getData.isControlAcc==1"
                title="账户受限用途 :"
                :content="getData.accNotAllow"
                :width="cardDIvWidth1"
                display="inline-block"
                style="margin-left: 10px"
                class
              ></card-div>
            </div>
          </div>
        </div>
      </div>
    </account-card>
    <account-card class="content-b-m" title="银行留存相关人员">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <div class="account-content-container">
            <div>
              <card-div
                title="账户经办人 :"
                :content="getData.accOperator"
                :width="cardDIvWidth1"
                display="inline-block"
              ></card-div>
              <card-div
                title="联系方式 :"
                :content="getData.operatorTel"
                :width="cardDIvWidth1"
                display="inline-block"
                style="margin-left: 10px"
              ></card-div>
            </div>
            <div>
              <card-div
                title="账户大额联系人 :"
                :content="getData.accLargePeoson"
                :width="cardDIvWidth1"
                display="inline-block"
              ></card-div>
              <card-div
                title="联系方式 :"
                :content="getData.largerPersonTel"
                :width="cardDIvWidth1"
                display="inline-block"
                style="margin-left: 10px"
              ></card-div>
            </div>
            <div>
              <card-div
                title="银行客户经理 :"
                :content="getData.bankManage"
                :width="cardDIvWidth1"
                display="inline-block"
                class
              ></card-div>
              <card-div
                title="联系方式 :"
                :content="getData.managerTel"
                :width="cardDIvWidth1"
                display="inline-block"
                style="margin-left: 10px"
                class
              ></card-div>
            </div>
          </div>
        </div>
      </div>
    </account-card>
    <account-card class="content-b-m" title="其它信息">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <div class="account-content-container">
            <div>
              <card-div
                title="备注 :"
                :content="getData.comment"
                :width="cardDIvWidth"
                display="inline-block"
                class
              ></card-div>
            </div>
          </div>
        </div>
      </div>
    </account-card>
  </div>
</template>

<script>
import { openAccountCheck } from "@/api/account/account.js";
import { requestSuccess, isStore } from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import { dateFormat } from "@/libs/date.js";
export default {
  name: "account-information",
  components: {
    accountCard,
    cardDiv
  },
  data() {
    return {
      getData: "",
      cardDIvWidth: "110px",
      cardDIvWidth2: "110px",
      cardDIvWidth1: "140px"
    };
  },
  methods: {
    dateFormat: dateFormat,
    init() {
      this.getList();
    },
    async getList() {
      let id = this.isStore();
      this.getData = requestSuccess(
        this,
        await openAccountCheck({ id: id }),
        false
      );
      if (
        this.getData.accId != null &&
        this.getData.accId != "" &&
        this.getData.accId != undefined
      ) {
        this.setStore("accountCheck", this.getData.accId); //保存id 以供其他页面使用
      }
    },
    isStore: isStore
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
@import "../../../../../styles/customize.less";
@import "../../openAccountManagement.less";
#internet-banking {
  .content-b-m {
    margin-bottom: 30px;
  }
  .span {
    padding-right: 8px;
  }
  .title {
    font-size: 20px;
    width: 100%;
    &-right {
      float: right;

      &-account {
        margin-right: 50px;
      }
      &-action {
        margin-right: 30px;
      }
    }
  }
  .account-content {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    &-container {
      padding-left: 40px;
    }
    .cardItem {
      flex: 1;
    }
  }
  .check {
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
