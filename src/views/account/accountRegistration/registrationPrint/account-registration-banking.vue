<template>
  <div class="wrapper">
    <Table border :columns="columns" :data="data" ref="table" sortable="custom" @on-selection-change="selectionChange" v-if="formValidate.isOpenEbank"></Table>
    <!-- 网银证书添加弹框 -->
    <Modal :title="modalTitle" v-model="modal" :mask-closable="false" :width="1000">
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate1" class="modal-form">
        <FormItem label="编号:" prop="ukeyId" style="margin-top: 24px;">
          <Input v-model="form.ukeyId" style="width:44%" placeholder="请输入" />
        </FormItem>
        <div class="modalFlex">
          <FormItem label="类型" prop="ukeyType" class="flexVal">
            <RadioGroup type="button" v-model="form.ukeyType">
              <Radio
                v-for="(item,index) in certificateType"
                :key="item.index"
                :label="item.value"
                style="margin-right: 10px;"
                border
              >{{item.title}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="角色" prop="ukeyRole" class="flexVal">
            <RadioGroup type="button" v-model="form.ukeyRole">
              <Radio
                v-for="(item,index) in certificateRole"
                :key="item.index"
                :label="item.value"
                style="margin-right: 10px;"
                border
              >{{item.title}}</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div class="modalFlex">
          <FormItem label="单笔限额:" prop="singleQuota" class="flexVal">
            <Input v-model="form.singleQuota" style="width:100%" placeholder="请输入...">
              <span slot="append">元</span>
            </Input>
          </FormItem>
          <FormItem label="单日限额:" prop="dayQuota" class="flexVal">
            <Input v-model="form.dayQuota" style="width:100%" placeholder="请输入...">
              <span slot="append">元</span>
            </Input>
          </FormItem>
        </div>
        <div class="modalFlex">
          <FormItem label="生效日:" class="flexVal">
            <!-- <DatePicker
              v-model="form.effectiveDate"
              format="yyyy-MM-dd"
              type="date"
              placeholder="请选择"
            ></DatePicker> -->
            <Row class="date-line">
              <pickerDate
                v-model="form.effectiveDate"
                type="date"
                class="date-w"
                placeholder="请选择"
                :options="startDateOption"
                @change="onstartDateChange"
              ></pickerDate>
            </Row>
          </FormItem>
          <FormItem label="到期日:" class="flexVal">
            <!-- <DatePicker v-model="form.dueDate" format="yyyy-MM-dd" type="date" placeholder="请选择"></DatePicker> -->
            <Row class="date-line">
              <pickerDate
                type="date"
                class="date-w"
                placeholder="请选择"
                :options="endDateOption"
                @change="onendDateChange"
                v-model="form.dueDate"
              ></pickerDate>
            </Row>
          </FormItem>
        </div>
        <div class="modalFlex">
          <FormItem label="证书登记人:" prop="ukeyRegistrant" class="flexVal">
            <Input v-model="form.ukeyRegistrant" style="width:100%" placeholder="请输入" />
          </FormItem>
          <FormItem label="证书登记人身份证号:" prop="reIdCard" class="flexVal">
            <Input v-model="form.reIdCard" style="width:100%" placeholder="请输入" />
          </FormItem>
        </div>
        <div class="modalFlex">
          <FormItem label="保管人:" prop="keeper" class="flexVal">
            <Input v-model="form.keeper" style="width:100%" placeholder="请输入" />
          </FormItem>
          <FormItem label="保管人身份证号:" prop="idCard" class="flexVal">
            <Input v-model="form.idCard" style="width:100%" placeholder="请输入" />
          </FormItem>
        </div>
        <div class="modalFlex">
          <FormItem label="已上收" prop="isHandin" class="flexVal">
            <Checkbox v-model="form.isHandin">是</Checkbox>
          </FormItem>
          <FormItem label="未上收原因" prop="noHandinReason" class="reasonText flexVal" v-if="!form.isHandin">
            <Input v-model="form.noHandinReason" style="width:100%" placeholder="请输入原因" />
          </FormItem>
          <FormItem label="未上收原因" prop="noHandinReason" class="reasonText flexVal" v-if="form.isHandin">
            <Input v-model="form.noHandinReason" style="width:100%" placeholder="请输入原因" disabled/>
          </FormItem>
        </div>
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
import { dictData } from "@/api/index.js";
import { requestSuccess } from "@/libs/tool.js";
export default {
  name: "account-registration-banking",
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
            type: "软证书",
            role: "制单",
            singleQquota: "1000",
            singleDayLimit: "1000",
            effectiveDdate: "2019-11-11",
            DueDate: "2019-11-11",
            Certificate: "王大为3300112233445662334",
            Custodian: "王大为3300112233445662334",
            Collection: "已上收",
            operation: "编辑/删除"
          },
          {
            num: "8974141414",
            type: "软证书",
            role: "制单",
            singleQquota: "1000",
            singleDayLimit: "1000",
            effectiveDdate: "2019-11-11",
            DueDate: "2019-11-11",
            Certificate: "王大为3300112233445662334",
            Custodian: "王大为3300112233445662334",
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
        { title: "编号", key: "ukeyId", align: "center" },
        {
          title: "类型",
          key: "ukeyType",
          align: "center",
          render: (h, params) => {
            let type = params.row.ukeyType;
            let content = "";
            this.certificateType.forEach(item => {
              if (item.value == type) {
                content = item.title;
              }
            });
            return h(
              "div",
              {
                style: {}
              },
              [h("div", {}, content)]
            );
          }
        },
        {
          title: "角色",
          key: "ukeyRole",
          align: "center",
          render: (h, params) => {
            let type = params.row.ukeyRole;
            let content = "";
            this.certificateRole.forEach(item => {
              if (item.value == type) {
                content = item.title;
              }
            });
            return h(
              "div",
              {
                style: {}
              },
              [h("div", {}, content)]
            );
          }
        },
        { title: "单笔限额（元）", key: "singleQuota", align: "center" },
        { title: "单日限额（元）", key: "dayQuota", align: "center" },
        {
          title: "生效日",
          key: "effectiveDate",
          align: "center",
          render: (h, params) => {
            let date = this.dateFormat(params.row.effectiveDate);
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
          title: "到期日",
          key: "dueDate",
          align: "center",
          render: (h, params) => {
            let date = this.dateFormat(params.row.dueDate);
            return h(
              "span",
              {
                style: {}
              },
              date
            );
          }
        },
        { title: "证书登记人", key: "ukeyRegistrant", align: "center" },
        { title: "保管人", key: "keeper", align: "center" },
        {
          title: "上收情况",
          key: "isHandin",
          align: "center",
          render: (h, params) => {
            let content =
              params.row.isHandin == 0
                ? "未上收"
                : params.row.isHandin == 1
                ? "已上收"
                : "";
            let color =
              params.row.isHandin == 0
                ? "#ed4014"
                : params.row.isHandin == 1
                ? "#19be6b"
                : "";
            let content1 = params.row.noHandinReason;
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "div",
                  {
                    style: {
                      color: color
                    }
                  },
                  content
                ),
                h("div", {}, content1)
              ]
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          className: "",
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
                          ukeyId: data.ukeyId,
                          ukeyType: data.ukeyType,
                          ukeyRole: data.ukeyRole,
                          singleQuota: data.singleQuota, //单笔限额
                          dayQuota: data.dayQuota, //单日限额
                          effectiveDate: data.effectiveDate, //生效日
                          dueDate: data.dueDate, //到期日
                          ukeyRegistrant: data.ukeyRegistrant,
                          reIdCard: data.reIdCard,
                          keeper: data.keeper,
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
        //operationStatus
      ],
      submitLoading: false,
      modal: false, // 添加或编辑显示
      modalTitle: "网银证书", // 添加或编辑标题
      certificateType: [],
      certificateRole: [],
      form: {},
      formReset: {
        // 添加或编辑表单对象初始化数据
        ukeyId: "",
        ukeyType: "",
        ukeyRole: "",
        singleQuota: "", //单笔限额
        dayQuota: "", //单日限额
        effectiveDate: "", //生效日
        dueDate: "", //到期日
        ukeyRegistrant: "",
        reIdCard: "",
        keeper: "",
        idCard: "",
        isHandin: false,
        noHandinReason: ""
      },
      // 表单验证规则
      formValidate1: {
        ukeyId: [{ required: true, message: "不能为空", trigger: "blur" }],
        ukeyType: [{ required: true, message: "不能为空", trigger: "change" }],
        ukeyRole: [{ required: true, message: "不能为空", trigger: "change" }],
        singleQuota: [{ required: true, message: "不能为空", trigger: "blur" }],
        dayQuota: [{ required: true, message: "不能为空", trigger: "blur" }],
        effectiveDate: [
          { required: true, type: "date", message: "不能为空", trigger: "blur" }
        ],
        dueDate: [
          { required: true, type: "date", message: "不能为空", trigger: "blur" }
        ],
        ukeyRegistrant: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        reIdCard: [{ required: true, message: "不能为空", trigger: "blur" }],
        keeper: [{ required: true, message: "不能为空", trigger: "blur" }],
        idCard: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      startDateOption: {},
      endDateOption: {},
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
    init() {
      this.dicData("ukey_type", "certificateType"); // 获取网银证书类型
      this.dicData("ukey_role", "certificateRole"); // 获取网银证书角色
      this.data = this.formValidate.bankUkeyList
    },
    dateFormat: dateDay,
    async dicData(item, key) {
      this[key] = requestSuccess(this, await dictData(item), false);
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        let data = JSON.parse(JSON.stringify(this.form)); //浅拷贝
        if (valid) {
          data.dueDate = this.dateFormat(data.dueDate);
          data.effectiveDate = this.dateFormat(data.effectiveDate); //生效日
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
.modalFlex{
  display: flex;
}
.flexVal{
  flex: 1;
}
&/deep/ .ivu-form .ivu-form-item-label{
  line-height: 19px !important;
}
</style>