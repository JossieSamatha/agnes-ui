import OrgDef from "./org-def"
import OrgType from "./org-type"

const Loading = {
    load: function (Gfui) {
        Gfui.use(OrgDef);
        Gfui.use(OrgType);
    }
};

export default Loading;
