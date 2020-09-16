import OrgDef from "./org-def/index";
import OrgType from "./org-type/index";
import Linkman from "./linkman-def/index"
import GroupUser from "./user-group/index"
import Product from "./product-def/index"
// import ProductParam from "./product-param-def/index"
// import ProductAuth from "./product-auth-def/index"
import DataChange from "./data-change-def/index"
import Channel from "./channel-def/channel-list"
import memoDef from "./memo-def/index"
import RosterDef from "./roster-def/index";
import DataPipeTask from "./data-pipe/index";
import MonitorRiskDef from "./monitor-risk-def/index";
import MonitorErrDef from "./monitor-err-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.org.def', OrgDef, {title: '外部机构维护'});
        Gfui.componentView('agnes.org.type', OrgType, {title: '机构类型维护'});
        Gfui.componentView('agnes.dop.product.def', Product, {title: '产品信息维护'});
        Gfui.componentView('agnes.app.conf.channel', Channel, {title: '渠道表维护'});
        Gfui.componentView('agnes.app.conf.dayend', DataChange, {title: '工作日切换'});
        Gfui.componentView('agnes.dop.linkman', Linkman, {title: '外部联系人维护'});
        Gfui.componentView('agnes.dop.group.user', GroupUser, {title: '内部联系人分组'});
        Gfui.componentView('agnes.dop.memo', memoDef, {title: '运营日历维护'});
        Gfui.componentView('agnes.dop.roster', RosterDef, {title: '排班表维护'});
        Gfui.componentView('data.pipe.task', DataPipeTask, {title: '调度配置'});
        Gfui.componentView('agnes.app.monitor.risk', MonitorRiskDef, {title: '风险管理'});
        Gfui.componentView('agnes.app.monitor.error', MonitorErrDef, {title: '异常管理'});
    }
};

export default Loading;
