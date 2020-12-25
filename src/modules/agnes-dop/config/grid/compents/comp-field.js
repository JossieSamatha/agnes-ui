import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"


const colButtons = [
    {
        key: 'editCompType', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.comp.edit');
        }
    },
    {
        key: 'deleteCompType', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.comp.delete');
        }
    }
];
export default {
    columnDefs: [
        column.buildOpCol(90, colButtons),
        {headerName: "描述", field: "label"},
        {headerName: "组件类型", field: "compType", formatType: 'dict', dictType: 'AGNES_DOP_COMPENT_TYPE'},
        {headerName: "地址", field: "menuId"},
        {headerName: "是否可以查看详情", field: "arrowShow",
            valueFormatter: function (params) {
                if(params.value === '0'){
                    return "否"
                }
                return "是"
            }},
        column.colCrtUser,
        column.colCrtTm
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/board/list-comp",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
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
    },
};
