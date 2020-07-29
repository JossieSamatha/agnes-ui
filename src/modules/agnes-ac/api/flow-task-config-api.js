import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/ac/flow/task/case/save", form);
    },
    listTask() {
        return request.get("/agnes-ac/v1/ac/flow/task/case/list");
    }
};