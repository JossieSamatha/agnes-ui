export default {
    columnDefs: [
        {headerName: "姓名", field: "linkmanName"},
        {headerName: "职位", field: "linkmanRoleId"},
        {headerName: "部门", field: "linkmanDept"},
        {headerName: "状态", field: "linkmanStatus", dictType:"DOP_LINKMAN_STATUS"},
        {headerName: "电话", field: "linkmanPhone"},
    ],
    rowSelection: 'multiple',
    ext: {
        fetchUrl: "/agnes-dop/v1/dop/linkman/org/list",
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,

    },
};