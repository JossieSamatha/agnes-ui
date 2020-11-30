import grouplist from "./group-list"
import Userlist from "./group-user"
import Flowlist from "./group-flow-task"
import Kpilist from "./group-kpi-task"
import AccntTypelist from "./group-acnt-type"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-group-user', grouplist);
        Gfui.grid('agnes-user', Userlist);
        Gfui.grid('group-flow', Flowlist);
        Gfui.grid('group-kpi', Kpilist);
        Gfui.grid('group-acnt-type', AccntTypelist);
    }
};

export default Loading;
