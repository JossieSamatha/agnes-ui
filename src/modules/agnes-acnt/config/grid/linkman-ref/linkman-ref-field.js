import column from "../../../../../config/column";
import Permission from "../../../../../utils/hasPermission";

const colButtons = [
    {key: 'editLinkman', title: '编辑',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'||params.data.status === '05'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.linkman.ref.edit');
        }},
    {key: 'deleteLinkman', title: '删除',cellClass:'red-cell',disabled: (params)=>{
            let result = false;
            if(params.data.status === '03'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.linkman.ref.delete');
        }},
    {key: 'checkLinkman', title: '审核',disabled: (params)=>{
            let result = false;
            if(params.data.status === '02'||params.data.status === '03'||params.data.status === '05'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.linkman.ref.check');
        }},
    {key: 'startLinkman', title: '发布',disabled: (params)=>{
            let result = false;
            if(params.data.status === '01'|| params.data.status === '05'){
                result =true;
            }
            return result;},visiable: (params)=>{
            let result = true;
            if(params.data.status === '03'
                || !Permission.hasPermission('agnes.acnt.linkman.ref.publish')){
                result =false;
            }
            return result;}},
    {key: 'stopLinkman', title: '停止', cellClass: 'red-cell',visiable: (params)=>{
            let result = false;
            if(params.data.status === '03'
                && Permission.hasPermission('agnes.acnt.linkman.ref.stop')){
                result =true;
            }
            return result;}},
];

export default {
    columnDefs: [
        column.buildOpCol(140, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "账号", field: "accNo"},
        {headerName: "开户机构", field: "extOrgName"},
        {headerName: "联系人姓名", field: "linkmanName"},
        {headerName: "联系方式", field: "linkmanMobile"},
        {headerName: "状态", field: "status", dictType: 'AGNES_RELEASE_STATUS'},
        {headerName: "启用日期", field: "startDt"},
        {headerName: "停用日期", field: "endDt"},
        column.colUpdUser,
        column.colUpdTm,
    ],
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/linkman/ref/list",
        fetchMethod: 'post',
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
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
