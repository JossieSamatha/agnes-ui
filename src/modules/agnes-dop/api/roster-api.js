import request from '@hex/gf-ui/src/util/request';


export default {
    getUserList(form) {
        return request.post("/gf-admin/gf/user/queryUserList", {form});
    },

    saveRoster(form) {
        return request.post("/agnes-app/v1/dop/roster/save", form);
    },
    deleteRoster(rosterId) {
        return request.post("/agnes-app/v1/dop/roster/delete", null, {params: {rosterId}});
    },
};
