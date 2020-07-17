import request from '@hex/gf-ui/src/util/request';


export default {
    getOrgTreeNodes(){
        return request.post(`/agnes-dop/v1/dop/org/list`);
    },
    saveOrg(form){
        return request.post(`/agnes-dop/v1/dop/org/save`,{dopEeExternalOrg:form});
    },
    deleteOrg(extOrgIds) {
        return request.post("/agnes-dop/v1/dop/org/delete", {ids:extOrgIds});
    },
    checkOrg(form){
        return request.post(`/agnes-dop/v1/dop/org/check`,{dopEeExternalOrg:form});
    },
    getOrgList(form){
        return request.post(`/agnes-dop/v1/dop/org/all`,{dopEeExternalOrg:form});
    },
};
