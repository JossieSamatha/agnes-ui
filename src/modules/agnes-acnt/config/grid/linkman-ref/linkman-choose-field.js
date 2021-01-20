export default {
    columnDefs: [
        {headerName: "联系人姓名", field: "linkmanName"},
        {headerName: "职位", field: "linkmanRoleId"},
        {headerName: "部门", field: "linkmanDept"},
        {headerName: "状态", field: "linkmanStatus", formatType: 'dict',dictType: "DOP_LINKMAN_STATUS"},
        {headerName: "所属机构", field: "extOrgName"}
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/all",
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 3, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
    }
};
