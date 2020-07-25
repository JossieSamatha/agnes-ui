import request from '@hex/gf-ui/src/util/request';

export default {
    getKpiDetails(form) {
        return request.post(`/dop-kpi/kpi/dashboard/getKpiDetails`,form);
    },
    queryKpiInfoMation(form) {
        return request.post(`/dop-kpi/kpi/kpi/queryKpiInfoMation`,form);
    },
    getKpiFields(form) {
        return request.get(`/dop-kpi/kpi/kpi/getKpiFields`,form);
    },
    getKpiDetail(form) {
        return request.post(`/dop-kpi/kpi/kpi/getKpiDetail`,form);
    },

};
