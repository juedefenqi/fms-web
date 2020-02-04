import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postJsonRequest
} from "@/libs/axios";
export const extensionSave1 = params => {
  //账户展期申请保存
  return postRequest("/fcBankAccDefer/insertDefer", params);
};
export const accountChange = params => {
  //账户展期列表
  return getRequest("/fcBankAccDefer/getDeferList", params);
};
export const extensionInfo = (ids, params) => {
  //展期回显
  return getRequest(`/fcBankAccDefer/getAccountInfo/${ids}`, params);
};
export const extensionCheck = (ids, params) => {
  //展期查看
  return getRequest(`/fcBankAccDefer/get/${ids}`, params);
};
export const extensionSave = params => {
  //账户展期申请保存
  return postRequest("/fcBankAccExt/insertAccExtInfo", params);
};
