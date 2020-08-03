import KpiDef from "./kpi-def/index";
import ServiceRespLevelConf from "./service-resp-level-conf/index";
import TaskTodo from "./task-todo/index";
import TaskDone from "./task-done/index";
import TaskManage from "./task-manage/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.kpi.def', KpiDef, {title: '指标任务详情'});
        Gfui.componentView('agnes.app.task.todo', TaskTodo, {title: '待办任务'});
        Gfui.componentView('agnes.app.task.done', TaskDone, {title: '办结任务'});
        Gfui.componentView('agnes.app.task.mgr', TaskManage, {title: '任务管理'});
        Gfui.componentView('agnes.service.resp.level.conf', ServiceRespLevelConf, {title: '服务响应等级配置'});
    }
};

export default Loading;
