import column from "../../../../../config/column"

const colButtons = [
    {key: 'showFileDetail', title: '文件明细'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "规则编号", field: "scanCode"},
        {headerName: "业务编号", field: "varId"},
        {headerName: "规则名称", field: "scanName"},
        {headerName: "扫描路径", field: "filePath"},
        {headerName: "扫描文件", field: "fileName"},
        {headerName: "执行日期", field: "exeDate"},
        {headerName: "执行时间", field: "crtTs"},
        {headerName: "服务器地址", field: "serverAddress"},
        {headerName: "是否需要解析", field: "isNeedParse",
        valueFormatter:function(params){
            if(params.value==="0"){
                return "否"
            }else{
                return '是'
            }
        }},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/scan/log/list-page",
        fetchMethod: 'post',
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