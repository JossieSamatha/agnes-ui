import request from '@hex/gf-ui/src/util/request';


export default {
    getOrgTypeList(){
        return request.post(`/agnes-app/v1/dop/org/type/list`);
    },
    saveOrgType(form){
        return request.post(`/agnes-app/v1/dop/org/type/save`,{dopReOrgType:form});
    },
    deleteOrgType(orgTypeIds) {
        return request.post("/agnes-app/v1/dop/org/type/delete", {typeIds:orgTypeIds});
    },
    checkOrgType(form){
        return request.post(`/agnes-app/v1/dop/org/type/check`,{dopReOrgType:form});
    },
};
