import request from '@hex/gf-ui/src/util/request';


export default {
    getEventDefList() {
        return request.get(`/agnes-ac/v1/ec/event/def/list`);
    },
    getEventMsg(eventId) {
        return request.get("/agnes-ac/v1/ec/event/msg", {params: {eventId}});
    },
    saveEventDef(form) {
        return request.post("/agnes-ac/v1/ec/event/save", form);
    },
    existsEventCode(eventCode,eventId) {
        return request.post("/agnes-ac/v1/ec/event/existsEventCode", null, {params: {eventCode,eventId}});
    },
    deleteEventDef(eventId) {
        return request.post("/agnes-ac/v1/ec/event/delete", null, {params: {eventId}});
    },

    approveEventDef(eventId,eventStatus) {
        return request.post("/agnes-ac/v1/ec/event/approve", null, {params: {eventId,eventStatus}});
    },

    publishEventDef(eventId) {
        return request.post("/agnes-ac/v1/ec/event/publish", null, {params: {eventId}});
    },
    stopEventDef(eventId) {
        return request.post("/agnes-ac/v1/ec/event/stop", null, {params: {eventId}});
    },
    msgSelectList(params) {
        return request({
            url: '/agnes-ac/v1/ec/msg/list',
            method: 'get',
            params
        })
    },

};
