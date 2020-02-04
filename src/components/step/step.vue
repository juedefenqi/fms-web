<template>
  <div class="anchorPosition">
    <Steps :current="current" direction="vertical">
      <div class="step-content" v-for="(item,index) in  stepContent" :key="'step'+index">
        <Step :title="item.title"></Step><a :href="item.id"class="ivu-steps-title step-anchor" @click="next(index)">1</a>
      </div>
    </Steps>
  </div>
</template>

<script>
export default {
  name:"modal-information",
  props: {
    stepContent: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      current: 0
    };
  },
  watch: {
  },
  methods: {
    next (val) {
      this.current = val;
    },
  }
};
</script>

<style lang="less" scoped>
.step-content{
  position:relative !important;
}
.step-anchor{
  display: inline-block;
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
}
.anchorPosition{
  position: fixed;
  top: 45%;
  right: 68px;
}
</style>
