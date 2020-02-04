import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest
} from "@/libs/axios";

export const overhangList = params => {
  //久悬列表
  return getRequest("/fcBankAccHang/getByKeyWord", params);
};
export const overhangGet = (ids, params) => {
  //久悬查看
  return getRequest(`/fcBankAccHang/get/${ids}`, params);
};
export const hangApply = params => {
  //久悬申请
  return postRequest("/fcBankAccHang/hangApply", params);
};
export const relieveOverHang = params => {
  //解除久悬登记保存借口
  return postRequest("/fcBankAccHang/removeHanding", params);
};
export const overhangSave1 = params => {
  //久悬登记旧的
  return postRequest("/fcBankAccOverHang/insertOrUpdate", params);
};
export const unOverhangSave = params => {
  //解除久悬登记
  return postRequest("/fcBankAccount/unHandingRegister", params);
};
export const overhangSave = params => {
  //久悬登记新
  return postRequest("/fcBankAccount/handingRegister", params);
};
