import KpiDef from "./kpi-def"
import TasksTodo from "./task-todo"
import TasksDone from "./task-done"
import TasksManage from "./task-manage"
import ServiceRespLevelConf from "./service-resp-conf"

const Loading = {
    load: function (Gfui) {
        Gfui.use(KpiDef);
        Gfui.use(TasksTodo);
        Gfui.use(TasksDone);
        Gfui.use(TasksManage);
        Gfui.use(ServiceRespLevelConf);
    }
};

export default Loading;
