import column from "../../../../../config/column"

const colButtons = [
    {key: 'editModel', title: '编辑'},
    {key: 'deleteModel', title: '删除', cellClass: 'red-cell'},
];
const fnCode = {headerName: "函数定义编号", field: "fnCode"};
const fnName = {headerName: "函数名", field: "fnName"};
const fnType = {headerName: "函数类型", field: "fnType"}
const fnDesc = {headerName: "函数描述", field: "fnDesc"}

export default {
    columnDefs: [
        column.buildOpCol(120, colButtons),
        fnCode,
        fnName,
        fnType,
        fnDesc,
    ],
    ext: {
        fetchUrl: "/agnes-ac/v1/config/fun/query/page/list",    //后台查询数据的URL地址
        fetchMethod: 'post',
        pagingMode: true, //不分页
        checkboxColumn: 1, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: true,
        pageOptions: {
            // 分页大小
            pageSize: 10,
            // 可供选择的分页大小（下拉切换分页值）
            pageSizes: [10, 20, 50, 100],
            // 显示在状态栏上的页数字的个数
            pageCount: 5,
            prevText: "上一页",
            nextText: "下一页",
            // 分页工具显示项，例如总页数、当前页、上一页、下一页、等分页功能按钮
            // 详见ElementUI分页组件
            layout: "total, sizes, prev, pager, next, jumper"
        },
    }
};
