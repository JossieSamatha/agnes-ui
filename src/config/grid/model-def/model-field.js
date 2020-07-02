import column from "../../column"

const colButtons = [
    {key: 'editField', title: '编辑'},
    {key: 'deleteField', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "字段编码", field: "fieldKey"},
        {headerName: "字段名称", field: "fieldName"},
        {headerName: "字段类型", field: "fieldType"},
        {headerName: "是否必填", field: "mustFill", dictType: 'GF_BOOL_TYPE'},
        column.colCrtUser,
        column.colCrtTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false
    }
};
