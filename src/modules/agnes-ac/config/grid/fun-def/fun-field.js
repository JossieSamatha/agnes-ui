import column from "../../../../../config/column"

const colButtons = [
    {key: 'editField', title: '编辑'},
    {key: 'deleteField', title: '删除'},
];

export default {
    columnDefs: [
        {headerName: "英文", field: "fieldId"},
        {headerName: "中文", field: "fieldName"},
        {headerName: "参数类型", field: "fieldType"},
        {headerName: "是否必填", field: "mustFill", dictType: 'GF_BOOL_TYPE'},
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: false
    }
};
