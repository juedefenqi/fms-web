import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest
} from "@/libs/axios";

export const accCloseInsert = params => {
  //销户登记
  return postRequest("/fcBankAccClose/insert", params);
};
export const accCloseUpdate = params => {
  //销户修改
  return postRequest("/fcBankAccClose/update", params);
};

