const gridLayoutType = [
    {"x":0,"y":0,"w":8,"h":1,"i":"20201222016"},
    {"x":0,"y":1,"w":8,"h":4,"i":"20201222012"},
    {"x":0,"y":5,"w":8,"h":4,"i":"20201222014"},
    {"x":0,"y":9,"w":8,"h":6,"i":"20201222015"},
    {"x":8,"y":0,"w":4,"h":7,"i":"20201222011"},
    {"x":8,"y":7,"w":4,"h":3,"i":"BJdcWY"},
    {"x":8,"y":10,"w":4,"h":5,"i":"20201222013"}
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
];

const gridLayoutNewStyle = [
    {"x":0,"y":0,"w":8,"h":1,"i":"2020122206"},
    {"x":0,"y":1,"w":8,"h":4,"i":"2020122202"},
    {"x":0,"y":5,"w":8,"h":3,"i":"2020122204"},
    {"x":0,"y":8,"w":8,"h":5,"i":"2020122205"},
    {"x":8,"y":0,"w":4,"h":7,"i":"2020122201"},
    {"x":8,"y":7,"w":4,"h":5,"i":"2020122203"}
];

const boardArrDefault = [
    {
        boardId: '202004001',
        boardData: gridLayoutType
    }, {
        boardId: '202004002',
        boardData: gridLayoutNewStyle
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
        id: 'search', label: '全局搜索',
        type: 'common-search-panel',
        img: 'search'
    },
    {
        id: 'myIndex', label: '我的首页',
        type: 'my-index',
        img: 'myIndex'
    },
    {
        id: 'todoList', label: '我的待办',
        type: 'my-todolist',
        arrowShow: true,
        menuId: 'agnes.app.task.todo',
        data: {},
        img: 'todoList'
    },
    {
        id: 'myException', label: '我的异常',
        type: 'my-exception',
        img: 'myException'
    },
    {
        id: 'calendar', label: '我的日历',
        type: 'calendar-def',
        arrowShow: true,
        data: {
            calendarVal: '',
            module: 'datav.client.view',
            pageType: 'personal'
        },
        img: 'calendar'
    },
    {
        id: 'myNotice', label: '我的消息',
        type: 'notice-comp',
        arrowShow: true,
        menuId: 'agnes.app.message.mgr',
        data: {},
        img: 'notice'
    },
    {
        id: 'mySchedule', label: '我的排班',
        type: 'schedule-comp',
        arrowShow: true,
        menuId: 'agnes.dop.roster',
        data: {
            pageType: 'per'
        },
        img: 'schedule'
    }
];

const boardStyleDep = [
    {
        id: 'search', label: '全局搜索',
        type: 'common-search-panel',
        img: 'search'
    },
    {
        id: 'workSituation', label: '今日总体工作完成情况',
        type: 'table-pie',
        img: 'workSituation'
    },
    {
        id: 'processSituation', label: '今日主要流程完成情况',
        type: 'gauge-comp',
        data: {},
        img: 'processSituation'
    },
    {
        id: 'msgBox', label: '消息栏',
        type: 'strip-comp',
        img: 'msgBox'
    },
    {
        id: 'calendar', label: '运营日历',
        type: 'calendar-def',
        arrowShow: true,
        arrayBlock: true,
        menuId: 'agnes.dop.memo',
        data: {
            calendarVal: '',
            module: 'datav.dep.view',
            pageType: 'department'
        },
        img: 'calendar'
    },
    {
        id: 'depSchedule', label: '今日排班',
        type: 'schedule-comp',
        arrowShow: true,
        menuId: 'agnes.dop.roster',
        data: {
            pageType: 'dep'
        },
        img: 'schedule'
    }
];

export default {
    gridLayoutType,
    gridLayoutType2,
    gridLayoutType3,
    gridLayoutNewStyle,
    boardArrDefault,
    boardArrDefine,
    boardStyleArr,
    boardStyleDep
}
