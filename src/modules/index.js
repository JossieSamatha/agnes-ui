import agnesAc from "./agnes-ac/index";
import agnesDop from "./agnes-dop/index"
import dataV from "./datav/index";
import agnesEc from "./agnes-ec/index";
import agnesAcnt from "./agnes-acnt/index";
const Loading = {
    load: function (Gfui) {
        Gfui.use(agnesAc);
        Gfui.use(agnesEc);
        Gfui.use(agnesDop);
        Gfui.use(agnesAcnt);
        Gfui.use(dataV);
    }
};

export default Loading;