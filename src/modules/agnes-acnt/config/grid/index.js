import AcntInfo from "./acnt-info"
import AcntRateDef from "./acnt-rate-def"
import linkmanRef from "./linkman-ref"
import acntType from "./acnt-type"
import acntRate from "./acnt-rate"
import acntApply from "./acnt-apply"

const Loading = {
    load: function (Gfui) {
        Gfui.use(AcntInfo);
        Gfui.use(AcntRateDef);
        Gfui.use(linkmanRef);
        Gfui.use(acntType);
        Gfui.use(acntRate);
        Gfui.use(acntApply);
    }
};

export default Loading;
