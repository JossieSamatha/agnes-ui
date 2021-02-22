import request from '@hex/gf-ui/src/util/request';

export default {
    confirmKpiTask(form) {
        return request.post("/agnes-app/v1/task/todo/confirm", form);
    },
    saveRollBackTaskParams(form) {
        return request.post("/agnes-ac/v1/ac/case/def/save-params", form);
    },
    selectRollBackTaskParams(form) {
        return request.post("/agnes-ac/v1/ac/case/def/select-roll-back-params", form);
    },
    queryKpiTask(form) {
        return request.get("/agnes-app/v1/task/todo/list", form);
    },
};
