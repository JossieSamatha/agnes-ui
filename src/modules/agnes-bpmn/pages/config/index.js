import TodoDef from "./bpmn-def/todo";
import DoneDef from "./bpmn-def/done";


const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.bpmn.todo', TodoDef, {title: '审批任务'});
        Gfui.componentView('agnes.bpmn.done', DoneDef, {title: '审结任务'});
    }
};

export default Loading;
