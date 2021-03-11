import processRenderer from './processRenderer'
import optionalRenderer from './optionalRenderer'
import AcUtil from "@/modules/agnes-ac/util/common";

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", enableRowGroup: false,
            cellRenderer: 'optionalRenderer'
        },
        {
            headerName: "完成状态", field: "stepStatus", width: 95,
            suppressSizeToFit: true,
            formatType: 'dict',
            dictType: 'AGNES_TASK_STEP_STATUS',
            cellStyle: function (params) {
                if (!params.value) {
                    return {display: 'none'}
                } else {
                    const colorSet = AcUtil.getStepStatusMap();
                    const color = colorSet.get(params.value).color
                    return {color: color};
                }
            },
            cellClass: ['fa fa-circle', 'status-circle-cell'],
        },
        {headerName: "任务名称", field: "taskName"},
        {headerName: "业务场景", field: "bizType", formatType: 'dict', dictType: 'AGNES_BIZ_CASE'},
        {headerName: "任务开始日", field: "taskStartTime"},
        {headerName: "任务截止日", field: "taskEndTime"},
        {headerName: "剩余天数", field: "remainDays"},
        {headerName: "处理角色", field: ""},
        {headerName: "处理人", field: ""},
        {headerName: "产品代码", field: ""},
        {headerName: "产品名称", field: ""},
        {headerName: "项目名称", field: ""},
        {headerName: "托管行", field: ""},
        {headerName: "发起人", field: ""},
        {headerName: "任务来源", field: ""},
        {headerName: "任务执行方式", field: ""},
        {headerName: "任务频率", field: ""},
    ],
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    frameworkComponents: {
        optionalRenderer,
        processRenderer,
    },
    groupUseEntireRow: true,
    rowGroupPanelShow: "always",
    suppressDragLeaveHidesColumns: true,
    tooltipShowDelay: 0,
    groupDefaultExpanded: -1,
    ext: {
        fetchUrl: "/agnes-app/v1/task/todo/lc/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
        }
    }
};
