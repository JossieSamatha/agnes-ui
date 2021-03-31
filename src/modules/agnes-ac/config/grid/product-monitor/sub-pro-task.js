import processRenderer from './processRenderer'
import column from "../../../../../config/column";

const colButtons = [
    {key: 'reOpen', title: '重新打开', visiable: ({data})=>{return data.status === '01'}},
    {key: 'reviewRslt', title: '查看结果', visiable: ({data})=>{return data.status === '01'}},
    {key: 'doFinished', title: '完成', visiable: ({data})=>{return data.status === '00'}},
    {key: 'doTrans', title: '转办', visiable: ({data})=>{return data.status === '00'}}
];

export default {
    columnDefs: [
        {headerName: "任务内容", field: "taskContent"},
        {headerName: "执行方式", field: "execWay"},
        {headerName: "处理人", field: "handler"},
        {
            headerName: "状态", field: "status", width: 95,
            suppressSizeToFit: true,
            cellClassRules: {
                'green-cell': function(params) {
                    return params.value === '01';
                },
                'orange-cell': (params)=>{
                    return params.value === '00';
                }
            },
            valueFormatter: function (params) {
                if(params.value){
                    return params.value === '01' ? '已完成' : '未完成';
                }
                return "";
            }
        },
        column.buildOpCol(120, colButtons, {pinned: "none",}),
        {
            headerName: "完成进度", field: "finishedRate", enableRowGroup: false,
            cellRenderer: 'processRenderer',
            width: '130',
            suppressSizeToFit: true,
            tooltipField: 'proportion',
        },
    ],
    rowData: [
        {taskContent: '开户费', execWay: '人工', handler: 'XXX', status: '01', finishedRate: 1},
        {taskContent: '银行间维护费', execWay: '人工', handler: 'XXX', status: '01', finishedRate: 1},
        {taskContent: '电子合同服务费', execWay: '人工', handler: 'XXX', status: '01', finishedRate: 1},
        {taskContent: '中债收益率曲线费', execWay: '人工', handler: 'XXX', status: '00', finishedRate: 0.35},
        {taskContent: '汇划费', execWay: '人工', handler: 'XXX', status: '00', finishedRate: 0.5},
        {taskContent: '一对多审计费', execWay: '人工', handler: 'XXX', status: '00', finishedRate: 0.22},
    ],
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    frameworkComponents: {
        processRenderer,
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};
