import ModelDef from "./model-def"
import Task from "./task"
import TaskDef from "./task-def";
import FunDef from "./fun-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(TaskDef);
        Gfui.use(FunDef);
        Gfui.use(Task);
    }
};

export default Loading;
