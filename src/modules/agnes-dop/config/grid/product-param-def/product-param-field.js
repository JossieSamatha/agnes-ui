import column from "../../../../../config/column"

const colButtons = [
    {key: 'editParam', title: '修改'},
    {key: 'checkParam', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "业务归属", field: "paramBizType"},
        {headerName: "参数代码", field: "paramCode"},
        {headerName: "参数名称", field: "paramName"},
        {headerName: "参数类型", field: "paramType"},
        {headerName: "参数值", field: "paramValue"},
        {headerName: "更新人", field: "crtUser"},
        {headerName: "更新时间", field: "crtTs"},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/prdt/param/list/page",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        loadDataOnReady:false,
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