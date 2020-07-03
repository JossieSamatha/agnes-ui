var guestInfo = [
    {label:'客户名称', value:'XXXXXXXXX银行'},
    {label:'客户类型', value:'商业银行'},
    {label:'组织机构代码', value:'XXXXXXXXX'},
    {label:'客户属性', value:'XXXXXXXXX'},
    {label:'客户名称', value:'XXXXXXXXX银行'},
    {label:'客户类型', value:'商业银行'},
    {label:'组织机构代码', value:'XXXXXXXXX'},
    {label:'客户属性', value:'XXXXXXXXX'},
];

var gridLayoutType = [
    {"x":0,"y":0,"w":2,"h":2,"i":"2020040900"},
    {"x":2,"y":0,"w":2,"h":2,"i":"2020040901"},
    {"x":4,"y":0,"w":4,"h":2,"i":"2020040902"},
    {"x":0,"y":2,"w":2,"h":4,"i":"2020040903"},
    {"x":2,"y":2,"w":2,"h":4,"i":"2020040904"},
    {"x":4,"y":2,"w":2,"h":2,"i":"2020040905"},
    {"x":6,"y":2,"w":2,"h":2,"i":"2020040906"},
    {"x":4,"y":4,"w":2,"h":2,"i":"2020040907"},
    {"x":6,"y":4,"w":2,"h":2,"i":"2020040908"}
];

var gridLayoutType2 = [
    {"x":0,"y":0,"w":2,"h":2,"i":"09040011"},
    {"x":2,"y":0,"w":6,"h":4,"i":"09040012"},
    {"x":0,"y":2,"w":2,"h":4,"i":"09040013"},
    {"x":2,"y":4,"w":2,"h":2,"i":"09040014"},
    {"x":4,"y":4,"w":2,"h":2,"i":"09040015"},
    {"x":6,"y":4,"w":2,"h":2,"i":"09040016"}];

var gridLayoutType3 = [
    {"x":0,"y":0,"w":4,"h":6,"i":"2020001"},
    {"x":6,"y":0,"w":2,"h":4,"i":"2020002"},
    {"x":4,"y":0,"w":2,"h":4,"i":"2020003"},
    {"x":6,"y":4,"w":2,"h":2,"i":"2020004"},
    {"x":4,"y":4,"w":2,"h":2,"i":"2020005"}
]

var boardArrDefault = [
    {
        boardId: '202004001',
        boardData: gridLayoutType
    },{
        boardId: '202004002',
        boardData: gridLayoutType2
    },
];

var boardArrDefine = [
    {
        boardId: '202004003',
        boardData: gridLayoutType3
    },
];

var columnDefs2 = [
    {headerName: '任务名称', field: 'taskName'},
    {headerName: "任务阶段", field: "taskStep"},
    {headerName: "任务开始时间", field: "startTime", hide: true},
    {headerName: "任务截止时间", field: "endTime", hide: true},
    {headerName: "剩余完成时间", field: "restTime", hide: true},
    {headerName: "产品名称", field: "proName", hide: true},
    {headerName: "产品代码", field: "proNo", hide: true},
    {
        colId: "#op",
        cellRenderer: "OpCellRender",
        headerName: "操作", field: "option",
        cellRenderParams: {
            opButtons: [
                {
                    key: "rename",
                    title: "催办"
                }
            ],
        }
    },
];
var todoCol = [
    {headerName: '任务类型', field: 'taskType'},
    {headerName: "当前任务", field: "currentTask"},
    {
        colId: "#op",
        cellRenderer: "OpCellRender",
        headerName: "处理", field: "option",
        cellRenderParams: {
            opButtons: [
                {
                    key: "rename",
                    title: "催办"
                }
            ],
        }
    },
];
var todoRowData = [
    {
        taskType: '产品信息审批子流程',
        currentTask: '产品新增申请'
    },{
        taskType: '账户申请流程',
        currentTask: '提交申请'
    },{
        taskType: '账户申请流程',
        currentTask: '提交申请'
    },{
        taskType: '补充账户申请流程',
        currentTask: '账户新增'
    },{
        taskType: '账户销户流程',
        currentTask: '账户复核通过'
    }];
var rowData2 = [
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '应付资金检查',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '应付资金检查',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    },
    {
        taskName: '专户产品清算',
        taskStep: '参数更新',
        startTime: '2020-01-06',
        endTime: '2020-01-09',
        restTime: '0天',
        proName: '资产管理计划',
        proNo: 'CJ10007'
    }];
var gridOptionObj = {
    columnDefs: [],
    rowData: [],
    ext: {
        statusBar: false, //是否显示状态栏
        autoFitColumnMode: 1, //自动列宽模式：1-根据内容自适应，当有剩余宽度时再自动Fit到窗口大小， 2-根据内空自适应    3-根据窗口大小自适应
        checkboxColumn: 0, //是否显示checkbox列,
    }
};
var boardStyleArr = [
    {id:'0', label:'快速联系',
        type: 'rapid-contact-form',
        data: {
            phone: '0755-23838943',
            mail: 'cust@mail.com'
        },
        img:'unit01'
    },
    {id:'1', label:'快速联系',
        type: 'rapid-contact-form',
        data: {
            phone: '0755-23838943',
            mail: 'cust@mail.com'
        },
        img:'unit01'
    },
    {id:'2', label:'财务指标',
        type: 'chart-comp',
        data: {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2018-02','2018-07','2018-12','2019-05','2019-10','2020-03','2020-08'],   // x轴数据
                    name: '（月份）',
                    nameTextStyle: {
                        fontSize: 12
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '（万元）',
                    nameTextStyle: {
                        fontSize: 12
                    }
                }
            ],
            series: [{
                type: 'line',
                data: [30,32,40,58,68,38,59],
                color:['#476DBE'],
                itemStyle:{
                    normal:{
                        color:"#476DBE",
                        label : {
                            show: true
                        }
                    }
                }
            }],
            grid: {
                x: 50,
                x2: 70,
                y: 35,
                y2: 35
            },
        },
        img:'unit02'},
    {id:'3', label:'任务列表',
        type: 'grid-comp',
        data: {
            columnDefs:  columnDefs2,
            rowData:  JSON.stringify(rowData2),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit03'},
    {id:'4', label:'客户信息',
        type: 'form-comp',
        data: {
            formObj: {
                labelWidth: '65px',
                guestName: 'XXXXXXX银行',
                guestType: '商业银行',
                guestAttr: '0',
                contactWay: '',
                ifPurchase: '0',
                manage: ['0']
            },
            fromItemArr: [
                {
                    type: 'label',
                    field: 'guestName',
                    label: '客户名称'
                },{
                    type: 'label',
                    field: 'guestType',
                    label: '客户类型'
                },{
                    type: 'select',
                    field: 'guestAttr',
                    label: '客户属性',
                    placeholder: '请选择...',
                    option: [{value:'0',label:'属性一'},{value:'1',label:'属性二'},{value:'2',label:'属性三'}],
                },{
                    type: 'input',
                    field: 'contactWay',
                    label: '联系方式'
                },{
                    type: 'radioBox',
                    field: 'ifPurchase',
                    label: '是否申购',
                    option: [{value:'0',label:'是'},{value:'1',label:'否'}],
                },{
                    type: 'checkbox',
                    field: 'manage',
                    label: '组合经理',
                    option: [{value:'0',label:'张三'},{value:'1',label:'李四'},{value:'2',label:'王五'}],
                },{
                    type: 'button',
                    label: '保存',
                    position: 'bottom'
                },
            ]
        },
        img:'unit04'},

    {id:'5', label:'待办任务',
        type: 'grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'6', label:'待办任务',
        type: 'grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'7', label:'待办任务',
        type: 'grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'8', label:'待办任务',
        type: 'grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'9', label:'快速联系',
        type: 'rapid-contact-form',
        data: {
            phone: '0755-23838943',
            mail: 'cust@mail.com'
        },
        img:'unit01'},
    {id:'10', label:'待办任务',
        type: 'grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'}
];

export default {
    guestInfo: guestInfo,
    gridLayoutType: gridLayoutType,
    gridLayoutType2: gridLayoutType2,
    gridLayoutType3: gridLayoutType3,
    boardArrDefault: boardArrDefault,
    boardArrDefine: boardArrDefine,
    columnDefs2: columnDefs2,
    todoCol: todoCol,
    todoRowData: todoRowData,
    rowData2: rowData2,
    gridOptionObj: gridOptionObj,
    boardStyleArr: boardStyleArr
}