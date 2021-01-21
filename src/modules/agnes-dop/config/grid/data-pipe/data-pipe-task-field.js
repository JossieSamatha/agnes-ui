import column from "../../../../../config/column"

const colButtons = [
    {key: 'editTaskStep', title: '编辑'},
    {key: 'deleteTaskStep', title: '删除', cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons, {field: 'option'}),
        {headerName: "序号", field: "id", valueGetter: params => params.node.rowIndex + 1},
        {headerName: "当前操作", field: "confName"},
        {headerName: "使用状态", field: "status", formatType: 'dict',dictType: 'DATA_PIPE_TASK_STATUS'},
    ],
    ext: {
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
    },
};
