import request from '@hex/gf-ui/src/util/request';


export default {
    getProductCodeList() {
        return request.get(`agnes-app/v1/prdt/info/list/all`);
    },
    getLinkMan(extOrgId){
        return request.post(`agnes-app/v1/dop/linkman/org/all/list`,{},{'extOrgId':extOrgId});
    },
    saveApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/save`,form);
    },
    cancelApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/cancel/acnt-apply`,form);
    },
    saveSubApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/sub/save`,form);
    },
    cancelSubApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/sub/cancel/acnt-sub-apply`,form);
    }
};
