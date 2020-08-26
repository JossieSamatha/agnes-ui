import column from "../../../../../config/column"

const colButtons = [
    {key: 'editFileAnaly', title: '修改'},
    {key: 'deleteFileAnaly', title: '删除', cellClass: 'red-cell'},
    {key: 'startFileMove', title: '启用',visiable: (params)=>{return params.data.status === '0';}},
    {key: 'stopFileMove', title: '停用', visiable: (params)=>{return params.data.status === '1';}},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "规则编号", field: "scanCode"},
        {headerName: "规则名称", field: "scanName"},
        {headerName: "传输方式", field: "transMode",formatType: 'dict', dictType: 'AGNES_DC_TRANS_MODE'},
        {headerName: "服务器地址", field: "serverAddress"},
        {headerName: "服务器端口", field: "serverPort"},
        {headerName: "状态", field: "status",
        valueFormatter:function(params){
            if(params.value==="0"){
                return "停用"
            }else{
                return '启用'
            }
        }},//0停用中  1启用中
        {headerName: "变量选择", field: "varName"},
        {headerName: "扫描路径", field: "filePath"},
        {headerName: "扫描文件", field: "fileName"},
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