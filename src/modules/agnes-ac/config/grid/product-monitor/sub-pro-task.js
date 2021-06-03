import processRenderer from './processRenderer'
import column from "../../../../../config/column";

const colButtons = [
    {key: 'reOpen', title: '重新打开', visiable: ({data})=>{return data.stepStatus === '01'}},
    {key: 'reviewRslt', title: '查看结果', visiable: ({data})=>{return data.stepStatus === '01'}},
    {key: 'doFinished', title: '完成', visiable: ({data})=>{return data.stepStatus === '00'}},
    {key: 'doTrans', title: '转办', visiable: ({data})=>{return data.stepStatus === '00'}}
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons, {pinned: "none",}),
        {headerName: "任务内容", field: "stepName"},
        {headerName: "执行方式", field: "stepActType", formatType: 'dict', dictType: 'AGNES_CASE_STEPTYPE'},
        {headerName: "处理人", field: "execUser"},
        {
            headerName: "状态", field: "stepStatus", width: 95,
            suppressSizeToFit: true,
            formatType: 'dict',
            dictType: 'AGNES_TASK_STEP_STATUS'
        },
        {
            headerName: "完成进度", field: "finishedRate", enableRowGroup: false,
            cellRenderer: 'processRenderer',
            width: '130',
            suppressSizeToFit: true,
            tooltipField: 'proportion',
        },
    ],
    rowData: [],
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
