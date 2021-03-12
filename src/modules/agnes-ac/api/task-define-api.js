import request from '@hex/gf-ui/src/util/request';

export default {
    getTaskList(form) {
        return request.post(`/agnes-ac/v1/config/task/list`, form);
    },
    saveTask(form) {
        return request.post("/agnes-ac/v1/config/task/save", form);
    },
    queryTaskBizTypebyTag(form) {
        return request.post("/agnes-ac/v1/config/task/query-task-biz-type/by-group", form);
    },
    stopAndCancelTask(form) {
        return request.post("/agnes-ac/v1/config/task/stop-cancel/task", form);
    },
    deleteTask(taskId) {
        return request.post("/agnes-ac/v1/config/task/delete", null, {params: {taskId}});
    },
    queryTaskByCaseId(caseKey) {
        return request.get("/agnes-ac/v1/config/task/field/list",{params: {caseKey}});
    }
};
