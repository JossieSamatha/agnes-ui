import request from '@hex/gf-ui/src/util/request';

export default {
    saveFlowTask(form) {
        return request.post("/agnes-ac/v1/ac/flow/task/case/save", form);
    },
    getServiceResponse() {
        return request.post("/agnes-ac/v1/ac/service/list");
    } ,
    queryAllRPAList() {
        return request.post("/agnes-ac/v1/rpa/query/List");
    },
    startRobot() {
        return request.post("/agnes-ac/v1/rpa/start/robot");
    }


};