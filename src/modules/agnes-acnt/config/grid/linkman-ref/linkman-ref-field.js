import column from "../../../../../config/column";

const colButtons = [
    {key: 'deleteModel', title: '删除', cellClass: 'red-cell'},
];

export default {
    columnDefs: [
        column.buildOpCol(60, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账号", field: "accNo"},
        {headerName: "开户机构", field: "status"},
        {headerName: "联系人名称", field: "linkmanName"},
        {headerName: "联系方式", field: "linkmanMobile"},
        {headerName: "状态", field: "status", dictType: 'ACNT_REF_STATUS'},
        {headerName: "生效日期", field: "startDt"},
        {headerName: "失效日期", field: "endDt"},
        {headerName: "更新人", field: "updateUser"},
        {headerName: "更新时间", field: "updateTs"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/linkman/ref/list",
        fetchMethod: 'post',
        pagingMode: false, //不分页
        checkboxColumn: 3, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
    }
};
