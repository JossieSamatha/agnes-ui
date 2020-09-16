import column from "../../../../../config/column"

const colButtons = [
    {key: 'editKpiTask', title: '编辑',disabled: (params)=>{
            let result = false;
            if(params.data.reTaskDef.taskStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'deleteKpiTask', title: '删除', cellClass: 'red-cell'},
    {key: 'checkTask', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.reTaskDef.taskStatus === '00' ||params.data.reTaskDef.taskStatus === '02' || params.data.reTaskDef.taskStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'checkMotBeforePulish', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.reTaskDef.taskStatus === '00' ||params.data.reTaskDef.taskStatus === '01' || params.data.reTaskDef.taskStatus === '03'){
                result =true;
            }
            return result;},visiable:(params)=>{
            let result = true;
            if(params.data.reTaskDef.taskStatus === '03'){
                result =false;
            }
            return result;}},
    {key: 'stopAndCancelTask', title: '停止',visiable: (params)=>{
            let result = false;
            if(params.data.reTaskDef.taskStatus === '03'){
                result =true;
            }
            return result;}},
];

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "任务编号", field: "reTaskDef.caseKey"},
        {headerName: "业务场景", field: "reTaskDef.bizType",formatType: 'dict', dictType: 'AGNES_BIZ_CASE'},
        {headerName: "业务标签", field: "reTaskDef.bizTag",dictType: 'AGNES_BIZ_TAG',
            valueFormatter: function (params) {
                if(params.value){
                    let Ids = params.value.split(',');
                    return Ids.map((dictId) => {
                        return  window.$gfui.$app.dict.getDictItem('AGNES_BIZ_TAG',dictId).dictName;
                    }).join(',');
                }
                return "";
        }},
        {headerName: "任务类型", field: "reTaskDef.taskType",formatType: 'dict', dictType: 'AGNES_TASK_TYPE'},
        {headerName: "状态", field: "reTaskDef.taskStatus", formatType: 'dict',dictType: "AGNES_RELEASE_STATUS"},
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/mot/task/case/list?taskType=6",
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
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
