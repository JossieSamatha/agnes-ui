import column from "../../../../../config/column"

const colButtons = [
    {key: 'addData', title: '添加资料'},
    // {key: 'submitOA', title: '提交OA'},
    {key: 'check', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(150, colButtons),
        { field: 'varId', cellRenderer: 'agGroupCellRenderer' },
        {headerName: "账户类型", field: "typeCode"},
        {headerName: "归属机构", field: "baseOrgId"},
        {headerName: "业务类型", field: "bizType"},
        {headerName: "流程节点", field: "bankName"},
        {headerName: "提交OA", field: "rate"},
        column.colUpdUser,
        column.colUpdTm
    ],
    masterDetail: true,
    isRowMaster: function () {
        return true
        // return dataItem ? dataItem.callRecords.length > 0 : false;
    },
    detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
          ],
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: function (params) {
          params.successCallback(params.data.callRecords);
        },
    },
    rowSelection:'multiple',
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/scan/list-page",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};