<template>
    <div>
        <account-subsidiary-print></account-subsidiary-print>
        <internet-banking></internet-banking>
        <account-subsidiary-cipher></account-subsidiary-cipher>
    </div>
</template>

<script>
    import accountSubsidiaryPrint from './account-subsidiary/account-subsidiary-print'
    import internetBanking from './account-subsidiary/internet-banking'
    import accountSubsidiaryCipher from './account-subsidiary/account-subsidiary-cipher'
    export default {
        name: "account-subsidiary",
        components:{
            accountSubsidiaryPrint,
            internetBanking,
            accountSubsidiaryCipher
        },
        data(){
            return{
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

