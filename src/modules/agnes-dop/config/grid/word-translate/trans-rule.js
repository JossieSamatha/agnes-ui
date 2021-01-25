import column from "../../../../../config/column";
import Permission from "../../../../../utils/hasPermission";

const colButtons = [
    {
        key: 'editRule', title: '编辑',visiable: () => {
            return Permission.hasPermission('agnes.chzh.zhgz.edit');
        }
    },
    {
        key: 'addRuleDetail', title: '明细配置',visiable: () => {
            return Permission.hasPermission('agnes.chzh.zhgz.detail.edit');
        }
    },
    {
        key: 'deleteRule', title: '删除', cellClass: 'red-cell',visiable: () => {
            return Permission.hasPermission('agnes.chzh.zhgz.delete');
        }
    },
];
export default {
    columnDefs: [
        column.buildOpCol(130, colButtons),
        {headerName: "规则名称", field: "ruleName"},
        {headerName: "规则编码", field: "ruleCode"},
        {headerName: "业务类型", field: "bizType",formatType: 'dict',dictType:'AGNES_WORDS_RULE_BIZ_TYPE'},
        {headerName: "创建人", field: "crtUser"},
        {headerName: "创建时间", field: "crtTs"},
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-app/v1/dop/words/list-transl-rule",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
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
        }
    }
};
