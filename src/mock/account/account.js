import Mock from "mockjs";
let flag = false;
let objectName = "/xboot";
////数据字典
/////`/dictData/getByType/${ids}`
// Mock.mock(
//   RegExp(`${objectName}` + "/dictData/getByType" + ".*"),
//   "get",
//   function() {
//     return Mock.mock({
//       success: true,
//       message: "success",
//       code: 200,
//       timestamp: 1576824510369,
//       result: [
//         {
//           id: "219976429784272896",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:40:09",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:40:09",
//           delFlag: 0,
//           title: "人民币",
//           value: "人民币",
//           sortOrder: 1.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         },
//         {
//           id: "219976565197377536",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:40:41",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:40:41",
//           delFlag: 0,
//           title: "美元",
//           value: "美元",
//           sortOrder: 2.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         },
//         {
//           id: "219976636940947456",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:40:58",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:40:58",
//           delFlag: 0,
//           title: "英镑",
//           value: "英镑",
//           sortOrder: 3.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         },
//         {
//           id: "219976789479395328",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:41:35",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:41:35",
//           delFlag: 0,
//           title: "欧元",
//           value: "欧元",
//           sortOrder: 4.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         },
//         {
//           id: "219976699939393536",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:41:13",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:41:46",
//           delFlag: 0,
//           title: "澳元",
//           value: "澳元",
//           sortOrder: 5.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         },
//         {
//           id: "219976933415325696",
//           createBy: "XBW",
//           createTime: "2019-12-19 14:42:09",
//           updateBy: "XBW",
//           updateTime: "2019-12-19 14:42:09",
//           delFlag: 0,
//           title: "日元",
//           value: "日元",
//           sortOrder: 6.0,
//           status: 0,
//           description: "",
//           dictId: "219975390830006272"
//         }
//       ]
//     });
//   }
// );
/////账户申请列表
// Mock.mock(
//   RegExp(`${objectName}` + "/fcBankAccApply/getByKeyWord" + ".*"),
//   "get",
//   function() {
//     return Mock.mock({
//       success: true,
//       message: "success",
//       code: 200,
//       timestamp: 1577778562397,
//       result: {
//         records: [
//           {
//             id: "224328239441514496",
//             applyUnitId: "总部",
//             staffId: "李明",
//             applyDate: "2019-12-31",
//             applyId: "NO201912310003",
//             bankid: "中国铁建",
//             accName: "21321",
//             unitId: "中铁二十三局一分局",
//             projectId: "",
//             openAccId: "中国铁建",
//             fcOpSta: "4",
//             operate: ["1", "2"]
//           },
//           {
//             id: "224274437145366528",
//             applyUnitId: "总部",
//             staffId: "李明",
//             applyDate: "2019-12-30",
//             applyId: "NO201912310002",
//             bankid: "中国铁建",
//             accName: "li",
//             unitId: "中铁二十三局一分局",
//             projectId: "",
//             openAccId: "中国铁建",
//             fcOpSta: "4",
//             operate: ["1", "2"]
//           },
//           {
//             id: "224273013401456640",
//             applyUnitId: "总部",
//             staffId: "李明",
//             applyDate: "2019-12-31",
//             applyId: "NO201912310001",
//             bankid: "中国铁建",
//             accName: "21321",
//             unitId: "中铁二十三局一分局",
//             projectId: "",
//             openAccId: "中国铁建",
//             fcOpSta: "4",
//             operate: ["1", "2"]
//           },
//           {
//             id: "224329442204323840",
//             applyUnitId: "总部",
//             staffId: "李明",
//             applyDate: "2019-12-31",
//             applyId: "NO201912310004",
//             bankid: "中国铁建",
//             accName: "11",
//             unitId: "中铁二十三局一分局",
//             projectId: "",
//             openAccId: "中国铁建",
//             fcOpSta: "4",
//             operate: ["1", "2"]
//           },
//           {
//             id: "224337944775757824",
//             applyUnitId: "总部",
//             staffId: "李明",
//             applyDate: "2019-12-31",
//             applyId: "NO201912310004",
//             bankid: "中国铁建",
//             accName: "123",
//             unitId: "中铁二十三局一分局",
//             projectId: "",
//             openAccId: "中国铁建",
//             fcOpSta: "4",
//             operate: ["1", "2"]
//           }
//         ],
//         total: 5,
//         size: 10,
//         current: 1,
//         orders: [],
//         searchCount: true,
//         pages: 1
//       }
//     });
//   }
// );

/////开户申请头部申请人信息
// Mock.mock(
//   RegExp(`${objectName}` + "/fcAccApplyNum/generateNum" + ".*"),
//   "post",
//   function() {
//     return Mock.mock({
//       success: true,
//       message: "success",
//       code: 200,
//       timestamp: 1576824510369,
//       result: {
//         applyDate: "2019-12-27",
//         applyId: "222796551062294553",
//         applyUnitId: "总部",
//         staffId: "LM"
//       }
//     });
//   }
// );
//账户开立列表
// Mock.mock(
//   RegExp(`${objectName}` + "/fcBankAccount/getByKeyWord" + ".*"),
//   "get",
//   function() {
//     return Mock.mock({
//       success: true,
//       message: "success",
//       code: 200,
//       timestamp: 1576824510369,
//       result: {
//         records: [
//           {
//             id: "219991688238600192",
//             accCode: "账号",
//             bankid: "开户银行",
//             accName: "205省道大桥改造项目",
//             unitName: "中铁二十三局二分局",
//             projectName: "使用项目",
//             accOpenUnit: "中国铁建",
//             accPro: "基本存款户",
//             accUse: "结算存款",
//             fcSeSta: "3",
//             fcOpSta: "1",
//             operate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//           },
//           {
//             id: "219987247695400960",
//             accCode: "测试",
//             bankid: "开户银行",
//             accName: "湖南省道大桥改造项目",
//             unitName: "中铁二十三局一分局",
//             projectName: "使用项目",
//             accOpenUnit: "中国铁建",
//             accPro: "一般存款户",
//             accUse: "定期存款",
//             fcSeSta: "2",
//             fcOpSta: "2",
//             operate: [1, 2, 3, 4]
//           },
//           {
//             id: "219969562454528000",
//             accCode: "adsf",
//             bankid: "开户银行",
//             accName: "205省道大桥改造项目",
//             unitName: "中铁二十二局一分局",
//             projectName: "\t 使用项目",
//             accOpenUnit: "中国铁建",
//             accPro: "专用存款户",
//             accUse: "定期存款",
//             fcSeSta: "1",
//             fcOpSta: "3",
//             operate: [1, 2, 3, 4]
//           }
//         ],
//         total: 3,
//         size: 10,
//         current: 1,
//         orders: [],
//         searchCount: true,
//         pages: 1
//       }
//     });
//   }
// );
//添加开户申请
//Mock.mock(
//  RegExp(`${objectName}` + "/fcAccApplyNum/generateNum" + ".*"),
//  "post",
//  function() {
//    return Mock.mock({
//      success: true,
//      message: "success",
//      code: 200,
//      timestamp: 1576824510369,
//      result: {
//        applyDate: "2019-12-27",
//        applyId: "222796551062294553",
//        applyUnitId: "总部",
//        staffId: "LM"
//      }
//    });
//  }
//);

Mock.mock("/xboot/openAccount", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      total: 11,
      size: 5,
      current: 1,
      searchCount: true,
      pages: 1,
      "record|11-18": [
        {
          "openAccountBank|+1": [
            //开户银行
            "@county()银行"
          ],
          "accountNumber|+1": [
            //账号
            "@id"
          ],
          "accountName|+1": [
            //户名
            "@cname"
          ],
          "applyAccountName|+1": [
            //申请户名
            "@cname"
          ],
          "useUnit|+1": [
            //使用单位
            "@county()投资公司"
          ],

          "manageUnit|+1": [
            //管理单位
            "@county()金建公司"
          ],
          "openAccountUnit|+1": [
            //开户单位
            "@county()人寿公司"
          ],
          "moneyCenter|+1": [
            //资金中心
            "@county()石油公司"
          ],
          "useProject|+1": [
            //使用项目
            "@county()交通出行"
          ],
          "useProperty|+1": [
            //账户性质
            "临时存款户"
          ],
          "accountUse|+1": [
            //账户用途
            "工程款存款"
          ],
          " itemsExplain|+1": [
            //事项说明
            "@cparagraph(1)"
          ],
          "accountStatus|+1": [
            //(value = "账户状态 0=正常；1=封存；2=久悬；3=冻结；4=已注销")
            "@integer( 0, 4 )"
          ],
          "operationStatus|+1": [
            //(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
            "@integer( 0, 4 )"
          ]
        }
      ]
    }
  });
});
// Mock.mock("/xboot/fcBankAccount/getById", "get", function() {
//   return Mock.mock({
//     code: 200,
//     message: "@cparagraph(1)",
//     success: true,
//     sum: null,
//     subjoin: null,
//     timestamp: "@now",
//     result: {
//       name: "中铁二十三局集团有限公司项目",
//       bankKey: "955888317777881313",
//       bank: "交通银行-北京海淀支行",
//       accountStatus: "@integer( 0, 4 )",
//       actionStatus: "@integer( 0, 4 )",
//       userUnit: "中铁二十三局集团有限公司母公司",
//       capitalUnit: "中铁二十三局集团有限公司资金中心",
//       managementUnit: "中铁二十三局集团有限公司母公司",
//       userObject: "中铁二十三局集团有限公司母项目",
//       openUnit: "中铁二十三局集团有限公司母公司"
//     }
//   });
// });
//
Mock.mock("/xboot/recordAccount", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      total: 11,
      size: 5,
      current: 1,
      searchCount: true,
      pages: 1,
      "record|11-18": [
        {
          "print|+1": [
            //更新时间//print印鉴//公司公章
            "法人章"
          ],
          "update|+1": [
            //更新时间//
            '@date("yyyy-MM-dd")'
          ],
          "content|+1": [
            //内容
            "银行账户确认"
          ],
          "custodian|+1": [
            //保管人
            "@cname"
          ],
          "name|+1": [
            //姓名
            "@cname"
          ],
          "explain|+1": [
            //说明
            "@cparagraph(1, 3)"
          ],
          "openAccountBank|+1": [
            //开户银行
            "@county()银行"
          ],
          "accountNumber|+1": [
            //账号
            "@id"
          ],
          "accountName|+1": [
            //户名
            "@cname"
          ],
          "applyAccountName|+1": [
            //申请户名
            "@cname"
          ],
          "useUnit|+1": [
            //使用单位
            "@county()投资公司"
          ],

          "manageUnit|+1": [
            //管理单位
            "@county()金建公司"
          ],
          "openAccountUnit|+1": [
            //开户单位
            "@county()人寿公司"
          ],
          "moneyCenter|+1": [
            //资金中心
            "@county()石油公司"
          ],
          "useProject|+1": [
            //使用项目
            "@county()交通出行"
          ],
          "useProperty|+1": [
            //账户性质
            "临时存款户"
          ],
          "accountUse|+1": [
            //账户用途
            "工程款存款"
          ],
          "itemsExplain|+1": [
            //事项说明
            "@cparagraph(1)"
          ],
          "accountStatus|+1": [
            //(value = "账户状态 0=正常；1=封存；2=久悬；3=冻结；4=已注销")
            "@integer( 0, 4 )"
          ],
          "operationStatus|+1": [
            //(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
            "@integer( 0, 4 )"
          ]
        }
      ]
    }
  });
});
//subsidiary
Mock.mock("/xboot/subsidiaryAccount", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      total: 11,
      size: 5,
      current: 1,
      searchCount: true,
      pages: 1,
      "record|2-4": [
        {
          "print|+1": [
            //更新时间//print印鉴//公司公章
            "法人章"
          ],
          "update|+1": [
            //更新时间//
            '@date("yyyy-MM-dd")'
          ],
          "content|+1": [
            //内容
            "银行账户确认"
          ],
          "custodian|+1": [
            //保管人
            "@cname"
          ],
          "name|+1": [
            //姓名
            "@cname"
          ],
          "explain|+1": [
            //说明
            "@cparagraph(1, 3)"
          ],
          "openAccountBank|+1": [
            //开户银行
            "@county()银行"
          ],
          "accountNumber|+1": [
            //账号
            "@id"
          ],
          "accountName|+1": [
            //户名
            "@cname"
          ],
          "applyAccountName|+1": [
            //申请户名
            "@cname"
          ],
          "useUnit|+1": [
            //使用单位
            "@county()投资公司"
          ]
        }
      ]
    }
  });
});
///subsidiaryAccount/internetBanking
Mock.mock("/xboot/subsidiaryAccount/internetBanking", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      total: 11,
      size: 5,
      current: 1,
      searchCount: true,
      pages: 1,
      "record|2-4": [
        {
          "print|+1": [
            //更新时间//print印鉴//公司公章
            "法人章"
          ],
          "update|+1": [
            //更新时间//
            '@date("yyyy-MM-dd")'
          ],
          "content|+1": [
            //内容
            "银行账户确认"
          ],
          "custodian|+1": [
            //保管人
            "@cname"
          ],
          "name|+1": [
            //姓名
            "@cname"
          ],
          "explain|+1": [
            //说明
            "原因：未直连，不归集，须现场处理业务"
          ],
          "openAccountBank|+1": [
            //开户银行
            "@county()银行"
          ],
          "accountNumber|+1": [
            //账号
            "@id"
          ],
          "accountName|+1": [
            //户名
            "@cname"
          ],
          "applyAccountName|+1": [
            //申请户名
            "@cname"
          ],
          "number|+1": [
            //编号
            "@id"
          ],
          "id|+1": [
            //编号
            "@id"
          ],
          "type|+1": [
            // 类型 软证书
            "实体证书"
          ], //role
          "role|+1": [
            // 类型 制单
            "审核"
          ], //role
          "moneyOrder|+1": [
            // 金额单次
            "@float(60, 100, 3, 5)"
          ], //role
          "moneyDay|+1": [
            // 金额单次
            "@float(60, 100, 3, 5)"
          ], //role
          "status|+1": [
            //(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
            "@integer( 0, 1 )"
          ]
        }
      ]
    }
  });
});
//cipher
Mock.mock("/xboot/subsidiaryAccount/cipher", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      total: 11,
      size: 5,
      current: 1,
      searchCount: true,
      pages: 1,
      "record|2-4": [
        {
          "print|+1": [
            //更新时间//print印鉴//公司公章
            "法人章"
          ],
          "update|+1": [
            //更新时间//
            '@date("yyyy-MM-dd")'
          ],
          "content|+1": [
            //内容
            "银行账户确认"
          ],
          "custodian|+1": [
            //保管人
            "@cname"
          ],
          "name|+1": [
            //姓名
            "@cname"
          ],
          "explain|+1": [
            //说明
            "@cparagraph(1, 3)"
          ],
          "openAccountBank|+1": [
            //开户银行
            "@county()银行"
          ],
          "accountNumber|+1": [
            //账号
            "@id"
          ],
          "accountName|+1": [
            //户名
            "@cname"
          ],
          "applyAccountName|+1": [
            //申请户名
            "@cname"
          ],
          "useUnit|+1": [
            //使用单位
            "@county()投资公司"
          ],
          "number|+1": [
            //编号
            "@id"
          ],
          "id|+1": [
            //编号
            "@id"
          ],
          "type|+1": [
            // 类型 软证书
            "实体证书"
          ], //role
          "role|+1": [
            // 类型 制单
            "审核"
          ], //role
          "moneyOrder|+1": [
            // 金额单次
            "@float(60, 100, 3, 5)"
          ], //role
          "moneyDay|+1": [
            // 金额单次
            "@float(60, 100, 3, 5)"
          ], //role
          "status|+1": [
            //(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
            "@integer( 0, 1 )"
          ]
        }
      ]
    }
  });
});
//accountFreeze
Mock.mock("/xboot/fcBankAccApply/accountFreeze", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      id: "219969562454528000",
      accCode: "adsf",
      bankid: "开户银行",
      accName: "205省道大桥改造项目",
      unitName: "中铁二十二局一分局",
      projectName: "\t 使用项目",
      accOpenUnit: "中国铁建",
      accPro: "专用存款户",
      accUse: "定期存款",
      fcSeSta: "1",
      fcOpSta: "3",
      operate: [1, 2, 3, 4],
      upDate: '@date("yyyy-MM-dd")',
      name: "@cname",
      status: 1,
      //账号
      accountNumber: "@id",
      money:
        // 金额单次
        "@float(60, 100, 3, 5)",
      itemsExplain:
        //事项说明
        "@cparagraph(1)"
    }
  });
});
//cancellationApplication  销户申请
Mock.mock("/xboot/fcBankAccApply/cancellationApplication", "get", function() {
  return Mock.mock({
    code: 200,
    message: "@cparagraph(1)",
    success: true,
    sum: null,
    subjoin: null,
    timestamp: "@now",
    result: {
      id: "219969562454528000",
      accCode: "adsf",
      bankid: "开户银行",
      accName: "中铁二十三局集团双流高速路项目",
      unitName: "中铁二十二局一分局",
      projectName: "\t 使用项目",
      accOpenUnit: "中国铁建",
      accPro: "专用存款户",
      accUse: "定期存款",
      fcSeSta: "1",
      fcOpSta: "3",
      operate: [1, 2, 3, 4],
      upDate: '@date("yyyy-MM-dd")',
      name: "@cname",
      status: 1,
      //账号
      accountNumber: "@id",
      money:
        // 金额单次
        "@float(60, 100, 3, 5)",
      itemsExplain:
        //事项说明
        "@cparagraph(1)"
    }
  });
});
//账户列表 查看基本信息
Mock.mock(
  RegExp(`${objectName}` + "/fcBankAccApply/get/" + ".*"),
  "get",
  function() {
    return Mock.mock({
      success: true,
      message: "success",
      code: 200,
      timestamp: 1577944272276,
      result: {
        id: "224274437145366528",
        createBy: "LM",
        createTime: "2019-12-31 03:18:54",
        updateBy: "",
        updateTime: null,
        delFlag: 0,
        applyUnitId: "总部",
        staffId: "224007717042262016",
        applyDate: "2019-12-30",
        applyId: "NO201912310002",
        workflowId: "",
        unitId: "sy_1",
        projectId: "",
        manageId: "gl_2",
        moneyCenterId: "zj_1",
        openAccId: "kh_1",
        accName: "li",
        accPro: "0201",
        bankid: "kh_1",
        currency: "1106",
        accUse: "0301",
        balanceAttribute: "0401",
        acManageAttribute: "0501",
        isBankUnit: 0,
        noLinkRe: "12321",
        isOpenEbank: 0,
        noEbankRe: "321321",
        isOpenCipherware: 0,
        noCipherwareRe: "213213",
        isSuperviseAcc: 1,
        superviseRe: "21321321321",
        isUnderAcc: 0,
        collectionRea: "21321321",
        collectionAcc: "",
        isAllowOver: 1,
        overAmount: 32121.0,
        isVirtualAcc: 0,
        entityAcc: "123213",
        isControlAcc: 1,
        accNotAllow: "21321",
        comment: "123213",
        maComment: "213213",
        isAskVisa: 1,
        fcOpSta: "4"
      }
    });
  }
);
//操作记录 生命周期
// Mock.mock(
//   RegExp(`${objectName}` + "/fcOperationLog/getByAccId"),
//   "get",
//   function() {
//     return Mock.mock({
//       success: true,
//       message: "success",
//       code: 200,
//       timestamp: 1580721675728,
//       result: [
//         {
//           id: "231881023439245312",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:04:45.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"23423","deferDueDate":"2020-01-31","deferOriDate":"2020-01-30","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231881509512941568",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:06:41.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"2312","deferDueDate":"2020-01-31","deferOriDate":"2020-01-30","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231882516565331968",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:10:41.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"12312","deferDueDate":"2020-01-31","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231883405703254016",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:14:13.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"12312","deferDueDate":"2020-01-31","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231884026162450432",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:16:41.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"212","deferDueDate":"2020-01-31","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231884225840680960",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:17:29.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"123","deferDueDate":"2020-01-31","accId":"测试20190121"}'
//         },
//         {
//           id: "231888720695922688",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:35:20.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"2131","deferDueDate":"2020-01-31","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231890101699874816",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:40:50.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"2131","deferDueDate":"2020-01-31","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231892414745284608",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:50:01.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"3423243","deferDueDate":"2020-02-01","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231893423974518784",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:54:02.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"3423243","deferDueDate":"2020-02-01","accId":"测试20190121","id":"231879402860843008"}'
//         },
//         {
//           id: "231894692919250944",
//           operationPerson: "LM",
//           operationTime: "2020-01-21T11:59:04.000+0800",
//           operationAction: "展期登记",
//           accId: "测试20190121",
//           businessModule: "银行账户模块",
//           businessText:
//             '{"deferRea":"3423243","deferDueDate":"2020-02-01","accId":"测试20190121","id":"231879402860843008"}'
//         }
//       ]
//     });
//   }
// );
