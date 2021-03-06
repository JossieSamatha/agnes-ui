import request from '@hex/gf-ui/src/util/request';


export default {
    getOrgTreeNodes() {
        return request.post(`/agnes-app/v1/dop/org/list`);
    },
    getApproveOrgTreeNodes() {
        return request.post(`/agnes-app/v1/dop/org/approve/list`);
    },
    saveOrg(form) {
        return request.post(`/agnes-app/v1/dop/org/save`, {dopEeExternalOrg: form});
    },
    deleteOrg(extOrgIds) {
        return request.post("/agnes-app/v1/dop/org/delete", {ids: extOrgIds});
    },
    checkOrg(form) {
        return request.post(`/agnes-app/v1/dop/org/check`, {dopEeExternalOrg: form});
    },
    getOrgList() {
        return request.post(`/agnes-app/v1/dop/org/approve/all`);
    },
    updateExOrgeStatus(extOrgId, status) {
        return request.post(`/agnes-app/v1/dop/org/update/status`, null, {params: {extOrgId, status}});
    }
};
