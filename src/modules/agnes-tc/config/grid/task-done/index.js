import TaskDone from "./task-done";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task-done', TaskDone);
    }
};

export default Loading;
