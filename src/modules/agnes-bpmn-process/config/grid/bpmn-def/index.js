import Dtl from "./dtl";
import Define from "./define";
import Flow from "./flow"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('process-define', Define);
        Gfui.grid('process-dtl', Dtl);
        Gfui.grid('bpmn-flow', Flow);
    }
};


export default Loading;
