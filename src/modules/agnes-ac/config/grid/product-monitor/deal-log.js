export default {
    columnDefs: [
        {headerName: '任务结束时间', field: 'finishedTime'},
        {headerName: "任务节点", field: "taskNode"},
        {headerName: "执行方式", field: "dealWay"},
        {headerName: "处理人", field: "handler"}
    ],
    rowData: [
        {finishedTime: '2021-01-15 11:16:00', taskNode: '开户费子任务处理完成', dealWay: '人工', handler: 'XXX'},
        {finishedTime: '2021-01-15 11:18:25', taskNode: '银行间维护费子任务处理完成', dealWay: '人工', handler: 'XXX'},
        {finishedTime: '2021-01-15 11:30:14', taskNode: '电子合同服务费子任务处理完成', dealWay: '人工', handler: 'XXX'},
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
