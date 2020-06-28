import dataV from "./datav/index";
import agnes from "./agnes/index";

const Loading = {
    load: function(Gfui) {
        Gfui.use(dataV);
        Gfui.use(agnes);
    }
};

export default Loading;
