import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"


const colButtons = [
    {
        key: 'listEditOrg', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.org.def.edit');
        }
    },
    {
        key: 'deleteOrg', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.org.def.delete');
        }
    }
    // ,
    // {
    //     key: 'approveExOrg', title: '审核', disabled: (params) => {
    //         return params.data.status === '04'
    //     },
    //     visiable: () => {
    //         return Permission.hasPermission('agnes.org.def.approve');
    //     }
    // }
]

export default {
    columnDefs: [
        column.buildOpCol(110, colButtons),
        // {headerName: '序号', field: "rowindex",valueGetter:params=>params.node.rowIndex+1},
        {headerName: "机构编码", field: "extOrgCode"},
        {headerName: "机构类型", field: "orgTypeName"},
        {headerName: "机构简称", field: "extOrgNameShort"},
        {headerName: "机构全称", field: "extOrgName"},
        // {headerName: "状态", field: "status", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colUpdUser,
        column.colUpdTm,

    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        // fetchUrl: "/agnes-app/v1/dop/org/list",    //后台查询数据的URL地址
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
    }
};
