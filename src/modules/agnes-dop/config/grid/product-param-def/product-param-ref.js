import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"

const colButtons = [
    {
        key: 'deleteProductParamRef', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.product.param.ref.deleteRef');
        }
    },
];
export default {
    columnDefs: [
        column.buildOpCol(60, colButtons),
        {headerName: "产品代码", field: "productCode"},
        {headerName: "产品全称", field: "productName"},
        // {headerName: "产品种类", field: "productClass", dictType: "AGNES_PRODUCT_CLASS"},
        // {headerName: "产品类型", field: "productType", dictType: "AGNES_PRODUCT_TYPE"},
        {headerName: "生效时间", field: "effectiveDate"},
        {headerName: "失效时间", field: "failureDate"},
        {headerName: "参数值", field: "paramValue"},
        column.colCrtUser,
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/prdt/param/info/list",
        fetchMethod: 'get',
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
        }
    },
};
