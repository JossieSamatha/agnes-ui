import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "账户名称", field: "acntName"},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
