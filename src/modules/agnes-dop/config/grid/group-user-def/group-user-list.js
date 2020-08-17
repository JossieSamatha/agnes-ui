import column from "../../../../../config/column"

const colButtons = [
    {key: 'deleteField', title: '移除', cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "群组名称", field: "userGroupName"},
        {headerName: "用户姓名", field: "userName"},
        {headerName: "办公电话", field: "otel"},
        {headerName: "办公邮箱", field: "oemail"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/user/group/query",
        fetchMethod: 'post',
        pagingMode: true, //分页
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
    }
};