import request from '@hex/gf-ui/src/util/request';


export default {
    getAcntInfoList() {
        return request.get(`/agnes-app/v1/acnt/info/list`);
    },

    getAcntInfoListPage(form) {
        return request.post("/agnes-app/v1/acnt/info/list/page", form);
    },

    getAcntInfoByAcntId(acntId) {
        return request.post("/agnes-app/v1/acnt/info/id", null, {params: {acntId}});
    }
};
