import request from '@hex/gf-ui/src/util/request';


export default {
    getRuleDefList() {
        return request.get(`/agnes-ac/v1/config/rule/def/list`);
    },
    getRuleDetailList(ruleId) {
        return request.get("/agnes-ac/v1/config/rule/detail/list", {params: {ruleId}});
    },
    getRuleDef(ruleId) {
        return request.get("/agnes-ac/v1/config/rule/def/id", {params: {ruleId}});
    }
};
