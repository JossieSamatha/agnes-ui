const productTaskData = [
    {taskName: 'XXXX产品专户产品清算',taskStep: '参数更新',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
    {taskName: 'XXXX产品专户产品清算',taskStep: '应付资金检查',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
    {taskName: 'XXXX产品专户产品清算',taskStep: '参数更新',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
    {taskName: 'XXXX产品专户产品清算',taskStep: '参数更新',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
    {taskName: 'XXXX产品专户产品清算',taskStep: '参数更新',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
    {taskName: 'XXXX产品专户产品清算',taskStep: '参数更新',startTime: '2020-01-06',endTime: '2020-01-09',restTime: '0天',proName: 'XXX资产管理计划',proNo: 'CJ10007'},
];
const riskEventData = [
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',happenedDate: '2020-01-06',exhibitor: '王一',processor: '张三'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '进行中',happenedDate: '2020-02-03',exhibitor: '王二',processor: '李四'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2019-12-04',exhibitor: '王三',processor: '王五'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2019-11-23',exhibitor: '王四',processor: '赵柳'},
    {riskContent: 'XXXXXXXXXXXXX',dealStatus: '已解决',happenedDate: '2019-09-06',exhibitor: '王五',processor: '陆琪'},
];

const productTaskCol = [
    {headerName: '任务名称', field: 'taskName'},
    {headerName: "任务阶段", field: "taskStep"},
    {headerName: "任务开始时间", field: "startTime"},
    {headerName: "任务截止时间", field: "endTime"},
    {headerName: "剩余完成时间", field: "restTime"},
    {headerName: "产品名称", field: "proName"},
    {headerName: "产品代码", field: "proNo"},
    {headerName: "操作", field: "option",
        cellRenderer: ()=>{
            let eGui = document.createElement('div');
            const aLinkNode1 = document.createElement("a");
            aLinkNode1.className = 'action-link';
            aLinkNode1.innerHTML = '催办';
            const aLinkNode2 = document.createElement("a");
            aLinkNode2.className = 'action-link';
            aLinkNode2.style.marginLeft = '2px'
            aLinkNode2.innerHTML = '详情';
            eGui.appendChild(aLinkNode1);
            eGui.appendChild(aLinkNode2);
            return eGui;
        },},
];

const productTaskGrid = {
    columnDefs: productTaskCol,
    rowData: productTaskData,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};

const riskEventCol = [
    {headerName: '风险内容', field: 'riskContent'},
    {headerName: "解决状态", field: "dealStatus"},
    {headerName: "发生日期", field: "happenedDate"},
    {headerName: "提出人", field: "exhibitor"},
    {headerName: "处理人", field: "processor"},
    {headerName: "相关任务", field: "relativeTask",
        cellRenderer: ()=>{
            let eGui = document.createElement('a');
            eGui.className = 'action-link';
            eGui.innerHTML = '详情';
            return eGui;
        },},
];

const riskEventGrid = {
    columnDefs: riskEventCol,
    rowData: riskEventData,
    defaultColDef: {
        filter: true,
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        pagingMode: false,
        checkboxColumn: 0,
        autoFitColumnMode: 1,
        enableExportLocal: true
    }
};


export default function () {
    return {
        productTaskGrid,
        riskEventGrid
    }
}