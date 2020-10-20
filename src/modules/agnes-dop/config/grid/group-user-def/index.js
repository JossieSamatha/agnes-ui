import grouplist from "./group-list"
import Userlist from "./group-user"
import Flowlist from "./group-flow-task"
import Kpilist from "./group-kpi-task"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-group-user', grouplist);
        Gfui.grid('agnes-user', Userlist);
        Gfui.grid('group-flow', Flowlist);
        Gfui.grid('group-kpi', Kpilist);
    }
};

export default Loading;
