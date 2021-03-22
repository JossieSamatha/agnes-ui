import proTask from "./pro-task";
import subProTask from "./sub-pro-task"
import dealLog from './deal-log'

const Loading = {
    load: function (Gfui) {
        Gfui.grid('monitor-pro-task', proTask);
        Gfui.grid('monitor-sub-pro-task', subProTask);
        Gfui.grid('monitor-deal-log', dealLog);
    }
};

export default Loading;
