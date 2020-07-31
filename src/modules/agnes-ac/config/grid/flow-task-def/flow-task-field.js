import column from "../../../../../config/column"
const colButtons = [
    {key: 'updateFlowTask', title: '编辑'},
    {key: 'deleteFlowTask', title: '删除', cellClass: 'red-cell'},
    {key: 'checkFlowTask', title: '审核'},
    {key: 'publishFlowTask', title: '发布'},
];
export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "业务场景", field: "reTaskDef.bizType",formatType: 'dict', dictType: 'AGNES_BIZ_CASE'},
        {headerName: "业务标签", field: "reTaskDef.bizTag",
            valueFormatter: function (params) {
                if(params.value){
                    let Ids = params.value.split(',');
                    return Ids.map((dictId) => {
                        return  window.$gfui.$app.dict.getDictItem('AGNES_BIZ_TAG',dictId).dictName;
                    }).join(',');
                }
                return "";
            }},
        {headerName: "业务类型", field: "reTaskDef.taskType" ,formatType: 'dict', dictType: 'AGNES_CASE_STEPTYPE'},
        {headerName: "状态", field: "reTaskDef.taskStatus",formatType: 'dict', dictType: 'CASE_TASK_STATUS'},
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/flow/task/case/list?taskType=2",
        fetchMethod: 'get',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
