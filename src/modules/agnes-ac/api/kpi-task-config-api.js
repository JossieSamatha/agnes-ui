import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/ac/kpi/task/case/save", form);
    },
    listTask() {
        return request.get("/agnes-ac/v1/ac/kpi/task/case/list");
    },
    deleteTask(pkId) {
        return request.post("/agnes-ac/v1/config/exe/task/delete", null, {params: {pkId}});
    },
    getAllKpiList() {
        return request.get(`/dop-kpi/kpi/kpi/getList`);
    },
    getUserInfoList() {
        return request.get(`/agnes-ac/v1/ac/kpi/task/case/user/list`);
    },
    listOptions(){
        return request.get("/agnes-ac/v1/config/exe/task/options/list");
    }
};