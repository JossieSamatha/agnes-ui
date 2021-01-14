const todoCol = [
    {headerName: "当前任务", field: "currentTask"},
    {headerName: '任务类型', field: 'taskType'},
    {
        headerName: "处理", field: "option",
        cellRenderer: ()=>{
            let eGui = document.createElement('a');
            eGui.className = 'action-link';
            eGui.innerHTML = '处理';
            return eGui;
        },},
];
const todoRowData = [
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

const riskCol = [
    {headerName: "风险事项", field: "riskDetail"},
    {headerName: '风险类型', field: 'riskType'},
    {headerName: "时间", field: "date"},
];
const riskData = [
    {
        riskDetail: '产品信息审批子流程',
        riskType: '产品新增申请',
        date: '2021-01-01'
    },{
        riskDetail: '账户申请流程',
        riskType: '提交申请',
        date: '2021-01-02'
    },{
        riskDetail: '账户申请流程',
        riskType: '提交申请',
        date: '2021-01-02'
    },{
        riskDetail: '补充账户申请流程',
        riskType: '账户新增',
        date: '2021-01-05'
    },{
        riskDetail: '账户销户流程',
        riskType: '账户复核通过',
        date: '2021-01-05'
    }];

const columnDefs2 = [
    {headerName: '任务名称', field: 'taskName'},
    {headerName: "任务阶段", field: "taskStep"},
    {headerName: "任务开始时间", field: "startTime", hide: true},
    {headerName: "任务截止时间", field: "endTime", hide: true},
    {headerName: "剩余完成时间", field: "restTime", hide: true},
    {headerName: "产品名称", field: "proName", hide: true},
    {headerName: "产品代码", field: "proNo", hide: true},
    {
        headerName: "操作", field: "option",
        cellRenderer: ()=>{
            let eGui = document.createElement('a');
            eGui.className = 'action-link';
            eGui.innerHTML = '催办';
            return eGui;
        },},
];
const rowData2 = [
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

const productCol = [
    {headerName: '产品名称', field: 'proName'},
    {headerName: "基金经理", field: "fundManage"},
    {
        headerName: "风险事件", field: "riskNum",
        cellRenderer: (params)=>{
            let eGui = document.createElement('span');
            eGui.style.color = params.value>0 ? '#F7603D' : '#666';
            eGui.innerHTML = params.value;
            return eGui;
        },},
];
const productData = [
    {proName: 'XXXX资产管理计划', fundManage: '张三', riskNum: '0'},
    {proName: 'YYYY资产管理计划', fundManage: '李四', riskNum: '3'},
    {proName: 'ZZZZ资产管理计划', fundManage: '王五', riskNum: '5'},
    {proName: 'CCC资产管理计划', fundManage: '赵柳', riskNum: '0'},
    {proName: 'AAA资产管理计划', fundManage: '陆琪', riskNum: '0'},
    {proName: 'BBB资产管理计划', fundManage: '刘扒', riskNum: '0'},
    {proName: 'RRRRR资产管理计划', fundManage: '胡玖', riskNum: '2'},
    {proName: 'QQQQQ资产管理计划', fundManage: '丁拾', riskNum: '0'},
    {proName: 'FFFFF资产管理计划', fundManage: '萧十一', riskNum: '0'},
];

const guestCol = [
    {headerName: '时间', field: 'time'},
    {headerName: "渠道", field: "way"},
    { headerName: "事项", field: "event"}
];
const guestData = [
    {time: '2021-01-01', way: '微信群', event: 'XXX产品投资需求'},
    {time: '2021-01-05', way: '手动填写', event: 'XXX产品投资需求'},
    {time: '2021-01-06', way: '微信群', event: 'XXX产品投资需求'},
    {time: '2021-01-10', way: '微信群', event: 'XXX产品投资需求'},
    {time: '2021-01-11', way: '手动填写', event: 'XXX产品投资需求'},
    {time: '2021-01-15', way: '手动填写', event: 'XXX产品投资需求'},
];

const gridOptionObj = {
    columnDefs: [],
    rowData: [],
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

const gridLayoutType = [
    {"x":0,"y":0,"w":2,"h":2,"i":"2020040900",
        comp: {
            label:'快速联系',
            type: 'rapid-contact-form',
            data: {
                phone: '0755-23838943',
                mail: 'cust@mail.com'
            }
        }},
    {"x":2,"y":0,"w":2,"h":6,"i":"2020040904",
        comp: {
            label:'关联产品',
            type: 'guest-grid-comp',
            data: {
                columnDefs:  productCol,
                rowData:  JSON.stringify(productData),
                gridOption: JSON.stringify(gridOptionObj)
            },
        }},
    {"x":4,"y":0,"w":4,"h":2,"i":"2020040902",
        comp: {
            label:'财务指标',
            type: 'guest-chart-comp',
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
            }
        }
    },
    {"x":0,"y":2,"w":2,"h":4,"i":"2020040903",
    comp: {
        label:'客户需求',
        type: 'guest-grid-comp',
        data: {
            columnDefs:  guestCol,
            rowData:  JSON.stringify(guestData),
            gridOption: JSON.stringify(gridOptionObj)
        },
    }},
    {"x":4,"y":2,"w":2,"h":4,"i":"2020040905",
    comp: {
        label:'待办任务',
        type: 'guest-grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
    }},
    {"x":6,"y":2,"w":2,"h":4,"i":"2020040906",
        comp: {
            label:'风险事件',
            type: 'guest-grid-comp',
            data: {
                columnDefs:  riskCol,
                rowData:  JSON.stringify(riskData),
                gridOption: JSON.stringify(gridOptionObj)
            },
        }},
];



const boardStyleArr = [
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
        type: 'guest-chart-comp',
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
        type: 'guest-grid-comp',
        data: {
            columnDefs:  columnDefs2,
            rowData:  JSON.stringify(rowData2),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit03'},
    {id:'4', label:'客户信息',
        type: 'guest-form-comp',
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
        type: 'guest-grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'6', label:'待办任务',
        type: 'guest-grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'7', label:'待办任务',
        type: 'guest-grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'},
    {id:'8', label:'待办任务',
        type: 'guest-grid-comp',
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
        type: 'guest-grid-comp',
        data: {
            columnDefs:  todoCol,
            rowData:  JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img:'unit05'}
];

export default function () {
    return {
        gridLayoutType,
        boardStyleArr,
    }
}