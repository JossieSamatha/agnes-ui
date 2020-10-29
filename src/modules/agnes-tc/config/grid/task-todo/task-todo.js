import column from "../../../../../config/column";
import Permission from "../../../../../utils/hasPermission";

const colButtons = [
    // {key: 'confirmTask', title: '确认'},
    {key: 'viewTask', title: '办理',visiable: () => {
            return Permission.hasPermission('agnes.app.task.todo.handle')}},
];

export default {
    columnDefs: [
        column.buildOpCol(60, colButtons),
        {headerName: "任务名称", field: "taskName", headerClass: 'status-header',
            cellRenderer: (params)=>{
                let eGui = document.createElement('div');
                eGui.className = 'status-circle-cell';
                const iNode = document.createElement("i");
                const statusColor = { '02': 'orange', '03': 'red', '04': 'red'};
                iNode.className = 'fa fa-circle ' + statusColor[params.data.stepStatus];
                const spanNode = document.createElement("span");
                spanNode.innerHTML = params.value + '<br/>' + params.data.taskRemark;
                eGui.appendChild(iNode);
                eGui.appendChild(spanNode);
                return eGui;
            }
        },
        {headerName: "发起时间", field: "taskStartTm"},
        {headerName: "通知人员", field: "participants"},
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/task/todo/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
    }
};
