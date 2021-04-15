import request from '@hex/gf-ui/src/util/request';

export default {
    saveIcrTask(form) {
        return request.post(`/agnes-ac/v1/ac/icr/task/save`, form);
    },
    deleteIcrTask(taskExecId) {
        return request.post("/agnes-ac/v1/ac/icr/task/delete", null, {params: {taskExecId}});
    },
    getTaskFileItemsByIcrId(icrId) {
        return request.post("/agnes-ac/v1/ac/icr/task/get-items/by-icr-id", null, {params: {icrId}});
    },
    getTaskFilesByTaskId(taskId) {
        return request.post("/agnes-ac/v1/ac/icr/task/get-files/by-task-id", null, {params: {taskId}});
    },
    selectIcrFileInfo(stepCode, taskExecId) {
        return request.post("/agnes-ac/v1/ac/icr/task/info", null, {params: {stepCode, taskExecId}});
    },
    updateIcrFileItems(form) {
        return request.post("/agnes-ac/v1/ac/icr/task/update/file-items", form);
    },
};
