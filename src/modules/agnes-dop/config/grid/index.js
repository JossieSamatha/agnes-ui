import OrgDef from "./org-def"
import OrgType from "./org-type"
import linkman from "./linkman-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(OrgDef);
        Gfui.use(OrgType);
        Gfui.use(linkman)
    }
};

export default Loading;
