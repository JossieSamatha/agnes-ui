import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"
const colButtons = [
    {
        key: 'editConfigInfo', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.func.config.edit');
        }
    },
    {
        key: 'deleteConfigInfo', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.func.config.delete');
        }
    },
];

export default {
    columnDefs: [
        column.buildOpCol(90, colButtons),
        {headerName: "菜单名称", field: "menuName"},
        {headerName: "菜单ID", field: "actionUrl"},
        {headerName: "类型", field: "funcType" ,formatType: 'dict', dictType: 'AGNES_FUNC_CONFIG_TYPE'},
        {headerName: "备注", field: "remark"},
        column.colCrtUser,
        column.colCrtTm
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app//v1/dop/func/config/get/page/list",    //后台查询数据的URL地址
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
