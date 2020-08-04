import OrgDef from "./org-def/index";
import OrgType from "./org-type/index";
import Linkman from "./linkman-def/index"
import memoDef from "./memo-def/index"
import RosterDef from "./roster-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.org.def', OrgDef, {title: '外部机构维护'});
        Gfui.componentView('agnes.org.type', OrgType, {title: '机构类型维护'});
        Gfui.componentView('agnes.dop.linkman', Linkman, {title: '联系人'});
        Gfui.componentView('agnes.dop.memo', memoDef, {title: '日历维护'});
        Gfui.componentView('agnes.dop.roster', RosterDef, {title: '排班表'});
    }
};

export default Loading;
