import request from '@hex/gf-ui/src/util/request';

export default {
    confirmKpiTask(form) {
        return request.post("/agnes-app/v1/task/todo/confirm", form);
    },
    queryKpiTask(form) {
        return request.get("/agnes-app/v1/task/todo/list", form);
    },
};
