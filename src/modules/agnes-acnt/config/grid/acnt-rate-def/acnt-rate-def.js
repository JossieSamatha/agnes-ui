import column from "../../../../../config/column"

const colButtons = [
    {key: 'deleteRate', title: '删除',cellClass:'redCell'},
];

export default {
    columnDefs: [
        // {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "账户名称", field: "acntName"},
        {headerName: "利率方案名称", field: "rateName"},
        {headerName: "账号", field: "accountNo"},
        {headerName: "利率(%)", field: "rate"},
        {headerName: "状态", field: "status",dictType: 'ACNT_REF_STATUS'},
        {headerName: "生效日期", field: "startDt"},
        {headerName: "失效日期", field: "endDt"},
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(100, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/ref/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
