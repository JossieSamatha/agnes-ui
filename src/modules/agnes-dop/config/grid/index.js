import OrgDef from "./org-def"
import OrgType from "./org-type"
import linkman from "./linkman-def"
import MemoDef from "./memo-def"
import RosterDef from "./roster-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(OrgDef);
        Gfui.use(OrgType);
        Gfui.use(linkman);
        Gfui.use(MemoDef);
        Gfui.use(RosterDef)
    }
};

export default Loading;
