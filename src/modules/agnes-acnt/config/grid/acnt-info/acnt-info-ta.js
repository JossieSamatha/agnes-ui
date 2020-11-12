import column from "../../../../../config/column"

const colButtons = [
    // {key: 'queryRate', title: '查看利率'},
    // {key: 'queryLinkman', title: '查看联系人'},
    {key: 'changeData', title: '变更资料'},
    {key: 'delete', title: '销户',disabled: (params)=>{
            let result = false;
            if(params.data.processStatus === '02'){
                result =true;
            }
            return result;}}
];

export default {
    columnDefs: [
        column.buildOpCol(180, colButtons),
        {headerName: "账户名称", field: "acntName"},
        {headerName: "归属机构", field: "extOrgName"},

        {headerName: "流程类型", field: "processType"},
        {headerName: "账户类型", field: "typeName"},
        {headerName: "账户状态", field: "acntStatus", dictType:"AGNES_ACNT_INFO_STATUS"},
        {headerName: "基金代码", field: "productCode"},
        {headerName: "基金名称", field: "productName"},

        {headerName: "账号", field: "acc_nos"},
        {headerName: "市场", field: "markets"},

        {headerName: "清算编号", field: "settlementNo"},
        {headerName: "开户网点", field: "openBank"},
        {headerName: "大额支付号", field: "bigPayNo"},
        {headerName: "账户所属地区", field: "region"},

        {headerName: "币种", field: "currency"},

        {headerName: "利率", field: "rateLabel"},
        {headerName: "预留印鉴信息", field: "stampInfo"},
        {headerName: "印鉴法人变更情况", field: "stampLegalPersonInfo"},
        {headerName: "三证合一变更情况", field: "threeLicenseInfo"},
        {headerName: "账户启用日期", field: "acntStartDt"},
        {headerName: "账户用途描述", field: "acntPurpose"},
        {headerName: "是否开立网银", field: "isOpenEbank", dictType:"OPDS_YES_NO"},
        {headerName: "是否开立银企直联", field: "isOpenBankCorDirect", dictType:"OPDS_YES_NO"},
        {headerName: "备付金账户对应的银行账户", field: "provisionBankAcntNames"},
        {headerName: "卡账户对应的对公户", field: "cardCorporateAcntName"},
        {headerName: "银行联系人", field: "linkmanNames"},
        {headerName: "其他", field: "other"},
        {headerName: "备注", field: "remark"},

        column.colCrtUser,
        column.colCrtTm,
        column.colUpdUser,
        column.colUpdTm
    ],
    defaultColDef: {
        enableRowGroup: true,
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
    },
    ext: {
        fetchUrl: "/agnes-app/v1/acnt/info/list/page",
        fetchMethod: 'post',
        pagingMode: true, //是否分页
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