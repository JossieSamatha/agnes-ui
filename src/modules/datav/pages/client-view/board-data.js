const guestInfo = [
    {label: '客户名称', value: 'XXXXXXXXX银行'},
    {label: '客户类型', value: '商业银行'},
    {label: '组织机构代码', value: 'XXXXXXXXX'},
    {label: '客户属性', value: 'XXXXXXXXX'},
    {label: '客户名称', value: 'XXXXXXXXX银行'},
    {label: '客户类型', value: '商业银行'},
    {label: '组织机构代码', value: 'XXXXXXXXX'},
    {label: '客户属性', value: 'XXXXXXXXX'},
];

const gridLayoutType = [
    {"x": 0, "y": 0, "w": 4, "h": 3, "i": "2020040900"},
    {"x": 4, "y": 0, "w": 4, "h": 3, "i": "2020040901"},
    {"x": 8, "y": 0, "w": 4, "h": 3, "i": "2020040902"},
    {"x": 0, "y": 3, "w": 4, "h": 3, "i": "2020040903"},
    {"x": 4, "y": 3, "w": 4, "h": 3, "i": "2020040904"},
    {"x": 8, "y": 3, "w": 4, "h": 3, "i": "2020040905"},
    // {"x": 6, "y": 2, "w": 2, "h": 2, "i": "2020040906"},
    // {"x": 4, "y": 4, "w": 2, "h": 2, "i": "2020040907"},
    // {"x": 6, "y": 4, "w": 2, "h": 2, "i": "2020040908"}
];

const gridLayoutType2 = [
    {"x": 0, "y": 0, "w": 4, "h": 3, "i": "09040011"},
    {"x": 4, "y": 0, "w": 4, "h": 3, "i": "09040012"},
    {"x": 8, "y": 0, "w": 4, "h": 3, "i": "09040013"},
    {"x": 0, "y": 3, "w": 4, "h": 3, "i": "09040014"},
    {"x": 4, "y": 3, "w": 4, "h": 3, "i": "09040015"},
    {"x": 8, "y": 3, "w": 4, "h": 3, "i": "09040016"}];

const gridLayoutType3 = [
    {"x": 0, "y": 0, "w": 4, "h": 6, "i": "2020001"},
    {"x": 6, "y": 0, "w": 2, "h": 4, "i": "2020002"},
    {"x": 4, "y": 0, "w": 2, "h": 4, "i": "2020003"},
    {"x": 6, "y": 4, "w": 2, "h": 2, "i": "2020004"},
    {"x": 4, "y": 4, "w": 2, "h": 2, "i": "2020005"}
]

const boardArrDefault = [
    {
        boardId: '202004001',
        boardData: gridLayoutType
    }, {
        boardId: '202004002',
        boardData: gridLayoutType2
    },
];

const boardArrDefine = [
    {
        boardId: '202004003',
        boardData: gridLayoutType3
    },
];

const columnDefs2 = [
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
    {headerName: '任务名称', field: 'taskName'},
    {headerName: "任务阶段", field: "taskStep"},
    {headerName: "任务开始时间", field: "startTime", hide: true},
    {headerName: "任务截止时间", field: "endTime", hide: true},
    {headerName: "剩余完成时间", field: "restTime", hide: true},
    {headerName: "产品名称", field: "proName", hide: true},
    {headerName: "产品代码", field: "proNo", hide: true},

];
const todoCol = [
    {
        colId: "#op",
        cellRenderer: "OpCellRender",
        headerName: "处理", field: "option",
        cellRenderParams: {
            opButtons: [
                {
                    key: "rename",
                    title: "执行"
                }
            ],
        }
    },
    {headerName: '任务类型', field: 'taskType'},
    {headerName: "任务名称", field: "currentTask"},
];
const todoRowData = [
    {
        taskType: '产品信息审批子流程',
        currentTask: '产品新增申请',
        taskDate: '09-11',
        taskTime: '12:05:30'
    }, {
        taskType: '账户申请流程',
        currentTask: '提交申请',
        taskDate: '09-11',
        taskTime: '12:05:30'
    }, {
        taskType: '账户申请流程',
        currentTask: '提交申请',
        taskDate: '09-11',
        taskTime: '12:05:30'
    }, {
        taskType: '补充账户申请流程',
        currentTask: '账户新增',
        taskDate: '09-11',
        taskTime: '12:05:30'
    }, {
        taskType: '账户销户流程',
        currentTask: '账户复核通过',
        taskDate: '09-11',
        taskTime: '12:05:30'
    }];
const msgCol = [
    {headerName: '消息类型', field: 'msgType'},
    {headerName: '消息名称', field: 'msgName'}
];

const msgData = [
    {msgType: '完成', msgName: 'XXX完成通知', msgDate: '09-15'},
    {msgType: '超时', msgName: 'XXX超时通知', msgDate: '09-15'},
    {msgType: '提醒', msgName: 'XXX提醒通知', msgDate: '09-15'}
];

const scheduleCol = [
    {headerName: '部门', field: 'dep'},
    {headerName: '排班类型', field: 'type'},
    {headerName: '人员', field: 'person'}
];

const scheduleData = [
    {dep: '运营部', type: '早班', person: '张三', id: '021-38601112', date: '09-28', state: "待复核"},
    {dep: '运营部', type: '晚班', person: '李四', id: '021-38601112', date: '09-28', state: "已审核"},
    {dep: 'IT部', type: '早班-授权', person: '王五', id: '021-38601112', date: '09-28', state: "已审核"},
    {dep: 'IT部', type: '晚班-复核', person: '钱六', id: '021-38601112', date: '09-28', state: "待复核"},

];

const abnormalCol = [
    {headerName: '异常事项', field: 'abnormal'}
];
const abnormalData = [
    {abnormal: 'XXX任务已超时，需尽快处理', taskDate: '今天'},
    {abnormal: 'XXX任务已超时，需尽快处理', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，需尽快处理', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，需尽快处理', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，需尽快处理', taskDate: '09-15'},
];

const riskCol = [
    {headerName: '风险事项', field: 'abnormal'}
];
const riskData = [
    {abnormal: 'XXX任务已超时，导致划款失败', taskDate: '今天'},
    {abnormal: 'XXX任务已超时，导致划款失败', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，导致划款失败', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，导致划款失败', taskDate: '09-15'},
    {abnormal: 'XXX任务已超时，导致划款失败', taskDate: '09-15'},
];

const contractCol = [
    {headerName: '机构', field: 'dep'},
    {headerName: '联系人', field: 'conPer'},
    {headerName: '联系方式', field: 'conTel'}
];
const contractData = [
    {dep: '工商',conPer: '张三',conTel: '12390000000'},
    {dep: '中国银行',conPer: '李四',conTel: '12390000000'},
    {dep: '农商',conPer: '王五',conTel: '12390000000'},
    {dep: '建行',conPer: '张三',conTel: '12390000000'},
    {dep: '工商',conPer: '张三',conTel: '12390000000'},
    {dep: '工商',conPer: '张三',conTel: '12390000000'},
    {dep: '中国银行',conPer: '赵柳',conTel: '12390000000'},
    {dep: '工商',conPer: '张三',conTel: '12390000000'},
    {dep: '浦发',conPer: '张三',conTel: '12390000000'},
];

const channelCol = [
    {headerName: '渠道信息', field: 'channel'}
];
const channelData = [
    {channel: '瑜伽TA'},
    {channel: '创新TA'},
    {channel: 'XXXXFA'},
    {channel: 'XXXXFA'},
    {channel: '瑜伽TA'},
    {channel: '创新TA'},
    {channel: 'XXXXFA'},
    {channel: 'XXXXFA'},
    {channel: '瑜伽TA'},
    {channel: '创新TA'},
    {channel: 'XXXXFA'},
    {channel: 'XXXXFA'}
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
const gridOptionObj = {
    columnDefs: [],
    rowData: [],

    ext: {
        statusBar: false, //是否显示状态栏
        autoFitColumnMode: 1, //自动列宽模式：1-根据内容自适应，当有剩余宽度时再自动Fit到窗口大小， 2-根据内空自适应    3-根据窗口大小自适应
        checkboxColumn: 0, //是否显示checkbox列,
    }
};
const boardStyleArr = [
    {
        id: '0', label: '我的日历',
        type: 'calendar-def',
        data: {
            calendarVal: ''
        },
        img: 'unit01'
    },
    {
        id: '5', label: '我的待办',
        type: 'my-todolist',
        data: {
            columnDefs: todoCol,
            rowData: JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '6', label: '我的消息',
        type: 'comp-notice',
        data: {
            columnDefs: msgCol,
            rowData: JSON.stringify(msgData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '3', label: '今日排班',
        type: 'comp-work',
        data: {
            columnDefs: scheduleCol,
            rowData: JSON.stringify(scheduleData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit03'
    },
    {
        id: '7', label: '异常事项',
        type: 'comp-event',
        data: {
            columnDefs: abnormalCol,
            rowData: JSON.stringify(abnormalData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '10', label: '风险事项',
        type: 'comp-event',
        data: {
            columnDefs: riskCol,
            rowData: JSON.stringify(riskData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '1', label: '快速联系',
        type: 'rapid-contact-form',
        data: {
            phone: '0755-23838943',
            mail: 'cust@mail.com'
        },
        img: 'unit01'
    },
    {
        id: '2', label: '财务指标',
        type: 'chart-comp',
        data: {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2018-02', '2018-07', '2018-12', '2019-05', '2019-10', '2020-03', '2020-08'],   // x轴数据
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
                data: [30, 32, 40, 58, 68, 38, 59],
                color: ['#476DBE'],
                itemStyle: {
                    normal: {
                        color: "#476DBE",
                        label: {
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
        img: 'unit02'
    },

    {
        id: '4', label: '客户信息',
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
                }, {
                    type: 'label',
                    field: 'guestType',
                    label: '客户类型'
                }, {
                    type: 'select',
                    field: 'guestAttr',
                    label: '客户属性',
                    placeholder: '请选择...',
                    option: [{value: '0', label: '属性一'}, {value: '1', label: '属性二'}, {value: '2', label: '属性三'}],
                }, {
                    type: 'input',
                    field: 'contactWay',
                    label: '联系方式'
                }, {
                    type: 'radioBox',
                    field: 'ifPurchase',
                    label: '是否申购',
                    option: [{value: '0', label: '是'}, {value: '1', label: '否'}],
                }, {
                    type: 'checkbox',
                    field: 'manage',
                    label: '组合经理',
                    option: [{value: '0', label: '张三'}, {value: '1', label: '李四'}, {value: '2', label: '王五'}],
                }, {
                    type: 'button',
                    label: '保存',
                    position: 'bottom'
                },
            ]
        },
        img: 'unit04'
    },

    {
        id: '8', label: '待办任务',
        type: 'grid-comp',
        data: {
            columnDefs: todoCol,
            rowData: JSON.stringify(todoRowData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '9', label: '快速联系',
        type: 'rapid-contact-form',
        data: {
            phone: '0755-23838943',
            mail: 'cust@mail.com'
        },
        img: 'unit01'
    },
];

const boardStyleDep = [
    {
        id: '0', label: '运营日历',
        type: 'calendar-def',
        data: {
            calendarVal: ''
        },
        img: 'unit01'
    },
    {
        id: '1', label: '今日排班',
        type: 'grid-comp',
        data: {
            columnDefs: scheduleCol,
            rowData: JSON.stringify(scheduleData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '2', label: '外部联系人',
        type: 'grid-comp',
        data: {
            columnDefs: contractCol,
            rowData: JSON.stringify(contractData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    },
    {
        id: '3', label: '产品信息',
        type: 'grid-comp',
        data: {
            columnDefs: columnDefs2,
            rowData: JSON.stringify(rowData2),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit03'
    },
    {
        id: '4', label: '渠道信息',
        type: 'grid-comp',
        data: {
            columnDefs: channelCol,
            rowData: JSON.stringify(channelData),
            gridOption: JSON.stringify(gridOptionObj)
        },
        img: 'unit05'
    }
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
    boardStyleArr: boardStyleArr,
    boardStyleDep: boardStyleDep
}