import column from "../../../../../config/column"

const colButtons = [
    {key: 'queryRate', title: '查看利率'},
    {key: 'queryLinkman', title: '查看联系人'}
];

export default {
    columnDefs: [
        column.buildOpCol(150, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账户类型", field: "typeName"},
        {headerName: "状态", field: "acntStatus", dictType:"ACNT_INFO_STATUS"},
        {headerName: "归属机构", field: "extOrgName"},
        {headerName: "账户启用日期", field: "acntStartDt"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true
    }
};
