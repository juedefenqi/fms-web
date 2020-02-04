<template>
  <div class="wrapper">
    <Table border :columns="columns" :data="data" ref="table" sortable="custom" @on-selection-change="selectionChange" v-if="formValidate.isOpenCipherware"></Table>
    <Modal :title="modalTitle" v-model="modal" :mask-closable="false" :width="650">
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate1" class="modal-form">
        <FormItem label="编号:" prop="cipherwareId" style="margin-top: 24px;">
          <Input v-model="form.cipherwareId" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="领用日期:" prop="getDate">
          <DatePicker v-model="form.getDate" type="date" format="yyyy-MM-dd" placeholder="请选择"></DatePicker>
        </FormItem>
        <FormItem label="持有人:" prop="getPerson">
          <Input v-model="form.getPerson" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="持有人身份证号:" prop="idCard">
          <Input v-model="form.idCard" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="已上收" prop="isHandin">
          <!-- <CheckboxGroup v-model="form.isHandin">
                        <Checkbox label="是"></Checkbox>
          </CheckboxGroup>-->
          <Checkbox v-model="form.isHandin">是</Checkbox>
        </FormItem>
        <FormItem label="未上收原因:" prop="noHandinReason" class="reasonText" v-if="!form.isHandin">
          <Input v-model="form.noHandinReason" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="未上收原因:" prop="noHandinReason" class="reasonText" v-if="form.isHandin">
          <Input v-model="form.noHandinReason" style="width:100%" placeholder="请输入" disabled/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dateDay } from "@/libs/date.js";
export default {
  name: "account-registration-cipher",
  components: {},
  props: {
    modalOne:{
        type: Boolean,
        default: false
    },
    modalDetele:{
        type: Boolean,
        default: false
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            num: "8974141414",
            effectiveDdate: "2019-11-11",
            Certificate: "王大为3300112233445662334",
            Collection: "已上收",
            operation: "编辑/删除"
          },
          {
            num: "8974141414",
            effectiveDdate: "2019-11-11",
            Certificate: "王大为3300112233445662334",
            Collection: "未上收",
            operation: "编辑/删除"
          }
        ];
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    formValidate:{
      type: Object|Array,
      default:()=>{

          return {

          }
      },
    },
  },
  data() {
    return {
      data: [],
      isModify: false,
      isKey: null,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "密码器编号",
          key: "cipherwareId"
        },
        {
          title: "领用日期",
          key: "getDate",
          render: (h, params) => {
            let date = this.dateFormat(params.row.getDate);
            return h(
              "span",
              {
                style: {}
              },
              date
            );
          }
        },
        {
          title: "持有人",
          key: "getPerson"
        },
        {
          title: "上收情况",
          key: "isHandin",
          render: (h, params) => {
            let data = params.row.isHandin;
            let content = data == 1 ? "已上收" : "未上收";
            let content1 = "原因 :";
            let content2 = params.row.noHandinReason;
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "div",
                  {
                    style: {},
                    on: {}
                  },
                  content
                ),
                h(
                  "div",
                  {
                    style: {
                      display: data == 1 ? "none" : "block"
                    },
                    on: {}
                  },
                  [
                    h(
                      "span",
                      {
                        style: {},
                        on: {}
                      },
                      content1
                    ),
                    h(
                      "span",
                      {
                        style: {},
                        on: {}
                      },
                      content2
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            let content = "编辑";
            let content1 = "删除";
            let data = params.row;
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
                      color: "#2d8cf0",
                      marginRight: "10px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.modal = true;
                        this.isModify = true; //修改状态
                        this.isKey = data._index; //保存位置
                        this.form = {
                          cipherwareId: data.cipherwareId,
                          getDate: data.getDate,
                          getPerson: data.getPerson,
                          idCard: data.idCard,
                          isHandin: data.isHandin == 1 ? true : false,
                          noHandinReason: data.noHandinReason
                        };
                      }
                    }
                  },
                  content
                ),
                h(
                  "span",
                  {
                    style: {
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.data.splice(params.index, 1);
                      }
                    }
                  },
                  content1
                )
              ]
            );
          }
        }
      ],
      submitLoading: false,
      modal: false, // 添加或编辑显示
      modalTitle: "支付密码器编辑", // 添加或编辑标题
      form: {},
      formReset: {
        cipherwareId: "",
        getDate: "",
        getPerson: "",
        idCard: "",
        isHandin: false,
        noHandinReason: ""
      },
      // 表单验证规则
      formValidate1: {
        cipherwareId: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        getDate: [
          {
            required: true,
            type: "date",
            message: "不能为空",
            trigger: "change"
          }
        ],
        getPerson: [{ required: true, message: "不能为空", trigger: "blur" }],
        idCard: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formReset)); //浅拷贝
  },
  watch: {
    modal(val) {
      this.$emit("modalReturn", val);
      if (!val) {
        this.form = JSON.parse(JSON.stringify(this.formReset)); //浅拷贝重置
      }
    },
    data(val) {
      this.$emit("changelReturn", val);
    },
    modalOne(val){
      if(this.switch){
        this.modal = true;
        this.isModify = true; //修改状态
        this.form=this.selectall;
      }else{
        this.$Message.error("请选择一条信息进行操作!");
      }
    },
    modalDetele(val){
      if(this.switch){
        //编辑内容
      }else{
        this.$Message.error("请选择一条信息进行操作!");
      }
    },
  },
  computed: {},
  methods: {
    dateFormat: dateDay,
    handleSubmit() {
      this.$refs.form.validate(valid => {
        let data = JSON.parse(JSON.stringify(this.form)); //浅拷贝
        data.getDate = this.dateFormat(this.form.getDate); //日期转换
        if (valid) {
          if (data.isHandin) {
            //但选数值转换
            data.isHandin = 1;
          } else {
            data.isHandin = 0;
          }
          if (this.isModify) {
            //是否编辑态
            this.data.splice(this.isKey, 1, data);
            this.isModify = false; //修改后重置编辑状态
            this.switch = false;
          } else {
            this.data.push(data);
            this.switch = false;
          }
          this.modal = false;
        }
      });
    },
    selectionChange(item) {
      if (item.length == 1) {
        this.switch = true; //开关头部接受一个id
        this.selectall = item[0]; //传递id
      } else {
        this.switch = false; //不唯一失效
        this.selectall = "";
      }
    },
    init(){
      this.data = this.formValidate.cipherwareList
    },
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
&/deep/ .ivu-form .ivu-form-item-label{
  line-height: 19px !important;
}
&/deep/ .ivu-modal-body{
  padding: 16px 84px !important;
}
</style>