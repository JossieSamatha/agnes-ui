import dataV from "./datav/index";
import Config from "./config/index"
import agnes from "./agnes/index";

const Loading = {
    load: function(Gfui) {
        Gfui.use(dataV);
        Gfui.use(Config);
        Gfui.use(agnes);
    }
};

export default Loading;
