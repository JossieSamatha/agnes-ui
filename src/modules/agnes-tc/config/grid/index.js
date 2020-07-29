import KpiDef from "./kpi-def"
import TasksTodo from "./task-todo"
import ServiceRespLevelConf from "./service-resp-conf"

const Loading = {
    load: function (Gfui) {
        Gfui.use(KpiDef);
        Gfui.use(TasksTodo);
        Gfui.use(ServiceRespLevelConf);
    }
};

export default Loading;
