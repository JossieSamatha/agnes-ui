import column from "../../../../../config/column"

const colButtons = [
    {key: 'editType', title: '修改'},
    {key: 'deleteType', title: '删除', cellClass: 'red-cell'},
    {key: 'checkType', title: '复核'},
];
export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "类型代码", field: "typeCode"},
        {headerName: "类型名称", field: "typeName"},
        {headerName: "流程类型", field: "processType",valueFormatter:function(params){
            if(params.value==="ta"){
                return "TA账户流程"
            }else{
                return 'FA账户流程'
            }
        }},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/scan/list-page",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};