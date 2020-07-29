import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/ac/mot/task/case/save", form);
    },
    listTask() {
        return request.get("/agnes-ac/v1/ac/mot/task/case/list");
    },
    // deleteTask(pkId) {
    //     return request.post("/agnes-ac/v1/config/exe/task/delete", null, {params: {pkId}});
    // },
    // listOptions(){
    //     return request.get("/agnes-ac/v1/config/exe/task/options/list");
    // }
};