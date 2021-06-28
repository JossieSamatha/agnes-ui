import Todo from "./todo";
import Done from "./done";
import Flow from "./flow"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('bpmn-todo', Todo);
        Gfui.grid('bpmn-done', Done);
        Gfui.grid('bpmn-flow', Flow);
    }
};


export default Loading;
