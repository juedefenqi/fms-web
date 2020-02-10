<template>
  <div class="wrapper">
    <Table border :columns="columns" :data="formValidate.fcBankSealorsignList" ref="table" sortable="custom" @on-selection-change="selectionChange"></Table>
    <Modal :title="modalTitle" v-model="modal" :mask-closable="false" :width="650">
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate1" class="modal-form">
        <FormItem label="印鉴:" prop="sealType" style="margin-top: 24px;">
          <Input v-model="form.sealType" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="授权签字人:" prop="authoPerson">
          <Input v-model="form.authoPerson" style="width:100%" placeholder="请输入" />
        </FormItem>
        <FormItem label="保管人:" prop="keeper">
          <Input v-model="form.keeper" style="width:100%" placeholder="请输入" />
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
export default {
  name: "account-registration-print",
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
            sealType: "法人章",
            authoPerson: "王大为",
            keeper: "李明"
          },
          {
            sealType: "法人章",
            authoPerson: "王大为",
            keeper: "李明"
          }
        ];
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    content:{
      type: Object,
        default: ()=>{
          return {

          }
        }
    },
    selectall:{
      type: String,
      default:'',
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
      isModify: false,
      isKey: null,
      data: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "序号",
          key: "index333",
          type: 'index',
          width: 60,
          align: 'center'
        },
        { title: "印鉴", key: "sealType", align: "center" },
        { title: "授权签字人", key: "authoPerson", align: "center" },
        { title: "保管人", key: "keeper", align: "center" },
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
                          sealType: data.sealType,
                          authoPerson: data.authoPerson,
                          keeper: data.keeper
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
      modalTitle: "印鉴/签字人编辑", // 添加或编辑标题
      form: {},
      formReset: {
        // 添加或编辑表单对象初始化数据
        sealType: "",
        authoPerson: "",
        keeper: ""
      },
      // 表单验证规则
      formValidate1: {
        sealType: [{ required: true, message: "不能为空", trigger: "blur" }],
        authoPerson: [{ required: true, message: "不能为空", trigger: "blur" }],
        keeper: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      getIndex: ''
    };
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formReset)); //浅拷贝
    this.init();
  },
  watch: {
    modalOne(val){
      if(this.switch){
        this.modal = true;
        this.isModify = true; //修改状态
        this.form=this.selectall;
        this.getIndex = this.getArrIndex(this.formValidate.fcBankSealorsignList,this.selectall);
      }else{
        this.$Message.error("请选择一条信息进行操作!");
      }
    },
    modalDetele(val){
      if(this.switch){
        //编辑内容
        this.getIndex = this.getArrIndex(this.formValidate.fcBankSealorsignList,this.selectall);
        this.formValidate.fcBankSealorsignList.splice(this.getIndex, 1);
        this.switch = false;
      }else{
        this.$Message.error("请选择一条信息进行操作!");
      }
    },
    modal(val) {
      this.$emit("modalReturn", val);
      if (!val) {
        this.form = JSON.parse(JSON.stringify(this.formReset)); //浅拷贝重置
      }
    },
    data(val) {
      this.$emit("changelReturn", val);
    }
  },
  computed: {},
  methods: {
    init(){
      //this.data = this.formValidate.fcBankSealorsignList
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        let data = JSON.parse(JSON.stringify(this.form)); //浅拷贝
        if (valid) {
          this.modal = false;
          if (this.isModify) {
            //是否编辑态
            this.formValidate.fcBankSealorsignList.splice(this.getIndex, 1, data);
            this.data.splice(this.getIndex, 1, data);
            this.isModify = false; //修改后重置编辑状态
            this.switch = false;
          } else {
            this.formValidate.fcBankSealorsignList.push(data);
            this.data.push(data);
            this.switch = false;
          }
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
    getArrIndex(arr, obj) {
      let index = null;
      let key = Object.keys(obj)[0];
      arr.every(function(value, i) {
          if (value[key] === obj[key]) {
              index = i;
              return false;
          }
          return true;
      });
      return index;
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