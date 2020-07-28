import column from "../../../../../config/column"

const colButtons = [
    {key: 'editKpiTask', title: '编辑'},
    {key: 'deleteKpiTask', title: '删除', cellClass: 'red-cell'},
    {key: 'checkMotTask', title: '复核'},
];

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "业务场景", field: "reTaskDef.bizType",formatType: 'dict', dictType: 'AC_BIZ_TYPE'},
        {headerName: "业务标签", field: "reTaskDef.bizTag",
            valueGetter:(param)=>{
                let text = '';
                if(param.data.reTaskDef.bizTag){
                    let newBizTag = param.data.reTaskDef.bizTag.split(',');
                    console.log('newBizTag',newBizTag)
                    for (let i=0;i<newBizTag.length;i++){
                        switch (newBizTag[i]) {
                            case '0':newBizTag[i] ='产品';break;
                            case '1':newBizTag[i] ='成立';break;
                            case '2':newBizTag[i] ='清算';break;
                        }
                    }
                    text = newBizTag.join()
                }
                return text
            }},
        {headerName: "业务类型", field: "reTaskDef.taskType",formatType: 'dict', dictType: 'AGNES_TASK_TYPE'},
        {headerName: "状态", field: "reTaskDef.taskStatus",
            valueGetter:(param)=>{
                let text = '';
                if(param.data.reTaskDef.taskStatus){
                    switch (param.data.reTaskDef.taskStatus) {
                        case '0':text ='新建';break;
                        case '1':text ='待复核';break;
                        case '2':text ='已复核';break;
                        case '3':text ='存在更新需再次复核';break;
                    }
                }
                return text
            }
        },
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/mot/task/case/list?taskType=2",
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
