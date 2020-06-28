import dataV from "./datav/index";
import agnesIndex from "./agnes/index";

const Loading = {
    // install: function (Vue) {
    //
    // },
    load: function(Gfui) {
        Gfui.use(dataV);
        Gfui.use(agnesIndex);
    }
};

export default Loading;

