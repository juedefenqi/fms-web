<template>
  <div class="sorry">
    <img src="@/assets/sorry.png">
    <span class="text">抱歉，这是一个提示信息页面</span>
    <Button  type="error" icon="md-paper-plane">点击</Button>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="less">
  .sorry{
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text{
      font-size: 20px;
      margin: 20px 0;
    }
  }
</style>
