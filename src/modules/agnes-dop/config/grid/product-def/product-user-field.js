
export default {
    columnDefs: [
        {headerName: "产品代码", field: "productCode"},
        {headerName: "产品名称", field: "productName"},
        {headerName: "核算员", field: "checkUserName"},
        {headerName: "核算复核员", field: "checkCrecoverUserName"},
        {headerName: "清算员", field: "clearUserName"},
        {headerName: "清算复核员", field: "clearCrecoverUserName"},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    rowSelection: "multiple",
    ext: {
        fetchUrl: "/agnes-app/v1/prdt/info/user/list",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 500,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [100, 300, 500, 700],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};