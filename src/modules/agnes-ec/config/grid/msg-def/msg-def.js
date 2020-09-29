import column from "../../../../../config/column"

const colButtons = [
    {key: 'editMsg', title: '编辑', disabled: (params)=>{
            let result = false;
            if(params.data.msgStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'deleteMsg', title: '删除',cellClass:'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.msgStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'approveMsg', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.msgStatus === '02' || params.data.msgStatus === '03'){
                result =true;
            }
            return result;}},
    {key: 'publishMsg', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.msgStatus === '01' || params.data.msgStatus === '03'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        column.buildOpCol(170, colButtons),
        {headerName: "消息名称", field: "msgName"},
        {headerName: "消息编号", field: "msgCode"},
        {headerName: "消息类型", field: "msgTopic",formatType: 'dict', dictType: 'AC_MSG_TOPIC' },
        {headerName: "状态", field: "msgStatus" ,formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    headerHeight: 40,
    rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ec/msg/page/list",    //后台查询数据的URL地址
        fetchMethod: 'get',
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
