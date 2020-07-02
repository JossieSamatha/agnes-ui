import dataV from "./datav/index";
import Config from "./config/index"

const Loading = {
    load: function(Gfui) {
        Gfui.use(dataV);
        Gfui.use(Config);
    }
};

export default Loading;
