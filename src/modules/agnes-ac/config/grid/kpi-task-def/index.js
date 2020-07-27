import KpiTaskDef from "./kpi-task-def";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-kpi-task', KpiTaskDef);
    }
};

export default Loading;
