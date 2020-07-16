import Workday from "./workday";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-workday', Workday);
    }
};

export default Loading;