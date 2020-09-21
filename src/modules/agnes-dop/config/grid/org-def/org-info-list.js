import column from "../../../../../config/column"

const colButtons = [
    {key: 'listEditOrg', title: '编辑'},
    {key: 'deleteOrg', title: '删除', cellClass: 'red-cell'},
    {
        key: 'approveExOrg', title: '审核', disabled: (params) => {
            return params.data.status === '04'
        }
    }
]

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        // {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "机构编码", field: "extOrgCode"},
        {headerName: "机构类型", field: "orgTypeName"},
        {headerName: "机构简称", field: "extOrgNameShort"},
        {headerName: "机构全称", field: "extOrgName"},
        {headerName: "状态", field: "status", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colUpdUser,
        column.colUpdTm,

    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        // fetchUrl: "/agnes-app/v1/dop/org/list",    //后台查询数据的URL地址
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
