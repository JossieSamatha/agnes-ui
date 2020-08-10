import column from "../../../../../config/column"

const colButtons = [
    {key: 'editLinkMan', title: '修改'},
    {key: 'deleteLinkMan', title: '删除', cellClass: 'red-cell'},
    {key: 'editLinkMan', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "产品简称", field: "linkmanName"},
        {headerName: "产品全称", field: "linkmanRoleId"},
        {headerName: "产品代码", field: "linkmanDept"},
        {headerName: "产品种类", field: "linkmanStatus", dictType: "DOP_LINKMAN_STATUS"},
        {headerName: "产品类型", field: "linkmanPhone"},
        {headerName: "产品阶段", field: "linkmanPhone"},
        {headerName: "当前状态", field: "linkmanPhone"},
        {headerName: "成立日期", field: "linkmanPhone"},
        {headerName: "基金托管人", field: "linkmanPhone"},
        {headerName: "基金托管人(境外)", field: "linkmanPhone"},
        {headerName: "基金注册登记机构", field: "linkmanPhone"},
        {headerName: "基金律师事务所", field: "linkmanPhone"},
        {headerName: "基金会计事务所", field: "linkmanPhone"},
        {headerName: "申赎交易确认天数", field: "linkmanPhone"},
        {headerName: "赎回清算天数", field: "linkmanPhone"},
        {headerName: "管理费率", field: "linkmanPhone"},
        {headerName: "托管费率", field: "linkmanPhone"},
        {headerName: "浮动管理费", field: "linkmanPhone"},
        {headerName: "浮动管理费描述", field: "linkmanPhone"},
        {headerName: "其他费率描述", field: "linkmanPhone"},
        {headerName: "业绩比较基准", field: "linkmanPhone"},
        {headerName: "是否需要ZXA头寸管控", field: "linkmanPhone"},
        {headerName: "是否需要出赎回款指令", field: "linkmanPhone"},
        {headerName: "是否需要出新股指令", field: "linkmanPhone"},
        {headerName: "新基金发行参数检查日", field: "linkmanPhone"},
        {headerName: "更新人", field: "linkmanPhone"},
        {headerName: "更新时间", field: "linkmanPhone"},
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/org/list",
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
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};