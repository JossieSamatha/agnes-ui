export default {
    columnDefs: [
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "任务编号", field: "reTaskDef.caseKey"},
        {headerName: "业务场景", field: "reTaskDef.bizType", dictType: 'AGNES_BIZ_CASE'},
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
        {headerName: "任务类型", field: "reTaskDef.taskType", formatType: 'dict', dictType: 'AGNES_TASK_TYPE'},
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    rowSelection: "multiple",   // 表格行勾选类型，single：单选；multiple：多选
    suppressRowClickSelection:true,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/kpi/task/case/list?taskType=1",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //是否分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: false,
        pageOptions: {
            // 分页大小
            pageSize: 500,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [100, 300, 500, 700],
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
