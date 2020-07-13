import request from '@hex/gf-ui/src/util/request';

export default {
    getTaskList(form) {
        return request.post(`/agnes-ac/v1/config/task/list`, form);
    },
    saveTask(form) {
        return request.post("/agnes-ac/v1/config/task/save", form);
    },
    deleteTask(taskId) {
        return request.post("/agnes-ac/v1/config/task/delete", null, {params: {taskId}});
    }
};
