import request from '@hex/gf-ui/src/util/request';


export default {

    getFnAndModelfields() {
        return request.get("/agnes-ac/v1/config/fun/query/list/fun/and/modelfields");
    },


    eventForRuleTable() {
        return request.get("/agnes-ac/v1/ec/event/def/list/for/ruletable");
    },


    getRemindList() {
        return request.get("/agnes-remind/v1/remind/msg/query?pageIndex=0&pageSize=50")
    },


    getTaskTodoList() {
        return request.get("agnes-app/v1/task/todo/list?pageIndex=0&pageSize=50")
    },

    // 排班管理列表
    getRosterList(){
        return request.get("/agnes-app/v1/dop/roster/list?pageIndex=0&pageSize=50")
    },

    // 异常管理列表
    getErrList(){
        return request.post("/agnes-app/v1/dop/err/query?pageIndex=0&pageSize=50")
    },

    // 风险管理列表
    getRiskList(){
        return request.post("/agnes-app/v1/dop/risk/query?pageIndex=0&pageSize=50")
    },

    //消息盒子数据
    getMsgBoxList(){
        return request.post("/agnes-remind/v1/remind/msg/query/msg/box")
    },
    //消息盒子未读数据
    getUnreadCount(){
        return request.post("/agnes-remind/v1/remind/msg/query/unread/count")
    }

};
