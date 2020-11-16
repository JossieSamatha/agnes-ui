import column from "../../../../../config/column"

const colButtons = [
    {key: 'editRate', title: '编辑',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}},
    {key: 'deleteRate', title: '删除', cellClass: 'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}},
    {key: 'check', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02'|| params.data.status === '03'|| params.data.status === '05'){
                result =true;
            }
            return result;}},
    {key: 'start', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01'){
                result =true;
            }
            return result;},
        visiable:(params)=>{
            let result = true;
            if(params.data.status === '03'){
                result =false;
            }
            return result;}},
    {key: 'stop', title: '停止',visiable: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}, cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        {headerName: "方案代码", field: "rateCode"},
        {headerName: "方案名称", field: "rateName"},
        {headerName: "网点代码", field: "branchCode"},
        {headerName: "网点名称", field: "branchName"},
        {headerName: "利率", field: "rate"},
        {headerName: "状态", field: "status" , dictType: "AGNES_RELEASE_STATUS"},
        {headerName: "生效日期", field: "startDt"},
        column.colUpdUser,
        column.colUpdTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/info/list",
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
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    },
};
