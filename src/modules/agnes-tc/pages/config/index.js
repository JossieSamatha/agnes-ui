import KpiDef from "./kpi-def/index";
const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.kpi.def', KpiDef, {title: '指标任务详情'});
    }
};

export default Loading;
