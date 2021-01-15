const productDetailData = [
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

const guestRequireData = [
    {requireContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',raiseDate: '2020-01-06',sourceChannel: '邮件',exhibitor: '张三',processor: '李四'},
    {requireContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',raiseDate: '2020-01-06',sourceChannel: '微信',exhibitor: '张三',processor: '李四'},
    {requireContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',raiseDate: '2020-01-06',sourceChannel: '电话',exhibitor: '张三',processor: '李四'},
    {requireContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',raiseDate: '2020-01-06',sourceChannel: '邮件',exhibitor: '张三',processor: '李四'},
    {requireContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',raiseDate: '2020-01-06',sourceChannel: '电话',exhibitor: '张三',processor: '李四'},
];

const riskEventData = [
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',happenedDate: '2020-01-06',exhibitor: '张三',processor: '李四'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',happenedDate: '2020-01-06',exhibitor: '张三',processor: '李四'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2020-01-06',exhibitor: '张三',processor: '李四'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2020-01-06',exhibitor: '张三',processor: '李四'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2020-01-06',exhibitor: '张三',processor: '李四'},
];

const productDetailCol = [
    {headerName: '产品名称', field: 'proName'},
    {headerName: "产品代码", field: "proNo"},
    {headerName: "产品类型", field: "proType"},
    {headerName: "产品属性", field: "proAttr"},
    {headerName: "客户", field: "guest"},
    {headerName: "托管行", field: "custodianBank"},
    {headerName: "成立日期", field: "foundDate"},
];

const productDetailGrid = {
    columnDefs: productDetailCol,
    rowData: productDetailData,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};

const guestRequireCol = [
    {headerName: '需求内容', field: 'requireContent'},
    {headerName: "解决状态", field: "dealStatus"},
    {headerName: "提出日期", field: "raiseDate"},
    {headerName: "来源渠道", field: "sourceChannel"},
    {headerName: "提出人", field: "exhibitor"},
    {headerName: "处理人", field: "processor"},
    {headerName: "相关任务", field: "relativeTask",
        cellRenderer: ()=>{
            let eGui = document.createElement('a');
            eGui.className = 'action-link';
            eGui.innerHTML = '详情';
            return eGui;
        },},
];

const guestRequireGrid = {
    columnDefs: guestRequireCol,
    rowData: guestRequireData,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};

const riskEventCol = [
    {headerName: '风险内容', field: 'riskContent'},
    {headerName: "解决状态", field: "dealStatus"},
    {headerName: "发生日期", field: "happenedDate"},
    {headerName: "提出人", field: "exhibitor"},
    {headerName: "处理人", field: "processor"},
    {headerName: "相关任务", field: "relativeTask",
        cellRenderer: ()=>{
            let eGui = document.createElement('a');
            eGui.className = 'action-link';
            eGui.innerHTML = '详情';
            return eGui;
        },},
];

const riskEventGrid = {
    columnDefs: riskEventCol,
    rowData: riskEventData,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};

export default function() {
    return {
        productDetailData,
        productDetailGrid,
        guestRequireGrid,
        riskEventGrid
    }
}