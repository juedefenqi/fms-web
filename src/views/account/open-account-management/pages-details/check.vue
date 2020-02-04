<template>
    <div class="search" >
        <Card >
            <Tabs :animated="false" >
                <TabPane name="account" label="账户信息">
                    <account-information></account-information>
                </TabPane>
                <TabPane name="subsidiary" label="附属信息">
                    <account-subsidiary></account-subsidiary>
                </TabPane>
                <TabPane name="action" label="操作记录">
                    <account-record></account-record>
                </TabPane>
            </Tabs>
        </Card>

    </div>
</template>

<script>
    import accountInformation from './check/account-information'
    import accountRecord from './check/account-record'
    import accountSubsidiary from './check/account-subsidiary'
    export default {
        name: "check",
        components:{
            accountInformation,
            accountRecord,
            accountSubsidiary
        },
        data(){
            return{
                getData:'',
            }
        },
        methods:{
            init(){
              this.getList()
            },
            async getList(){

            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped lang="less">

    @import "../openAccountManagement.less";
</style>
