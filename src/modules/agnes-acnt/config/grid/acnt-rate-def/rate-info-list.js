import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        // {headerName: "方案代码", field: "rateName"},
        {headerName: "方案名称", field: "rateName"},
        // {headerName: "银行名称", field: "rateName"},
        // {headerName: "网点名称", field: "rateName"},
        {headerName: "利率", field: "rate"},
        // {headerName: "状态", field: "rateName"},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/info/list",    //后台查询数据的URL地址
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
