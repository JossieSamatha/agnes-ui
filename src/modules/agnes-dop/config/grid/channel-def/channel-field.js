import column from "../../../../../config/column"

const colButtons = [
    {key: 'editChannel', title: '编辑'},
    {key: 'deleteChannel', title: '删除', cellClass: 'red-cell'},
    {
        key: 'approveChannel', title: '审核', disabled: (params) => {
            return params.data.channelStatus === '04'
        }
    },
];
export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "渠道代码", field: "channelCode"},
        {headerName: "渠道名称", field: "channelName"},
        {headerName: "渠道类型", field: "channelType",formatType: 'dict', dictType: 'AGNES_DOP_CHANNEL_TYPE'},
        {headerName: "渠道状态", field: "channelStatus",formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/channel/list/page",
        fetchMethod: 'post',
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
    },
};
