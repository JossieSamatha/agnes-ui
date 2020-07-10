import request from '@hex/gf-ui/src/util/request';

export default {
    queryMsgList() {
        return request.get(`/agnes-ec/v1/config/msg/list`);
    },
    saveMsg(form) {
        return request.post("/agnes-ec/v1/config/msg/save", form);
    },
    deleteMsg(msgId) {
        return request.post("/agnes-ec/v1/config/msg/delete", null, {params: {msgId}});
    }

};
