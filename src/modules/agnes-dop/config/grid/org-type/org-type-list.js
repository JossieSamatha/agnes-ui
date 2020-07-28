import column from "../../../../../config/column"
const colButtons = [
    {key: 'editOrgType', title: '编辑'},
    {key: 'deleteOrgType', title: '删除',cellClass:'red-cell'},
];

export default {
    columnDefs: [
        {headerName: "机构类别", field: "orgTypeName"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/org/type/list",    //后台查询数据的URL地址

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
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },

    }
};
