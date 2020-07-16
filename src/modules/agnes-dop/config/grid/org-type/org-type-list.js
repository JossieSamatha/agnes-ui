import column from "../../../../../config/column"
const colButtons = [
    {key: 'editOrgType', title: '编辑'},
];

export default {
    columnDefs: [
        {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "机构类别", field: "orgTypeName"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    rowSelection: 'multiple',
    ext: {
        fetchUrl: "/agnes-dop/v1/dop/org/type/list",    //后台查询数据的URL地址
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false

    }
};
