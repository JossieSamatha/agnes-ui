import column from "../../../../../config/column"
import Permission from "../../../../../utils/hasPermission"

const colButtons = [
    {
        key: 'editKpiTask', title: '编辑', disabled: (params) => {
            let result = false;
            if (params.data.reTaskDef.taskStatus === '03') {
                result = true;
            }
            return result;
        }, visiable: () => {
            return Permission.hasPermission('agnes.kpi.task.def.edit');
        }
    },
    {
        key: 'deleteKpiTask', title: '删除', cellClass: 'red-cell', disabled: (params) => {
            let result = false;
            if (params.data.reTaskDef.taskStatus === '03') {
                result = true;
            }
            return result;
        }, visiable: () => {
            return Permission.hasPermission('agnes.kpi.task.def.delete');
        }
    },
    {
        key: 'checkKpiTask', title: '审核', disabled: (params) => {
            let result = false;
            if (params.data.reTaskDef.taskStatus === '00' || params.data.reTaskDef.taskStatus === '02' || params.data.reTaskDef.taskStatus === '03') {
                result = true;
            }
            return result;
        }, visiable: () => {
            return Permission.hasPermission('agnes.kpi.task.def.check');
        }
    },
    {
        key: 'checkBeforePulish', title: '发布', disabled: (params) => {
            let result = false;
            if (params.data.reTaskDef.taskStatus === '00' || params.data.reTaskDef.taskStatus === '01' || params.data.reTaskDef.taskStatus === '03') {
                result = true;
            }
            return result;
        }, visiable: (params) => {
            let result = true;
            if (!Permission.hasPermission('agnes.kpi.task.def.pulish') && params.data.reTaskDef.taskStatus === '03') {
                result = false;
            }
            return result;
        }
    },
    {
        key: 'stopAndCancelTask', title: '停止', visiable: (params) => {
            let result = false;
            if (Permission.hasPermission('agnes.kpi.task.def.stop') && params.data.reTaskDef.taskStatus === '03') {
                result = true;
            }
            return result;
        }, cellClass: 'red-cell'
    },

];

export default {
    columnDefs: [
        column.buildOpCol(140, colButtons),
        {headerName: "任务名称", field: "reTaskDef.taskName"},
        {headerName: "任务编号", field: "reTaskDef.caseKey"},
        {headerName: "业务场景", field: "reTaskDef.bizType", formatType: 'dict',dictType: 'AGNES_BIZ_CASE'},
        {
            headerName: "业务标签", field: "reTaskDef.bizTag",
            valueFormatter: function (params) {
                if (params.value) {
                    let Ids = params.value.split(',');
                    return Ids.map((dictId) => {
                        return window.$gfui.$app.dict.getDictItem('AGNES_BIZ_TAG', dictId).dictName;
                    }).join(',');
                }
                return "";
            }
        },
        {headerName: "任务类型", field: "reTaskDef.taskType", formatType: 'dict', dictType: 'AGNES_TASK_TYPE'},
        {headerName: "状态", field: "reTaskDef.taskStatus", formatType: 'dict', dictType: "AGNES_RELEASE_STATUS"},
        {headerName: "创建时间", field: "reTaskDef.crtTs"},
        {headerName: "创建人", field: "reTaskDef.crtUser"}
    ],
    // headerHeight: 40,
    // rowHeight: 37,
    ext: {
        fetchUrl: "/agnes-ac/v1/ac/kpi/task/case/list?taskType=1",    //后台查询数据的URL地址
        fetchMethod: 'get',
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
