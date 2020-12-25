import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"

const colButtons = [
    {
        key: 'editLinkMan', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.linkman.edit');
        }
    },
    {
        key: 'deleteLinkMan', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.linkman.delete');
        }
    }
    // ,
    // {
    //     key: 'approveLinkman', title: '审核', disabled: (params) => {
    //         return params.data.status === '04'
    //     }, visiable: () => {
    //         return Permission.hasPermission('agnes.dop.linkman.edit');
    //     }
    // }
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "姓名", field: "linkmanName"},
        {headerName: "岗位", field: "linkmanRoleId", dictType: "AGNES_ROSTER_POST"},
        {headerName: "部门", field: "linkmanDept", dictType: "AGNES_ROSTER_DEPT"},
        {headerName: "状态", field: "linkmanStatus", formatType: 'dict', dictType: 'DOP_LINKMAN_STATUS'},
        {headerName: "电话", field: "linkmanPhone"},
        // {headerName: "操作状态", field: "status", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colUpdUser,
        column.colUpdTm,
    ],

    // headerHeight: 40,
    // rowHeight: 37,
    rowSelection: "multiple",
    ext: {
        fetchUrl: "/agnes-app/v1/dop/linkman/org/list",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 3,
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
    },
};
