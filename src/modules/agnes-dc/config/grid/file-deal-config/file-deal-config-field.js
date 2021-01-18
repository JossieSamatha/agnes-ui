import column from "../../../../../config/column"

const colButtons = [
    {key: 'editFileDeal', title: '编辑'},
    {key: 'deleteFileDeal', title: '删除', cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "规则编号", field: "dealCode"},
        {headerName: "规则名称", field: "dealName"},
        {headerName: "处理方式", field: "dealType",formatType: 'dict', dictType: 'AGNES_DC_FILE_DEAL_TYPE'},
        {headerName: "业务类型", field: "bizType"},
        {headerName: "创建时间", field: "crtTs"},
        {headerName: "创建人", field: "crtUser"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/deal/list-page",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
    },
};