import request from '@hex/gf-ui/src/util/request';

export default {
    checkTask(form) {
        return request.post("/agnes-app/v1/task/manage/check", form);
    },
    cancelTask(form) {
        return request.post("/agnes-app/v1/task/manage/cancel", form);
    },
};
