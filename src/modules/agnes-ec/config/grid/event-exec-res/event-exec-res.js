
export default {
    columnDefs: [
        {headerName: "事件编号", field: "eventCode"},
        {headerName: "事件名称", field: "eventName"},
        {headerName: "监听方式", field: "execMode" ,formatType: 'dict', dictType: 'AGNES_EC_EVENT_EXEC_MODE'},
        {headerName: "触发日期", field: "execBizDt"},
        {headerName: "更新时间", field: "crtTs"}
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ec/event/execres/list/page",
        fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 50,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
