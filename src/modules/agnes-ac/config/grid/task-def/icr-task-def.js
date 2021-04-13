import column from "../../../../../config/column"
import dateUtil from '@hex/gf-ui/src/util/date-utils'
const colButtons = [
    {key: 'deleteTask', title: '删除', cellClass: 'red-cell'},
    {key: 'viewTask', title: '查看'},
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "业务编号", field: "bizKey"},
        {headerName: "业务类别", field: "taskName"},
        {headerName: "审单状态", field: "approveStatus",
            valueFormatter: function (params) {
                if (params.value&&params.value!='06') {
                    return "不通过"
                }else {
                    return "通过";
                }
            }},
        {headerName: "任务完成进度", field: "finishProgress"},
        {headerName: "创建时间", field: "startTime",
            cellRenderer: (params) => {
                if (!params.value) {
                    return ''
                } else {
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }}
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/icr/task/list-page",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 500,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [100, 300, 500, 700],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
