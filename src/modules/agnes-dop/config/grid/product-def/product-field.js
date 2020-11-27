import column from "../../../../../config/column"
import dateUtils from "@hex/gf-ui/src/util/date-utils"
import Permission from "../../../../../utils/hasPermission"

const colButtons = [
    {
        key: 'editProduct', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.product.def.edit');
        }
    },
    {
        key: 'deleteProduct', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.product.def.delete');
        }
    },
    {
        key: 'checkProduct', title: '审核', disabled: (params) => {
            return params.data.productStatus === '04'
        }, visiable: () => {
            return Permission.hasPermission('agnes.dop.product.def.approve');
        }
    },
];
export default {
    columnDefs: [
        column.buildOpCol(110, colButtons),
        {headerName: "产品代码", field: "productCode", enableRowGroup: false},
        {headerName: "产品简称", field: "productShortName", enableRowGroup: false},
        {headerName: "产品全称", field: "productName", enableRowGroup: false},
        {headerName: "产品种类", field: "productClass", dictType: "AGNES_PRODUCT_CLASS"},
        {headerName: "产品类型", field: "productType", dictType: "AGNES_PRODUCT_TYPE"},
        {headerName: "产品阶段", field: "productStage", dictType: "AGNES_PRODUCT_STAGE"},
        {headerName: "当前状态", field: "productCurStatus", dictType: 'AGNES_PRODUCT_STATUS'},
        {headerName: "操作状态", field: "productStatus", dictType: 'AGNES_RELEASE_STATUS'},
        {
            headerName: "成立日期", field: "startDate", valueFormatter: function (params) {
                if (params.value) {
                    return dateUtils.formatDate(params.value, 'yyyy-MM-dd')
                }
                return "";
            }
        },
        {headerName: "基金托管人", field: "productCustodian"},
        {headerName: "基金托管人(境外)", field: "productCustodianOverseas"},
        {headerName: "基金注册登记机构", field: "productRegistrationOrg"},
        {headerName: "基金律师事务所", field: "productLawFirm"},
        {headerName: "基金会计事务所", field: "productAccountFirm"},
        {headerName: "申赎交易确认天数", field: "redemptionTransConfirmDays"},
        {headerName: "赎回清算天数", field: "redemptionSettlementDays"},
        // {headerName: "管理费率", field: "linkmanPhone"},
        // {headerName: "托管费率", field: "linkmanPhone"},
        // {headerName: "浮动管理费", field: "linkmanPhone"},
        // {headerName: "浮动管理费描述", field: "linkmanPhone"},
        // {headerName: "其他费率描述", field: "linkmanPhone"},
        // {headerName: "业绩比较基准", field: "linkmanPhone"},
        // {headerName: "是否需要ZXA头寸管控", field: "linkmanPhone"},
        // {headerName: "是否需要出赎回款指令", field: "linkmanPhone"},
        // {headerName: "是否需要出新股指令", field: "linkmanPhone"},
        // {headerName: "新基金发行参数检查日", field: "linkmanPhone"},
        {headerName: "更新人", field: "updateUser"},
        {headerName: "更新时间", field: "updateTs"},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    // rowSelection: 'multiple',
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    groupUseEntireRow: true,
    rowGroupPanelShow: "always",
    suppressDragLeaveHidesColumns: true,
    groupDefaultExpanded: -1,
    ext: {
        fetchUrl: "/agnes-app/v1/prdt/info/list/page",
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
