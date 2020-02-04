<template>
    <Card :style="{width:width,position:'relative'}" :dis-hover="disHover">
        <p slot="title" v-if="isTitle" style="height: auto;">
            <span>
                {{title}}
                <!-- 是否开通网银 -->
                <span class="disIb line-span checkBox" v-if="isBankShow">
                    <div class="detailTitle" :style="{width:detailTitle +'px'}" style="display: inline-block;">
                        <Checkbox
                            @on-change="returnNumber(...arguments,'isOpenEbank')"
                            v-model="formValidate.isOpenEbank"
                        >开通网银</Checkbox>
                        <FormItem label="不开通原因 :" 
                        style="display: inline-block;" v-if="formValidate.isOpenEbank">
                        <Input :v-model="formValidate.noEbankRe" placeholder="请输入..." type="text" class="inputSty" disabled></Input>
                        </FormItem>
                        <FormItem label="不开通原因 :" 
                        :prop="noEbankRe" style="display: inline-block;" v-if="!formValidate.isOpenEbank" >
                        <Input :v-model="formValidate.noEbankRe" placeholder="请输入..." type="text" class="inputSty"></Input>
                        </FormItem>
                    </div>                    
                </span>
                <!-- 是否开通密码器 -->
                <span class="disIb line-span checkBox" v-if="isCipherShow">
                    <div class="detailTitle" :style="{width:detailTitle +'px'}" style="display: inline-block;">
                        <Checkbox
                            @on-change="returnNumber(...arguments,'isOpenCipherware')"
                            v-model="formValidate.isOpenCipherware"
                        >开通密码器</Checkbox>
                        <FormItem label="不开通原因 :" 
                        :prop="noCipherwareRe" style="display: inline-block;" v-if="formValidate.isOpenCipherware">
                        <Input :v-model="formValidate.noCipherwareRe" placeholder="请输入..." type="text" class="inputSty" disabled></Input>
                        </FormItem>
                        <FormItem label="不开通原因 :" 
                        :prop="noCipherwareRe" style="display: inline-block;" v-if="!formValidate.isOpenCipherware">
                        <Input :v-model="formValidate.noCipherwareRe" placeholder="请输入..." type="text" class="inputSty"></Input>
                        </FormItem>
                    </div>                    
                </span>
            </span>
        </p>

        <!-- <Icon @click="iconClick" v-if="icon"  :custom="'iconfont '+ icon"  class="card-icon" :color="color" :size="size" :class="iconClass" /> -->
        <div v-if="formValidate.isOpenEbank">
            <div v-if="isBankShow">
                <Button @click="iconClick" type="primary" icon="md-add" class="marRight" v-if="icon">{{btnTitle}}</Button>
                <Button class="marRight" v-if="icon" @click="editDate">编辑</Button>
                <Button class="marRight" v-if="icon" @click="deleteDate">删除</Button>
            </div>
        </div>
        <div v-if="formValidate.isOpenCipherware">
            <div v-if="isCipherShow">
                <Button @click="iconClick" type="primary" icon="md-add" class="marRight" v-if="icon">{{btnTitle}}</Button>
                <Button class="marRight" v-if="icon" @click="editDate">编辑</Button>
                <Button class="marRight" v-if="icon" @click="deleteDate">删除</Button>
            </div>
        </div>
        <div v-if="title=='印鉴/签字人'">
            <Button @click="iconClick" type="primary" icon="md-add" class="marRight" v-if="icon">{{btnTitle}}</Button>
            <Button class="marRight" v-if="icon" @click="editDate">编辑</Button>
            <Button class="marRight" v-if="icon" @click="deleteDate">删除</Button>
        </div>
        <slot class="content" name="content">
        </slot>
    </Card>
</template>

<script>
import {
  returnNumber
} from "@/libs/tool.js";
import { accountApplication } from "@/views/account/data/form.js";
    export default {
        name: "accountCard",
        props:{
            width:{//宽度
                type:String,
                default:''
            },

            isTitle:{//是否带头
                type: Boolean,
                default: true,
            },
            title:{
                type: String,
                default:'基本信息',
            },
            //图标相关
            icon:{
                type: String,
                default:'',
            },
            color:{
                type: String,
                default:'#2d8cf0',
            },
           size:{
                type: String,
                default:'26',
            },
            iconClass:{//添加class覆盖样式自定义
                type: String,
                default:'',
            },
            disHover:{//添加class覆盖样式自定义
                type: Boolean,
                default:true,
            },
            btnTitle:{
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
            isSealorsignShow:{
                type: Boolean,
                default: true,
            },
            isBankShow:{
                type: Boolean,
                default: false,
            },
            isCipherShow:{
                type: Boolean,
                default: false,
            },
            selectall:{
                type: String,
                default:'',
            },

        },
        data(){
            return{
                // formValidate: accountApplication.formValidate,
                isShow:false,
            }
        },
        methods:{
            iconClick(){
                this.$emit('iconClick',true)
            },
            returnNumber(item) {
                let [val, data] = arguments;
                this.formValidate[data] = returnNumber(val);
                console.log(this.formValidate[data])
            },
            editDate(){
                this.isShow=!this.isShow;
                this.$emit('changeClick',this.isShow)
            },
            deleteDate(){
                this.isShow=!this.isShow;
                this.$emit('deleteClick',this.isShow)
            }
        }
    }
</script>

<style scoped lang="less">
.card-icon{
    position: absolute;
    cursor: pointer;
    top: 12px;
    right: 20px;
    z-index: 10;
}
.marRight{
    margin-left: 10px;
}
.ivu-form-item{
    vertical-align: middle;
    margin-bottom: 0 !important;
}
.checkBox{
    margin-left: 10px;
}
</style>
