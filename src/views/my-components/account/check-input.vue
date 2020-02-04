<template>
  <div  id="selectInput">
    <div class="infoDetail" v-for="(value,key,index) in checkInputVal">
      <span class="detailTitle">{{key}}:</span>
        <div class="ivu-select ivu-select-single ivu-select-default">
          <span>{{value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkInput",
  props: {
    checkInputVal: Array
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
  #selectInput{
    .infoDetail{
      padding: 10px 0px 10px 0px;
      display: inline-block;
    }
    .detailTitle{
      width: 123px;
      text-align: right;
      display: inline-block;
      margin-right: 8px;
      color: #999999;
    }
    &/deep/ .ivu-select{
      width: 375px;
    }
  }
</style>

