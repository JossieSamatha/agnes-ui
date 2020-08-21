import request from '@hex/gf-ui/src/util/request';


export default {
    //任务调度api
    queryStepByTaskId(form) {
        return request.post(`/data-pipe/hexETL/task/queryStepByTaskId`, form);
    },
    addTask(form) {
        return request.post("/data-pipe/hexETL/task/addTask", form);
    },
    updateTaskStatus(form) {
        return request.post(`/data-pipe/hexETL/task/updateTaskStatus`, form);
    },
    deleteTask(form) {
        return request.post(`/data-pipe/hexETL/task/deleteTask`, form);
    },
    updateTask(form) {
        return request.post(`/data-pipe/hexETL/task/updateTask`, form);
    },
    //变量定义api
    queryAll() {
        return request.post(`/data-pipe/hexETL/var/queryAll`);
    },
    //规则查询
    queryDbList(form) {
        return request.post(`/data-pipe/hexETL/extract/queryAll`, form);
    },
};
