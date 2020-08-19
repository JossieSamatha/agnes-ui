import request from '@hex/gf-ui/src/util/request';


export default {
    saveUserGroup(form) {
        return request.post("/agnes-app/v1/dop/user/group/save", form);
    },
    deleteUserGroup(form) {
        return request.post("/agnes-app/v1/dop/user/group/delete", form);
    },
    deleteUser(form) {
        return request.post("/agnes-app/v1/dop/user/group/delete-user", form);
    },
    getAllUserGroup() {
        return request.get("/agnes-app/v1/dop/user/group/list/all");
    },
    getUserInfos(form) {
        return request.post("/agnes-app/v1/dop/user/group/get/user-info",form);
    }

};
