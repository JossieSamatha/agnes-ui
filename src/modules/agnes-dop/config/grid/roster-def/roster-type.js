import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"

const colButtons = [
    {
        key: 'editRoster', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.edit');
        }
    },
    {
        key: 'deleteRoster', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.delete');
        }
    },
    {
        key: 'approveRoster', title: '审核', disabled: (params) => {
            return params.data.status === '04'
        }, visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.approve');
        }
    },
    // {
    //     key: 'personnel', title: '值班人员', visiable: () => {
    //         return Permission.hasPermission('agnes.dop.roster.personnel');
    //     }
    // },
];

export default {
    columnDefs: [
        column.buildOpCol(130, colButtons),
        {headerName: "值班类型", field: "rosterType", dictType: 'AGNES_ROSTER_TYPE'},
        {headerName: "值班日期", field: "rosterDate"},
        {headerName: "值班人员", field: "userName"},
        {headerName: "状态", field: "status", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm

    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/roster/list",    //后台查询数据的URL地址
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
    }
};
