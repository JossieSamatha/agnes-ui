import column from "../../../../../config/column"

const colButtons = [
    {key: 'editModel', title: '编辑'},
    {key: 'deleteModel', title: '删除'},
];
const fnCode = {headerName: "函数定义编号", field: "fnCode"};
const fnName = {headerName: "函数名", field: "fnName"};
const fnType = {headerName: "函数类型", field: "fnType"}
const fnDesc = {headerName: "函数描述", field: "fnDesc"}

export default {
    columnDefs: [
        fnCode,
        fnName,
        fnType,
        fnDesc,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/config/fun/query/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true
    }
};
