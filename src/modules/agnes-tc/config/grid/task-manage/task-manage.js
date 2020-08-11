import column from "../../../../../config/column";

const colButtons = [
    {key: 'checkTask', title: '复核'},
    {key: 'cancelTask', title: '作废'},
];

export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName"},
        {headerName: "任务类型", field: "taskType",formatType: 'dict', dictType: 'AGNES_TASK_TYPE'},
        {headerName: "任务编号", field: "taskCode"},
        {headerName: "任务发起日期", field: "exeTime"},
        {headerName: "实际完成时间", field: "updateTs",
            valueFormatter: function (params) {
                console.log(params);
                let taskStatus = params.data.taskStatus;
                if(taskStatus.match(/04|05/)){
                    return params.value;
                }
                return "";
            }},
        {headerName: "完成状态", field: "taskStatus", dictType: "AGNES_TASK_MGR_STATUS"},
        column.buildOpCol(100, colButtons)
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/task/manage/list",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //分页
        checkboxColumn: 0, //是否显示checkbox列,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
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
