import request from '@hex/gf-ui/src/util/request';


export default {
    saveUserGroup(form) {
        return request.post("/agnes-app/v1/dop/user/group/save", form);
    },
    saveUserGroupRef(form) {
        return request.post("/agnes-app/v1/dop/user/group/save/ref", form);
    },
    saveAuthData(form) {
        return request.post("/agnes-app/v1/dop/user/group/save/auth/data", form);
    },
    updateSequenceNum(form) {
        return request.post("/agnes-app/v1/dop/user/group/update-seq-num", form);
    },
    deleteUserGroup(form) {
        return request.post("/agnes-app/v1/dop/user/group/delete", form);
    },
    deleteUserGroupRef(form) {
        return request.post("/agnes-app/v1/dop/user/group/delete/ref", form);
    },
    deleteUser(form) {
        return request.post("/agnes-app/v1/dop/user/group/delete-user", form);
    },
    getAllUserGroupForAcnt() {
        return request.get("/agnes-app/v1/dop/user/group/list/for-acnt");
    },
    getAllGfUserGroup() {
        return request.get("/agnes-app/v1/dop/user/group/list/alls");
    },
    getAuthDataList(form) {
        return request.post("/agnes-app/v1/dop/user/group/auth/data/list", form);
    },
    getUserInfos(userGroupId) {
        return request.post("/agnes-app/v1/dop/user/group/get/user-info?userGroupId="+userGroupId);
    }

};
