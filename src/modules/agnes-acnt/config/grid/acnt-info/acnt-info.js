import column from "../../../../../config/column"

const colButtons = [
    // {key: 'queryRate', title: '查看利率'},
    // {key: 'queryLinkman', title: '查看联系人'},
    {key: 'changeData', title: '变更资料'},
    {key: 'delete', title: '销户',visiable: (params)=>{return params.data.acntStatus !== '02';}},

    // {key: 'registration', title: '账户登记'},
    // {key: 'check', title: '复核'},
];

export default {
    columnDefs: [
        column.buildOpCol(180, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账号", field: "accNo"},
        {headerName: "账户类型", field: "typeName"},
        {headerName: "状态", field: "acntStatus", dictType:"AGNES_ACNT_INFO_STATUS"},
        {headerName: "归属机构", field: "extOrgName"},
        {headerName: "开户机构", field: "openBank"},
        {headerName: "账户对方联系人", field: "openLinkMan"},
        {headerName: "利率", field: "rate"},
        {headerName: "币种", field: "currency" , dictType:"AGNES_ACNT_CURRENCY_TYPE"},
        {headerName: "账户启用日期", field: "acntStartDt"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm
    ],
    // ext: {
    //     fetchUrl: "/agnes-app/v1/acnt/info/list/page",    //后台查询数据的URL地址
    //     fetchMethod: 'post',
    //     pagingMode: true, //不分页
    //     checkboxColumn: 1, //是否显示checkbox列,
    //     enableExportLocal: true
    // }
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/list/page",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
