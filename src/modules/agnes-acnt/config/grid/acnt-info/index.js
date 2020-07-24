import AcntInfo from "./acnt-info";
import AcntInfoRateRefShow from "./acnt-info-rate-ref-show";
import AcntInfoLinkmanRefShow from "./acnt-info-linkman-ref-show";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-acnt-info', AcntInfo);
        Gfui.grid('agnes-acnt-info-rate-ref-show', AcntInfoRateRefShow);
        Gfui.grid('agnes-acnt-info-linkman-ref-show', AcntInfoLinkmanRefShow);
    }
};

export default Loading;
