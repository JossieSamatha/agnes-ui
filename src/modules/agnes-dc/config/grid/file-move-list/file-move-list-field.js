
export default {
    columnDefs: [

        {headerName: "规则编号", field: "copyCode"},
        {headerName: "规则名称", field: "copyName"},
        {headerName: "执行时间", field: "copyName"},
        {headerName: "处理方式", field: "processMode"},
        {headerName: "主服务器地址", field: "serverAddress"},
        {headerName: "主服务器端口", field: "serverPort"},
        {headerName: "主服务器路径", field: "filePath"},
        {headerName: "主服务器文件", field: "fileName"},
        {headerName: "从服务器配置", field: "createdBy"},
        {headerName: "从服务器路径", field: "createdBy"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/copy/conf/list",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};