<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>

<template>
  <div>

  </div>
</template>

<script>
import { ipInfo } from "@/api/index";
import Cookies from "js-cookie";
export default {
  name: "home",
  components: {

  },
  data() {

    return{}
  },
  computed: {

  },
  methods: {
    init() {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = userInfo.username;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
