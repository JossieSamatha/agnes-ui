import TaskDef from "./task-def";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task', TaskDef);
    }
};

export default Loading;
