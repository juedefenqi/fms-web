import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postJsonRequest
} from "@/libs/axios";

export const openAccount = params => {
  //账户开立页面列表接口分页
  return getRequest("/fcBankAccount/getByKeyWord", params);
};
export const openAccountCheck = params => {
  //申请查看账户信息接口
  return getRequest("/fcBankAccount/getById", params);
};
export const accountCheckRecord = params => {
  //申请查看操作记录
  return getRequest("/fcBankAccount/operationRecord", params);
};
export const openApply = params => {
  //开户申请页面列表接口分页
  return getRequest("/fcBankAccApply/getByKeyWord", params);
};
export const insert = params => {
  //表单申请保存新增
  return postRequest("/fcBankAccApply/insert", params);
};
export const update = params => {
  //表单申请保存更新
  return postRequest("/fcBankAccApply/update", params);
};
export const opencApplyCheck = params => {
  // 开户登记信息 查看
  return getRequest("/fcBankAccApply/get", params);
};
export const applyCheckUpdate = params => {
  //未通
  // 开户登记信息 编辑 更新
  return postRequest("fcBankAccApply/update", params);
};
export const opencApplyInsert = params => {
  ////未通
  // 开户登记信息 编辑 保存
  return postRequest("fcBankAccApply/insert", params);
};
export const registerApply = params => {
  // 开户登记 提交
  return postJsonRequest("/fcBankAccApply/register", params);
};
// export const openAccountCheck = (ids, params) => {
//   //申请查看账户信息接口
//   return getRequest(`/fcBankAccApply/get/${ids}`, params);
// };
export const openAccountRecord = params => {
  //查看操作记录接口
  return getRequest("/recordAccount", params);
};
export const openAccountSubsidiary = params => {
  //查看附属信息印鉴/签字人接口
  return getRequest("/subsidiaryAccount", params);
};
export const openAccountInternetBanking = params => {
  //查看网银证书接口
  return getRequest("/subsidiaryAccount/internetBanking", params);
};

export const openAccountCipher = params => {
  //查看支付密码器接口
  return getRequest("/subsidiaryAccount/cipher", params);
};
export const subsidiaryInformation = params => {
  //查看附属信息印鉴/签字人接口
  return getRequest("/fcBankAccount/accSatelliteInfo", params);
};
export const updateSubInformation = params => {
  //编辑新增附属信息印鉴/签字人接口
  return postRequest("/fcBankSealorsign/insertOrUpdate", params);
};
export const deleteSubInformation = (ids, params) => {
  //删除附属信息印鉴/签字人接口
  return deleteRequest(`/fcBankSealorsign/delByIds/${ids}`, params);
};
export const updateInternetInformation = params => {
  //编辑新增附属信息网银证书接口
  return postRequest("/bankUkey/insertOrUpdate", params);
};
export const deleteInternetInformation = (ids, params) => {
  //删除附属信息网银证书接口
  return deleteRequest(`/bankUkey/delByIds/${ids}`, params);
};
export const getCertificateType = (ids, params) => {
  //查看证书类型
  return getRequest(`/dictData/getByType/${ids}`, params);
};
export const updateBankCipherware = params => {
  //编辑新增支付密码器接口
  return postRequest("/fcBankCipherware/insertOrUpdate", params);
};
export const deleteBankCipherware = (ids, params) => {
  //删除支付密码器接口
  return deleteRequest(`/fcBankCipherware/delByIds/${ids}`, params);
};
export const accountFreeze = params => {
  //未通
  //查看冻结
  return getRequest("/fcBankAccApply/accountFreeze", params);
};
export const generateNum = params => {
  //未通
  //开户申请头部申请人信息
  return postRequest("/fcAccApplyNum/generateNum", params);
};
export const cancellationApplication = params => {
  //未通
  //销户申请
  return getRequest("/fcBankAccApply/cancellationApplication", params);
};
export const accountOpenCheck = params => {
  //开户申请查看
  return getRequest("/fcBankAccApply/get", params);
};
export const accountChangeInformation = (ids, params) => {
  //开户申请页面列表接口分页
  return getRequest(`/fcBankAccChange/get/${ids}`, params);
};
export const accountGetCollection = params => {
  //获取归集主账户信息
  return getRequest("/fcBankAccount/getCollectionAccVo", params);
};
export const accountRegistSave = params => {
  //开户登记保存接口
  return postJsonRequest("/fcBankAccount/register", params);
};
export const accountRegistBankInfo = (params) => {
  //通过银联号获取省市信息
  return getRequest("/fcBankAccount/getProvinceAndCityInfo", params);
};
