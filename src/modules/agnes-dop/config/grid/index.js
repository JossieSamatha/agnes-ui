import OrgDef from "./org-def"
import OrgType from "./org-type"
import linkman from "./linkman-def"
import Product from "./product-def"
import ProductParam from "./product-param-def"
import ProductAuth from "./product-auth-def"
import ChangeData from "./change-data-def"
import Channel from "./channel-def"
import MemoDef from "./memo-def"
import RosterDef from "./roster-def"
import FileAnaly from "./file-analy-config/index"
import GroupUser from "./group-user-def/index"

const Loading = {
    load: function (Gfui) {
        Gfui.use(OrgDef);
        Gfui.use(OrgType);
        Gfui.use(Product);
        Gfui.use(ProductParam);
        Gfui.use(ProductAuth);
        Gfui.use(linkman);
        Gfui.use(Channel);
        Gfui.use(ChangeData);
        Gfui.use(MemoDef);
        Gfui.use(RosterDef);
        Gfui.use(FileAnaly);
        Gfui.use(GroupUser);
    }
};

export default Loading;
