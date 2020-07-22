import column from "../../../../../config/column"
const colButtons = [
    {key: 'listEditOrg', title: '编辑'},
];

export default {
    columnDefs: [
        {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "机构名称", field: "extOrgName"},
        {headerName: "机构类别", field: "orgTypeName"},
        {headerName: "机构代码", field: "extOrgCode"},
        {headerName: "机构电话", field: "extOrgPhone"},
        {headerName: "机构传真", field: "extOrgFax"},
        {headerName: "机构地址", field: "extOrgAddr"},
        {headerName: "机构邮编", field: "extOrgPost"},
        {headerName: "备注", field: "extOrgRemark"},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    rowSelection: 'multiple',
    ext: {
        // fetchUrl: "/agnes-app/v1/dop/org/list",    //后台查询数据的URL地址
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true

    }
};
