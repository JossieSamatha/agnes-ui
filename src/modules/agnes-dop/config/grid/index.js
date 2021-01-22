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
import GroupUser from "./group-user-def/index"
import DataPipe from "./data-pipe"
import MonitorRiskDef from "./monitor-risk-def"
import MonitorErrDef from "./monitor-err-def"
import BranchDef from "./branch-def"
import FuncConfig from "./func-config"
import Compent from "./compents"
import WordsTransl from "./word-translate/index"

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
        Gfui.use(GroupUser);
        Gfui.use(DataPipe);
        Gfui.use(MonitorRiskDef);
        Gfui.use(MonitorErrDef);
        Gfui.use(BranchDef);
        Gfui.use(FuncConfig);
        Gfui.use(Compent);
        Gfui.use(WordsTransl);
    }
};

export default Loading;
