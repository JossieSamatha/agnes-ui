import KpiListDef from "./kpi-list-def";
import KpiDetailList from './kpi-detail-list'

const Loading = {
    load: function (Gfui) {
        Gfui.grid('kpi-list-def', KpiListDef);
        Gfui.grid('kpi-detail-list', KpiDetailList);
    }
};

export default Loading;
