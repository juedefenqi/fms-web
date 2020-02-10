import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    importRequest,
    uploadFileRequest,
    postJsonRequest
  } from "@/libs/axios";

  export const accLogLife = params => {
    //操作记录生命周期记录
    return getRequest("/fcOperationLog/getByAccId", params);
  };
  export const accLogHanding = params => {
    //操作记录久悬记录
    return getRequest("/fcOperationLog/handingLog", params);
  };
  export const accLogChange = params => {
    //操作记录变更记录
    return getRequest("/fcBankAccountHis/queryHisListByAccid", params);
  };
  export const accLogDefer = params => {
    //操作记录展期记录
    return getRequest("/fcOperationLog/deferLog", params);
  };
  export const accLogFreeze = params => {
    //操作记录冻结解冻记录
    return getRequest("/fcOperationLog/freezeLog", params);
  };