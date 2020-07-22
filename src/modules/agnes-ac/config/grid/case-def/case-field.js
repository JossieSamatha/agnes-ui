import column from "../../../../../config/column"

const colButtons = [
    {key: 'editCaseDef', title: '编辑'},
    {key: 'deleteCaseDef', title: '删除', cellClass: 'red-cell'},
    {key: 'cancelCaseDef', title: '取消', cellClass: 'grey-cell'},
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "case编码", field: "caseDefKey"},
        {headerName: "case名称", field: "caseDefName"},
        {headerName: "case版本", field: "versionId"},
        {headerName: "是否发布", field: "caseStatus" ,formatType: 'dict', dictType: 'LC_CASE_PUBLISH'},
        column.colCrtUser,
        column.colCrtTm,
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/case/def/list",
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
