import column from "../../../../../config/column"

const colButtons = [
    {key: 'editTask', title: '编辑'},
    {key: 'deleteTask', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "任务发起时间", field: "crtTs"},
        {headerName: "任务名称", field: "taskName"},
        {headerName: "业务场景", field: "bizType", formatType: 'dict',dictType: 'AC_BIZ_TYPE'},
        {headerName: "产生方式", field: "genMode", formatType: 'dict',dictType: 'AC_GEN_MODE'},
        {headerName: "关联产品", field: "bizParam"},
        {headerName: "任务截至时间", field: "endTime"},
        {headerName: "完成状态", field: "taskStatus", formatType: 'dict',dictType: 'AC_TASK_STATUS'},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/config/exe/task/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false
    }
};
