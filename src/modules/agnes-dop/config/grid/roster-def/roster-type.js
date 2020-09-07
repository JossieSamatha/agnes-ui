import column from "../../../../../config/column"

const colButtons = [
    {key: 'editRoster', title: '编辑'},
    {key: 'personnel', title: '人员'},
    {key: 'deleteRoster', title: '删除', cellClass: 'red-cell'},
];

export default {
    columnDefs: [
        {headerName: "部门", field: "deptId", dictType: 'AGNES_ROSTER_DEPT'},
        {headerName: "排班类型", field: "rosterType", dictType: 'AGNES_ROSTER_TYPE'},
        {headerName: "排班日期", field: "rosterDate"},
        {headerName: "排班时间", field: "rosterTs"},
        {headerName: "岗位", field: "roleId", dictType: 'AGNES_ROSTER_POST'},
        column.buildOpCol(120, colButtons)
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/roster/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
        }
    }
};
