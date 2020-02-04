import { isEmpty } from "@/libs/validate.js";
///accountApplication  开户申请表单
export const accountApplication = {
  formValidate: {
    isAskVisa: "",
    acManageAttribute: "",
    accAbb: "",
    accDueDate: "",
    accId: "",
    accName: "",
    accNotAllow: "",
    accOpenDate: "",
    accPro: "",
    accUse: "",
    applyDate: "",
    applyId: "",
    applyUnitId: "",
    balanceAttribute: "",
    bankid: "",
    collectionAcc: "",
    collectionRea: "",
    comment: "",
    createBy: "",
    createTime: "",
    currency: "",
    delFlag: 0,
    entityAcc: "",
    fcAccSta: "",
    fcOpSta: "",
    id: "",
    isAllowOver: 0,
    isBankUnit: 0,
    isControlAcc: 0,
    isOpenCipherware: 0,
    isOpenEbank: 0,
    isSuperviseAcc: 0,
    isUnderAcc: 0,
    isVirtualAcc: 0,
    maComment: "",
    manageId: "",
    moneyCenterId: "",
    noCipherwareRe: "",
    noEbankRe: "",
    noLinkRe: "",
    openAccId: "",
    overAmount: 0,
    projectId: "",
    staffId: "",
    superviseRe: "",
    unitId: "",
    updateBy: "",
    updateTime: "",
    workflowId: ""
  },
  ruleValidate: {
    //基本信息
    maComment: [
      //事项说明
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    unitId: [
      //使用单位
      { required: true, message: "请选择", trigger: "change" }
    ],
    moneyCenterId: [
      //资金中心
      { required: true, message: "请选择", trigger: "change" }
    ],
    openAccId: [
      //开户单位
      { required: true, message: "请选择", trigger: "change" }
    ],
    //账户信息
    currency: [
      //币别
      { required: true, message: "请选择", trigger: "change" }
    ],
    bankid: [
      //开户银行
      { required: true, message: "请选择", trigger: "change" }
    ],
    accPro: [
      //账户性质
      { required: true, message: "请选择", trigger: "change" }
    ],
    balanceAttribute: [
      //收支属性
      { required: true, message: "请选择", trigger: "change" }
    ],
    accUse: [
      //账户用途
      { required: true, message: "请选择", trigger: "change" }
    ],
    accName: [
      //申请姓名
      { required: true, message: "请选择", trigger: "blur" }
    ],
    accAbb: [
      //简称
      { required: true, message: "请选择", trigger: "blur" }
    ],
    accOpenDate: [
      { required: true, type: "date", message: "不能为空", trigger: "change" }
    ],
    accDueDate: [
      { required: true, type: "date", message: "不能为空", trigger: "change" }
    ],
    accId: [
      //账户
      { required: true, message: "请选择", trigger: "blur" }
    ],
    acManageAttribute: [
      //账户管理属性
      { required: true, message: "请选择", trigger: "change" }
    ],
    accNotAllow: [
      //用户限制
      { required: true, message: "请选择", trigger: "change" }
    ],
    noLinkRe: [{ validator: isEmpty, trigger: "blur" }],
    noEbankRe: [{ validator: isEmpty, trigger: "blur" }],
    noCipherwareRe: [{ validator: isEmpty, trigger: "blur" }],
    superviseRe: [{ validator: isEmpty, trigger: "blur" }],
    overAmount: [{ validator: isEmpty, trigger: "blur" }],
    collectionRea: [{ validator: isEmpty, trigger: "blur" }],
    entityAcc: [{ validator: isEmpty, trigger: "blur" }]
  }
};
//展期申请
export const extension = {
  formValidate: {
    id: "",
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    applyTableId: null,
    unitId: null,
    projectId: null,
    manageId: null,
    moneyCenterId: null,
    openAccId: null,
    accId: "",
    accName: null,
    accAbb: null,
    accPro: null,
    accOpenDate: null,
    accDueDate: "",
    bankid: null,
    currency: null,
    accUse: null,
    balanceAttribute: null,
    acManageAttribute: null,
    isBankUnit: null,
    noLinkRe: null,
    isOpenEbank: null,
    noEbankRe: null,
    isOpenCipherware: null,
    noCipherwareRe: null,
    isSuperviseAcc: null,
    superviseRe: null,
    isUnderAcc: null,
    collectionRea: null,
    collectionAcc: null,
    isAllowOver: null,
    overAmount: null,
    isVirtualAcc: null,
    entityAcc: null,
    isControlAcc: null,
    accNotAllow: null,
    accOperator: null,
    operatorTel: null,
    accLargePeoson: null,
    largerPersonTel: null,
    bankManage: null,
    managerTel: null,
    comment: null,
    maComment: null,
    fcAccSta: "",
    fcBankSealorsignList: null,
    bankUkeyList: null,
    cipherwareList: null
  },
  ruleValidate: {}
};
//展期申请
export const overhang = {
  formValidate: {
    accId: "",
    applyDate: "",
    applyId: "",
    applyUnitId: "",
    cancelRea: "",
    createBy: "",
    createTime: "",
    delFlag: 0,
    esCancelDate: "",
    fcOpSta: "",
    hangDealWay: "",
    hangRea: "",
    id: "",
    removeHangDate: "",
    removeHangRea: "",
    staffId: "",
    updateBy: "",
    updateTime: "",
    workflowId: ""
  },
  ruleValidate: {
    //基本信息
    hangRea: [
      //事项说明
      { required: true, message: "不能为空", trigger: "blur" }
    ]
  }
};
export const fcBankSealorsignList = {
  //印鉴/签字人 表
  accId: "",
  authoPerson: "",
  createBy: "",
  createTime: "",
  delFlag: 0,
  id: "",
  keeper: "",
  sealType: "",
  updateBy: "",
  updateTime: ""
};
