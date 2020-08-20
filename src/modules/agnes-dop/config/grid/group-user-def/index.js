import groupUserlist from "./group-user-list"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-group-user', groupUserlist);
    }
};

export default Loading;
