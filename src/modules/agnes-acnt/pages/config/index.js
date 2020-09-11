import AcntInfo from "./acnt-info/index";
import RateDef from "./acnt-rate-def/index";
import AnctType from "./acnt-type";
import AnctRate from "./acnt-rate";
import AnctApply from "./acnt-apply";
import LinkManRef from './linkman-ref/index'


const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.acnt.info', AcntInfo, {title: '账户信息'});
        Gfui.componentView('agnes.acnt.rate.def', RateDef, {title: '账户利率关系维护'});
        Gfui.componentView('agnes.acnt.linkman.ref', LinkManRef, {title: '账户联系人关系'});
        Gfui.componentView('agnes.acnt.type', AnctType, {title: '账户类型维护'});
        Gfui.componentView('agnes.acnt.rate', AnctRate, {title: '利率方案维护'});
        Gfui.componentView('agnes.acnt.apply', AnctApply, {title: '账户申请管理'});
    }
};

export default Loading;
