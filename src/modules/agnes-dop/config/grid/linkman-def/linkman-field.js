import column from "../../../../../config/column"

const colButtons = [
    {key: 'editLinkMan', title: '编辑'},
    {key: 'deleteLinkMan', title: '删除', cellClass: 'red-cell'},
    {key: 'approveLinkMan', title: '审核'}
];
export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "姓名", field: "linkmanName"},
        {headerName: "岗位", field: "linkmanRoleId", dictType: "AGNES_ROSTER_POST"},
        {headerName: "部门", field: "linkmanDept", dictType: "AGNES_ROSTER_DEPT"},
        {headerName: "状态", field: "linkmanStatus" ,formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "电话", field: "linkmanPhone"},
        column.colUpdUser,
        column.colUpdTm,
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/org/list",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 100,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
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
