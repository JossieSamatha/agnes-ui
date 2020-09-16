import request from '@hex/gf-ui/src/util/request';


export default {
    getUserList(rosterId) {
        return request.get("/agnes-app/v1/dop/roster/user", {params: {rosterId}});
    },

    saveRoster(form) {
        return request.post("/agnes-app/v1/dop/roster/save", form);
    },
    deleteRoster(rosterId) {
        return request.post("/agnes-app/v1/dop/roster/delete", null, {params: {rosterId}});
    },
    updateRosterStatus(rosterId, status) {
        return request.post("/agnes-app/v1/dop/roster/update/status", null, {params: {rosterId, status}});
    }
};
