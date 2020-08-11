import request from '@hex/gf-ui/src/util/request';

export default {
    saveChannel(form) {
        return request.post("/agnes-app/v1/dop/channel/save", form);
    },
    deleteChannel(channelId) {
        return request.post("/agnes-app/v1/dop/channel/delete", null, {params: {channelId}});
    },
    updateChannel(channelId,channelStatus) {
        return request.post("/agnes-app/v1/dop/channel/update/status", null, {params: {channelId,channelStatus}});
    }
};
