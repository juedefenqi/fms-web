//定义全局命令组件，判断页面拥有权限删除节点
export const hasPermission = {
  install(Vue, options) {
    Vue.directive("has", {
      inserted(el, binding, vnode) {
        let permTypes = vnode.context.$route.meta.permTypes;
        //  vnode.context:rendered in this component's scope  在此组件范围内实现   vm= vnode.context;  即页面的this.$route 获取路由元信息
        //es6 方法  role返回 权限数组 例如 ['admin', 'user'] includes 返回  true ,false
        if (permTypes && !permTypes.includes(binding.value)) {
          //permTypes 真 并且  不存在权限删除
          el.parentNode.removeChild(el);
        }
      }
    });
  }
};
