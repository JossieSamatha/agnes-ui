export default {
    columnDefs: [
        {headerName: '任务结束时间', field: 'remindTime'},
        {headerName: "任务节点", field: "msgName"},
        {headerName: "执行方式", field: "dealWay"},
        {headerName: "处理人", field: "handler"}
    ],
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};
