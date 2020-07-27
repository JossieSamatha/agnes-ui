import AcntInfo from "./acnt-info"
import AcntRateDef from "./acnt-rate-def"
import linkmanRef from "./linkman-ref"

const Loading = {
    load: function (Gfui) {
        Gfui.use(AcntInfo);
        Gfui.use(AcntRateDef);
        Gfui.use(linkmanRef);
    }
};

export default Loading;
