import RosterDefList from "./roster-def-list";
import RosterList from "./roster-list";


const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-dop-roster-def-list', RosterDefList);
        Gfui.grid('agnes-dop-roster-ru-list', RosterList);
    }
};

export default Loading;
