import Factor from "./factor";
import TransRule from "./trans-rule";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-factor', Factor);
        Gfui.grid('agnes-trans-rule', TransRule);
    }
};


export default Loading;
