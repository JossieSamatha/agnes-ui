import grouplist from "./group-list"
import Userlist from "./group-user"
import Flowlist from "./group-flow-task"
import Icrlist from "./group-icr-task"
import Kpilist from "./group-kpi-task"
import AccntTypelist from "./group-acnt-type"
import CustomQuery from "./group-custom-query"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-group-user', grouplist);
        Gfui.grid('agnes-user', Userlist);
        Gfui.grid('group-flow', Flowlist);
        Gfui.grid('group-icr', Icrlist);
        Gfui.grid('group-kpi', Kpilist);
        Gfui.grid('group-acnt-type', AccntTypelist);
        Gfui.grid('group-custom-query', CustomQuery);
    }
};

export default Loading;
