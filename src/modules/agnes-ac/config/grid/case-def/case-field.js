import column from "../../../../../config/column"

const colButtons = [
    {key: 'editCaseDef', title: '编辑'},
    {key: 'deleteCaseDef', title: '删除', cellClass: 'red-cell'}
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
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/case/def/list",
        fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true, // 是否显示下载按钮（有勾选则下载勾选项，没勾选则下载所有）
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
    }
};
