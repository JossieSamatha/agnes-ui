import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/config/exe/task/save", form);
    },
    listTask(form) {
        return request.get("/agnes-ac/v1/config/exe/task/list", form);
    },
    deleteTask(pkId) {
        return request.post("/agnes-ac/v1/config/exe/task/delete", null, {params: {pkId}});
    },
    listOptions(){
        return request.get("/agnes-ac/v1/config/exe/task/options/list");
    }
};