import agnesAc from "./agnes-ac/index";
import agnesDop from "./agnes-dop/index"
import dataV from "./datav/index";
import agnesEc from "./agnes-ec/index";
import agnesTc from "./agnes-tc/index";
import agnesDc from "./agnes-dc/index";
import agnesAcnt from "./agnes-acnt/index";
import agnesRemind from "./agnes-remind/index";
const Loading = {
    load: function (Gfui) {
        Gfui.use(agnesAc);
        Gfui.use(agnesEc);
        Gfui.use(agnesDop);
        Gfui.use(agnesAcnt);
        Gfui.use(dataV);
        Gfui.use(agnesTc);
        Gfui.use(agnesDc);
        Gfui.use(agnesRemind);
    }
};

export default Loading;
