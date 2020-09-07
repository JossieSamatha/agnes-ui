import column from "../../../../../config/column"

const colButtons = [
    {key: 'choseRoster', title: '选择'},
];

export default {
    columnDefs: [
        column.buildOpCol(80, colButtons),
        {headerName: "部门", field: "deptId", dictType: 'AGNES_ROSTER_DEPT'},
        {headerName: "排班类型", field: "rosterType", dictType: 'AGNES_ROSTER_TYPE'},
        {headerName: "排班日期", field: "rosterDate"},
        {headerName: "排班时间", field: "rosterTs"},
        {headerName: "姓名", field: "userName"},
        {headerName: "岗位", field: "roleId" ,dictType: 'AGNES_ROSTER_POST'},
        {headerName: "手机", field: "mobileNo"},
        {headerName: "座机", field: "oTel"},
        {headerName: "邮箱", field: "oEmail"}
    ],
    defaultColDef: {
        enableRowGroup: true
    },
    rowGroupPanelShow: "always",
    ext: {
        fetchUrl: "/agnes-app/v1/dop/roster/list/page",    //后台查询数据的URL地址
        fetchMethod: 'get',
        pagingMode: true, //分页
        checkboxColumn: 0, //是否显示checkbox列,
        autoFitColumnMode: 1,
        enableExportLocal: false,
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
        }
    }
};
