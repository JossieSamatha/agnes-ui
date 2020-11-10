import request from '@hex/gf-ui/src/util/request';

export default {
    checkTask(form) {
        return request.post("/agnes-ac/v1/ac/task/manage/check", form);
    },
    cancelTask(form) {
        return request.post("/agnes-ac/v1/ac/task/manage/cancel", form);
    },
};
