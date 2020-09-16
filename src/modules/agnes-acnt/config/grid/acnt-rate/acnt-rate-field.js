import column from "../../../../../config/column"

const colButtons = [
    {key: 'editType', title: '修改'},
    {key: 'deleteType', title: '删除', cellClass: 'red-cell'},
    {key: 'checkType', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "方案代码", field: "rateCode"},
        {headerName: "方案名称", field: "rateName"},
        {headerName: "银行代码", field: "bankCode"},
        {headerName: "银行名称", field: "bankName"},
        {headerName: "利率", field: "rate"},
        {headerName: "状态", field: "status"},
        {headerName: "生效日期", field: "startDate"},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/scan/list-page",
        fetchMethod: 'get',
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
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};