import AcntInfo from "./acnt-info/index";
import RateDef from "./acnt-rate-def/index";
import LinkManRef from './linkman-ref/index'


const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.acnt.info', AcntInfo, {title: '账户信息'});
        Gfui.componentView('agnes.acnt.rate.def', RateDef, {title: '账户利率维护'});
        Gfui.componentView('agnes.acnt.linkman.ref', LinkManRef, {title: '账户联系人关系'});
    }
};

export default Loading;
