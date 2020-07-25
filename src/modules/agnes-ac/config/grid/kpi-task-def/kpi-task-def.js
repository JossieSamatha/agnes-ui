import column from "../../../../../config/column"

const colButtons = [
    {key: 'editKpiTask', title: '编辑'},
    {key: 'deleteKpiTask', title: '删除', cellClass: 'red-cell'},
    {key: 'publishKpiTask', title: '发布'},
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "业务场景", field: "reTaskDef.bizType"},
        {headerName: "业务标签", field: "reTaskDef.bizTag"},
        {headerName: "业务类型", field: "reTaskDef.taskType"},
        {headerName: "状态", field: "reTaskDef.taskStatus"},
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/kpi/task/case/list?taskType=3",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //分页
        checkboxColumn: 0, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: false
    }
};
