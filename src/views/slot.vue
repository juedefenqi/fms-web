<template>
  <div id="app">
    <button @click="modalShow">新增弹框</button>
    <modal-information  :title="title" :value="modal" @changeVal="changeVal" :modalWidth="modalWidth">
      <div id="application">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="预计注销日期 :">
            <picker-date v-model="formValidate.esCancelDate" style="width: 200px"></picker-date>
          </FormItem>
          <FormItem label="注销原因 :" prop="cancelRea">
            <Input
              v-model="formValidate.cancelRea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入注销原因"
            />
          </FormItem>
          <FormItem label="预计注销日期 :">
            <picker-date v-model="formValidate.esCancelDate" style="width: 200px"></picker-date>
          </FormItem>
          <FormItem label="注销原因 :" prop="cancelRea">
            <Input
              v-model="formValidate.cancelRea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入注销原因"
            />
          </FormItem>
          <FormItem label="预计注销日期 :">
            <picker-date v-model="formValidate.esCancelDate" style="width: 200px"></picker-date>
          </FormItem>
          <FormItem label="注销原因 :" prop="cancelRea">
            <Input
              v-model="formValidate.cancelRea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入注销原因"
            />
          </FormItem>
        </Form>
    </div>
    </modal-information>
  </div>
</template>

<script>
import selectInput from "@/views/my-components/account/select-input.vue";
import accountHeard from "@/components/header/account-heard";
import { requestSuccess, isStore, objectAttr } from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import { accountHeader } from "@/libs/array.js";
import {updateCancellationApplication} from "@/api/account/cancellation.js";
import {openAccountCheck} from "@/api/account/account.js";
import { extension } from "@/views/account/data/form.js";
import { generateNum} from "@/api/index.js";
export default {
  components: {
    selectInput,
    accountHeard,
    cardDiv,
    accountCard
  },
  data() {
    return {
      isShow:false,
      title:"注销申请",
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      accountHeardData: accountHeader.slice(0, 5),
      getData: "",
      getInfo: "",
      modal: false,
      formValidate: extension.formValidate,
      ruleValidate: extension.ruleValidate,
      modalWidth:800
    };
  },
  methods: {
    init() {
      // this.cancellationInfo();
      // this.getList();
    },
    modalShow() {
      this.modal = !this.modal
    },
    changeVal(val) {
      this.modal = val
    },
    isStore: isStore,
    async getList() {
      this.getData = requestSuccess(this, await generateNum({operationFlag:'LOGOUT'}), false);
      objectAttr(this.formValidate, this.getData); //添加对象a得到b的属性
    },
    async cancellationInfo() {
      let id = this.isStore();
      this.formValidate = requestSuccess(this, await openAccountCheck({ id: id }), false);
    },
    async insertOrUpdate(item) {
      let data = {};
      data = item;
      delete data.id; //删除id 添加新的保存
      requestSuccess(this, await updateCancellationApplication(item), true);
    },
    handleSave(name) {
      //保存校验
      // this.insertOrUpdate(this[name]);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.insertOrUpdate(this[name]);
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    // handleSubmit(name) {
    //   // 提交校验
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.insertOrUpdate();
    //     } else {
    //       this.$Message.error("提交失败!");
    //     }
    //   });
    // },
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
  .ivu-card-bordered{
    border: none !important;
  }
  @import "./account/accountApplication/index";
}
</style>
