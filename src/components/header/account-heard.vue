<template>
  <div class="account-header-main" id="account-heard" ref="accountHeader">
    <div class="account-header"></div>
    <Card
      class="account-header1"
      ref="accountHeader"
      :style="{backgroundColor:backgroundColor,width:headerWidth}"
    >
      <div v-if="more" class="account-header1-content">
        <Button
          v-for="(item,i) in data"
          :key="'header'+i"
          :type="item.type"
          class="accountBtn"
          @click="handleClick(i)"
        >{{item.content}}</Button>
        <Button
          v-if=" Return"
          type="default"
          class="accountBtn btnReturn"
          @click="returnClick"
        >{{contentReturn}}</Button>
      </div>
      <div v-else>
        <Button :type="type" class="accountBtn" @click="handleClick">{{data}}</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { onSize } from "@/libs/tool.js";
export default {
  name: "account-heard",
  props: {
    more: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: "white"
    },
    data: {
      type: Array | String,
      default: () => {
        "";
      }
    },
    type: {
      type: String,
      default: "default"
    },
    Return: {
      type: Boolean,
      default: true
    },
    contentReturn: {
      type: String,
      default: "返回"
    }
  },
  data() {
    return {
      headerWidth: "auto",
      screenWidth: ""
    };
  },
  watch: {
    screenWidth(val) {
      this.headerWidth = this.$refs.accountHeader.clientWidth + "px";
    }
  },
  methods: {
    handleClick() {
      this.$emit("handleClick", ...arguments); //使用es6 数组解构提取参数
    },
    returnClick() {
      this.$emit("returnClick", ...arguments); //使用es6 数组解构提取参数
    }
  },
  mounted() {
    onSize(this, "screenWidth");
    this.headerWidth = this.$refs.accountHeader.clientWidth + "px";
  }
};
</script>

<style scoped lang="less">
#account-heard {
  &/deep/ .ivu-card-body {
    padding: 0;
  }
  .account-header-main {
    width: 100%;
    border-radius: 6px;
  }
  .account-header {
    width: 100%;
  }
  .account-header1 {
    line-height: 64px;
    height: 64px;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
    position: fixed;
    top: 100px;
    z-index: 999;
    border-radius: 0px;
    &-content {
      padding-left: 20px;
    }
  }
  .accountBtn {
    margin-right: 20px;
  }
  .btnReturn {
    position: absolute;
    right: 0px;
    top: 17px;
  }
}
</style>
