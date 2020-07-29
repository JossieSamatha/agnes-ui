
export default {
    columnDefs: [
        {headerName: "姓名", field: "linkmanName"},
        {headerName: "职位", field: "linkmanRoleId"},
        {headerName: "部门", field: "linkmanDept"},
        {headerName: "状态", field: "linkmanStatus", dictType:"DOP_LINKMAN_STATUS"},
        {headerName: "公司", field: "extOrgName"},
    ],
    rowSelection: 'multiple',
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/all",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列
        enableExportLocal: true,
        autoFitColumnMode: 1,
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