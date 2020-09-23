export default {
    columnDefs: [
        { headerName: "视图", field: "viewName" }
    ],
    rowData : [
        {"viewName":"view_user"},
        {"viewName":"view_menu"}
    ],
    ext: {
        pagingMode: false,
        checkboxColumn: 0 //是否显示checkbox列
    }
}