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
    {"x": 8, "y": 3, "w": 4, "h": 3, "i": "2020040905"}
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


const boardStyleArr = [
    {
        id: '0', label: '我的日历',
        type: 'calendar-def',
        arrowShow: true,
        data: {
            calendarVal: '',
            module: 'datav.client.view',
            pageType: 'personal'
        },
        img: 'unit01'
    },
    {
        id: '5', label: '我的待办',
        type: 'my-todolist',
        menuId: 'agnes.app.task.todo',
        arrowShow: true,
        data: {},
        img: 'unit05'
    },
    {
        id: '6', label: '我的消息',
        type: 'comp-notice',
        menuId: 'agnes.app.message.mgr',
        arrowShow: true,
        data: {},
        img: 'unit05'
    },
    {
        id: '3', label: '今日排班',
        type: 'comp-work',
        menuId: 'agnes.dop.roster',
        moduleArgs: {
            pageType: 'personal'
        },
        arrowShow: true,
        data: {
            pageType: 'personal'
        },
        img: 'unit03'
    },
    {
        id: '7', label: '异常事项',
        type: 'comp-event',
        menuId: 'agnes.app.monitor.error',
        arrowShow: true,
        data: {
            compType: 'err'
        },
        img: 'unit05'
    },
    {
        id: '10', label: '风险事项',
        type: 'comp-event',
        menuId: 'agnes.app.monitor.risk',
        arrowShow: true,
        data: {
            compType: 'risk'
        },
        img: 'unit05'
    },
];

const boardStyleDep = [
    {
        id: '0', label: '运营日历',
        type: 'calendar-def',
        data: {
            calendarVal: '',
            module: 'datav.dep.view',
            pageType: 'department'
        },
        img: 'unit01'
    },
    {
        id: '1', label: '今日排班',
        type: 'comp-work',
        menuId: 'agnes.dop.roster',
        moduleArgs: {
            pageType: 'department'
        },
        arrowShow: true,
        data: {
            pageType: 'department'
        },
        img: 'unit05'
    },
    {
        id: '2', label: '外部联系人',
        type: 'comp-lineman',
        menuId: 'agnes.dop.linkman',
        arrowShow: true,
        data: {},
        img: 'unit05'
    },
    {
        id: '3', label: '产品信息',
        type: 'comp-product',
        menuId: 'agnes.dop.product.def',
        arrowShow: true,
        data: {
        },
        img: 'unit03'
    },
    {
        id: '4', label: '渠道信息',
        type: 'comp-channel',
        menuId: 'agnes.app.conf.channel',
        arrowShow: true,
        data: {},
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
    boardStyleArr: boardStyleArr,
    boardStyleDep: boardStyleDep
}
