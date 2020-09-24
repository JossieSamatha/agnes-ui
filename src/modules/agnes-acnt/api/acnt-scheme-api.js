import request from '@hex/gf-ui/src/util/request';

export default {
    saveRateScheme(form) {
        return request.post(`/agnes-app/v1/acnt/rate/ref/save`,form);
    },

    deleteRateScheme(pkId) {
        return request.post("/agnes-app/v1/acnt/rate/ref/delete", null,{params: {pkId}});
    },

    checkRateScheme(form) {
        return request.post(`/agnes-app/v1/acnt/rate/ref/check`,form);
    },
    startRateScheme(form) {
        return request.post("/agnes-app/v1/acnt/rate/ref/start", form);
    },
};
