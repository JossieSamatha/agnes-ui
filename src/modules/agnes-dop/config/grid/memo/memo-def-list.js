import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"


const colButtons = [
    {
        key: 'editMemoDef', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.memo.def.edit');
        }
    },
    {
        key: 'deleteMemoDef', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.memo.def.delete');
        }
    },
    {
        key: 'approveMemoDef', title: '审核', disabled: (params) => {
            return params.data.memoStatus === '04'
        }, visiable: () => {
            return Permission.hasPermission('agnes.dop.memo.def.approve');
        }
    },
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "记录事项", field: "memoDesc", width: 120},
        {headerName: "创建方式", field: "createType", dictType: "AGNES_MEMO_CREATE_TYPE"},
        {headerName: "日历类型", field: "memoType", dictType: "AGNES_MEMO_TYPE"},
        {headerName: "状态", field: "memoStatus", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v2/dop/memo/def/page",
        fetchMethod: 'post',
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
