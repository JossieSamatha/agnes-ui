import column from "../../../../../config/column"

const colButtons = [
    {key: 'editRateScheme', title: '编辑',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'||params.data.status === '05'){
                result =true;
            }
            return result;}},
    {key: 'deleteRateScheme', title: '删除',cellClass:'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}},
    {key: 'checkRateScheme', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02'||params.data.status === '03'||params.data.status === '05'){
                result =true;
            }
            return result;}},
    {key: 'startRateScheme', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01'|| params.data.status === '05'){
                result =true;
            }
            return result;},visiable: (params)=>{
            let result = true;
            if(params.data.status === '03'){
                result =false;
            }
            return result;}},
    {key: 'stopRateScheme', title: '停止',visiable: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}},
];

export default {
    columnDefs: [
        {headerName: "账户名称", field: "acntName"},
        // {headerName: "账号", field: "accountNo"},
        {headerName: "开户机构", field: "extOrgName"},
        {headerName: "利率(%)", field: "rate"},
        {headerName: "状态", field: "status",dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "启用日期", field: "startDt"},
        {headerName: "停用日期", field: "endDt"},
        column.colUpdUser,
        column.colUpdTm,
        column.buildOpCol(160, colButtons)
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/rate/ref/list",    //后台查询数据的URL地址
        pagingMode: true, //是否分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
        },
    }
};
