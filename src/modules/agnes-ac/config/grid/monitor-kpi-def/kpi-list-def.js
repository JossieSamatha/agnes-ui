import optionalRenderer from './optionalRenderer'
import dateUtil from '@hex/gf-ui/src/util/date-utils'

export default {
    columnDefs: [
        {
            headerName: "操作", field: "option", width: 70, enableRowGroup: false,
            cellRenderer: 'optionalRenderer'
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
        { headerName: "异常", field: "errNum", cellClass: (params)=>{
                return params.value === 0 ? 'grey-cell' : 'red-cell'
            },
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.errNum !==0 && !params.data.errNum);
                },
            },
            valueFormatter: function (params) {
                if (params.data && params.data.errNum !==0 && !params.data.errNum) {
                    return "--";
                }else{
                    return params.value;
                }
            }
        },
        {headerName: "干预通过", field: "manualNum", cellClass: (params)=>{
                return params.value === 0 ? 'grey-cell' : 'yellow-cell'
            },
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.manualNum !==0 && !params.data.manualNum);
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
        {headerName: "正常", field: "doneNum", cellClass: (params)=>{
                return params.value === 0 ? 'grey-cell' : 'green-cell'
            },
            cellClassRules: {
                'fa fa-circle status-circle-cell': function(params) {
                    return !(params.data.doneNum !==0 && !params.data.doneNum);
                },
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
        {headerName: "计划执行时间", field: "startTime",
            valueFormatter: function (params) {
                if (!params.value) {
                    return "--";
                }else{
                    if(params.node.data){
                        return `${window.bizDate}[${params.node.data.startTime}-${params.node.data.endTime}]`
                    }
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
