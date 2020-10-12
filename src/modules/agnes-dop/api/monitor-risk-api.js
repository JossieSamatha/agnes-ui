import request from '@hex/gf-ui/src/util/request';

export default {
    queryRisk(form) {
        return request.post("/agnes-app/v1/dop/risk/query", form);
    },
    dealRisk(form) {
        return request.post("/agnes-app/v1/dop/risk/deal", form);
    },
    deleteRisk(pkId) {
        return request.post("/agnes-app/v1/dop/risk/delete", null, {params: {pkId}});
    },
    checkRisk(status,form) {
        let req = {
            riskInfoVo:form,
            status:status
        }
        return request.post("/agnes-app/v1/dop/risk/check", req);
    }
};
