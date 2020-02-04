<template>
  <Modal
    v-model="data"
    :title="title"
    @on-ok="ok"
    @on-cancel="cancel"
    :footer-hide="footerHide"
    :width="modalWidth"
    :class="{hidden:footerHide}"
  >
    <slot></slot>
  </Modal>
</template>

<script>
export default {
  name: "modal-information",
  props: {
    // 对话框标题
    title: {
      type: String,
      default: "标题"
    },
    // 对话框显示隐藏
    value: {
      type: Boolean,
      default: false
    },
    // 对话框宽度，高度自适应
    modalWidth: {
      type: Number,
      default: "520"
    },
    footerHide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: this.value
    };
  },
  watch: {
    value(val) {
      this.data = val;
    },
    data(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    ok() {
      //this.$Message.info("Clicked ok");
      this.$emit("changeVal", false);
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
      this.$emit("changeVal", false);
    }
  }
};
</script>

<style lang="less" scoped>
.hidden {
  &/deep/.ivu-modal-body {
    padding: 0;
  }
}
</style>
