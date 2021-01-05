import AcntInfo from "./acnt-info";
import AcntInfoTa from "./acnt-info-ta";
import AcntInfoFa from "./acnt-info-fa";
import AcntHiInfoFa from "./acnt-hi-info-fa";
import AcntHiInfoTa from "./acnt-hi-info-ta";


const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-acnt-info', AcntInfo);
        Gfui.grid('agnes-acnt-info-ta', AcntInfoTa);
        Gfui.grid('agnes-acnt-info-fa', AcntInfoFa);
        Gfui.grid('agnes-acnt-hi-info-fa', AcntHiInfoFa);
        Gfui.grid('agnes-acnt-hi-info-ta', AcntHiInfoTa);
    }
};

export default Loading;
