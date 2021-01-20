import column from "../../../../../config/column"

const colButtons = [
    {key: 'editWorkday', title: '编辑'},
    {key: 'deleteWorkday', title: '删除'},
];



export default {
    columnDefs: [
        {headerName: "年份", field: "bizDate",
            valueFormatter: function (params) {
                let value=params.value;
                return value.split("-")[0];
            }
        },
        {headerName: "日期", field: "bizDate"},
        {headerName: "星期", field: "week",formatType: 'dict',dictType:'AC_WEEK'},
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(120, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/config/workday/list",    //后台查询数据的URL地址
        fetchMethod:"post",
        pagingMode: true,
        checkboxColumn: 2, //是否显示checkbox的列,
        enableExportLocal: false
    }
};
