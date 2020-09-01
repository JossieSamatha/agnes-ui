import request from '@hex/gf-ui/src/util/request';


export default {
    getTaskByType(params) {
        return request.post("/agnes-ac/v1/config/task/list/type", params);
    },

    getExecProcessDetail(params) {
        return request.post("/agnes-ac/v1/ac/exec/process/detail", params);
    },

    getMsgNameAndType(params) {
        return request.post("/agnes-remind/v1/remind/msg/query/msg/name", params);
    },
};
