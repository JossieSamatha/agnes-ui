import column from "../../../../../config/column"

const colButtons = [
    {key: 'editModel', title: '编辑'},
    {key: 'deleteModel', title: '删除',cellClass:'red-cell'},
];

export default {
    columnDefs: [
        {headerName: "名称", field: "msgName"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ec/v1/ec/msg/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
