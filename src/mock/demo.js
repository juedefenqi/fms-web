import Mock from  'mockjs';
function mockGet(url){
    return RegExp(url + ".*")
}
Mock.setup({
    timeout: '50-300'
})

Mock.mock(RegExp('/xboot/test' + ".*"), 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|11-18":[
                {
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "useUnit|+1": [//使用单位
                        '@county()投资公司',
                    ],

                    "manageUnit|+1":[//管理单位
                        '@county()金建公司',
                    ],
                    "openAccountUnit|+1":[//开户单位
                        '@county()人寿公司',
                    ],
                    "moneyCenter|+1":[//资金中心
                        '@county()石油公司',
                    ],
                    "useProject|+1":[//使用项目
                        '@county()交通出行',
                    ],
                    "useProperty|+1":[//账户性质
                        '临时存款户',
                    ],
                    "accountUse|+1":[
                        //账户用途
                        '工程款存款',
                    ],
                    " itemsExplain|+1":[
                        //事项说明
                        '@cparagraph(1)'
                    ],
                    "accountStatus|+1":[//(value = "账户状态 0=正常；1=封存；2=久悬；3=冻结；4=已注销")
                        '@integer( 0, 4 )'
                    ],
                    "operationStatus|+1":[//(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
                        '@integer( 0, 4 )'
                    ]

                }
            ],
        },

    });
});
//
Mock.mock('/xboot/openAccount', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|11-18":[
                {
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "useUnit|+1": [//使用单位
                        '@county()投资公司',
                    ],

                    "manageUnit|+1":[//管理单位
                        '@county()金建公司',
                    ],
                    "openAccountUnit|+1":[//开户单位
                        '@county()人寿公司',
                    ],
                    "moneyCenter|+1":[//资金中心
                        '@county()石油公司',
                    ],
                    "useProject|+1":[//使用项目
                        '@county()交通出行',
                    ],
                    "useProperty|+1":[//账户性质
                        '临时存款户',
                    ],
                    "accountUse|+1":[
                        //账户用途
                        '工程款存款',
                    ],
                    " itemsExplain|+1":[
                        //事项说明
                        '@cparagraph(1)'
                    ],
                    "accountStatus|+1":[//(value = "账户状态 0=正常；1=封存；2=久悬；3=冻结；4=已注销")
                        '@integer( 0, 4 )'
                    ],
                    "operationStatus|+1":[//(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
                        '@integer( 0, 4 )'
                    ]

                }
            ],
        },

    });
});
Mock.mock('/xboot/checkAccount', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            name:'中铁二十三局集团有限公司项目',
            bankKey:'955888317777881313',
            bank:'交通银行-北京海淀支行',
            accountStatus:  '@integer( 0, 4 )',
            actionStatus:  '@integer( 0, 4 )',
            userUnit:  '中铁二十三局集团有限公司母公司',
            capitalUnit:'中铁二十三局集团有限公司资金中心',
            managementUnit:'中铁二十三局集团有限公司母公司',
            userObject:'中铁二十三局集团有限公司母项目',
            openUnit:'中铁二十三局集团有限公司母公司'
        },

    });
});
//
Mock.mock('/xboot/recordAccount', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|11-18":[
                {
                    "print|+1": [//更新时间//print印鉴//公司公章
                        '法人章'
                    ],  "update|+1": [//更新时间//
                        '@date("yyyy-MM-dd")'
                    ],
                    "content|+1": [//内容
                        '银行账户确认'
                    ],
                    "custodian|+1": [//保管人
                        '@cname',
                    ],
                    "name|+1": [//姓名
                        '@cname',
                    ],
                    "explain|+1": [//说明
                        '@cparagraph(1, 3)'
                    ],
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "useUnit|+1": [//使用单位
                        '@county()投资公司',
                    ],

                    "manageUnit|+1":[//管理单位
                        '@county()金建公司',
                    ],
                    "openAccountUnit|+1":[//开户单位
                        '@county()人寿公司',
                    ],
                    "moneyCenter|+1":[//资金中心
                        '@county()石油公司',
                    ],
                    "useProject|+1":[//使用项目
                        '@county()交通出行',
                    ],
                    "useProperty|+1":[//账户性质
                        '临时存款户',
                    ],
                    "accountUse|+1":[
                        //账户用途
                        '工程款存款',
                    ],
                    "itemsExplain|+1":[
                        //事项说明
                        '@cparagraph(1)'
                    ],
                    "accountStatus|+1":[//(value = "账户状态 0=正常；1=封存；2=久悬；3=冻结；4=已注销")
                        '@integer( 0, 4 )'
                    ],
                    "operationStatus|+1":[//(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
                        '@integer( 0, 4 )'
                    ]

                }
            ],
        },

    });
});
//subsidiary
Mock.mock('/xboot/subsidiaryAccount', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|2-4":[
                {
                    "print|+1": [//更新时间//print印鉴//公司公章
                        '法人章'
                    ],  "update|+1": [//更新时间//
                        '@date("yyyy-MM-dd")'
                    ],
                    "content|+1": [//内容
                        '银行账户确认'
                    ],
                    "custodian|+1": [//保管人
                        '@cname',
                    ],
                    "name|+1": [//姓名
                        '@cname',
                    ],
                    "explain|+1": [//说明
                        '@cparagraph(1, 3)'
                    ],
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "useUnit|+1": [//使用单位
                        '@county()投资公司',
                    ]

                }
            ],
        },

    });
});
///subsidiaryAccount/internetBanking
Mock.mock('/xboot/subsidiaryAccount/internetBanking', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|2-4":[
                {
                    "print|+1": [//更新时间//print印鉴//公司公章
                        '法人章'
                    ],  "update|+1": [//更新时间//
                        '@date("yyyy-MM-dd")'
                    ],
                    "content|+1": [//内容
                        '银行账户确认'
                    ],
                    "custodian|+1": [//保管人
                        '@cname',
                    ],
                    "name|+1": [//姓名
                        '@cname',
                    ],
                    "explain|+1": [//说明
                        '原因：未直连，不归集，须现场处理业务'
                    ],
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "number|+1": [//编号
                        '@id',
                    ],
                    "id|+1": [//编号
                        '@id',
                    ],
                    "type|+1": [// 类型 软证书
                        '实体证书',
                    ],//role
                    "role|+1": [// 类型 制单
                        '审核',
                    ],//role
                    "moneyOrder|+1": [// 金额单次
                        '@float(60, 100, 3, 5)',
                    ],//role
                    "moneyDay|+1": [// 金额单次
                        '@float(60, 100, 3, 5)',
                    ],//role
                    "status|+1":[//(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
                        '@integer( 0, 1 )'
                    ]
                }
            ],
        },

    });
});
//cipher
Mock.mock('/xboot/subsidiaryAccount/cipher', 'get', function() {
    return Mock.mock({
        code:200,
        message: '@cparagraph(1)',
        success: true,
        sum:null,
        subjoin:null,
        timestamp:'@now',
        result:{
            "total": 11,
            "size": 5,
            "current": 1,
            "searchCount": true,
            "pages": 1,
            "record|2-4":[
                {
                    "print|+1": [//更新时间//print印鉴//公司公章
                        '法人章'
                    ],  "update|+1": [//更新时间//
                        '@date("yyyy-MM-dd")'
                    ],
                    "content|+1": [//内容
                        '银行账户确认'
                    ],
                    "custodian|+1": [//保管人
                        '@cname',
                    ],
                    "name|+1": [//姓名
                        '@cname',
                    ],
                    "explain|+1": [//说明
                        '@cparagraph(1, 3)'
                    ],
                    "openAccountBank|+1": [//开户银行
                        '@county()银行'
                    ],
                    "accountNumber|+1": [//账号
                        '@id',
                    ],
                    "accountName|+1": [//户名
                        '@cname',
                    ],
                    "applyAccountName|+1": [//申请户名
                        '@cname',
                    ],
                    "useUnit|+1": [//使用单位
                        '@county()投资公司',
                    ],
                    "number|+1": [//编号
                        '@id',
                    ],
                    "id|+1": [//编号
                        '@id',
                    ],
                    "type|+1": [// 类型 软证书
                        '实体证书',
                    ],//role
                    "role|+1": [// 类型 制单
                        '审核',
                    ],//role
                    "moneyOrder|+1": [// 金额单次
                        '@float(60, 100, 3, 5)',
                    ],//role
                    "moneyDay|+1": [// 金额单次
                        '@float(60, 100, 3, 5)',
                    ],//role
                    "status|+1":[//(value = "操作状态 0=申请中；1=变更中；2=久悬解除中；3=解冻中；4=正常")
                        '@integer( 0, 1 )'
                    ]

                }
            ],
        },

    });
});
