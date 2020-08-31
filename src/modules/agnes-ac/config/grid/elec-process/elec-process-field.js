import processRenderer from './processRenderer'
import optionalRenderer from './optionalRenderer'
import dateUtil from '@hex/gf-ui/src/util/date-utils'

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", width: 70,
            cellRenderer: 'optionalRenderer'
        },
        {headerName: "状态", field: "stepStatus", dictType: 'AGNES_TASK_STEP_STATUS'},
        {headerName: "监控明细归类", field: "detailSort"},
        {headerName: "任务编号", field: "stepCode"},
        {
            headerName: "任务名称", field: "stepName",
            tooltipField: 'stepName',
        },
        {
            headerName: "完成进度", field: "finishedRate",
            cellRenderer: 'processRenderer',
            minWidth: '160',
            suppressSizeToFit: true,
        },
        {
            headerName: "任务执行时间", field: "execStartTime",
            cellRenderer: (params)=>{
                let formatDate = '';
                if(params.data.execStartTime){
                    formatDate = dateUtil.formatDate(params.data.execStartTime, 'yyyy-MM-dd');
                }
                return formatDate;
            }},
        {headerName: "完成时间", field: "execEndTime",
            cellRenderer: (params)=>{
                let formatDate = '';
                if(params.data.execEndTime) {
                    formatDate = dateUtil.formatDate(params.data.execEndTime, 'yyyy-MM-dd')
                }
                return formatDate;
            }},
        {headerName: "任务类型", field: "stepActType", dictType: 'AGNES_CASE_STEPTYPE'},
        {headerName: "备注", field: "remark"},
    ],
    tooltipShowDelay: 0,
    frameworkComponents: {
        optionalRenderer,
        processRenderer,

    },
    rowData: [],
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
