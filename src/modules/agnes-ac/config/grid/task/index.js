import TaskField from "./task-field";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task-field', TaskField);
    }
};

export default Loading;