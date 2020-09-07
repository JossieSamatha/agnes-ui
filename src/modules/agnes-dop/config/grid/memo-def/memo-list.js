import column from "../../../../../config/column"

const colButtons = [
    {key: 'editMemo', title: '编辑'},
    {key: 'deleteMemo', title: '删除', cellClass: 'red-cell'},
    {key: 'approveMemo', title: '复核'}
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "提醒日期", field: "memoDt"},
        {headerName: "记录事项", field: "memoDesc",width: 120},
        {headerName: "状态", field: "memoStatus" ,formatType: 'dict', dictType: 'DOP_MEMO_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/memo/list/page",
        fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
