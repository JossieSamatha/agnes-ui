import column from "../../../../../config/column"

const colButtons = [
    {key: 'editModel', title: '编辑'},
    {key: 'deleteModel', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "名称", field: "typeName"},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/config/model/type/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
