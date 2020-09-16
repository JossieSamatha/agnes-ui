import column from "../../../../../config/column";

const colButtons = [
    {key: 'deleteModel', title: '删除', cellClass: 'red-cell'},
];

export default {
    columnDefs: [
        column.buildOpCol(60, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账号", field: "accNo"},
        {headerName: "开户机构", field: "status"},
        {headerName: "联系人名称", field: "linkmanName"},
        {headerName: "联系方式", field: "linkmanMobile"},
        {headerName: "状态", field: "status", dictType: 'ACNT_REF_STATUS'},
        {headerName: "生效日期", field: "startDt"},
        {headerName: "失效日期", field: "endDt"},
        {headerName: "更新人", field: "updateUser"},
        {headerName: "更新时间", field: "updateTs"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/linkman/ref/list",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 3, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
