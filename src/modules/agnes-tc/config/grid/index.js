import KpiDef from "./kpi-def"
import TasksTodo from "./task-todo"

const Loading = {
    load: function (Gfui) {
        Gfui.use(KpiDef);
        Gfui.use(TasksTodo);
    }
};

export default Loading;
