import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission";

const colButtons = [
    {key: 'editFileAnaly', title: '编辑',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('dataservice.filescan.config.edit');
        }},
    {key: 'deleteFileAnaly', title: '删除', cellClass: 'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('dataservice.filescan.config.delete');
        }},
    {key: 'checkFile', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '00' ||params.data.status === '02' || params.data.status === '03'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('dataservice.filescan.config.check');
        }},
    {key: 'startFileMove', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '00' ||params.data.status === '01' || params.data.status === '03'){
                result =true;
            }
            return result;},visiable:(params)=>{
            let result = true;
            if(!Permission.hasPermission('dataservice.filescan.config.pulish') && params.data.status === '03'){
                result =false;
            }
            return result;}},
    {key: 'stopFileMove', title: '停止',visiable: (params)=>{
            let result = false;
            if(Permission.hasPermission('dataservice.filescan.config.stop') && params.data.status === '03'){
                result =true;
            }
            return result;}, cellClass: 'red-cell'},
];
export default {
    columnDefs: [
        column.buildOpCol(140, colButtons),
        {headerName: "规则编号", field: "scanCode"},
        {headerName: "业务编号", field: "varId"},
        {headerName: "规则名称", field: "scanName"},
        {headerName: "编码类型", field: "codeType",formatType: 'dict', dictType: 'AGNES_SCAN_CODE_TYPE'},
        {headerName: "传输方式", field: "transMode",formatType: 'dict', dictType: 'AGNES_DC_TRANS_MODE'},
        {headerName: "服务器地址", field: "serverAddress"},
        {headerName: "服务器端口", field: "serverPort"},
        {headerName: "状态", field: "status",dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "扫描路径", field: "filePath"},
        {headerName: "扫描文件", field: "fileName"},
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/dc/file/scan/list-page",
        fetchMethod: 'get',
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
        },
    },
};