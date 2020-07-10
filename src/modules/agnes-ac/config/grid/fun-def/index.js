import FunField from "./fun-field";
import FunType from "./fun-type";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-fun-field', FunField);
        Gfui.grid('agnes-fun-type', FunType);
    }
};

export default Loading;
