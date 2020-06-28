import column from "../../column"

const colButtons = [
    {key: 'editModel', title: '编辑'},
    {key: 'deleteModel', title: '删除'},
];

export default {
    columnDefs: [
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    rowData: [
        {
            "typeName": "类型名称1",
            "createTime": "2020-01-01 12:00:00",
            "createUser": "李一（123123）"
        },
        {
            "typeName": "类型名称3",
            "createTime": "2020-01-01 12:00:00",
            "createUser": "李一（123123）"
        },
        {
            "typeName": "类型名称3",
            "createTime": "2020-01-01 12:00:00",
            "createUser": "李一（123123）"
        }
    ],
    ext: {
        // fetchUrl: "/api/report/org/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
