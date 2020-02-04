<template>
  <div>
    <span v-if="type=='array'">
      <Button
        @click="handleClick(index)"
        v-for="(item ,index) in data"
        :key="'button'+index"
      >{{item}}</Button>
    </span>
    <span v-else-if="type=='array-click'">
      <Button
        v-for="(item,index) in data"
        :class="{buttonStatus:index==buttonStatusIndex}"
        @click="handleClick(item.index); buttonClick(index)"
        :key="'button'+index"
      >{{item.title}}</Button>
    </span>
    <span v-else-if="type=='click-primary'">
      <Button
        class="common-button"
        @click="handleClick(item.content); buttonClick(index)"
        v-for="(item ,index) in data"
        :key="'button'+index"
        :class="{buttonStatus:index==buttonStatusIndex,buttonOver:('over'+index)==overStatusIndex}"
        @mouseover.native="buttonover('over'+index)"
        @mouseout.native="buttonover(null)"
        :size="size"
      >{{item.title}}</Button>
    </span>
    <span v-else>
      <Button @click="handleClick()">{{data}}</Button>
    </span>
  </div>
</template>

<script>
export default {
  name: "common-button",
  props: {
    type: {
      type: String,
      default: "" //array接受数组内容，-click点击有变色效果
    },
    size: {
      type: String,
      default: "default" //按钮大小，可选值为large、small、default或者不设置
    },
    data: {
      type: Array | String,
      default: () => {
        //array接受数组内容，-click点击有变色效果
        if (type) {
          [];
        } else {
          ("");
        }
      }
    }
  },
  data() {
    return {
      buttonStatusIndex: null,
      overStatusIndex: null
    };
  },
  methods: {
    handleClick(item) {
      this.$emit("handleClick", ...arguments); //函数中使用es6 数组解构赋值来  获取参数 ，行间使用...arguments 展开数组 添加多余参数
    },
    buttonClick(index) {
      this.buttonStatusIndex = index;
    },
    buttonover(index) {
      this.overStatusIndex = index;
    }
  }
};
</script>

<style scoped lang="less">
.buttonStatus {
  background-color: #2d8cf0;
  color: white;
}
.buttonOver {
  background-color: #2d8cf0;
  color: white;
}
.common-button {
  margin-right: 10px;
}
</style>
