import grouplist from "./group-list"
import Userlist from "./group-user"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-group-user', grouplist);
        Gfui.grid('agnes-user', Userlist);
    }
};

export default Loading;
