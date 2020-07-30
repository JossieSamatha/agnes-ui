import request from '@hex/gf-ui/src/util/request';

export default {
    getKpiDetails(form) {
        return request.post(`/dop-kpi/kpi/dashboard/getKpiDetails`,form);
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

    execTask(caseId,stepCode){
        return request.get(`/agnes-ac/v1/ac/service/task/exec`,{params:{caseId,stepCode}});
    }

};
