import column from "../../../../../config/column"

const colButtons = [
    {key: 'editRisk', title: '编辑'},
    {key: 'deleteRisk', title: '删除', cellClass: 'red-cell'},
    {key: 'approveRisk', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02' || params.data.status === '03' || params.data.status === '00'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        {headerName: "风险描述", field: "riskDesc"},
        {headerName: "风险调入时间", field: "crtTs"},
        {headerName: "风险类型", field: "riskType", dictType: 'AGNES_DOP_RISK_TYPE'},
        {headerName: "风险等级", field: "riskLevel", dictType: 'AGNES_DOP_RISK_LEVEL'},
        {headerName: "状态", field: "status", dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "任务名称", field: "taskName"},
        {headerName: "异常描述", field: "errDesc"},
        {headerName: "操作人员", field: "updateUser"},
        column.buildOpCol(110, colButtons)
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/risk/query",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 100,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [50, 100, 150, 200],
            // 显示在状态栏上的页数字的个数
            pageCount: 0,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        }
    }
};
