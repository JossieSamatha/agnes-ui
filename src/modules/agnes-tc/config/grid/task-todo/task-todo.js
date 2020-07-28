import column from "../../../../../config/column";

const colButtons = [
    {key: 'confirmTask', title: '确认'},
    {key: 'viewTask', title: '查看'},
];

export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName"},
        {headerName: "任务说明", field: "taskRemark"},
        {headerName: "发起时间", field: "taskStartTime"},
        {headerName: "参与人员", field: "participants"},
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-tc/v1/task/todo/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 0, //是否显示checkbox列,
        enableExportLocal: false
    }
};
