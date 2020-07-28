import column from "../../../../../config/column"

const colButtons = [
    {key: 'deleteField', title: '删除', cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "姓名", field: "linkmanName"},
        {headerName: "职位", field: "linkmanRoleId"},
        {headerName: "部门", field: "linkmanDept"},
        {headerName: "状态", field: "linkmanStatus", dictType: "DOP_LINKMAN_STATUS"},
        {headerName: "公司", field: "extOrgName"}
    ],
    ext: {
        pagingMode: false, //不分页
        checkboxColumn: 0, //是否显示checkbox列
        enableExportLocal: true,
        autoFitColumnMode: 1,
    }
};