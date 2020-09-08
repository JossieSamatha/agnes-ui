// import column from "../../../../../config/column"

// const colButtons = [
//
// ];
export default {
    columnDefs: [
        // column.buildOpCol(120, colButtons),
        {headerName: "下一业务日期", field: "nextBizDate"},
        {headerName: "当前业务日期", field: "bizDate"},
        {headerName: "上一业务日期", field: "lastBizDate"},
        {headerName: "日切人员", field: "crtUser"},
        {headerName: "日切时间", field: "crtTs"},
        {headerName: "备注", field: "dayendRemark"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/dayend/list",
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
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};