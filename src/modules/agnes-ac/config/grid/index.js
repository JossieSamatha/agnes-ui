import ModelDef from "./model-def"
import Task from "./task"
import KpiTaskDef from "./kpi-task-def";
import monitorKip from './monitor-kpi-def'
import TaskDef from "./task-def";
import FunDef from "./fun-def"
import Workday from "./workday"
import CaseDef from "./case-def"
import MotDef from "./mot-def"
import FlowTaskField from './flow-task-def'
import elecProcessField from './elec-process'
import ServiceRespLevelConf from "./service-resp-conf"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(KpiTaskDef);
        Gfui.use(monitorKip);
        Gfui.use(TaskDef);
        Gfui.use(FunDef);
        Gfui.use(Task);
        Gfui.use(Workday);
        Gfui.use(CaseDef);
        Gfui.use(MotDef);
        Gfui.use(FlowTaskField);
        Gfui.use(elecProcessField);
        Gfui.use(ServiceRespLevelConf);
    }
};

export default Loading;
