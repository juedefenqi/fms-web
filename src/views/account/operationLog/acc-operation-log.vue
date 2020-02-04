<template>
  <div class="search">
    <Card dis-hover="true">
      <h2 class="acc-log-title">
        <span class="logUser">
          <span v-if="getData.accName">{{ getData.accName }}</span>
          <span v-else>空</span>

          <span>(户名)</span>
        </span>
        <span>
          <span v-if="getData.accName">{{ getData.accId }}</span>
          <span v-else>空</span>
          <span>(账号)</span>
        </span>

        <span class="logStatus">
          <span>状态 :</span>
          <span :style="{ color: accountShow(getData.fcAccSta).color }">{{
            accountShow(getData.fcAccSta).content
          }}</span>
        </span>
      </h2>
      <div class="acc-log-contnet">
        <Tabs :animated="false" @on-click="changeClick">
          <TabPane name="life" label="全生命周期记录">
            <life-record v-if="tabName=='life'" :id="id"></life-record>
          </TabPane>
          <TabPane name="change" label="变更记录"> 
          <!-- <change-record :id="id"></change-record> -->
          </TabPane>
          <TabPane name="freeze" label="冻结解冻记录">
            <freeze-record v-if="tabName=='freeze'" :id="id"></freeze-record>
           </TabPane>
          <TabPane name="extension" label="展期记录"> 
              <extension-record v-if="tabName=='extension'" :id="id"></extension-record>
          </TabPane>
          <TabPane name="haning" label="久悬记录">
            <haning-record v-if="tabName=='haning'" :id="id"></haning-record>
           </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import lifeRecord from "@/views/account/operationLog/life-record.vue";
import changeRecord from "@/views/account/operationLog/change-record.vue";
import extensionRecord from "@/views/account/operationLog/extension-record.vue";
import haningRecord from "@/views/account/operationLog/haning-record.vue";
import freezeRecord from "@/views/account/operationLog/freeze-record.vue";
import { requestSuccess, isStore } from "@/libs/tool.js";
import { accountShow } from "@/views/account/data/status.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "acc-operation-log",
  components: {
    lifeRecord,
    changeRecord,
    extensionRecord,
    haningRecord,
    freezeRecord
  },
  data() {
    //这里存放数据
    return {
      getData: "",
      id: "",
      tabName:"life"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    isStore: isStore,
    accountShow: accountShow,
    changeClick(name){
    console.log(name);
    this.tabName=name;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.id = JSON.parse(this.isStore()).accId;
    this.getData = JSON.parse(this.isStore());
    console.log(this.getData);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
@import "./index.less"; //引入公共css类
.acc-log-title {
  padding: 10px 20px;
}
.logUser {
  margin-right: 50px;
}
.logStatus {
  float: right;
}
.acc-log-contnet{
    padding:  0 10px;
}
</style>
