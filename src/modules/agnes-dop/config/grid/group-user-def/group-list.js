import column from "../../../../../config/column"

const colButtons = [
    {key: 'deleteUser', title: '删除', cellClass: 'red-cell'},
    {key: 'editUser', title: '编辑'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "群组代码", field: "userGroupCode"},
        {headerName: "群组名称", field: "userGroupName"}
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/user/group/page/group/list",
        fetchMethod: 'post',
        pagingMode: true, //分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 100,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [50, 100, 150, 200],
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
