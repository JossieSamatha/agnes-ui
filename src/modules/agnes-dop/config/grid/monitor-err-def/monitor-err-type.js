import column from "../../../../../config/column"

const colButtons = [
    {key: 'editErr', title: '编辑'},
    {key: 'deleteErr', title: '删除', cellClass: 'red-cell'},
    {key: 'approveErr', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02' || params.data.status === '03' || params.data.status === '00'){
                result =true;
            }
            return result;}},
    {key: 'publishErr', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01' || params.data.status === '03' || params.data.status === '00'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        {headerName: "任务名称", field: "taskName"},
        {headerName: "异常原因", field: "errReason"},
        {headerName: "异常发生时间", field: "crtTs"},
        {headerName: "处理状态", field: "status",  dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "处理时间", field: "inRiskTime"},
        {headerName: "异常类型", field: "errType", dictType: 'AGNES_DOP_ERR_TYPE'},
        {headerName: "异常描述", field: "errDesc"},
        {headerName: "是否调入风险", field: "isRisk", dictType: 'OPDS_YES_NO'},
        {headerName: "操作人员", field: "updateUser"},
        column.buildOpCol(120, colButtons)
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/err/query",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        pageOptions: {
            // 分页大小
            pageSize: 50,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
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
