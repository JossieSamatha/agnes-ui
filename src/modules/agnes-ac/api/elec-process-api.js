import request from '@hex/gf-ui/src/util/request';


export default {
    getTaskByType(params) {
        return request.post("/agnes-ac/v1/config/task/list/type", params);
    },

    // 根据业务日期查询当日的运行中的任务列表
    queryExecRuTask(params){
        return request.post("/agnes-ac/v1/ac/exec/process/list", params);
    },


    // 获得当前任务的流程信息详情（电子流程）
    getExecProcessBrief(params) {
        return request.post("/agnes-ac/v1/ac/exec/process/brief", params);
    },

    // 获得当前任务的流程信息(领导驾驶仓)
    getExecProcessDetail(params) {
        return request.post("/agnes-ac/v1/ac/exec/process/detail", params);
    },

    getMsgNameAndType(params) {
        return request.post("/agnes-remind/v1/remind/msg/query/msg/name", params);
    },

};
