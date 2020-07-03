import agnesAc from "./agnes-ac/index";
import dataV from "./datav/index";

const Loading = {
    load: function (Gfui) {
        Gfui.use(agnesAc);
        Gfui.use(dataV);
    }
};

export default Loading;