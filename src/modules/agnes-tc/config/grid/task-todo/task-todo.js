import column from "../../../../../config/column";

const colButtons = [
    // {key: 'confirmTask', title: '确认'},
    {key: 'viewTask', title: '办理'},
];

export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName",
        cellClassRules: {
            'red-backgoundColor': function(params) {return params.data.taskType==='3'},//此处根据数据区分单元格背景颜色
            'yellow-backgoundColor': function(params) {return params.data.taskType==='2'},
            'gray-backgoundColor': function(params) {return params.data.taskType==='1'},
        }},
        // {headerName: "任务说明", field: "taskRemark"},
        {headerName: "发起时间", field: "taskStartTm"},
        {headerName: "参与人员", field: "participants"},
        column.buildOpCol(120, colButtons)
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/task/todo/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 0, //是否显示checkbox列,
        enableExportLocal: true,
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
    }
};
