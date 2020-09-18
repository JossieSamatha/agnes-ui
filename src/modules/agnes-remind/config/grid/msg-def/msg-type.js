

export default {
    columnDefs: [
        {headerName: "消息名称", field: "msgName"},
        {headerName: "完成时间", field: "updateTs"},
        {headerName: "状态", field: "hasRead", dictType: 'REMIND_HAS_READ'},
    ],
    headerHeight: 40,
    rowHeight: 37,
    rowSelection:'multiple',
    ext: {
        fetchUrl: "/agnes-remind/v1/remind/msg/query",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
        }
    }
};
