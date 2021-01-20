import column from "../../../../../config/column"

export default {
    columnDefs: [
        {headerName: "流程申请名称", field: "#", valueFormatter: function (params){
            const dictObj = window.$gfui.$app.dict.getDictItem('AGNES_ACNT_BIZ_TYPE', params.data.bizType);
            const dictName = dictObj ? dictObj.dictName : '--';

            return "【"+params.data.crtUserName+"】发起的"+ dictName +"申请流程"
        }
        },
        {headerName: "业务类型", field: "bizType",formatType: 'dict',dictType:"AGNES_ACNT_BIZ_TYPE"},
        {headerName: "流程节点", field: "processStatus",formatType: 'dict',dictType:"AGNES_ACNT_APPLY_STATUS"},
        {headerName: "是否提交OA", field: "isSendOa",
            valueFormatter: function (params) {
                if(params.value==='0'){
                    return '否'
                }
                return '是';
            }},
        {headerName: "账户名称", field: "acntName"},
        // {headerName: "账号", field: "accNo"},
        {headerName: "资金账号", field: "fundAccNos"},
        {headerName: "证券账号", field: "accNos"},

        {headerName: "归属机构", field: "orgName"},
        {headerName: "基金代码", field: "productCode"},
        {headerName: "基金名称", field: "productName"},

        {headerName: "申请截止日期", field: "applyDeadlineDt"},
        {headerName: "申请超时状态", field: "applyDeadlineStatus",formatType: 'dict',dictType: 'AGNES_ACNT_APPLY_DEADLINE_STATUS'},

        {headerName: "创建人", field: "crtUserName"},
        column.colCrtTm,
        {headerName: "更新人", field: "updateUserName"},
        column.colUpdTm
    ],
    defaultColDef: {
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
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
    // groupUseEntireRow: true,
    // rowGroupPanelShow: "always",
    // suppressDragLeaveHidesColumns: true,
    // groupDefaultExpanded: -1, // expand all groups by default
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
        fetchUrl: "/agnes-app/v1/acnt/apply/getAcntApplyPageList",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
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