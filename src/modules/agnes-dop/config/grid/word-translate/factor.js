import column from "../../../../../config/column";
import Permission from "../../../../../utils/hasPermission";
const colButtons = [
    {
        key: 'editFactor', title: '编辑',visiable: () => {
            return Permission.hasPermission('agnes.chzh.yzwh.edit');
    }
    },
    {
        key: 'deleteFactor', title: '删除', cellClass: 'red-cell',visiable: () => {
            return Permission.hasPermission('agnes.chzh.yzwh.delete');
        }
    },
];

export default {
    columnDefs: [
        column.buildOpCol(90, colButtons),
        {headerName: "名称", field: "factorName"},
        {headerName: "类型", field: "factorType",formatType: 'dict',dictType:'AGNES_WORDS_FACTOR_TYPE'},
        {headerName: "创建人", field: "crtUser"},
        {headerName: "创建时间", field: "crtTs"},
        {headerName: "更新人", field: "updateUser"},
        {headerName: "更新时间", field: "updateTs"},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/words/list-factor",    //后台查询数据的URL地址
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
        }
    }
};
