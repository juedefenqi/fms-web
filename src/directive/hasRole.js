//全局注册 多维度控制权限至按钮显示
import { getStore } from "@/libs/storage";
export const hasRole = {
  install(Vue, options) {
    Vue.directive("hasRole", {
      inserted(el, binding) {
        let roles = getStore("roles");
        console.log(binding.value);
        console.log(roles.includes(binding.value));
        //es6 方法  role返回 权限数组 例如 ['admin', 'user'] includes 返回  true ,false
        if (roles && !roles.includes(binding.value)) {
          // rloe 有权限 并且 角色 不存在权限删除
          el.parentNode.removeChild(el);
        }
      }
    });
  }
};
