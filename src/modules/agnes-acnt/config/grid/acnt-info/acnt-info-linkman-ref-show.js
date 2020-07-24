import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: "账户名称", field: "acntName"},
        {headerName: "联系人姓名", field: "linkmanName"},
        {headerName: "机构", field: "extOrgName"},
        {headerName: "状态", field: "status", dictType:"ACNT_REF_STATUS"},
        {headerName: "生效日期", field: "startDt"},
        {headerName: "失效日期", field: "endDt"},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/linkman/ref/list/acntid",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 0, //是否显示checkbox列,
        enableExportLocal: false
    }
};
