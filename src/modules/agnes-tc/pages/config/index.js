import KpiDef from "./kpi-def/index";
import ServiceRespLevelConf from "./service-resp-level-conf/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.kpi.def', KpiDef, {title: '指标任务详情'});
        Gfui.componentView('agnes.service.resp.level.conf', ServiceRespLevelConf, {title: '服务响应等级配置'});
    }
};

export default Loading;
