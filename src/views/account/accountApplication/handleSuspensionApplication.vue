<template>
  <div id="application">
    <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard>
    <Card style="margin-top:70px;">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="134">
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
            <account-card title="久悬处理申请" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <FormItem label="账户 :">
                    <span class="checkDetail">{{formValidate.accId}}</span>
                  </FormItem>
                  <div class="infoDetail">
                    <FormItem label="处理方式 :" prop="maComment">
                      <RadioGroup
                        v-model="formValidate.hangDealWay"
                        type="button"
                        v-for="(item,index) in radioButton1"
                        :key="'radioButton'+index"
                      >
                        <Radio :label="item.index" class="radio">{{item.title}}</Radio>
                      </RadioGroup>
                    </FormItem>
                  </div>

                  <FormItem label="处理原因 :" prop="hangRea">
                    <Input
                      v-model="formValidate.hangRea"
                      type="textarea"
                      placeholder="请输入处理原因"
                      style="width:60%"
                    />
                  </FormItem>
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
import { generateNum } from "@/api/index.js";
import { requestSuccess, isStore } from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import { hangApply } from "@/api/account/overhang.js";
import { overhang } from "@/views/account/data/form.js";
import { ApplyInfo } from "@/api/index.js";
export default {
  name: "handleSuspensionApplication",
  components: {
    selectInput,
    accountHeard,
    cardDiv,
    accountCard
  },
  data() {
    return {
      accountHeardData: [
        {
          type: "primary",
          content: "保存"
        },
        {
          type: "primary",
          content: "提交"
        },
        {
          type: "default",
          content: "取消"
        },
        {
          type: "default",
          content: "流程"
        },
        {
          type: "default",
          content: "影像与附件"
        },
        {
          type: "default",
          content: "打印"
        }
      ],
      getData: "",
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      thawData: ["处理方式"],
      radioButton1: [
        { title: "解除久悬", index: 1 },
        { title: "销户", index: 2 }
      ],
      formValidate: overhang.formValidate,
      maComment1: "",
      ruleValidate: overhang.ruleValidate
    };
  },
  methods: {
    init() {
      this.getList();
    },
    isStore: isStore,
    async getList() {
      const id = this.isStore();
      this.getData = requestSuccess(this, await generateNum({operationFlag:'HAND'}), false);

      let data = requestSuccess(this, await ApplyInfo({ id: id }), false);
      this.formValidate.accId = data.accId;
    },
    async insertOrUpdate(item) {
      let data = {};
      if (item.id) {
        //存在id 就走修改
        requestSuccess(this, await hangApply(data), true);
      } else {
        data = item;
        delete data.id; //删除id 添加新的保存
        requestSuccess(this, await hangApply(data), true);
      }
    },
    contentClick() {
      window.location.href = "https://www.iviewui.com/docs/introduce";
    },
    baseInfoDetail() {
      this.modal1 = true;
    },
    handleSubmit(name) {
      //表单校验
      this.$refs[name].validate(valid => {
        if (valid) {
          this.insertOrUpdate(this[name]);
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleClick(item) {
      let [index] = arguments;
      if (index == 0) {
        //保存功能
        this.handleSubmit("formValidate");
      }
      if (index == 1) {
        //提交功能
        //this.handleSubmit("formValidate");
      }
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
  }
  @import "./index";
}
</style>
