import column from "../../../../../config/column"
// import appClas from "@hex/gf-ui/src/engine/app"

// var appMoudule = new appClas();
const colButtons = [
    {key: 'editTask', title: '编辑'},
    {key: 'deleteTask', title: '删除'},
];

// function dictFormat(dictTypeId, val) {
//     return appMoudule.dict.getDictName(dictTypeId, val);
// }
export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName"},
        // {headerName: "业务场景", field: "bizType",
        //     valueFormatter: function (params) {
        //         var label = params.value;
        //         return dictFormat('EC_BIZ_TYPE',label);
        //     }},
        {headerName: "业务标签", field: "bizTag"},
        {headerName: "任务有效期-开始时间", field: "startTime"},
        {headerName: "任务有效期-结束时间", field: "endTime"},
        // {headerName: "是否需要审批", field: "needApprove",
        //     valueFormatter: function (params) {
        //         var label = params.value;
        //         return dictFormat('GF_BOOL_TYPE',label);
        //     }},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/config/task/list",    //后台查询数据的URL地址
        pagingMode: false, //分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false
    }
};
