import request from '@hex/gf-ui/src/util/request';

export default {
    queryRateList() {
        return request.get(`/agnes-app/v1/acnt/ref/rate/list`);
    },
    save(form) {
        return request.post(`/agnes-app/v1/acnt/ref/rate/save`,form);
    },
    changeStatus(form) {
        return request.post(`/agnes-app/v1/acnt/rate/ref/change-status`,form);
    },
    deleteRate(pkId) {
        return request.post("/agnes-app/v1/acnt/rate/ref/delete", {pkId:pkId});
    },

};
