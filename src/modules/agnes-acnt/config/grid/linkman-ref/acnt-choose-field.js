export default {
    columnDefs: [
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账号", field: "accNo"},
        {headerName: "开户机构", field: "extOrgName"}
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/list",
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 3, //是否显示checkbox列,
        enableExportLocal: false,
        autoFitColumnMode: 1,
    }
};
