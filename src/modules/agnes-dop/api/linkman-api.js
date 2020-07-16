import request from '@hex/gf-ui/src/util/request';


export default {
    queryLinkManList(extOrgId,linkmanGroupId) {
        return request.get(`/agnes-dop/v1/dop/linkman/org/list`,{params: {extOrgId,linkmanGroupId}});
    },
    queryAllLinkManList() {
        return request.get(`/agnes-dop/v1/dop/linkman/all`);
    },
    saveLinkMan(form) {
        return request.post("/agnes-dop/v1/dop/linkman/save", form);
    },
    deleteLinkMan(form) {
        return request.post("/agnes-dop/v1/dop/linkman/delete", form);
    },
    checkLinkMan(form) {
        return request.post("/agnes-dop/v1/dop/linkman/check", form);
    },
    checkGroup(form) {
        return request.post("/agnes-dop/v1/dop/linkman/check/group", form);
    },
    queryLinkManGroup() {
        return request.get("/agnes-dop/v1/dop/linkman/group", );
    },
    saveLinkManGroup(form) {
        return request.post("/agnes-dop/v1/dop/linkman/save/group", form);
    },
    deleteLinkManGroup(form) {
        return request.post("/agnes-dop/v1/dop/linkman/delete/group", form);
    },
    queryLinkManListOfGroup(form) {
        return request.post("/agnes-dop/v1/dop/linkman/group/list", form);
    },

};
