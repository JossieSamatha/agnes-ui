import request from '@hex/gf-ui/src/util/request';

export default {
    saveTask(form) {
        return request.post("/agnes-ac/v1/ac/kpi/task/case/save", form);
    },
    checkBeforePulish(form) {
        return request.post("/agnes-ac/v1/ac/kpi/task/case//check/before/pulish", form);
    },
    checkTask(form) {
        return request.post("/agnes-ac/v1/ac/kpi/task/case/check-task", form);
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
    getServiceResponse() {
        return request.post("/agnes-app/v1/tc/service/list");
    },
    listOptions(){
        return request.get("/agnes-ac/v1/config/exe/task/options/list");
    }
};