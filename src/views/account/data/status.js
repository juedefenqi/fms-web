//account 模块显示状态值管理
//账户状态
let color = [
  "#19be6b", //绿 0
  "#333333", //黑灰1
  "#f90", //橙色2
  "#ed4014", //红色3
  "#2d8cf0", //蓝色4
  "#666666", //深灰5
  "#999999" //浅灰6
];
export const accountShow = status => {
  let content =
    status == 4
      ? { content: "正常", color: color[4] }
      : status == 1
      ? { content: "暂存", color: color[1] }
      : status == 2
      ? { content: "待复核", color: color[5] }
      : status == 3
      ? { content: " 复核未通过", color: color[3] }
      : status == 5
      ? { content: "冻结", color: color[3] }
      : status == 51
      ? { content: "冻结(不收不付)", color: color[3] }
      : status == 52
      ? { content: "冻结(只收不付)", color: color[3] }
      : status == 53
      ? { content: "冻结(部分冻结)", color: color[3] }
      : status == 6
      ? { content: "久悬", color: color[6] }
      : status == 7
      ? { content: "已注销", color: color[6] }
      : "";

  return content;
};
export const accountFreezeType = [
  { name: "不收不付", value: 0 },
  { name: "只收不付", value: 1 },
  { name: "部分冻结", value: 2 }
];
//审批状态
export const Approval = status => {
  let content =
    status == 4
      ? { content: "通过", color: color[0] }
      : status == 1
      ? { content: "暂存", color: color[1] }
      : status == 2
      ? { content: " 待审批", color: color[2] }
      : status == 3
      ? { content: "审批中", color: color[2] }
      : status == 5
      ? { content: "审批驳回", color: color[3] }
      : "";

  return content;
};
//account 模块操作状态值管理
export const statusAccount = {
  //账户管理列表
  "1": { name: "open-account-check", title: "查看" },
  "2": { name: "accountRegistration", title: "开户登记" },
  "3": { name: "account-change", title: "变更" },
  "4": { name: "", title: "变更登记" },
  "5": { name: "extension-application", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "account-freeze", title: "冻结" },
  "8": { name: "thawRegistration", title: "解冻" },
  "9": { name: "application-overhang", title: "久悬处理" },
  "10": { name: "suspensionRegistration", title: "久悬登记" },
  "11": { name: "", title: "解除久悬" },
  "12": { name: "cancellation-list", title: "注销" },
  "13": { name: "", title: "删除" }
};
export const statusApply = {
  //账户申请列表
  "1": { name: "account-open-check", title: "查看" },
  "2": { name: "accountRegistration", title: "开户登记" },
  "3": { name: "", title: "变更" },
  "4": { name: "", title: "变更登记" },
  "5": { name: "", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "account-freeze", title: "冻结" },
  "8": { name: "thawRegistration", title: "解冻" },
  "9": { name: "", title: "久悬处理" },
  "10": { name: "suspensionRegistration", title: "久悬登记" },
  "11": { name: "", title: "解除久悬" },
  "12": { name: "", title: "注销" },
  "13": { name: "", title: "删除" }
};
export const changeApply = {
  //变更列表
  "1": { name: "account-change-information", title: "查看" },
  "2": { name: "accountRegistration", title: "开户登记" },
  "3": { name: "", title: "变更" },
  "4": { name: "changeRegistration", title: "变更登记" },
  "5": { name: "", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "account-freeze", title: "冻结" },
  "8": { name: "thawRegistration", title: "解冻" },
  "9": { name: "", title: "久悬处理" },
  "10": { name: "suspensionRegistration", title: "久悬登记" },
  "11": { name: "", title: "解除久悬" },
  "12": { name: "", title: "注销" },
  "13": { name: "", title: "删除" }
};
export const extensionApply = {
  //展期列表
  "1": { name: "extension-check", title: "查看" },
  "2": { name: "extensionRegistration", title: "展期登记" },
  "3": { name: "", title: "变更" },
  "4": { name: "", title: "变更登记" },
  "5": { name: "", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "account-freeze", title: "冻结" },
  "8": { name: "thawRegistration", title: "解冻" },
  "9": { name: "", title: "久悬处理" },
  "10": { name: "suspensionRegistration", title: "久悬登记" },
  "11": { name: "", title: "解除久悬" },
  "12": { name: "", title: "注销" },
  "13": { name: "", title: "删除" }
};
export const overhangApply = {
  //账户管理列表
  "1": { name: "overhangCheck", title: "查看" },
  "2": { name: "", title: "开户登记" },
  "3": { name: "", title: "变更" },
  "4": { name: "", title: "变更登记" },
  "5": { name: "", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "", title: "冻结" },
  "8": { name: "", title: "解冻" },
  "9": { name: "", title: "久悬处理" },
  "10": { name: "", title: "久悬登记" },
  "11": { name: "relieveSuspensionRegistration", title: "解除久悬" },
  "12": { name: "", title: "注销" },
  "13": { name: "", title: "删除" }
};
export const cancellationApply = {
  //账户管理列表
  "1": { name: "checkCancellationApplication", title: "查看" },
  "2": { name: "", title: "开户登记" },
  "3": { name: "", title: "变更" },
  "4": { name: "", title: "变更登记" },
  "5": { name: "", title: "展期" },
  "6": { name: "", title: "展期登记" },
  "7": { name: "", title: "冻结" },
  "8": { name: "", title: "解冻" },
  "9": { name: "", title: "久悬处理" },
  "10": { name: "", title: "久悬登记" },
  "11": { name: "", title: "解除久悬" },
  "12": { name: "cancellationRegistration", title: "注销" },
  "13": { name: "", title: "删除" }
};
