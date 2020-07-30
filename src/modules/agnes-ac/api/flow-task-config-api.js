import request from '@hex/gf-ui/src/util/request';

export default {
    saveFlowTask(form) {
        return request.post("/agnes-ac/v1/ac/flow/task/case/save", form);
    },
    getServiceResponse() {
        return request.post("/agnes-app/v1/tc/service/list");
    }


};