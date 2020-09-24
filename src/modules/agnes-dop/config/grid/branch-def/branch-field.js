import column from "../../../../../config/column"

const colButtons = [
    {key: 'editBranch', title: '编辑'},
    {key: 'deleteBranch', title: '删除', cellClass: 'red-cell'},
];

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "网点名称", field: "branchName"},
        {headerName: "网点代码", field: "branchCode"},
        {headerName: "大额支付号", field: "bigPayNo"},
        {headerName: "机构名称", field: "extOrgName"},
        {headerName: "省会", field: "provinceName"},
        {headerName: "城市", field: "cityName"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/bank/get/list",
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
        },
    },
};