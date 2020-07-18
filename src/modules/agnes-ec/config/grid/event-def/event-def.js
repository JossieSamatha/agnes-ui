import column from "../../../../../config/column"

const colButtons = [
    {key: 'editEventDef', title: '编辑'},
    {key: 'deleteEventDef', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "事件名称", field: "eventName"},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ec/v1/config/event/def/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
