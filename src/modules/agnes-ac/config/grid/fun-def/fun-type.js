import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission";

const colButtons = [
    {key: 'editModel', title: '编辑',
        visiable: () => {
            return Permission.hasPermission('agnes.define.fun.edit');
        }},
    {key: 'deleteModel', title: '删除', cellClass: 'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;},visiable: () => {
            return Permission.hasPermission('agnes.define.fun.delete');
        }},
    {key: 'approveModelDef', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02' || params.data.status === '03'){
                result =true;
            }
            return result;},visiable: () => {
            return Permission.hasPermission('agnes.define.fun.check');
        }},
    {key: 'publishModelDef', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01' || params.data.status === '03'){
                result =true;
            }
            return result;},visiable: () => {
            return Permission.hasPermission('agnes.define.fun.publish');
        }}
];
const fnName = {headerName: "函数名称", field: "fnName",
    cellStyle: function (params) {
        if(params.data.isLastestVersion == '0'){
            return {color:'#F5222E'};
        }else {
            return null;
        }}};
const fnCode = {headerName: "函数编号", field: "fnCode"};
const fnType = {headerName: "函数类型", field: "fnType"}
const fnDesc = {headerName: "函数描述", field: "fnDesc"}

export default {
    columnDefs: [
        column.buildOpCol(140, colButtons),
        fnName,
        fnCode,
        {headerName: "状态", field: "status" ,formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        fnType,
        fnDesc,
        column.colCrtUser,
        column.colCrtTm
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/config/fun/query/page/list",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
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
