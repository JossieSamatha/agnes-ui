import column from "../../../../../config/column"

const colButtons = [
    {
        key: 'removeRow', title: '删除', cellClass: 'redCell'
    },
    {
        key: 'editRow', title: '修改'
    },
];

export default {
    columnDefs: [
        {headerName: "序号", field: "sequenceNum"},
        {headerName: "用户ID", field: "userId"},
        {headerName: "用户名", field: "userName"},
        {headerName: "所属机构", field: "orgName"},
        {headerName: "用户状态", field: "userStatus", formatType:"dict", dictType:'GF_USER_STATUS'},
        {headerName: "群组名称", field: "userGroupName"},
        {headerName: "授权时间", field: "crtTs"},
        column.buildOpCol(90, colButtons),
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/user/group/query",
        fetchMethod: 'post',
        pagingMode: true, //分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: false,
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
            layout: "total, sizes, slot, prev, pager, next"
        },
    }
};