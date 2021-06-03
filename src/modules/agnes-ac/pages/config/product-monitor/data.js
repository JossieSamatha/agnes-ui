 export const productDetailData = [
    {proName: '东方航空企业年金计划二期',proNo: 'CJ1001',proType: '企业年金',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2018-01-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2018-06-28',fundManage: '张三',department:'公募', custodianContacts:'张三三',},
    {proName: '东方航空企业年金计划二期',proNo: 'CJ1002',proType: '企业年金',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2018-04-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2018-09-30',fundManage: '李四',department:'专户', custodianContacts:'李四四',},
    {proName: '东方航空企业年金计划二期',proNo: 'CJ1003',proType: '企业年金',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2018-07-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2019-03-04',fundManage: '王五',department:'专户', custodianContacts:'王五五',},
    {proName: '东方航空企业年金计划二期',proNo: 'CJ0701',proType: '资管计划',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2019-02-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2020-01-01',fundManage: '赵柳',department:'公募', custodianContacts:'赵柳六',},
    {proName: '东方航空企业年金计划二期',proNo: 'CJ1702',proType: '资管计划',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2019-03-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2019-05-20',fundManage: '陆琪',department:'专户', custodianContacts:'陆琪七',},
    {proName: '东方航空企业年金计划二期',proNo: 'CJ0703',proType: '资管计划',proAttr: '4天',guest: 'XXX投资公司',custodianBank: '招商银行股份有限公司',foundDate: '2019-04-01',
        projectName: '东方航空企业年金计划二期',preEndDate: '2020-03-03',fundManage: '赵八',department:'公募', custodianContacts:'赵八八',},
];

export const bizEventData = [
    {proName: '产品名称001', defId: '001', stageList: [
            {defName: '日间提醒', status: '02', processTargetNum: '9', processCompleteNum: '7', percentage: 0.78 },
            {defName: '交易核对', status: '02', processTargetNum: '4', processCompleteNum: '1', percentage: 0.25},
            {defName: '持仓核对', status: '01', processTargetNum: '9', processCompleteNum: '0', percentage: 0},
            {defName: '流程监控', status: '01', processTargetNum: '9', processCompleteNum: '0', percentage: 0},
        ], ratio: 0.32, dateTime: '2020/11/01-2020/11/09'},
    {proName: '产品名称002', defId: '002', stageList: [
            {defName: '日间提醒', status: '06', processTargetNum: '9', processCompleteNum: '9', percentage: 1},
            {defName: '交易核对', status: '02', processTargetNum: '5', processCompleteNum: '4', percentage: 0.75},
            {defName: '持仓核对', status: '03', processTargetNum: '8', processCompleteNum: '6', percentage: 0.75},
            {defName: '流程监控', status: '01', processTargetNum: '9', processCompleteNum: '0', percentage: 0},
        ], ratio: 0.75, dateTime: '2020/11/01-2020/11/09'},
    {proName: '产品名称001', defId: '001', stageList: [
            {defName: '日间提醒', status: '02', processTargetNum: '9', processCompleteNum: '7', percentage: 0.78},
            {defName: '交易核对', status: '02', processTargetNum: '4', processCompleteNum: '1', percentage: 0.25},
            {defName: '持仓核对', status: '01', processTargetNum: '9', processCompleteNum: '0', percentage: 0},
            {defName: '流程监控', status: '01', processTargetNum: '9', processCompleteNum: '0', percentage: 0},
        ], ratio: 0.32, dateTime: '2020/11/01-2020/11/09'}
]

export const riskNum = {
    ratio: 0.32, completeNum: 28, targetNum: 85, unCompleteNum: 57
}

export const manageTreeData = {
    "code": "00000000",
    "data": [{
        "children": [{
            "children": [{
                "children": [],
                "id": "ASS_ZQTZJJ",
                "name": "证券投资基金"
            }, {
                "children": [{
                    "id": "ZH0592",
                    "name": "\u0028ZH0592\u0029华安基金-江南农商行单一资产管理计划"
                }],
                "id": "ASS_ZCGLJH",
                "name": "资产管理计划"
            }, {
                "children": [],
                "id": "ASS_QDII",
                "name": "QDII投资基金"
            }, {
                "children": [],
                "id": "ASS_QDIIZH",
                "name": "QDII资产计划"
            }],
            "id": "admin",
            "name": "admin"
        }, {
            "children": [{
                "children": [{
                    "id": "ZH0639",
                    "name": "\u0028ZH0639\u0029华安基金–稳利1号单一资产管理计划"
                }],
                "id": "ASS_ZQTZJJ",
                "name": "证券投资基金"
            }, {
                "children": [],
                "id": "ASS_ZCGLJH",
                "name": "资产管理计划"
            }, {
                "children": [],
                "id": "ASS_QDII",
                "name": "QDII投资基金"
            }, {
                "children": [],
                "id": "ASS_QDIIZH",
                "name": "QDII资产计划"
            }],
            "id": "H00160",
            "name": "H00160"
        }, {
            "children": [{
                "children": [{
                    "id": "ZH0639",
                    "name": "\u0028ZH0639\u0029华安基金–稳利1号单一资产管理计划"
                }],
                "id": "ASS_ZQTZJJ",
                "name": "证券投资基金"
            }, {
                "children": [],
                "id": "ASS_ZCGLJH",
                "name": "资产管理计划"
            }, {
                "children": [],
                "id": "ASS_QDII",
                "name": "QDII投资基金"
            }, {
                "children": [],
                "id": "ASS_QDIIZH",
                "name": "QDII资产计划"
            }],
            "id": "H00094",
            "name": "H00094"
        }],
        "id": "1",
        "name": "清算员信息"
    }, {
        "children": [{
            "children": [{
                "children": [],
                "id": "ASS_ZQTZJJ",
                "name": "证券投资基金"
            }, {
                "children": [],
                "id": "ASS_ZCGLJH",
                "name": "资产管理计划"
            }, {
                "children": [],
                "id": "ASS_QDII",
                "name": "QDII投资基金"
            }, {
                "children": [],
                "id": "ASS_QDIIZH",
                "name": "QDII资产计划"
            }],
            "id": "H00160",
            "name": "H00160"
        }, {
            "children": [{
                "children": [],
                "id": "ASS_ZQTZJJ",
                "name": "证券投资基金"
            }, {
                "children": [],
                "id": "ASS_ZCGLJH",
                "name": "资产管理计划"
            }, {
                "children": [],
                "id": "ASS_QDII",
                "name": "QDII投资基金"
            }, {
                "children": [],
                "id": "ASS_QDIIZH",
                "name": "QDII资产计划"
            }],
            "id": "H00094",
            "name": "H00094"
        }],
        "id": "2",
        "name": "核算员信息"
    }],
    "service": "agnes-app"
}