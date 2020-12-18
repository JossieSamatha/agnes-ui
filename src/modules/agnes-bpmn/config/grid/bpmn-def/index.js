import Todo from "./todo";
import Done from "./done";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('bpmn-todo', Todo);
        Gfui.grid('bpmn-done', Done);
    }
};


export default Loading;
