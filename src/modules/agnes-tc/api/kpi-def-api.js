import request from '@hex/gf-ui/src/util/request';

export default {
    getKpiDetails(form) {
        return request.post(`/dop-kpi/kpi/dashboard/getKpiDetails`,form);
    },
    getMonitorKpiDetails(form) {
        return request.post(`/dop-kpi/kpi/dashboard/getMonitorKpiDetails`,form);
    },
    queryKpiInfoMation(form) {
        return request.post(`/dop-kpi/kpi/kpi/queryKpiInfoMation`,form);
    },
    getKpiFields(kpiCode) {
        return request.get(`/dop-kpi/kpi/kpi/getKpiFields`,{params: {kpiCode}});
    },
    getKpiDetail(form) {
        return request.post(`/dop-kpi/kpi/kpi/getKpiDetail`,form);
    },
    updateManul(form) {
        return request.post(`/dop-kpi/kpi/dashboard/updateManul`,form);
    },

    execTask(form){
        return request.post(`/agnes-ac/v1/ac/service/task/exec`,form);
    }

};
