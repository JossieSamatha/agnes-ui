import request from '@hex/gf-ui/src/util/request';


export default {
    submitTask(id) {
        return request.post("/dop-bpmn/execution/complete", null, {params: {id}});
    },

    queryBpmnAll() {
        return request.post("/dop-bpmn/processDefinition/listAll");
    },

    commitTask(taskId) {
        return request.post("/agnes-ac/v1/ac/bpmn/process/comTask", null, {params: {taskId}});
    }

};
