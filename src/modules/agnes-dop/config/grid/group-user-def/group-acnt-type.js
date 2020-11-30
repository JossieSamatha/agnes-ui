import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: "账户类型代码", field: "typeCode"},
        {headerName: "账户类型名称", field: "typeName"},
        {headerName: "流程类型", field: "processType",valueFormatter:function(params){
            if(params.value==="TA"){
                return "TA账户流程"
            }else{
                return 'FA账户流程'
            }
        }},
        column.colUpdUser,
        column.colUpdTm
    ],
    rowSelection: "multiple",   // 表格行勾选类型，single：单选；multiple：多选
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/type/list/page",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 100,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [50, 100, 150, 200],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};