<template>
    <div :style="{width:Width}"  >
        <List  border size="large" >
            <div @click="handleClick(item,i)"  v-for="(item, i) in data" :key="'list'+i" >
                <ListItem :class="styleLi" ><span class="list-ul-li-span" :style="{textAlign:align}">{{item}}</span></ListItem>
            </div>

        </List>
    </div>
</template>
<script>
    export default {
        name: "common-list",
        props:{
            Width:{//宽度
                type:String,
                default:''
            },
            data:{//接受数组
                type:Array,
                default:()=>{
                    []
                }
            },
            align:{//内容位置
                type:String,
                default:'center'
            },
            styleLi:{
                type:String,
                default:'itemLi'
            }
        },
        methods:{
            handleClick(item){
                this.$emit('handleClick',...arguments)//函数中使用es6 数组解构赋值来  获取参数 ，行间使用...arguments 展开数组 添加多余参数
            },
        }
    }
</script>

<style scoped lang="less">
.list-ul-li-span{
    display: inline-block;
    width: 100%;
    height: 100%;

}
    .itemLi{
        padding-left:8px ;
        padding-top:8px ;
        padding-bottom:8px ;
        padding-right:8px ;
        cursor: pointer;
    }
.itemLi:hover{
 background-color: #2d8cf0;
color: white;
}
</style>
