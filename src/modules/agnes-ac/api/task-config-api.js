import request from '@hex/gf-ui/src/util/request';


export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/config/task/save", form);
    },
    listTask(form){
        return request.post("/agnes-ac/v1/config/task/list", form);
    },
    removeTask(id){
        return request.post("/agnes-ac/v1/config/task/remove", id);
    }
};
