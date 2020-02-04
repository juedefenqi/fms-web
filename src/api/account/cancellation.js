import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postJsonRequest
} from "@/libs/axios";

export const cancellationList = params => {
  //注销列表
  return getRequest("/fcBankAccClose/getByKeyWord", params);
};
export const updateCancellationApplication1 = params => {
  //注销申请保存
  return postRequest("/fcBankAccClose/closeApply", params);
};
export const cancellationGetName = (ids, params) => {
  //注销申请获取户名等信息
  return getRequest("/fcBankAccClose/getById?id=" + ids, params);
};
export const updateCancellationApplication = params => {
  //注销申请保存
  return postRequest("/fcBankAccount/logoutRegister", params);
};
//
