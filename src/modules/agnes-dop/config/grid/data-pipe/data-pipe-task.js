import column from "../../../../../config/column"

const colButtons = [
    {
        key: 'start', title: '停用', visiable: (params) => {
            return params.data.status === '01'
        }, cellClass: 'red-cell'
    },
    {
        key: 'stop', title: '启用', visiable: (params) => {
            return params.data.status === '02'
        }
    },
    {key: 'editTask', title: '编辑'},
    {key: 'deleteTask', title: '删除', cellClass: 'red-cell'}
];
export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName"},
        {headerName: "任务代码", field: "taskCode"},
        {headerName: "执行频率", field: "exeCron"},
        {headerName: "状态", field: "status", dictType: 'DATA_PIPE_TASK_STATUS'},
        column.buildOpCol(120, colButtons),
    ],
    ext: {

        fetchUrl: "/data-pipe/hexETL/task/queryList",
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 50,
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
    },
};
