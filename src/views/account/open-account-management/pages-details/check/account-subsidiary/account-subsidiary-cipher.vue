<template>
    <div  id="internet-banking">
        <account-card class="content-b-m" title="支付密码器" icon="icon-plus" @iconClick="addClick">
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
        <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
            <Form ref="form" :model="form" :label-width="100" :rules="formValidate" class="modal-form">
                <FormItem label="编号:" prop="cipherwareId" style="margin-top: 24px;">
                    <Input v-model="form.cipherwareId" style="width:100%"  placeholder="请输入"/>
                </FormItem>
                <FormItem label="领用日期:" prop="getDate">
                    <DatePicker v-model="form.getDate" type="date" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="持有人:" prop="getPerson">
                    <Input v-model="form.getPerson" style="width:100%" placeholder="请输入"/>
                </FormItem>
                <FormItem label="持有人身份证号:" prop="idCard">
                    <Input v-model="form.idCard" style="width:100%"  placeholder="请输入"/>
                </FormItem>
                <FormItem label="已上收" prop="isHandin">
                    <!-- <CheckboxGroup v-model="form.isHandin">
                        <Checkbox label="是"></Checkbox>
                    </CheckboxGroup> -->
                    <Checkbox v-model="checkVal">是</Checkbox>
                </FormItem>
                <FormItem label="未上收原因:" prop="noHandinReason"  class="reasonText">
                    <Input v-model="form.noHandinReason" style="width:100%"  placeholder="请输入"/>
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
    import accountCard from '@/components/card/accountCard.vue'
    import {openAccountCipher,subsidiaryInformation,deleteBankCipherware,updateBankCipherware} from '@/api/account/account.js'
    import {requestSuccess} from '@/libs/tool.js'
    export default {
        name: "account-subsidiary-cipher",
        components:{
            accountCard,
        },
        data(){
            return{
                loading: true,
                data: [],
                columns: [
                    {    title: "密码器编号",
                        key: "cipherwareId",
                        align: "center",
                    },
                    {    title: "领用日期",
                        key: "getDate",
                        align: "center",
                    },
                    {    title: "持有人",
                        key: "getPerson",
                        align: "center",
                    },
                    {    title: "上收情况",
                        key: "isHandin",
                        align: "center",
                        render: (h, params) => {

                            let content=params.row.isHandin==0?'未上收':params.row.isHandin==1?'已上收':''
                            let color=params.row.isHandin==0?'#ed4014':params.row.isHandin==1?'#19be6b':''
                            let content1=params.row.noHandinReason
                            return h('div',{
                                style:{
                                }
                            },[
                                h('div',{
                                    style:{
                                        color:color
                                    }
                                },content),
                                h('div',{
                                },content1)
                            ])

                        }
                    },
                    {
                        title:'操作',
                        key: "action",
                        align: "center",
                        className:'',
                        render: (h, params) => {

                            let content='编辑'
                            let content1='删除'
                            return h('div',{
                                style:{
                                }
                            },[
                                h('span',{
                                    style:{
                                        color:'#2d8cf0',
                                        marginRight:'10px',
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    },
                                },content),
                                h('span',{
                                    style:{
                                        cursor:'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            let id = this.data[params.index].id;
                                            this.confirm(id);
                                        }
                                    },
                                },content1)
                            ])

                        }
                    }
                    //operationStatus
                ],
                submitLoading:false,
                modalVisible: false, // 添加或编辑显示
                modalTitle: "支付密码器编辑", // 添加或编辑标题
                form: {
                    // 添加或编辑表单对象初始化数据
                    cipherwareId: "",
                    getDate:"",
                    getPerson: "",
                    idCard:'',
                    isHandin:[],
                    noHandinReason:""
                },
                // 表单验证规则
                formValidate: {
                    cipherwareId: [{ required: true, message: "不能为空", trigger: "blur" }],
                    getDate: [
                        { required: true, type: 'date', message: '不能为空', trigger: 'change' }
                    ],
                    getPerson: [{ required: true, message: "不能为空", trigger: "blur" }],
                    idCard:[{ required: true, message: "不能为空", trigger: "blur" }],
                    // isHandin: [{ required: true, type: 'array', min: 1, message: '不能为空', trigger: 'change' },],
                    // noHandinReason: [{ required: true, message: "不能为空", trigger: "blur" }],
                },
                checkVal:""
            }
        },
        watch: {
            checkVal(val, newVal) {
                this.form.isHandin = val
                if(val){
                    document.getElementsByClassName("reasonText")[1].style.opacity= 0;
                    this.form.noHandinReason = "";
                }else{
                    document.getElementsByClassName("reasonText")[1].style.opacity= 1;
                }
            }
        },
        methods:{
            init(){
                this.getList()
            },
            async getList(){
                this.loading = true;
                // let res=requestSuccess(this,await openAccountCipher(),false);
                // this.data=res.record
                let accountCheck = this.getStore("accountCheck")
                let accId ={accId:accountCheck}
                let result = requestSuccess(this,await subsidiaryInformation(accId),false);
                this.data=result.BankCipherware
            },
            addClick(){
                this.modalVisible=true;
                this.show();
            },
            handleCancel() {
                this.modalVisible=false;
                this.clearForm();
            },
            handleSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.submitLoading = true;
                        this.updateInformation()
                    }
                });
            },
             // 编辑框
             show (index) {
                this.modalVisible = true
                this.form={};
                if (index != undefined) {
                    this.form.id = this.data[index].id;
                    this.form.cipherwareId = this.data[index].cipherwareId;
                    this.form.getDate = this.data[index].getDate;
                    this.form.getPerson = this.data[index].getPerson;
                    this.form.idCard = this.data[index].idCard;
                    this.form.isHandin = this.data[index].isHandin==0?false:this.data[index].isHandin==1?true:'';
                    this.checkVal = this.data[index].isHandin==0?false:this.data[index].isHandin==1?true:'';
                    this.form.noHandinReason = this.data[index].noHandinReason;
                }
                let accountCheck = this.getStore("accountCheck")
                this.form.accId = accountCheck;
            },
             // 编辑或者添加
             async updateInformation(){
                this.form.getDate = this.formatTime(this.form.getDate)
                this.form.isHandin = this.form.isHandin==true? 1:0;
                updateBankCipherware(this.form).then(res => {
                    this.submitLoading = false;
                    if (res.success) {
                        this.$Message.success("操作成功");
                        this.getList();
                        this.modalVisible = false;
                        this.clearForm();
                    }
                });
            },
            // 消息提示框
            confirm (id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>确认删除吗？</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                        this.deleteInformation(id);
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            async deleteInformation(id){
                await deleteBankCipherware(id).then(res => {
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
            clearForm(){
                this.form.id=""
                this.form.ukeyId = "";
                this.form.cipherwareId = "";
                this.form.getDate = "";
                this.form.getPerson = "";
                this.form.idCard = "";
                this.form.isHandin = false;
                this.form.noHandinReason = "";
            },
            formatTime(val){
                let d = new Date(val);
                let formatData = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                return formatData;
            }
        },
        mounted() {
            this.init()
        }
    }
</script>
<style scoped lang="less">
    @import "../../../openAccountManagement.less";
    #internet-banking{
    .content-b-m{
        margin-bottom: 30px;
    }
    .account-content{
        padding: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        &-container{
            padding-left: 40px;

        }
        .cardItem{
            flex:1
        }
    }
    .check{
        cursor: pointer;
        margin-left: 10px;
    }
    }


</style>
