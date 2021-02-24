import column from "@/config/column";
import Permission from "../../../../../utils/hasPermission"


const colButtons = [
    {
        key: 'editRosterDef', title: '编辑', visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.def.edit');
        }, disabled: (params) => {
            return params.data.rosterType === '99'
        },
    },
    {
        key: 'deleteRosterDef', title: '删除', cellClass: 'red-cell', visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.def.delete');
        }, disabled: (params) => {
            return params.data.rosterType === '99'
        },
    },
    {
        key: 'approveRosterDef', title: '审核', disabled: (params) => {
            return params.data.rosterStatus === '04' || params.data.rosterType === '99'
        }, visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.def.approve');
        }
    },
    {
        key: 'viewDetail', title: '查看详情', visiable: () => {
            return Permission.hasPermission('agnes.dop.roster.def.view');
        }
    },

];

export default {
    columnDefs: [
        column.buildOpCol(180, colButtons),
        {headerName: "值班开始时间", field: "rosterStartDate"},
        {headerName: "值班结束时间", field: "rosterEndDate"},
        {
            headerName: "值班类型", field: "rosterType",
            valueFormatter: function (params) {
                if (params.value) {
                    let Ids = params.value.split(',');
                    return Ids.map((dictId) => {
                        const dictObj = window.$gfui.$app.dict.getDictItem('AGNES_ROSTER_TYPE', dictId);
                        return dictObj ? dictObj.dictName : false;
                    }).join(',');
                }
                return "";
            }
        },
        {headerName: "状态", field: "rosterStatus", formatType: 'dict', dictType: 'AGNES_RELEASE_STATUS'},
        column.colCrtUser,
        column.colCrtTm
    ],
    ext: {
        fetchUrl: "/agnes-app/v2/dop/roster/def/page",    //后台查询数据的URL地址
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
