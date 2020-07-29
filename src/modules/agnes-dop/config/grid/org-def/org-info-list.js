import column from "../../../../../config/column"
const colButtons = [
    {key: 'listEditOrg', title: '编辑'},
    {key: 'deleteOrg', title: '删除',cellClass:'red-cell'},
];

export default {
    columnDefs: [
        // {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "机构编码", field: "extOrgCode"},
        {headerName: "机构类型", field: "orgTypeName"},
        {headerName: "机构简称", field: "extOrgNameShort"},
        {headerName: "机构全称", field: "extOrgName"},
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(100, colButtons)
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        // fetchUrl: "/agnes-app/v1/dop/org/list",    //后台查询数据的URL地址
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true
    }
};
