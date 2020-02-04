<template>
  <div id="infoDetail">
    <div v-if="formItem">
      <div class="detailTitle" :style="{width:lableWidth +'px'}">
        <Checkbox v-model="single">{{radioTitle}}</Checkbox>
      </div>
      <FormItem class="detailItem">
        <Input v-model="value" placeholder="请输入..." class="inputSty" />
      </FormItem>
    </div>
    <div v-else>
      <div class="detailTitle" :style="{width:lableWidth +'px'}">
        <Checkbox v-model="single">{{radioTitle}}</Checkbox>
      </div>
      <Input v-model="value" placeholder="请输入..." class="inputSty" />
    </div>
  </div>
</template>

<script>
export default {
  name: "radioOption",
  props: {
    radioTitle: "",
    formItem: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    lableWidth: {
      type: Number,
      default: 123
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#infoDetail {
  padding: 10px 0px 10px 0px;
  display: inline-block;
  .radio {
    margin-right: 20px;
    border-radius: 4px !important;
  }
  .detailTitle {
    text-align: right;
    /* border: 1px solid red; */
    display: inline-block;
    margin-right: 8px;
    color: #999999;
    padding: 6px 0;
  }
  .detailItem {
    display: inline-block;
  }
  &/deep/ .ivu-form-item-content {
    margin-left: 0 !important;
  }
  .inputSty {
    width: 355px !important;
  }
}
</style>

