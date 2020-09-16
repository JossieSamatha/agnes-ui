import column from "../../../../../config/column"
const colButtons = [
    {key: 'editService', title: '编辑'},
    {key: 'deleteService', title: '删除', cellClass: 'red-cell'},
    {key: 'approveModelDef', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02' || params.data.status === '03'){
                result =true;
            }
            return result;}},
    {key: 'publishModelDef', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01' || params.data.status === '03'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: '响应等级名称', field: "serviceResponseName"},
        {headerName: '响应等级编号', field: "serviceResponseCode"},
        {headerName: "重复时间间隔", field: "repeatMinutes"},
        {headerName: "紧急度提升", field: "degreeScore"},
        {headerName: "最大重复次数", field: "maxRepeatCount"},
        {headerName: "状态", field: "status", formatType: 'dict',dictType: "AGNES_RELEASE_STATUS"},
        column.colCrtUser,
        column.colCrtTm
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/service/page-list",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //分页
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
