import column from "../../../../../config/column"

const colButtons = [
    {key: 'editEventDef', title: '编辑'},
    {key: 'deleteEventDef', title: '删除',cellClass:'red-cell'},
    {key: 'approveEventDef', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.eventStatus === '02' || params.data.eventStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'publishEventDef', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.eventStatus === '01' || params.data.eventStatus === '03'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "事件名称", field: "eventName"},
        {headerName: "事件编号", field: "eventCode"},
        {headerName: "监听方式", field: "execMode" ,formatType: 'dict', dictType: 'AGNES_EC_EVENT_EXEC_MODE'},
        {headerName: "状态", field: "eventStatus" ,formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ec/event/def/list/page",
        fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
