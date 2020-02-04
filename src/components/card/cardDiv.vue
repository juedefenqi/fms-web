<template>
      <div  :class="className" :style="{display:display}" >
       <span :class="className1" :style="{width:width,textAlign:align}">{{title}}</span>
       <span v-if="type=='span'" :class="className2" :style='{color:contentColor,cursor:cursor}' @click="contentClick">{{content}}</span>
       <span v-else-if="type=='slot'" :class="className2">
        <slot  ></slot>           
       </span>
       </div>
</template>

<script>
    export default {
        name: "cardItem",
        props:{
            title:{
                type:String,
                default:''
            },
            className:{
                type:String,
                default:'content-container-main'
            },
            className1:{
                type:String,
                default:'span colo4'
            },
            className2:{
                type:String,
                default:''
            },
            width:{
                type:String,
                default:'auto'
            },
            content:{
                type:String,
                default:''
            },
            align:{
                type:String,
                default:'right'
            },
            display:{
                type:String,
                default:'block'
            },
            type:{
                type:String,
                default:'span'
            },
            contentColor:{
                type:String,
                default:''
            },
            cursor:{
                type:String,
                default:'none'
            },
        
    },
        methods:{
                contentClick(){
                      this.$emit('contentClick',...arguments)//使用es6 数组解构提取参数
                }
            }
      
    }
</script>

<style scoped lang="less">
    @import "../../styles/customize";
    .span{
        padding-right: 12px;
        display: inline-block;
    }
    .content-container-main{
       margin-bottom: 20px;
    }
</style>
