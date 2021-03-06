import request from '@hex/gf-ui/src/util/request';


export default {
    queryLinkManList(extOrgId,linkmanGroupId) {
        return request.get(`/agnes-app/v1/dop/linkman/org/list`, {params: {extOrgId, linkmanGroupId}});
    },
    queryAllLinkManList() {
        return request.get(`/agnes-app/v1/dop/linkman/all`);
    },
    saveLinkMan(form) {
        return request.post("/agnes-app/v1/dop/linkman/save", form);
    },
    deleteLinkMan(form) {
        return request.post("/agnes-app/v1/dop/linkman/delete", form);
    },
    queryLinkManGroup() {
        return request.get("/agnes-app/v1/dop/linkman/group",);
    },
    saveLinkManGroup(form) {
        return request.post("/agnes-app/v1/dop/linkman/save/group", form);
    },
    deleteLinkManGroup(form) {
        return request.post("/agnes-app/v1/dop/linkman/delete/group", form);
    },
    queryLinkManListOfGroup(form) {
        return request.post("/agnes-app/v1/dop/linkman/group/list", form);
    },
    updateLinkmanStatus(linkmanId, status) {
        return request.post("/agnes-app/v1/dop/linkman/update/status", null, {params: {linkmanId, status}});
    }

};
