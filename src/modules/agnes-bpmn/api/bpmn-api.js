import request from '@hex/gf-ui/src/util/request';


export default {
    submitTask(id) {
        return request.post("/dop-bpmn/execution/complete", null,{params: {id}});
    },

    queryBpmnAll() {
        return request.post("/dop-bpmn/processDefinition/listAll");
    },

};
