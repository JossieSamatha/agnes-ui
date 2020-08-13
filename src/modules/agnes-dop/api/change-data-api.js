import request from '@hex/gf-ui/src/util/request';


export default {
    queryChangeData(bizDate) {
        return request.post(`/agnes-app/v1/dop/dayend/bizdate`, {bizDate});
    },
    getChangeData() {
        return request.get(`/agnes-app/v1/dop/dayend/get`);
    },
    judgeTask() {
        return request.get(`/agnes-ac/v1/config/task/judge/task`);
    },
};
