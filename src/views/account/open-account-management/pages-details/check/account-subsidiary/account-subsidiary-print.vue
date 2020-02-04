<template>
  <div id="account-subsidiary-print">
    <account-card class="content-b-m" title="印鉴/签字人" icon="icon-plus" @iconClick="addClick">
      <div slot="content" class="account-content">
        <div class="cardItem">
          <Row>
            <Table
              :loading="loading"
              border
              :columns="columns"
              :data="data"
              ref="table"
              sortable="custom"
            ></Table>
          </Row>
        </div>
      </div>
    </account-card>
    <!-- 印签/签字人添加弹框 -->
    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :closable="false"
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate" class="modal-form">
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
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import accountCard from "@/components/card/accountCard.vue";
import {
  openAccountSubsidiary,
  subsidiaryInformation,
  updateSubInformation,
  deleteSubInformation
} from "@/api/account/account.js";
import { requestSuccess } from "@/libs/tool.js";
export default {
  name: "account-subsidiary-print",
  components: {
    accountCard
  },
  data() {
    return {
      loading: true,
      data: [],
      columns: [
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
                        this.show(params.index);
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
                        let id = this.data[params.index].id;
                        this.confirm(id);
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
      modalVisible: false, // 添加或编辑显示
      modalTitle: "印鉴/签字人编辑", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        sealType: "",
        authoPerson: "",
        keeper: ""
      },
      // 表单验证规则
      formValidate: {
        sealType: [{ required: true, message: "不能为空", trigger: "blur" }],
        authoPerson: [{ required: true, message: "不能为空", trigger: "blur" }],
        keeper: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init() {
      this.getList();
    },
    async getList() {
      this.loading = true;
      // let res=requestSuccess(this,await openAccountSubsidiary(),false);
      // this.data=res.record
      let accountCheck = this.getStore("accountCheck");
      let accId = { accId: accountCheck };
      let result = requestSuccess(
        this,
        await subsidiaryInformation(accId),
        false
      );
      this.data = result.BankSealorsign;
    },
    addClick() {
      this.modalVisible = true;
      this.show();
    },
    handleCancel() {
      this.modalVisible = false;
      this.clearForm();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.updateInformation();
        }
      });
    },
    // 编辑框
    show(index) {
      this.modalVisible = true;
      this.form = {};
      if (index != undefined) {
        this.form.id = this.data[index].id;
        this.form.sealType = this.data[index].sealType;
        this.form.authoPerson = this.data[index].authoPerson;
        this.form.keeper = this.data[index].keeper;
      }
      let accountCheck = this.getStore("accountCheck");
      this.form.accId = accountCheck;
    },
    // 编辑或者添加
    async updateInformation() {
      updateSubInformation(this.form).then(res => {
        this.submitLoading = false;
        if (res.success) {
          this.$Message.success("操作成功");
          this.getList();
          this.modalVisible = false;
        }
      });
    },
    // 消息提示框
    confirm(id) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.$Message.info("Clicked ok");
          this.deleteInformation(id);
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    },
    async deleteInformation(id) {
      await deleteSubInformation(id).then(res => {
        this.submitLoading = false;
        if (res.success) {
          this.$Message.success("操作成功");
          this.getList();
          this.modalVisible = false;
          this.clearForm();
        }
      });
    },
    // 清空表单内容
    clearForm() {
      this.form.id = "";
      this.form.ukeyId = "";
      this.form.sealType = "";
      this.form.authoPerson = "";
      this.form.keeper = "";
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped lang="less">
@import "../../../openAccountManagement.less";
#account-subsidiary-print {
  .content-b-m {
    margin-bottom: 30px;
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
