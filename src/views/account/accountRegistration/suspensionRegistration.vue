<template>
  <div id="application">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
      <div class="my-from-child">
        <FormItem label="久悬期日 :" prop="hangDate">
          <pickerDate
            :options="endDateOption"
            v-model="formValidate.hangDate"
            @change="onendDateChange"
          ></pickerDate>
        </FormItem>
        <FormItem label="久悬原因 :" prop="hangRea">
          <Input
            v-model="formValidate.hangRea"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入久悬原因"
          />
        </FormItem>
      </div>
      <div class="my-footer">
        <Button class="my-footer-button" size="large" @click="cancel('formValidate')">取 消</Button>
        <Button size="large" type="primary" @click="ok('formValidate')">确 定</Button>
      </div>
    </Form>
    <Modal v-model="modal3" width="300" @on-ok="extensionSave(formValidate)">
      <div style="text-align:center;padding-top:30px">
        <span>
          <Icon type="ios-alert" color="#2d8cf0" size="18" />
          <span>是否确定提交!</span>
        </span>
      </div>
    </Modal>
  </div>
</template>
<script>
import { requestSuccess } from "@/libs/tool.js";
import { overhangSave } from "@/api/account/overhang.js";
export default {
  props: {
    id: {
      type: Object,
      default: () => {
        return {};
      }
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      modal3: false,
      loading: false,
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      reset: {
        hangDate: "",
        deferRea: ""
      },
      formValidate: {
        hangDate: "",
        hangRea: ""
      },

      ruleValidate: {
        hangDate: [{ required: true, message: "请选择", trigger: "blur" }],
        hangRea: [
          //事项原因
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      startDateOption: {},
      endDateOption: {}
    };
  },
  methods: {
    init() {},
    async getList(val) {
      this.formValidate.accId = val.accId;
      this.formValidate.id = val.id;
      // let data = requestSuccess(this, await ApplyInfo({ id: val }), false);
      // this.formValidate.deferOriDate = data.accDueDate;
      // console.log(data);
      // this.onstartDateChange(data.accDueDate);
    },
    async extensionSave(name) {
      this.loading = true;
      console.log(name);
      requestSuccess(this, await overhangSave(name), true);
    },
    cancel(name) {
      this.$emit("change", "noRef");
    },
    ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal3 = true;
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
          return new Date(startDate) > new Date(endDate);
        }
      };
    }
  },
  watch: {
    modal(val) {
      if (val) {
        this.getList(this.id);
      } else {
        this.formValidate = JSON.parse(JSON.stringify(this.reset));
        this.handleReset("formValidate");
      }
    },
    loading(val) {
      if (!val) {
        this.$emit("change", !this.modal);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#application {
  .my-from-child {
    padding: 24px 24px 0 24px;
    border-bottom: 1px solid #e8eaec;
  }
  .my-footer {
    text-align: center;
    padding: 20px 0;
  }
  .my-footer-button {
    margin-right: 24px;
  }
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
  }
  @import "../accountApplication/index";
}
</style>
