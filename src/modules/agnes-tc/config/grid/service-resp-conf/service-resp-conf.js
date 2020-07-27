import column from "../../../../../config/column"
const colButtons = [
    {key: 'editService', title: '编辑'},
    {key: 'deleteService', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: '服务响应等级', field: "serviceResponseName"},
        {headerName: "间隔时间(分钟)", field: "repeatMinutes"},
        {headerName: "紧急度提升", field: "degreeScore"},
        {headerName: "最大重复次数", field: "maxRepeatCount"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/tc/service/list",    //后台查询数据的URL地址
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false

    }
};
