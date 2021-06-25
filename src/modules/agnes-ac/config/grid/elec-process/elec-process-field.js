import processRenderer from './processRenderer'
import optionalRenderer from './optionalRenderer'
import dateUtil from '@hex/gf-ui/src/util/date-utils'
import AcUtil from '../../../util/common'

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", enableRowGroup: false,
            cellRenderer: 'optionalRenderer'
        },
        {
            headerName: "状态", field: "stepStatus", width: 95,
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
        {
            headerName: "业务标签", field: "stepTag",
            valueFormatter: function (params) {
                if (params.value) {
                    let Ids = JSON.parse(params.value)
                    return Ids.map((dictId) => {
                        const dictObj = window.$gfui.$app.dict.getDictItem('AGNES_BIZ_TAG', dictId);
                        return dictObj ? dictObj.dictName : false;
                    }).join(',');
                }
                return "";
            }
        },
        {headerName: "任务编号", field: "stepCode"},
        {
            headerName: "任务名称", field: "stepName",
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
        {
            headerName: "完成进度", field: "finishedRate", enableRowGroup: false,
            cellRenderer: 'processRenderer',
            width: '120',
            suppressSizeToFit: true,
            tooltipField: 'proportion',
        },
        {
            headerName: "计划执行时间", field: "planTime",
        },
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
    rowSelection: 'multiple',
    ext: {
        pagingMode: false,
        checkboxColumn: 2,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};
