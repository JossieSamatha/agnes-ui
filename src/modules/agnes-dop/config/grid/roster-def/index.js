import RosterType from "./roster-type";
import RosterList from "./roster-list";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-roster-type', RosterType);
        Gfui.grid('agnes-roster-list', RosterList);
    }
};


export default Loading;
