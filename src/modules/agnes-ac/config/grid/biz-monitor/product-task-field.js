import processRenderer from '../elec-process/processRenderer'
import optionalRenderer from '../elec-process/optionalRenderer'
import dateUtil from "@hex/gf-ui/src/util/date-utils";

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", enableRowGroup: false,width: 90,
            cellRenderer: 'optionalRenderer'
        },
        {headerName: "业务场景", field: "bizType"},
        {headerName: "任务编号", field: "stepCode"},
        {headerName: '任务名称', field: 'stepName',
            cellRenderer: (params)=>{
                let eGui = document.createElement('div');
                eGui.className = 'star-cell';
                const spanNode = document.createElement("span");
                spanNode.innerHTML = params.value;
                spanNode.style.marginLeft = '2px'
                const starLength = params.data.stepLevel ? params.data.stepLevel : 0;
                for (let i = 0; i < starLength; i++) {
                    const iNode = document.createElement("i");
                    iNode.className = 'fa fa-star';
                    eGui.appendChild(iNode);
                }
                eGui.appendChild(spanNode);
                return eGui;
            },
            tooltipField: 'stepRemark',
        },
        {headerName: "产品名称", field: "proName"},
        {headerName: "产品代码", field: "proNo"},
        {
            headerName: "完成状态", field: "finishedRate", enableRowGroup: false,
            cellRenderer: 'processRenderer',
            width: '120',
            suppressSizeToFit: true,
            tooltipField: 'proportion',
        },
        {headerName: "任务开始时间", field: "taskStartTime"},
        {headerName: "任务截止时间", field: "taskEndTime"},
        {headerName: "剩余天数", field: "restTime"},
        {
            headerName: "实际完成时间", field: "execEndTime",
            cellRenderer: (params) => {
                if (!params.value) {
                    return ''
                } else {
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }
        },
        {headerName: "最新更新时间", field: "updateTs",
            cellRenderer: (params) => {
                if (!params.value) {
                    return ''
                } else {
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }},
        {headerName: "任务类型", field: "stepActType", formatType: 'dict',dictType: 'AGNES_CASE_STEPTYPE'},
        {headerName: "执行人员", field: "execUser"},
        {headerName: "备注", field: "remark", enableRowGroup: false},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    groupUseEntireRow: true,
    rowGroupPanelShow: "always",
    suppressDragLeaveHidesColumns: true,
    tooltipShowDelay: 0,
    frameworkComponents: {
        optionalRenderer,
        processRenderer,
    },
    groupDefaultExpanded: -1,
    ext: {
        fetchUrl: "/agnes-ac/v1/config/task/query-task/by-biz",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true, // 是否显示下载按钮（有勾选则下载勾选项，没勾选则下载所有）
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
