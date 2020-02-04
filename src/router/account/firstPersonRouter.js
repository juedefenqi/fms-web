const accountResult = {
  path: "open-account-check",
  name: "open-account-check",
  title: "查看", //开户申请查看
  component: () =>
    import("@/views/account/open-account-management/pages-details/check.vue")
};
const accountOpenResult = {
  path: "account-open",
  name: "account-open",
  title: "账户开立",
  component: () =>
    import(
      "@/views/account/open-account-management/pages-details/account-open.vue"
    )
}; //account-open
const freezeResult = {
  path: "account-freeze",
  name: "account-freeze",
  title: "冻结",
  component: () =>
    import(
      "@/views/account/open-account-management/pages-details/check/account-freeze.vue"
    )
};
const extensionApplicationResult = {
  path: "extension-application",
  name: "extension-application",
  title: "展期",
  component: () =>
    import("@/views/account/extension-application/extension-application.vue")
}; //
const extensionCheckResult = {
  path: "extension-check",
  name: "extension-check",
  title: "展期查看",
  component: () =>
    import("@/views/account/extension-application/extension-check.vue")
}; //application- overhang,
const overhangResult = {
  path: "application-overhang",
  name: "application-overhang",
  title: "久悬处理",
  component: () =>
    import("@/views/account/application-overhang/application-overhang.vue")
}; //
const cancellationResult = {
  path: "cancellation-list",
  name: "cancellation-list",
  title: "注销",
  component: () =>
    import("@/views/account/cancellation-list/cancellation-list.vue")
}; 
const operationResult = {
  path: "acc-operation-log",
  name: "acc-operation-log",
  title: "操作记录",
  component: () =>
    import("@/views/account/operationLog/acc-operation-log.vue")
}; 

//
// let arrResult = [];
//   function generateRouter(val,){
//    item
//   }
export default [
  operationResult,
  accountResult,
  freezeResult,
  accountOpenResult,
  extensionApplicationResult,
  extensionCheckResult,
  overhangResult,
  cancellationResult
];
