import ModelDef from "./model-def"
import Task from "./task"
import TaskDef from "./task-def";
import FunDef from "./fun-def"
import Workday from "./workday"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(TaskDef);
        Gfui.use(FunDef);
        Gfui.use(Task);
        Gfui.use(Workday);
    }
};

export default Loading;
