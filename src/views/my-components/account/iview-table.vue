<template>
    <Table border :columns="columns" :data="data"></Table>
</template>

<script>
export default {
  name: "iviewTable",
  props: {
    columns: [],
    data: []
  },
  data() {
    return {

    }
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
  
</style>

