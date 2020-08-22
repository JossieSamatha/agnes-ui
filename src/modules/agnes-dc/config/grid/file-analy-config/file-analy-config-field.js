import column from "../../../../../config/column"
import dateUtils from "@hex/gf-ui/src/util/date-utils"

const colButtons = [
    {key: 'editFileAnaly', title: '修改'},
    {key: 'deleteFileAnaly', title: '删除', cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "接口代码", field: "ifCode"},
        {headerName: "接口名称", field: "ifName"},
        {headerName: "接口种类", field: "ifType",
            valueFormatter:function(params){
                if(params.value==="A001"){
                    return "受托-计划基本信息"
                }
                return '无'
        }},
        {headerName: "文件类型", field: "fileType"},
        {headerName: "字符集", field: "encodingType"},
        {headerName: "文件名称", field: "fileName"},
        {headerName: "创建时间", field: "createdTs",
            valueFormatter: function (params) {
                if(params.value){
                    return dateUtils.formatDate(params.value, 'yyyy-MM-dd')
                }
                return "";
            }},
        {headerName: "创建人", field: "createdBy"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dop/file/analy/list",
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