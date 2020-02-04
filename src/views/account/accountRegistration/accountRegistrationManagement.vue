<template>
<div class="search openAccount" >
    <Card>
        <Row class="add">

            <Button @click="$router.push({name:'accountRegistration'})" type="primary" icon="md-add" >开户登记</Button>
        </Row>
        <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70">
                <Form-item label="关键字:">
                    <Input
                            type="text"
                            v-model="searchKey"
                            clearable
                            placeholder="请输入关键字"
                            style="width: 200px"
                    />
                </Form-item>
                <Form-item style="margin-left:-35px;" class="br">
                    <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                    <Button @click="handleReset">重置</Button>
                </Form-item>
                <Form-item style="margin-left:-35px;float: right" class="br" label="状态:">
                    <Button @click="handleReset">全部</Button>
                    <Button @click="handleReset">封存</Button>
                    <Button @click="handleReset">正常</Button>
                    <Button @click="handleReset">久悬</Button>
                    <Button @click="handleReset">冻结</Button>
                    <Button @click="handleReset">已注销</Button>
                </Form-item>
            </Form>
        </Row>
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
    <Row type="flex" justify="end" class="page">
        <Page
                :current="searchForm.pageNumber"
                :total="total"
                :page-size="searchForm.pageSize"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                :page-size-opts="[10,20,50]"
                size="small"
                show-total
                show-elevator
                show-sizer
        ></Page>
    </Row>
    </Card>
</div>

</template>

<script>
    import {openAccount} from '@/api/account/account.js'
    import commonList from '@/components/list/commonList.vue'
    export default {
        name: "open-account-management",
        components:{
            commonList
        },
        data() {
            return {//以这个页面：logManage
                loading: true,
                openSearch: true,
                data: [],
                total: 0,
                columns: [
                    {
                        type: "index",
                        width: 60,
                        align: "center",
                    },
                    {    title: "开户银行",
                        key: "openAccountBank",
                        align: "left",
                    },
                    {    title: "账号",
                        key: "accountNumber",
                        align: "left",
                    },
                    {    title: "用户",
                        key: "accountName",
                        align: "left",
                    },
                    {    title: "使用单位",
                        key: "useUnit",
                        align: "left",
                    },
                    {    title: "管理单位",
                        key: "manageUnit",
                        align: "left",
                    },
                    {
                        title:'使用项目',
                        key: "useProject",
                        align: "left",
                    },{
                        title:'账户性质',
                        key: "useProperty",
                        width:110,
                        align: "left",
                    },
                    {
                        title:'账户用途',
                        key: "accountUse",
                        width:110,
                        align: "left",
                    },{
                        title:'账户状态',
                        key: "accountStatus",
                        align: "left",
                        render: (h, params) => {
                            let status=params.row.accountStatus
                            let content=status==0?'正常':status==1?'封存':status==2?'久悬':status==3?'冻结':status==4?'已注销':''
                            let bColor=status==0?'#2d8cf0':status==1?'#666666':status==2?'#ed4014':status==3?'#ed4014':status==4?'#999999':''
                            return h('div',{
                                style:{
                                }
                            }, [
                                h('span', {
                                    style:{
                                        cursor: 'pointer'
                                    }
                                },[
                                    h('span', {
                                        style:{
                                            height:'10px',
                                            width:'10px',
                                            display: 'inline-block',
                                            borderRadius: '50%',
                                            backgroundColor:bColor,
                                            marginRight:'5px'
                                        }
                                    }),
                                    h('span', {
                                        style:{
                                            color:bColor,
                                        }
                                    }, content),
                                ])
                            ]);
                        }
                    },{
                        title:'操作状态',
                        key: "operationStatus",
                        align: "left",
                        render: (h, params) => {
                            let status=params.row.accountStatus
                            let content=status==0?'申请中':status==1?'变更中':status==2?'久悬解除中':status==3?'解冻中':status==4?'正常':''
                            let bColor=status==0?'#f90':status==1?'#f90':status==2?'#f90':status==3?'#f90':status==4?'#19be6b':''
                            return h('div',{
                                style:{
                                }
                            }, [
                                h('span', {
                                    style:{
                                        cursor: 'pointer'
                                    }
                                },[
                                    h('span', {
                                        style:{
                                            height:'10px',
                                            width:'10px',
                                            display: 'inline-block',
                                            borderRadius: '50%',
                                            backgroundColor:bColor,
                                            marginRight:'5px'
                                        }
                                    }),
                                    h('span', {
                                        style:{
                                            color:bColor
                                        }
                                    }, content),
                                ])
                            ]);
                        }
                    },{
                        title:'操作',
                        key: "action",
                        width:170,
                        align: "center",
                        className:'',
                        render: (h, params) => {
                            let status=params.row.accountStatus
                            let content='查看'
                            let content1='编辑'
                            let content2='提交'
                            return h('div',{
                                class:'actionName',
                                style:{
                                    textAlign:'right',
                                    color:'#2d8cf0'
                                },
                                on:{
                                    mouseout: (e) => {
                                    },
                                }
                            }, [
                                h('span', {
                                    style:{
                                        marginRight:'10px',
                                        cursor: 'pointer'
                                    },
                                    on:{
                                        click:()=>{
                                            this.$router.push({
                                                name:'open-account-check'
                                            })
                                        }
                                    }
                                }, content),
                                h('span', {
                                    style:{
                                        marginRight:'10px',
                                        cursor: 'pointer'
                                    }
                                }, content1),
                                h('span', {
                                    style:{
                                        marginRight:'10px',
                                        cursor: 'pointer'
                                    }
                                }, content2),
                                h('span', {
                                    style:{
                                        display: 'inline-block',
                                        position:' relative',
                                        top:'5px',
                                        padding:'0 4px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: (e) => {
                                            let name='listAction'+params.row._index;//我是第几
                                            let oldName='listAction'+this.commonListIndex;//上次的位置
                                            if(this.commonListIndex!=null){//第一次的时候没有前一次初始值为null我们跳过去
                                                if(this.commonListIndex!=params.row._index){//没有换行就没必要清空了
                                                    this.$refs[oldName].style.display='none'
                                                }
                                            }
                                            if(this.$refs[name].style.display=='none'){//点击开关
                                                this.$refs[name].style.display='block';
                                            }else {
                                                this.$refs[name].style.display='none';
                                            }
                                            this.commonListIndex=params.row._index//记录位置
                                        }
                                    }
                                }, [
                                    h('span', {
                                        style:{
                                            display: 'block',
                                            height:'4px',
                                            width:'4px',
                                            backgroundColor:'#999999',
                                            marginBottom:'4px'
                                        }
                                    }),
                                    h('span', {
                                        style:{
                                            display: 'block',
                                            height:'4px',
                                            width:'4px',
                                            backgroundColor:'#999999',
                                            marginBottom:'4px'
                                        }
                                    }),
                                    h('span', {
                                        style:{
                                            display: 'block',
                                            height:'4px',
                                            width:'4px',
                                            backgroundColor:'#999999',
                                        }
                                    }),
                                ]),
                                this.$createElement('div',{
                                    ref:'listAction'+params.row._index,
                                    class:'listAction',
                                    style:{
                                        display:"none",
                                    },
                                },[
                                    h(commonList,{
                                        props: {
                                            Width:this.commonListWidth,
                                            data:this.commonList
                                        },

                                    }),
                                ])
                            ]);
                        }
                    }
                    //operationStatus
                ],
                searchKey:'',
                commonListWidth:'120px',
                commonList:[
                    '开户登记',
                    '变更申请',
                    '展期申请',
                    '展期登记',
                    '久悬登记',
                    '久悬解除申请',
                    '久悬解除登记',
                    '冻结',
                    '解冻',
                    '销户申请',
                    '销户登记',
                    '删除'
                ],
                commonListIndex:null,
                searchForm: {
                    pageNumber: 1,
                    pageSize: 10,
                },

            }
        },
        methods:{
            init() {
                this.getLogList()
            },
            getLogList(){
                this.loading = true;
                openAccount().then(res=>{
                    this.loading = false;
                    if(res.success){
                        this.data=res.result.record
                        this.total=res.result.total
                    }

                })
            },
            changeSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            changeSort(e) {//排序
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == "normal") {
                    this.searchForm.order = "";
                }
                this.getLogList();
            },
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getLogList();
                this.clearSelectAll();
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getLogList();
            },
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getLogList();
            },
        },
        mounted(){
            this.init()
        }
    }
</script>
<style lang="less">
   .openAccount {
       .ivu-table-wrapper{
           overflow: visible;
       }
       .ivu-table{
           overflow: visible;
       }
       .actionName{
           position: relative;

       }
       .ivu-table-cell{
           overflow: visible;
       }
    }
</style>
<style scoped lang="less">
@import "openAccountManagement.less";
</style>
