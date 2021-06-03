import request from '@hex/gf-ui/src/util/request';

export default {

    selectPrdtInfo(bizDate) {
        return request.post("/agnes-app/v1/prdt/calendar/list", null, {params: {bizDate}});
    },
    selectRuTaskByBizDate(bizDate) {
        return request.post("/agnes-ac/v1/config/task/ru/list", null, {params: {bizDate}});
    },

    selectTaskDetail(taskCaseId) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/task/detail", null, {params: {taskCaseId}});
    },
    addTempTask(form) {
        return request.post("/agnes-ac/v1/config/task/save/temp-task", form);
    },
    commitBatch(params) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/commitStage", params);
    },
    checkStepStatus(caseId, stagePkId) {
        return request.post("/agnes-ac/v1/ac/monitoring/station/check-step", null, {params: {caseId, stagePkId}});
    }
};
