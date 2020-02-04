//全局注册 多维度控制权限至按钮显示
import Vue from "vue";
import { hasPermission } from "@/directive/hasPermission.js"; //定义全局命令组件，判断页面拥有权限删除节点
import { hasRole } from "@/directive/hasRole.js"; //全局注册 角色权限
Vue.use(hasPermission);
Vue.use(hasRole);
