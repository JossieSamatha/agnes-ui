import agnesAc from "./agnes-ac/index";
import dataV from "./datav/index";
import agnesEc from "./agnes-ec/index";

const Loading = {
    load: function (Gfui) {
        Gfui.use(agnesAc);
        Gfui.use(agnesEc);
        Gfui.use(dataV);
    }
};

export default Loading;