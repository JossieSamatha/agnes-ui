
export default {
    columnDefs: [
        {headerName: "开始日期", field: "startDtStr"},
        {headerName: "结束日期", field: "endDtStr"},
        {headerName: "业务类型", field: "bizType",formatType: 'dict',dictType:"AGNES_ACNT_BIZ_TYPE"},

        {headerName: "账户名称", field: "acntName"},
        {headerName: "账户类型", field: "typeName"},
        {
            headerName: "账户状态", field: "acntStatus", width: 95,
            suppressSizeToFit: true,
            formatType: 'dict',
            dictType: 'AGNES_ACNT_INFO_STATUS',
            cellStyle: function (params) {
                if (!params.value) {
                    return {display: 'none'}
                } else {
                    if(params.value === '01'){
                        return {color: '#52C41C'};
                    }else if(params.value === '02'){
                        return {color: '#DFE1E5'};
                    }else if(params.value === '03'){
                        return {color: '#F5222E'};
                    }else if(params.value === '04'){
                        return {color: '#F5222E'};
                    }else{
                        return {color: '#4A8EF0'};
                    }
                }
            },
            cellClass: ['fa fa-circle', 'status-circle-cell'],
        },
        {headerName: "归属机构", field: "extOrgName"},
        {headerName: "资金账号", field: "fundAccNos"},
        {headerName: "资金账号名称", field: "fundAccName"},
        {headerName: "币种", field: "fundCurrencys"},
        {headerName: "基金代码", field: "productCode"},
        {headerName: "基金名称", field: "productName"},

        {headerName: "账号", field: "accNos"},
        {headerName: "市场", field: "markets"},

        {headerName: "大额支付号", field: "bigPayNo"},
        {headerName: "开户网点", field: "openBank"},


        {headerName: "银行联系人", field: "linkmanNames"},
        // {headerName: "利率", field: "rateLabel"},
        {headerName: "利率(%)", field: "rate"},

        {headerName: "账户简称", field: "acntShortName"},
        {headerName: "账户启用日期", field: "acntStartDt"},
        {headerName: "是否开通银企直连", field: "isOpenBankCorDirect", formatType: 'dict',dictType: "OPDS_YES_NO"},
        {headerName: "到期提醒", field: "maturityDt"},
        {headerName: "备注", field: "remark"},

        {headerName: "流程类型", field: "processType"},
        {headerName: "期货公司", field: "futuresCompany"},
        {headerName: "额度", field: "limits"}

        // column.colCrtUser,
        // {headerName: "创建人", field: "crtUserName"},
        // column.colCrtTm,
        // {headerName: "更新人", field: "updateUserName"},
        // column.colUpdTm
    ],
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    groupUseEntireRow: true,
    rowGroupPanelShow: "always",
    suppressDragLeaveHidesColumns: true,
    groupDefaultExpanded: -1,
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/hi/list/page",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
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
