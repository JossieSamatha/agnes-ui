import request from '@hex/gf-ui/src/util/request';

export default {
    saveRate(form) {
        return request.post(`/agnes-app/v1/acnt/rate/info/save`,form);
    },

    deleteRate(rateId) {
        return request.post("/agnes-app/v1/acnt/rate/info/delete", null,{params: {rateId}});
    },
    getBranchList(form) {
        return request.post(`/agnes-app/v1/dop/bank/get/list`,form);
    },
    check(form) {
        return request.post(`/agnes-app/v1/acnt/rate/info/check`,form);
    },
    start(form) {
        return request.post("/agnes-app/v1/acnt/rate/info/start", form);
    },

    stop(form) {
        return request.post("/agnes-app/v1/acnt/rate/info/stop", form);
    },
};
