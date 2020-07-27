import request from '@hex/gf-ui/src/util/request';


export default {
    getAcntInfoList() {
        return request.get(`/agnes-app/v1/acnt/info/list`);
    }

};
