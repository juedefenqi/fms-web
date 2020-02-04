<template>
    <div  id="internet-banking">
        <account-card class="content-b-m" title="网银证书" icon="icon-plus" @iconClick="addClick">
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
        <!-- 网银证书添加弹框 -->
        <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :closable="false" :width="500">
            <Form ref="form" :model="form" :label-width="100" :rules="formValidate" class="modal-form">
                <FormItem label="编号:" prop="ukeyId" style="margin-top: 24px;">
                    <Input v-model="form.ukeyId" style="width:100%"  placeholder="请输入"/>
                </FormItem>
                <FormItem label="类型" prop="ukeyType">
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
                <FormItem label="角色" prop="ukeyPermission">
                    <RadioGroup type="button" v-model="form.ukeyPermission">
                      <Radio
                        v-for="(item,index) in certificateRole"
                        :key="item.index"
                        :label="item.value"
                        style="margin-right: 10px;"
                        border
                      >{{item.title}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="单笔限额:" prop="singleQuota">
                    <Input v-model="form.singleQuota" style="width:100%" placeholder="请输入..."/>
                </FormItem>
                <FormItem label="单日限额:" prop="dayQuota">
                    <Input v-model="form.dayQuota" style="width:100%" placeholder="请输入..."/>
                </FormItem>
                <FormItem label="生效日:" prop="effectiveDate">
                    <DatePicker v-model="form.effectiveDate" type="date" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="到期日:" prop="dueDate">
                    <DatePicker v-model="form.dueDate" type="date" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="证书登记人:" prop="ukeyRegistrant">
                    <Input v-model="form.ukeyRegistrant" style="width:100%" placeholder="请输入"/>
                </FormItem>
                <FormItem label="证书登记人身份证号:" prop="reIdCard">
                    <Input v-model="form.reIdCard" style="width:100%"  placeholder="请输入"/>
                </FormItem>
                <FormItem label="保管人:" prop="keeper">
                    <Input v-model="form.keeper" style="width:100%" placeholder="请输入"/>
                </FormItem>
                <FormItem label="保管人身份证号:" prop="idCard">
                    <Input v-model="form.idCard" style="width:100%"  placeholder="请输入"/>
                </FormItem>
                <FormItem label="已上收" prop="isHandin">
                    <!-- <CheckboxGroup v-model="form.isHandin">
                        <Checkbox label="是"></Checkbox>
                    </CheckboxGroup> -->
                    <Checkbox v-model="checkVal">是</Checkbox>
                </FormItem>
                <FormItem label="未上收原因" prop="noHandinReason" class="reasonText">
                    <Input v-model="form.noHandinReason" style="width:100%"  placeholder="请输入原因"/>
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
    import {openAccountInternetBanking,subsidiaryInformation,updateInternetInformation,deleteInternetInformation,getCertificateType} from '@/api/account/account.js'
    import {requestSuccess} from '@/libs/tool.js'
    export default {
        name: "internet-banking",
        components:{
            accountCard,
        },
        data(){
            return{
                loading: true,
                data: [],
                columns: [
                    {    title: "编号",
                        key: "ukeyId",
                        align: "center",
                    },
                    {    title: "类型",
                        key: "ukeyType",
                        align: "center",
                    },
                    {    title: "角色",
                        key: "ukeyPermission",
                        align: "center",
                    },
                    {    title: "单笔限额（元）",
                        key: "singleQuota",
                        align: "center",
                    },
                    {    title: "单日限额（元）",
                        key: "dayQuota",
                        align: "center",
                    },
                    {    title: "生效日",
                        key: "effectiveDate",
                        align: "center",
                    },
                    {    title: "到期日",
                        key: "dueDate",
                        align: "center",
                    },
                    {    title: "证书登记人",
                        key: "ukeyRegistrant",
                        align: "center",
                    },
                    {    title: "保管人",
                        key: "keeper",
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
                modalTitle: "网银证书", // 添加或编辑标题
                form: {
                    // 添加或编辑表单对象初始化数据
                    ukeyId: "",
                    ukeyType:"",
                    ukeyPermission:"",
                    singleQuota:"",//单笔限额
                    dayQuota:"",//单日限额
                    effectiveDate:"",//生效日
                    dueDate:"",//到期日
                    ukeyRegistrant: "",
                    reIdCard:'',
                    keeper:"",
                    idCard:"",
                    isHandin:"",
                    noHandinReason:""
                },
                // 表单验证规则
                formValidate: {
                    ukeyId: [{ required: true, message: "不能为空", trigger: "blur" }],
                    ukeyType: [{ required: true, message: '不能为空', trigger: 'change' }],
                    ukeyPermission: [{ required: true, message: '不能为空', trigger: 'change' }],
                    singleQuota: [{ required: true, message: "不能为空", trigger: "blur" }],
                    dayQuota: [{ required: true, message: "不能为空", trigger: "blur" }],
                    effectiveDate: [{ required: true, type: 'date', message: '不能为空', trigger: 'blur' }],
                    dueDate: [{ required: true, type: 'date', message: '不能为空', trigger: 'blur' }],
                    ukeyRegistrant: [{ required: true, message: "不能为空", trigger: "blur" }],
                    reIdCard:[{ required: true, message: "不能为空", trigger: "blur" }],
                    keeper: [{ required: true, message: "不能为空", trigger: "blur" }],
                    idCard:[{ required: true, message: "不能为空", trigger: "blur" }],
                    // isHandin: [{ required: true, type: 'array', min: 1, message: '不能为空', trigger: 'change' },],
                    // noHandinReason: [{ required: true, message: "不能为空", trigger: "blur" }],
                },
                radioType1:["软证书", "实体证书"],
                radioRole2:["制单","审核","复核","查询"],
                certificateType:"",
                certificateRole:"",
                checkVal:""
            }
        },
        watch: {
            checkVal(val, newVal) {
                this.form.isHandin = val
                if(val){
                    document.getElementsByClassName("reasonText")[0].style.opacity= 0;
                    document.getElementsByClassName("reasonText")[1].style.opacity= 0;
                    this.form.noHandinReason = "";
                }else{
                    document.getElementsByClassName("reasonText")[0].style.opacity= 1;
                    document.getElementsByClassName("reasonText")[1].style.opacity= 1;
                }
            }
        },
        methods:{
            init(){
                this.getList();
                this.getType();
                this.getRole();
            },
            async getList(){
                this.loading = true;
                // let res=requestSuccess(this,await openAccountInternetBanking(),false);
                // this.data=res.record
                let accountCheck = this.getStore("accountCheck")
                let accId ={accId:accountCheck}
                let result = requestSuccess(this,await subsidiaryInformation(accId),false);
                this.data=result.BankUkey
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
                        this.updateInternetInformation()
                    }
                });
            },
            // 编辑框
            show (index) {
                this.modalVisible = true;
                this.form={};
                if (index != undefined) {
                    this.form.id = this.data[index].id;
                    this.form.ukeyId = this.data[index].ukeyId;
                    this.form.ukeyType = this.data[index].ukeyType=="实体证书"?'0701':this.data[index].ukeyType=="软证书"?'0702':'';
                    this.form.ukeyPermission = this.data[index].ukeyPermission
                    // this.form.ukeyPermission = this.data[index].ukeyPermission=="制单"?'0602':this.data[index].ukeyPermission=="审核"?'0603':this.data[index].ukeyPermission=="复核"?'0601':this.data[index].ukeyPermission=="查询"?'0604':'';
                    this.form.singleQuota = this.data[index].singleQuota;
                    this.form.dayQuota = this.data[index].dayQuota;
                    this.form.effectiveDate = this.data[index].effectiveDate;
                    this.form.dueDate = this.data[index].dueDate;
                    this.form.ukeyRegistrant = this.data[index].ukeyRegistrant;
                    this.form.reIdCard = this.data[index].reIdCard;
                    this.form.keeper = this.data[index].keeper;
                    this.form.idCard = this.data[index].idCard;
                    this.form.isHandin = this.data[index].isHandin==0?false:this.data[index].isHandin==1?true:'';
                    this.checkVal = this.data[index].isHandin==0?false:this.data[index].isHandin==1?true:'';
                    this.form.noHandinReason = this.data[index].noHandinReason;
                }
                let accountCheck = this.getStore("accountCheck")
                this.form.accId = accountCheck;
                // this.form.ukeyPermission="制单"
                // if(this.form.isHandin){
                //     document.getElementsByClassName("reasonText")[0].style.display= "none";
                // }else{
                //     document.getElementsByClassName("reasonText")[0].style.display= "block";
                // }
            },
            // 编辑或者添加
            async updateInternetInformation(){
                this.form.effectiveDate = this.formatTime(this.form.effectiveDate)
                this.form.dueDate = this.formatTime(this.form.dueDate)
                this.form.isHandin = this.form.isHandin==true? 1:0;
                updateInternetInformation(this.form).then(res => {
                    this.submitLoading = false;
                    if (res.success) {
                        this.$Message.success("操作成功");
                        this.getList();
                        this.modalVisible = false;
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
                        this.deleteInternetInformation(id);
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            async deleteInternetInformation(id){
                await deleteInternetInformation(id).then(res => {
                    this.submitLoading = false;
                    if (res.success) {
                        this.$Message.success("操作成功");
                        this.getList();
                        this.modalVisible = false;
                        this.clearForm();
                    }
                });
            },
            // 获取网银证书类型
            async getType(id){
                await getCertificateType('ukey_type').then(res => {
                    this.certificateType = res.result
                });
            },
            // 获取网银证书角色
            async getRole(id){
                await getCertificateType('ukey_role').then(res => {
                    this.certificateRole = res.result
                });
            },
            // 清空表单内容
            clearForm(){
                this.form.ukeyId = "";
                this.form.ukeyType = "";
                this.form.ukeyPermission = "";
                this.form.singleQuota = "";
                this.form.dayQuota = "";
                this.form.effectiveDate = "";
                this.form.dueDate = "";
                this.form.ukeyRegistrant = "";
                this.form.reIdCard = "";
                this.form.keeper = "";
                this.form.idCard = "";
                this.form.isHandin = false;
                this.form.noHandinReason = "";
                this.form.accId = "";
                this.form.id=""
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
