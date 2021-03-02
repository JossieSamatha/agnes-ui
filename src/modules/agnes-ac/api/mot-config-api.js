import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/ac/mot/task/case/save", form);
    },
    checkAndSaveReCaseParams(form) {
        return request.post("/agnes-ac/v1/ac/mot/task/case/check-save-re-params", form);
    },
    queryReCaseParams(form) {
        return request.post("/agnes-ac/v1/ac/mot/task/case/query-re-params", form);
    },
    listTask() {
        return request.get("/agnes-ac/v1/ac/mot/task/case/list");
    },
};