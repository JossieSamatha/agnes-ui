import ModelDef from "./model-def"
import Task from "./task"
import KpiTaskDef from "./kpi-task-def";
import TaskDef from "./task-def";
import FunDef from "./fun-def"
import Workday from "./workday"
import CaseDef from "./case-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(KpiTaskDef);
        Gfui.use(TaskDef);
        Gfui.use(FunDef);
        Gfui.use(Task);
        Gfui.use(Workday);
        Gfui.use(CaseDef);
    }
};

export default Loading;
