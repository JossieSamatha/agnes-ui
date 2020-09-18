import column from "../../../../../config/column"
const colButtons = [
    {key: 'editOrgType', title: '编辑'},
    {key: 'deleteOrgType', title: '删除', cellClass: 'red-cell'},
    {
        key: 'approveOrgType', title: '审核', disabled: (params) => {
            return params.data.status === '04'
        }
    },
];

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "机构类型代码", field: "orgTypeCode"},
        {headerName: "机构类型名称", field: "orgTypeName"},
        {headerName: "状态", field: "status" ,formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/org/type/page/list",    //后台查询数据的URL地址
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
