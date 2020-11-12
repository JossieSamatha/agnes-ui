import AcntInfo from "./acnt-info";
import AcntInfoTa from "./acnt-info-ta";
import AcntInfoFa from "./acnt-info-fa";


const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-acnt-info', AcntInfo);
        Gfui.grid('agnes-acnt-info-ta', AcntInfoTa);
        Gfui.grid('agnes-acnt-info-fa', AcntInfoFa);
    }
};

export default Loading;
