export const accountApplication = {
    path: '/accountApplication',
    name: 'accountApplication',
    title:'开户申请单',
    component: () => import('@/views/account/accountApplication/accountApplication.vue')
};
export const accountRegistration = {
    path: '/accountRegistration',
    name: 'accountRegistration',
    title:'开户登记',
    component: () => import('@/views/account/accountRegistration/accountRegistration.vue')
};
export const accountRegistrationManagement = {
    path: '/accountRegistrationManagement',
    name: 'accountRegistrationManagement',
    title:'开户登记单列表',
    component: () => import('@/views/account/accountRegistration/accountRegistrationManagement.vue')
};
export const changeApplication = {
    path: '/changeApplication',
    name: 'changeApplication',
    title:'变更申请',
    component: () => import('@/views/account/accountApplication/changeApplication.vue')
};
export const changeRegistration = {
    path: '/changeRegistration',
    name: 'changeRegistration',
    title:'变更登记',
    component: () => import('@/views/account/accountRegistration/changeRegistration.vue')
};
export const freezeRegistration = {
    path: '/freezeRegistration',
    name: 'freezeRegistration',
    title:'冻结登记',
    component: () => import('@/views/account/accountRegistration/freezeRegistration.vue')
};
export const thawRegistration = {
    path: '/thawRegistration',
    name: 'thawRegistration',
    title:'解冻登记',
    component: () => import('@/views/account/accountRegistration/thawRegistration.vue')
};
export const extensionApplication = {
    path: '/extensionApplication',
    name: 'extensionApplication',
    title:'展期申请',
    component: () => import('@/views/account/accountApplication/extensionApplication.vue')
};
export const extensionRegistration = {
    path: '/extensionRegistration',
    name: 'extensionRegistration',
    title:'展期登记',
    component: () => import('@/views/account/accountRegistration/extensionRegistration.vue')
};
export const suspensionRegistration = { 
    path: '/suspensionRegistration',
    name: 'suspensionRegistration',
    title:'久悬登记',
    component: () => import('@/views/account/accountRegistration/suspensionRegistration.vue')
};
export const handleSuspensionApplication = {
    path: '/handleSuspensionApplication',
    name: 'handleSuspensionApplication',
    title:'久悬处理申请',
    component: () => import('@/views/account/accountApplication/handleSuspensionApplication.vue')
};
export const relieveSuspensionRegistration = {
    path: '/relieveSuspensionRegistration',
    name: 'relieveSuspensionRegistration',
    title:'久悬解除登记',
    component: () => import('@/views/account/accountRegistration/relieveSuspensionRegistration.vue')
};
export const cancellationRegistration = {
    path: '/cancellationRegistration',
    name: 'cancellationRegistration',
    title:'销户登记',
    component: () => import('@/views/account/accountRegistration/cancellationRegistration.vue')
};
export const cancellationApplication = {
    path: '/cancellationApplication',
    name: 'cancellationApplication',
    title:'销户申请',
    component: () => import('@/views/account/accountApplication/cancellationApplication.vue')
};
export const checkCancellationApplication = {
    path: '/checkCancellationApplication',
    name: 'checkCancellationApplication',
    title:'销户查看',
    component: () => import('@/views/account/cancellation-list/cancellation-check.vue')
};
export const accountOpenCheck = {
    path: '/account-open-check',
    name: 'account-open-check',
    title:'开户申请查看',
    component: () => import("@/views/account/open-account-management/pages-details/account-open-check.vue")
};
const accountChange = {
    path: "account-change",
    name: "account-change",
    title: "变更申请",
    component: () => import("@/views/account/accountChange/account-change.vue")
  };
const accountChangeInformation = {
    path: "account-change-information",
    name: "account-change-information",
    title: "变更申请查看",
    component: () => import("@/views/account/accountChange/account-change-information.vue")
};
export const overhangCheck = {
    path: '/overhangCheck',
    name: 'overhangCheck',
    title:'久悬查看',
    component: () => import('@/views/account/application-overhang/overhang-check.vue')
};
export const slot = {
    path: '/slot',
    name: 'slot',
    title:'弹框插槽',
    component: () => import('@/views/slot.vue')
};
export default [accountApplication,accountRegistration,accountRegistrationManagement,changeApplication,changeRegistration,
freezeRegistration,thawRegistration,extensionApplication,extensionRegistration,suspensionRegistration,handleSuspensionApplication,relieveSuspensionRegistration,
cancellationRegistration,cancellationApplication,accountOpenCheck,accountChange,accountChangeInformation,checkCancellationApplication,overhangCheck,slot]
