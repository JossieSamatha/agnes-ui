import request from '@hex/gf-ui/src/util/request';


export default {
    getEventDefList() {
        return request.get(`/agnes-ec/v1/config/event/def/list`);
    },
    getEventMsg(eventId) {
        return request.get("/agnes-ec/v1/config/event/msg", {params: {eventId}});
    },
    saveEventDef(form) {
        return request.post("/agnes-ec/v1/config/event/save", form);
    },
    deleteEventDef(eventId) {
        return request.post("/agnes-ec/v1/config/event/delete", null, {params: {eventId}});
    },

    msgSelectList(params) {
        return request({
            url: '/agnes-ec/v1/config/msg/list',
            method: 'get',
            params
        })
    },

};
