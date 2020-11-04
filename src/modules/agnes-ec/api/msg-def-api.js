import request from '@hex/gf-ui/src/util/request';

export default {
    queryMsgList() {
        return request.get(`/agnes-ac/v1/ec/msg/list`);
    },
    saveMsg(form) {
        return request.post("/agnes-ac/v1/ec/msg/save", form);
    },
    deleteMsg(msgId) {
        return request.post("/agnes-ac/v1/ec/msg/delete", null, {params: {msgId}});
    },
    existsMsgCode(msgCode,msgId) {
        return request.post("/agnes-ac/v1/ec/msg/existsMsgCode", null, {params: {msgCode,msgId}});
    },
    approveMsg(msgId,msgStatus) {
        return request.post("/agnes-ac/v1/ec/msg/approve", null, {params: {msgId,msgStatus}});
    },
    publishMsg(msgId) {
        return request.post("/agnes-ac/v1/ec/msg/publish", null, {params: {msgId}});
    },
    stopMsg(msgId) {
        return request.post("/agnes-ac/v1/ec/msg/stop", null, {params: {msgId}});
    },
    check(form) {
        return request.post("/agnes-ac/v1/ec/msg/check", form);
    },

};
