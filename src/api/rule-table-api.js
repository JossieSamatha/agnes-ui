import request from '@hex/gf-ui/src/util/request';


export default {
    getFnAndModelfields() {
        return request.get("/agnes-ac/v1/config/fun/query/list/fun/and/modelfields");
    },

    eventForRuleTable() {
        return request.get("/agnes-ac/v1/ec/event/def/list/for/ruletable");
    },

    getRemindList() {
        return request.post("/agnes-remind/v1/remind/msg/query?pageIndex=0&pageSize=50")
    },

    getTaskTodoList() {
        return request.get("agnes-app/v1/task/todo/list?pageIndex=0&pageSize=50")
    }
};
