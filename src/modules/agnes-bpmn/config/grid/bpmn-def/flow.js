import dateUtil from "@hex/gf-ui/src/util/date-utils";

export default {
    columnDefs: [
        {headerName: "当前任务", field: "activityName"},
        {headerName: "流程类型", field: "categoryName"},
        {headerName: "优先级", field: "priority"},
        {headerName: "发起者", field: "showUserName"},

        {
            headerName: "申请时间", field: "applyTime", cellRenderer: (params) => {
                if (!params.value) {
                    return ''
                } else {
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }
        },
        {
            headerName: "接收时间", field: "receiveTime", cellRenderer: (params) => {
                if (!params.value) {
                    return ''
                } else {
                    let formatDate = '';
                    formatDate = dateUtil.formatDate(params.value, 'yyyy-MM-dd HH:mm:ss')
                    return formatDate;
                }
            }
        },

    ],
    // headerHeight: 40,
    // rowHeight: 37,
    rowSelection: 'multiple',
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/bpmn/process/node",
        fetchMethod: 'get',
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
        }
    }
};
