import column from "../../../../../config/column"
import mockData from "./mockData";
import processRenderer from './processRenderer'

const colButtons = [
    {key: 'actionConfirm', title: '手工确认', cellClass: 'actionConfirm'},
    {key: 'forcePass', title: '强制通过', cellClass: 'forcePass'},
    {key: 'reExecute', title: '重新执行', cellClass: 'reExecute'}
];

export default {
    columnDefs: [
        column.buildOpCol(180, colButtons, {
            cellClassRules:{
                'noneStatus': (params)=>{
                    return !params.data.statusId
                }
            }
        }),
        {headerName: "状态", field: "status"},
        {headerName: "监控明细归类", field: "detailSort"},
        {headerName: "任务编号", field: "taskNo"},
        {headerName: "任务名称", field: "taskName",
            tooltipField: 'taskName',
        },
        {headerName: "完成进度", field: "finishedRate",
            cellRenderer: 'processRenderer',
        },
        {headerName: "任务执行时间", field: "taskExecTime"},
        {headerName: "完成时间", field: "finishedTime"},
        {headerName: "任务类型", field: "taskType"}
    ],
    tooltipShowDelay: 0,
    frameworkComponents: {
        processRenderer
    },
    rowData: mockData(),
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        // fetchUrl: "/agnes-ac/v1/ac/case/def/list",
        // fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true, // 是否显示下载按钮（有勾选则下载勾选项，没勾选则下载所有）
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
