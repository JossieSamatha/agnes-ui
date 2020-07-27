import RateDef from "./acnt-rate-def";
import AcntInfoList from "./acnt-info-list"
import RateInfoList from "./rate-info-list"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-rate-def', RateDef);
        Gfui.grid('agnes-acnt-info-list', AcntInfoList);
        Gfui.grid('agnes-rate-info-list', RateInfoList);
    }
};

export default Loading;
