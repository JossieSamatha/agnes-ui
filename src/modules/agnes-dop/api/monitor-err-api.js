import request from '@hex/gf-ui/src/util/request';

export default {
    dealErr(form) {
        return request.post("/agnes-app/v1/dop/err/deal", form);
    },
    deleteErr(pkId) {
        return request.post("/agnes-app/v1/dop/err/delete", null, {params: {pkId}});
    },
    checkErr(status,form) {
        let req = {
            errInfoVo:form,
            status:status
        }
        return request.post("/agnes-app/v1/dop/err/check", req);
    },
    transferRisk(form) {
        return request.post("/agnes-app/v1/dop/err/transfer", form);
    },
};
