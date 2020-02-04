import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postJsonRequest
} from "@/libs/axios";
export const accFreezeSave1 = params => {
  //冻结修改,保存,添加
  return postRequest("/fcBankAccFreeze/insertOrUpdate", params);
};
export const accFreezeSave = params => {
  //解冻登记
  return postRequest("/fcBankAccount/freezeRegister", params);
};
export const unAccFreezeSave = params => {
  //解冻登记
  return postRequest("/fcBankAccount/unFreezeRegister", params);
};
