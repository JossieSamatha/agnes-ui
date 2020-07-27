import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        // {headerName: "方案代码", field: "rateName"},
        {headerName: "方案名称", field: "rateName"},
        // {headerName: "银行名称", field: "rateName"},
        // {headerName: "网点名称", field: "rateName"},
        {headerName: "利率", field: "rate"},
        // {headerName: "状态", field: "rateName"},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/query/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
