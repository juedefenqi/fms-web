<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <div class="my-from-child">
        <FormItem label="冻结类型 : " prop="freezeType">
          <Select v-model="formValidate.freezeType" clearable style="width: 270px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="冻结金额 :" prop="freezeAmount">
          <Input
            v-model="formValidate.freezeAmount"
            placeholder="请输入..."
            type="number"
            style="width: 295px"
          >
            <span slot="append">元</span>
          </Input>
        </FormItem>
        <Row class="date-line">
          <FormItem label="冻结日期 :" prop="freezeBeginDate">
            <pickerDate
              v-model="formValidate.freezeBeginDate"
              type="date"
              class="date-w"
              placeholder="开始时间"
              :options="startDateOption"
              @change="onstartDateChange"
            ></pickerDate>
          </FormItem>
        </Row>
        <Row class="date-line1">至</Row>
        <Row class="date-line">
          <FormItem label-width="0" prop="freezeEndDate">
            <pickerDate
              type="date"
              class="date-w"
              placeholder="结束时间"
              :options="endDateOption"
              @change="onendDateChange"
              v-model="formValidate.freezeEndDate"
            ></pickerDate>
          </FormItem>
        </Row>

        <FormItem label="冻结原因 :" prop="freezeRea">
          <Input
            v-model="formValidate.freezeRea"
            type="textarea"
            placeholder="请输入冻结原因"
            style="width:70%"
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
import { accFreezeSave } from "@/api/account/accFreeze.js";
import { accountFreezeType } from "@/views/account/data/status.js";
import { isEmpty } from "@/libs/validate.js";
export default {
  name: "account-freeze",
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
      typeList: accountFreezeType,
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      reset: {
        freezeType: 0,
        freezeBeginDate: "",
        freezeEndDate: "",
        freezeAmount: 0,
        freezeRea: ""
      },
      formValidate: {
        freezeType: 0,
        freezeBeginDate: "",
        freezeEndDate: "",
        freezeAmount: 0,
        freezeRea: ""
      },
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      ruleValidate: {
        freezeType: [
          {
            required: true,
            message: "请选择",
            type: "number",
            trigger: "change"
          }
        ],
        freezeBeginDate: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        freezeEndDate: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        freezeAmount: [{ required: true, validator: isEmpty, trigger: "blur" }],
        freezeRea: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
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
  methods: {
    init() {},
    getList(val) {
      console.log(val);
      this.formValidate.id = val.id;
      this.formValidate.accId = val.accId;
    },
    async extensionSave(name) {
      this.loading = true;
      requestSuccess(this, await accFreezeSave(name), true);
    },
    cancel(name) {
      this.$emit("change", "noRef");
    },
    ok(name) {
      this.$refs[name].validate(valid => {
        console.log(this[name]);
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
          return startDate > new Date(endDate);
        }
      };
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
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
&/deep/ .ivu-form .ivu-form-item-label {
  color: #999999;
}

&/deep/ .ivu-input-group-append {
  border: 0;
  color: #999999 !important;
  background-color: transparent;
}

&/deep/ .ivu-radio-inner {
  display: none;
}

.account-main {
  margin-top: 70px;
  padding-bottom: 40px;
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
</style>
