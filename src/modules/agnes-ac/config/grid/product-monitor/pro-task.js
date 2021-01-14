export default {
    columnDefs: [
        {headerName: '产品名称', field: 'proName', cellClass: 'link-option-cell'},
        {headerName: "产品代码", field: "proNo"},
        {headerName: "产品类型", field: "proType"},
        {headerName: "产品属性", field: "proAttr"},
        {headerName: "客户", field: "guest"},
        {headerName: "托管行", field: "custodianBank"},
        {headerName: "成立日期", field: "foundDate"},

    ],
    rowData: [
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
    ],
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
