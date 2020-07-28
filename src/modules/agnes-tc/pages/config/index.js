import KpiDef from "./kpi-def/index";
import TaskTodo from "./task-todo/index";
const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.kpi.def', KpiDef, {title: '指标任务详情'});
        Gfui.componentView('agnes.app.task.todo', TaskTodo, {title: '待办任务'});
    }
};

export default Loading;
