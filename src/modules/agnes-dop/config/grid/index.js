import OrgDef from "./org-def"
import OrgType from "./org-type"
import linkman from "./linkman-def"
import MemoDef from "./memo-def"
import RosterDef from "./roster-def"
import FileAnaly from "./file-analy-config/index"

const Loading = {
    load: function (Gfui) {
        Gfui.use(OrgDef);
        Gfui.use(OrgType);
        Gfui.use(linkman);
        Gfui.use(MemoDef);
        Gfui.use(RosterDef);
        Gfui.use(FileAnaly)
    }
};

export default Loading;
