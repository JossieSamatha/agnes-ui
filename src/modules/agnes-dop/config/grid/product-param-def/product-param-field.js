import column from "../../../../../config/column"

const colButtons = [
    {key: 'editLinkMan', title: '修改'},
    {key: 'editLinkMan', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "业务归属", field: "linkmanName"},
        {headerName: "参数代码", field: "linkmanRoleId"},
        {headerName: "参数名称", field: "linkmanDept"},
        {headerName: "参数类型", field: "linkmanStatus", dictType: "DOP_LINKMAN_STATUS"},
        {headerName: "参数值", field: "linkmanPhone"},
        {headerName: "更新人", field: "linkmanPhone"},
        {headerName: "更新时间", field: "linkmanPhone"},
    ],
    headerHeight: 40,
    rowHeight: 37,
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