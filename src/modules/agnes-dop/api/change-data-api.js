import request from '@hex/gf-ui/src/util/request';


export default {
    queryChangeData(bizDate) {
        return request.post(`/agnes-app/v1/dop/dayend/bizdate`, {bizDate});
    },
    changeDayendByJob(form) {
        return request.post(`/agnes-app/v1/dop/dayend/change-by-job`, form);
    },
    getChangeData() {
        return request.get(`/agnes-app/v1/dop/dayend/get`);
    },
    judgeTask() {
        return request.get(`/agnes-ac/v1/config/task/judge/task`);
    },
    stopTask() {
        return request.post(`/agnes-ac/v1/config/task/dayend/delete/all-task/job`);
    },
}
