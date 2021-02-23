import MotField from "./mot-field";
import MultField from "./mult-task-field";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-mot-field', MotField);
        Gfui.grid('agnes-mult-task-field', MultField);
    }
};

export default Loading;
