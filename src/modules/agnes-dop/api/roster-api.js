import request from '@hex/gf-ui/src/util/request';


export default {
    queryRoster(form) {
        return request.get("/agnes-app/v1/dop/roster/list", form);
    },
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
    },

    //新排班表接口
    selectReRosterList(rosterStatus) {
        return request.get("/agnes-app/v2/dop/roster/def/list", null, {params: {rosterStatus}});
    },
    saveDef(form) {
        return request.get("/agnes-app/v2/dop/roster/def/save", null, form);
    },
    approve(pkId) {
        return request.get("/agnes-app/v2/dop/roster/def/approve", null, {params: {pkId}});
    },
    deleteRef(pkId) {
        return request.get("/agnes-app/v2/dop/roster/def/delete", null, {params: {pkId}});
    },
};
