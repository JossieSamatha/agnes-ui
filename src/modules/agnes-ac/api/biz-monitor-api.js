import request from '@hex/gf-ui/src/util/request';

export default {
    getTreeData(type) {
        return request.post("/agnes-app/v1/prdt/info/get/tree-data", null, {params: {type}});
    },
    getPrdtMonitorData(form) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/get/prdt-monitor/info", form);
    },
    getBizEventFlowList() {
        return request.post("/agnes-ac/v1/ac/monitoring/station/get/biz-event/flow-task");
    },
    getBizEventFlowListByPrdtCode(form) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/get/event-monitor/info", form);
    },
    getRisksSurvey() {
        return request.post("/agnes-app/v1/dop/risk/get/survey");
    },
    queryProcessTasks(form) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/biz-task-list", form);
    },
    queryTsakStep(caseId, bizDate) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/step-list", null, {params: {caseId, bizDate}});
    },

};
