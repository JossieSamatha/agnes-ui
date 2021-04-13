import request from '@hex/gf-ui/src/util/request';


export default {
    getTaskByType(bizDate) {
        return request.post("/agnes-ac/v1/config/task/list/type", null, {params: {bizDate}});
    },
    getIcrTask(bizDate) {
        return request.post("/agnes-ac/v1/ac/exec/process/list/icr", null, {params: {bizDate}});
    },

    // 根据业务日期查询当日的运行中的任务列表
    queryExecRuTask(params) {
        return request.post("/agnes-ac/v1/ac/exec/process/list", params);
    },


    // 获得当前任务的流程信息详情（智能审单）
    getIcrProcessBrief(params) {
        return request.post("/agnes-ac/v1/ac/icr/process/brief", params);
    },

    // 获得当前任务的流程信息(领导驾驶仓)
    getExecProcessDetail(params) {
        return request.post("/agnes-ac/v1/ac/exec/process/detail", params);
    },

    getMsgNameAndType(params) {
        return request.post("/agnes-remind/v1/remind/msg/query/msg/name", params);
    },

};
