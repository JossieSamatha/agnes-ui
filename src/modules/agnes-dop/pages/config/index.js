import OrgDef from "./org-def/index";
import OrgType from "./org-type/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.org.def', OrgDef, {title: '外部机构'});
        Gfui.componentView('agnes.org.type', OrgType, {title: '机构类别'});
    }
};

export default Loading;
