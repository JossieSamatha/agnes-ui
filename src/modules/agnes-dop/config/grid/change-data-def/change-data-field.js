// import column from "../../../../../config/column"

// const colButtons = [
//
// ];
export default {
    columnDefs: [
        // column.buildOpCol(120, colButtons),
        {headerName: "下一业务日期", field: "linkmanName"},
        {headerName: "当前业务日期", field: "linkmanRoleId"},
        {headerName: "上一业务日期", field: "linkmanDept"},
        {headerName: "日切人员", field: "linkmanStatus", dictType: "DOP_LINKMAN_STATUS"},
        {headerName: "日切时间", field: "linkmanDept"},
        {headerName: "备注", field: "linkmanDept"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/org/list",
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