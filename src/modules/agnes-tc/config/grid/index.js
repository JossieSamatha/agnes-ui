import KpiDef from "./kpi-def"
import ServiceRespLevelConf from "./service-resp-conf"

const Loading = {
    load: function (Gfui) {
        Gfui.use(KpiDef);
        Gfui.use(ServiceRespLevelConf)
    }
};

export default Loading;
