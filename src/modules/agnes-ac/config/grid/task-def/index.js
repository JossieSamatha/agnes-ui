import TaskDef from "./task-def";
import IcrTaskDef from "./icr-task-def";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task', TaskDef);
        Gfui.grid('agnes-icr-task', IcrTaskDef);
    }
};

export default Loading;
