import column from "../../../../../config/column"
import dateUtils from "@hex/gf-ui/src/util/date-utils";

const colButtons = [
    {key: 'chosePrdt', title: '选择'},
];

export default {
    columnDefs: [
        column.buildOpCol(60, colButtons),
        {headerName: "产品代码", field: "productCode", enableRowGroup: false},
        {headerName: "产品简称", field: "productShortName", enableRowGroup: false},
        {headerName: "产品全称", field: "productName", enableRowGroup: false},
        {headerName: "产品种类", field: "productClass", formatType: 'dict',dictType: "AGNES_PRODUCT_CLASS"},
        {headerName: "产品类型", field: "productType", formatType: 'dict',dictType: "AGNES_PRODUCT_TYPE"},
        {headerName: "产品阶段", field: "productStage", formatType: 'dict',dictType: "AGNES_PRODUCT_STAGE"},
        {headerName: "当前状态", field: "productCurStatus", formatType: 'dict',dictType: 'AGNES_PRODUCT_STATUS'},
        {headerName: "操作状态", field: "productStatus", formatType: 'dict',dictType: 'AGNES_RELEASE_STATUS'},
        {
            headerName: "成立日期", field: "startDate", valueFormatter: function (params) {
                if (params.value) {
                    return dateUtils.formatDate(params.value, 'yyyy-MM-dd')
                }
                return "";
            }
        },
        column.colCrtUser,
        column.colCrtTm
    ],
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