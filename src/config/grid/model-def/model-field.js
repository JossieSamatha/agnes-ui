import column from "../../column"

const colButtons = [
    {key: 'editField', title: '编辑'},
    {key: 'deleteField', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "字段ID", field: "fieldId"},
        {headerName: "字段名称", field: "fieldName"},
        {headerName: "字段类型", field: "fieldType"},
        {headerName: "是否必填", field: "mustFill"},
        {headerName: "最大长度", field: "maxLen"},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: false
    }
};
