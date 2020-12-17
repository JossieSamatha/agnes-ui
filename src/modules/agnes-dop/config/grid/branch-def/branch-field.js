import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"


const colButtons = [
    {
        key: 'editBranch', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.branch.edit');
        }
    },
    {
        key: 'deleteBranch', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.branch.delete');
        }

    },
];

export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "网点名称", field: "branchName"},
        // {headerName: "网点代码", field: "branchCode"},
        {headerName: "大额支付号", field: "bigPayNo"},
        {headerName: "机构名称", field: "orgName"},
        // {headerName: "省会", field: "provinceName"},
        // {headerName: "城市", field: "cityName"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/bank/get/page/list",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
