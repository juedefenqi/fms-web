<template>
    <div class="search">
        <Card>
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
    import {requestSuccess} from '@/libs/tool.js'
    import {openAccountRecord} from '@/api/account/account.js'
    export default {
        name: "account-record",
        data(){
                return{
                    loading: true,
                    data: [],
                    total: 0,
                    columns: [
                        {    title: "操作日期",
                            key: "update",
                            align: "left",
                        },
                        {    title: "操作人",
                            key: "name",
                            align: "left",
                        },
                        {    title: "用户",
                            key: "accountName",
                            align: "left",
                        },

                        {
                            title:'操作内容',
                            key: "content",
                            align: "left",
                        },
                        {
                            title:'操作说明',
                            key: "explain",
                            align: "left",
                        },
                        {
                            title:'操作',
                            key: "action",
                            width:170,
                            align: "center",
                            className:'',
                            render: (h, params) => {

                                let content='查看详情'
                               return h('div',{
                                    style:{
                                    }
                                },[
                                    h('span',{
                                     style:{
                                         color:'#2d8cf0'
                                     }
                                    },content)
                                ])

                            }
                        }
                    ],
                    searchForm: {
                        pageNumber: 1,
                        pageSize: 10,
                    },
                }
        },
        methods:{
            init(){
               this.getList()
            },
            async getList(){
                this.loading = true;
                let res=requestSuccess(this,await openAccountRecord(),false);
                 this.data=res.record
                this.total=res.total
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
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped lang="less">
    @import "../../openAccountManagement.less";
</style>
