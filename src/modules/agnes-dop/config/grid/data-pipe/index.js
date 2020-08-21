import DataPipeTask from "./data-pipe-task";
import DataPipeTaskField from "./data-pipe-task-field"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('data-pipe-task', DataPipeTask);
        Gfui.grid('data-pipe-task-field', DataPipeTaskField);
    }
};

export default Loading;
