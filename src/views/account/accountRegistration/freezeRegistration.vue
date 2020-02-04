<template>
  <div id="application">
    <div class="header">
      <Button type="success" class="accountBtn">保存</Button>
      <Button type="success" class="accountBtn">提交</Button>
      <Button type="default" class="accountBtn">取消</Button>
      <Button type="default" class="accountBtn">流程</Button>
      <Button type="default" class="accountBtn">影像与附件</Button>
      <Button type="default" class="accountBtn">打印</Button>
      <Button type="default" class="accountBtn btnReturn">返回</Button>
    </div>
    <div class="content">
      <div class="applicationInfo applicationUnit">
        <div v-for="(value,key,index) in userInfo">
          <span>{{key}}:</span>
          <span class="userInfoVal">{{value}}</span>
        </div>
      </div>

      <div class="baseInfo">
        <p class="baseTitle">冻结登记</p>
        <div class="infoContent">
          <div class="infoDetail" style="display: block;">
            <span class="detailTitle">账户:</span>
            <Button
              @click="$router.push({name:'open-account-check'})"
              class="checkDetail"
            >2300041041251251312231 中铁二十三局集团双流高速路项目</Button>
          </div>
          <div class="infoDetail">
            <span class="detailTitle">{{radioButton1.title}}:</span>
            <div class="radioGroup">
              <RadioGroup
                v-model="button1"
                type="button"
                v-for="(item,index) in radioButton1.radioBtnVal"
                :key="'radioButton'+index"
              >
                <Radio :label="item" class="radio"></Radio>
              </RadioGroup>
            </div>
          </div>
          <commonInput :inputTitle="accountInfoInputTitle"></commonInput>
          <div class="infoDetail">
            <span class="detailTitle">冻结日期:</span>
            <div class="dataPicker">
              <Col span="12">
                <DatePicker type="date" placeholder="请选择1" style="width: 200px"></DatePicker>
              </Col>
              <!-- <Col class="dataPickerConnect">至</Col> -->
              <Col span="12">
                <DatePicker
                  type="daterange"
                  placement="bottom-end"
                  placeholder="请选择2"
                  style="width: 200px"
                ></DatePicker>
              </Col>
            </div>
          </div>
          <div class="infoDetail infoTextarea">
            <span class="detailTitle">冻结原因:</span>
            <Input
              v-model="value8"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入冻结原因"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/views/my-components/account/common-input.vue";
export default {
  components: {
    commonInput
  },
  data() {
    return {
      userInfo: {
        登记单位: "中铁二十三局集团有限公司母公司",
        登记人: "王山007",
        日期: "2018-01-03",
        登记单号: "2018011300434"
      },
      radioButton1: {
        title: "冻结类型",
        radioBtnVal: ["不收不付", "只收不付", "部分冻结"]
      },
      modal1: false,
      accountInfoInputTitle: ["冻结金额"]
    };
  },
  methods: {
    baseInfoDetail() {
      this.modal1 = true;
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
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
    margin-top: 70px;
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
  .radioGroup {
    display: inline-block;
  }
  .dataPicker {
    display: inline-block;
    vertical-align: middle;
  }
  .dataPickerConnect {
    padding: 0 10px;
  }
  .checkDetail {
    border: none;
    color: #199ed8;
  }
}
</style>