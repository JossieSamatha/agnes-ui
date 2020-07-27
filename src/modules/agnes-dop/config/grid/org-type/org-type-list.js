import column from "../../../../../config/column"
const colButtons = [
    {key: 'editOrgType', title: '编辑'},
    {key: 'deleteOrgType', title: '删除',cellClass:'red-cell'},
];

export default {
    columnDefs: [
        {headerName: "机构类别", field: "orgTypeName"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/org/type/list",    //后台查询数据的URL地址
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false

    }
};
