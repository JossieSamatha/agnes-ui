import column from "../../../../../config/column"
export default {
    columnDefs: [
        {headerName: "机构编码", field: "extOrgCode"},
        {headerName: "机构类型", field: "orgTypeName"},
        {headerName: "机构简称", field: "extOrgNameShort"},
        {headerName: "机构全称", field: "extOrgName"},
        column.colUpdUser,
        column.colUpdUser,
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/org/all",    //后台查询数据的URL地址
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true
    }
};
