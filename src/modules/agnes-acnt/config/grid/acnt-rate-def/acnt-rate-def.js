import column from "../../../../../config/column"

const colButtons = [
    {key: 'editRate', title: '编辑'},
    {key: 'deleteRate', title: '删除',cellClass:'red-cell'},
    {key: 'checkRate', title: '审核'},
];

export default {
    columnDefs: [
        // {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "账户名称", field: "acntName"},
        {headerName: "利率方案名称", field: "rateName"},
        {headerName: "账号", field: "accountNo"},
       // {headerName: "利率方案名称", field: "rateName"},
        {headerName: "开户机构", field: "extOrgName"},
        {headerName: "利率(%)", field: "rate"},
        {headerName: "状态", field: "status",dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "生效日期", field: "startDt"},
        //{headerName: "失效日期", field: "endDt"},
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/ref/list",    //后台查询数据的URL地址
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 50,
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
    }
};
