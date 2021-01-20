import optionalRenderer from './optionalRenderer'
import dateUtil from '@hex/gf-ui/src/util/date-utils'
import AcUtil from "../../../util/common";

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", width: 70, enableRowGroup: false,
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
        {headerName: "任务编号", field: "kpiCode"},
        {headerName: "任务名称", field: "taskName", width:180,
            cellRenderer: (params)=>{
                let eGui = document.createElement('div');
                eGui.className = 'star-cell';
                const spanNode = document.createElement("span");
                spanNode.innerHTML = params.value;
                spanNode.style.marginLeft = '2px'
                const starLength = params.data.stepLevel ? params.data.stepLevel : 0;
                for(let i=0; i<starLength; i++){
                    const iNode = document.createElement("i");
                    iNode.className = 'fa fa-star';
                    eGui.appendChild(iNode);
                }
                eGui.appendChild(spanNode);
                return eGui;
            },
            tooltipField: 'stepRemark',
        },
        { headerName: "异常", field: "errNum", cellClass: 'red-cell link-cell',
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.errNum !==0 && !params.data.errNum);
                },
                'grey-cell': (params)=>{
                    return params.value === 0 ;
                }
            },
            valueFormatter: function (params) {
                if (params.data && params.data.errNum !==0 && !params.data.errNum) {
                    return "--";
                }else{
                    return params.value;
                }
            }
        },
        {headerName: "干预通过", field: "manualNum", cellClass: 'yellow-cell link-cell',
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.manualNum !==0 && !params.data.manualNum);
                },
                'grey-cell': (params)=>{
                    return params.value === 0;
                },
            },
            valueFormatter: function (params) {
                if (params.data && params.data.manualNum !==0 && !params.data.manualNum) {
                    return "--";
                }else{
                    return params.value;
                }
            }
        },
        {headerName: "正常", field: "doneNum", cellClass: 'green-cell link-cell' ,
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.doneNum !==0 && !params.data.doneNum);
                },
                'grey-cell': (params)=>{
                    return params.value === 0;
                }
            },
            valueFormatter: function (params) {
                if (params.data && params.data.doneNum !==0 && !params.data.doneNum) {
                    return "--";
                }else{
                    return params.value;
                }
            }
        },
        {headerName: "目标值", field: "targetName", align: 'center',
            valueFormatter: function (params) {
                if (!params.value) {
                    return "--";
                }else{
                    return params.value;
                }
            }},
        {headerName: "计划执行时间", field: "planTime",
            valueFormatter: function (params) {
                if (!params.value) {
                    return "--";
                }else{
                    return params.value;
                }
            }},
        {headerName: "最新更新时间", field: "updateTs",
            valueFormatter: function (params) {
                if (!params.value) {
                    return "--";
                }else{
                    return dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss');
                }
            }},
        {headerName: "执行人员", field: "execUser"},
        {headerName: "备注", field: "remark"},
    ],
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    frameworkComponents: {
        optionalRenderer
    },
    tooltipShowDelay: 0,
    rowSelection: 'multiple',
    ext: {
        fetchUrl: "/agnes-ac/v1/monitor/kpi/get/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: false, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
    }
};
