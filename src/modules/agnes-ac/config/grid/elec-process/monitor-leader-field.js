import processRenderer from './processRenderer'
import dateUtil from '@hex/gf-ui/src/util/date-utils'
import AcUtil from '../../../util/common'

export default {
    columnDefs:[
        {headerName: "状态", field: "stepStatus", width: 95,
            suppressSizeToFit: true,
            formatType: 'dict',
            dictType: 'AGNES_TASK_STEP_STATUS',
            cellStyle: function(params) {
                if(!params.value){
                    return {display: 'none'}
                }else{
                    const colorSet = AcUtil.getStepStatusMap();
                    const color = colorSet.get(params.value).color
                    return {color: color};
                }
            },
            cellClass: ['fa fa-circle', 'status-circle-cell'],
        },
        {
            headerName: "业务标签", field: "stepTag",
            valueFormatter: function (params) {
                if (params.value) {
                    let Ids = JSON.parse(params.value)
                    return Ids.map((dictId) => {
                        return window.$gfui.$app.dict.getDictItem('AGNES_BIZ_TAG', dictId).dictName;
                    }).join(',');
                }
                return "";
            }
        },
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
        {headerName: "计划执行时间", field: "planTime"},
        {
            headerName: "实际完成时间", field: "execEndTime",
            cellRenderer: (params) => {
                if(!params.value){
                    return ''
                }else{
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }
        },
        {headerName: "任务类型", field: "stepActType", formatType: 'dict',dictType: 'AGNES_CASE_STEPTYPE'},
        {headerName: "执行人员", field: "updateUser"},
        {headerName: "备注", field: "remark"},
    ],
    defaultColDef: {
        filter: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    autoGroupColumnDef: {
        headerName: '分组',
        cellRendererParams: {
            suppressCount: true,
        },
    },
    suppressDragLeaveHidesColumns: true,
    tooltipShowDelay: 0,
    frameworkComponents: {
        processRenderer,
    },
    rowData: [],
    treeData: true,
    animateRows: true,
    groupDefaultExpanded: -1, // expand all groups by default
    getDataPath: function (data) {
        return data.orgHierarchy;
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true,
    }
};
