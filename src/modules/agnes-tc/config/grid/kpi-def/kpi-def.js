
export default {
    columnDefs: [
        {headerName: "事件名称", field: "eventName"},
    ],
    ext: {
        fetchUrl: "/dop-kpi/kpi/kpi/queryList",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 0, //是否显示checkbox列,
        enableExportLocal: false
    }
};
