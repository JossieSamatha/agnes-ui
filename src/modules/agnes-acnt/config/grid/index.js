import AcntInfo from "./acnt-info"
import AcntRateDef from "./acnt-rate-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(AcntInfo);
        Gfui.use(AcntRateDef);
    }
};

export default Loading;
