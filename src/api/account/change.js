import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postJsonRequest
} from "@/libs/axios";


export const changeApplication = (ids, params) => {
  //变更申请页面
  return getRequest(`/fcBankAccChange/getAccountInfo/${ids}`, params);
};
export const updateApplicationChange = params => {
  //变更申请保存
  return postRequest("/fcBankAccChange/insertChange", params);
};
export const changeApplicationList = params => {
  //变更申请列表
  return getRequest("/fcBankAccChange/getChangeList", params);
};
export const updateChangeRegistration = params => {
  //变更登记保存
  return postJsonRequest("/fcBankAccountHis/insertOrUpdate", params);
};