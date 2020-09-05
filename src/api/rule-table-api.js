import request from '@hex/gf-ui/src/util/request';


export default {
    getFnAndModelfields() {
        return request.get("/agnes-ac/v1/config/fun/query/list/fun/and/modelfields");
    },

    eventForRuleTable() {
        return request.get("/agnes-ac/v1/ec/event/def/list/for/ruletable");
    },


};
