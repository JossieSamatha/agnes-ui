import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: "规则编号", field: "customQueryKey"},
        {headerName: "规则名称", field: "customQueryName"},
        {headerName: "业务标签", field: "bizType"},
        {headerName: "状态", field: "status", formatType: 'dict', dictType: 'TASK_RUN_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    rowSelection: "multiple",
    ext: {
        fetchUrl: "/agnes-app/v1/dop/custom-query/page",    //后台查询数据的URL地址
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
        }
    }
};
