const gridLayoutType = [
    {"x":0,"y":0,"w":8,"h":1,"i":"20201222016", compId: 'search'},
    {"x":0,"y":1,"w":8,"h":4,"i":"20201222012", compId: 'myIndex'},
    {"x":0,"y":5,"w":8,"h":4,"i":"20201222014", compId: 'todoList'},
    {"x":0,"y":9,"w":8,"h":6,"i":"20201222015", compId: 'myException'},
    {"x":8,"y":0,"w":4,"h":7,"i":"20201222011", compId: 'myCalendar'},
    {"x":8,"y":7,"w":4,"h":3,"i":"BJdcWY", compId: 'myNotice'},
    {"x":8,"y":10,"w":4,"h":5,"i":"20201222013", compId: 'mySchedule'}
    ];

const gridLayoutType2 = [
    {"x": 0, "y": 0, "w": 4, "h": 3, "i": "09040011", compId: 'search'},
    {"x": 4, "y": 0, "w": 4, "h": 3, "i": "09040012", compId: 'myIndex'},
    {"x": 8, "y": 0, "w": 4, "h": 3, "i": "09040013", compId: 'todoList'},
    {"x": 0, "y": 3, "w": 4, "h": 3, "i": "09040014", compId: 'myException'},
    {"x": 4, "y": 3, "w": 4, "h": 3, "i": "09040015", compId: 'myCalendar'},
    {"x": 8, "y": 3, "w": 4, "h": 3, "i": "09040016", compId: 'myNotice'}];

const gridLayoutType3 = [
    {"x": 0, "y": 0, "w": 4, "h": 6, "i": "2020001", compId: 'search'},
    {"x": 6, "y": 0, "w": 2, "h": 4, "i": "2020002", compId: 'workSituation'},
    {"x": 4, "y": 0, "w": 2, "h": 4, "i": "2020003", compId: 'processSituation'},
    {"x": 6, "y": 4, "w": 2, "h": 2, "i": "2020004", compId: 'msgBox'},
    {"x": 4, "y": 4, "w": 2, "h": 2, "i": "2020005", compId: 'depCalendar'}
];

const gridLayoutNewStyle = [
    {"x":0,"y":0,"w":8,"h":1,"i":"2020122206", compId: 'search'},
    {"x":0,"y":1,"w":8,"h":4,"i":"2020122202", compId: 'workSituation'},
    {"x":0,"y":5,"w":8,"h":3,"i":"2020122204", compId: 'processSituation'},
    {"x":0,"y":8,"w":8,"h":5,"i":"2020122205", compId: 'msgBox'},
    {"x":8,"y":0,"w":4,"h":7,"i":"2020122201", compId: 'depCalendar'},
    {"x":8,"y":7,"w":4,"h":5,"i":"2020122203", compId: 'depSchedule'}
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
        compId: 'search', label: '????????????',
        compType: 'common-search-panel',
        img: 'search'
    },
    {
        compId: 'myIndex', label: '????????????',
        compType: 'my-index',
        img: 'myIndex'
    },
    {
        compId: 'todoList', label: '????????????',
        compType: 'my-todolist',
        arrowShow: true,
        menuId: 'agnes.app.task.todo',
        compParams: {},
        img: 'todoList'
    },
    {
        compId: 'myException', label: '????????????',
        compType: 'my-exception',
        img: 'myException'
    },
    {
        compId: 'myCalendar', label: '????????????',
        compType: 'calendar-def',
        arrowShow: true,
        arrowBlock: true,
        img: 'calendar'
    },
    {
        compId: 'myNotice', label: '????????????',
        compType: 'notice-comp',
        arrowShow: true,
        menuId: 'agnes.app.message.mgr',
        compParams: {},
        img: 'notice'
    },
    {
        compId: 'mySchedule', label: '????????????',
        compType: 'schedule-comp',
        arrowShow: true,
        menuId: 'agnes.dop.roster',
        compParams: {
            pageType: 'per'
        },
        img: 'schedule'
    }
];

const boardStyleDep = [
    {
        compId: 'search', label: '????????????',
        compType: 'common-search-panel',
        img: 'search'
    },
    {
        compId: 'workSituation', label: '??????????????????????????????',
        compType: 'table-pie',
        img: 'workSituation'
    },
    {
        compId: 'processSituation', label: '??????????????????????????????',
        compType: 'gauge-comp',
        compParams: {},
        img: 'processSituation'
    },
    {
        compId: 'msgBox', label: '?????????',
        compType: 'strip-comp',
        img: 'msgBox'
    },
    {
        compId: 'depCalendar', label: '????????????',
        compType: 'calendar-def',
        arrowShow: true,
        arrowBlock: true,
        menuId: 'agnes.dop.memo',
        img: 'calendar'
    },
    {
        compId: 'depSchedule', label: '????????????',
        compType: 'schedule-comp',
        arrowShow: true,
        menuId: 'agnes.dop.roster',
        compParams: {
            pageType: 'dep'
        },
        img: 'schedule'
    }
];

export default function () {
    return {
        gridLayoutType,
        gridLayoutType2,
        gridLayoutType3,
        gridLayoutNewStyle,
        boardArrDefault,
        boardArrDefine,
        boardStyleArr,
        boardStyleDep
    }
}
