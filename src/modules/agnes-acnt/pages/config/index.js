import RateDef from "./acnt-rate-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.acnt.rate.def', RateDef, {title: '账户利率维护'});
    }
};

export default Loading;
