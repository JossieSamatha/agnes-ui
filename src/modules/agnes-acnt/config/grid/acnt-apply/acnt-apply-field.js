import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission";

// const colButtons = [
//     {key: 'edit', title: '编辑',visiable: (params)=>{return params.data.processStatus === '01';}},
//     {key: 'detele', title: '作废',visiable: (params)=>{return params.data.processStatus === '01'&&!params.data.applySubId;}},
//     {key: 'check', title: '复核',visiable: (params)=>{return params.data.processStatus === '02';}},
//     {key: 'addInfo', title: '资料准备',visiable: (params)=>{return params.data.processStatus === '04';}},
//     {key: 'nextaddInfo', title: '资料准备完成',visiable: (params)=>{return params.data.processStatus === '04';}},
//     {key: 'checkFund', title: '财务审核',visiable: (params)=>{return params.data.processStatus === '05';}},
//     {key: 'addAcc', title: '账户录入',visiable: (params)=>{return params.data.processStatus === '06';}},
//     {key: 'checkAcc', title: '账户复核',visiable: (params)=>{return params.data.processStatus === '07';}},
//     {key: 'showSteps', title: '查看流程',visiable: (params)=>{return params.data.processStatus != '09';}},
// ];

//流程查看  编辑  作废  审核
const colButtons = [
    {key: 'showSteps', title: '查看流程', disabled: (params)=>{
            let result = false;
            if(params.data.processStatus === '09'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.apply.showSteps');
        }},
    {key: 'edit', title: '编辑', disabled: (params)=>{
            let result = false;
            if(params.data.processStatus !== '01' && params.data.processStatus !== '06'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.apply.edit');
        }},//编辑  账户录入
    {key: 'detele', title: '作废', cellClass: 'red-cell', disabled: (params)=>{
            let result = false;
            if(params.data.processStatus !== '01' && params.data.processStatus !== '02'
                && params.data.processStatus !== '03'){
                // if(!(params.data.processStatus === '01'&&!params.data.applySubId)){
            // if(!(params.data.processStatus === '01')){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.apply.delete');
        }},//作废
    {key: 'check', title: '审核', disabled: (params)=>{
            let result = false;
            if(params.data.processStatus !== '02' && params.data.processStatus !== '04'
                && params.data.processStatus !== '05'&& params.data.processStatus !== '07'){
                result =true;
            }
            return result;}, visiable: () => {
            return Permission.hasPermission('agnes.acnt.apply.check');
        }},//复核 资料准备完成 财务审核 账户复核


];
export default {
    columnDefs: [
        column.buildOpCol(160, colButtons),
        // {headerName: "账户类型", field: "typeName"},
        {headerName: "账户名称", field: "acntName"},
        // {headerName: "账号", field: "accNo"},
        {headerName: "账号", field: "accNos"},
        {headerName: "资金账号", field: "fundAccNos"},

        {headerName: "归属机构", field: "orgName"},
        {headerName: "业务类型", field: "bizType",dictType:"AGNES_ACNT_BIZ_TYPE"},
        {headerName: "流程节点", field: "processStatus",dictType:"AGNES_ACNT_APPLY_STATUS"},
        {headerName: "是否提交OA", field: "isSendOa",
          valueFormatter: function (params) {
            if(params.value==='0'){
                return '否'
            }
            return '是';
        }},
        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm
    ],
    defaultColDef: {
        flex: 1,
    },
    autoGroupColumnDef: {
        headerName: '账户类型',
        field:"typeName",
        minWidth: 50,
        cellRendererParams: {
            suppressCount: true,
        },
    },
    treeData: true, // enable Tree Data mode
    animateRows: true,
    groupDefaultExpanded: 0, // expand all groups by default
    getDataPath: function(data) {
        return data.orgHierarchy;
    },
    // masterDetail: true,
    // isRowMaster: function (dataItem) {
    //     return dataItem ? dataItem.children.length > 0 : false;
    // },
    // detailCellRendererParams: {
    //     detailGridOptions: {
    //       columnDefs: [
    //         column.buildOpCol(50, DetailColButtons),
    //         {headerName: "账户类型", field: "typeCode"},
    //         {headerName: "归属机构", field: "orgName"},
    //         {headerName: "业务类型", field: "bizType"},
    //         {headerName: "流程节点", field: "processStatus",dictType:"AGNES_ACNT_APPLY_STATUS"},
    //         {headerName: "是否提交OA", field: "isSendOa",
    //           valueFormatter: function (params) {
    //             if(params.value==='0'){
    //                 return '否'
    //             }
    //             return '是';
    //         }},
    //         column.colUpdUser,
    //         column.colUpdTm
    //       ],
    //       defaultColDef: {
    //         flex: 1,
    //       },
    //     },
    //     getDetailRowData: function (params) {
    //       params.successCallback(params.data.children);
    //     },
    // },
    rowSelection:'multiple',
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/apply/getAcntApplyVoList",
        fetchMethod: 'post',
        pagingMode: false, //不分页
        checkboxColumn: 2, //是否显示checkbox列,
        enableExportLocal: true,
        autoFitColumnMode: 1,
        // pageOptions: {
        //     // 分页大小
        //     pageSize: 50,
        //     // 可供选择的分页大小（下拉切换分页值）
        //     pageSizes: [10, 20, 50, 100],
        //     // 显示在状态栏上的页数字的个数
        //     pageCount: 5,
        //     prevText: "上一页",
        //     nextText: "下一页",
        //     // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
        //     // 详见ElementUI分页组件
        //     layout: "total, sizes, prev, pager, next, jumper"
        // },
    },
};