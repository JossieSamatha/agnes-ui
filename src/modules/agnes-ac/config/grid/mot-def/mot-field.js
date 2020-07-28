import column from "../../../../../config/column"

const colButtons = [
    {key: 'editKpiTask', title: '编辑'},
    {key: 'deleteKpiTask', title: '删除', cellClass: 'red-cell'},
    {key: 'checkMotTask', title: '复核'},
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "任务名称", field: "caseDefKey"},
        {headerName: "业务场景", field: "caseDefName"},
        {headerName: "业务标签", field: "versionId"},
        {headerName: "业务类型", field: "versionId"},
        {headerName: "状态", field: "caseStatus" ,formatType: 'dict', dictType: 'LC_CASE_PUBLISH'},
        column.colUpdUser,
        column.colUpdTm,
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/kpi/task/case/list?taskType=3",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
    }
};
