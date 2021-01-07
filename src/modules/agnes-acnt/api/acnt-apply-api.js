import request from '@hex/gf-ui/src/util/request';


export default {
    getProductCodeList() {
        return request.get(`agnes-app/v1/prdt/info/list/all`);
    },
    getAcntTypeList() {
        return request.get(`agnes-app/v1/acnt/type/list`);
    },
    getLinkMan(extOrgId){
        return request.post(`agnes-app/v1/dop/linkman/org/all/list`,{'extOrgId':extOrgId});
    },
    queryAllLinkManList() {
        return request.get(`/agnes-app/v1/dop/linkman/all`);
    },
    saveApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/save`,form);
    },
    cancelApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/cancel/acnt-apply`,form);
    },

    submitOa(applyIds,applySubIds) {
        return request.post(`agnes-app/v1/acnt/apply/submitOa`,{'applyIds':applyIds,'applySubIds':applySubIds});
    },

    saveSubApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/sub/save`,form);
    },
    cancelSubApply(form) {
        return request.post(`agnes-app/v1/acnt/apply/sub/cancel/acnt-sub-apply`,form);
    },
    getConfig(typeCode) {
        return request.post(`agnes-app/v1/acnt/type/factor/show/config`,null,{params:{typeCode}});
    },
    getAcntRuApplyAccNoRefListByApplyId(form) {
        return request.post(`agnes-app/v1/acnt/apply/list/apply-acc-no/by-apply-id`,form);
    },
    checkAcntName(form) {
        return request.post(`agnes-app/v1/acnt/apply/check-acnt/by-name`,form);
    },
    // getAcntRuAccNoRefListByAcntId(form) {
    //     return request.post(`agnes-app/v1/acnt/apply/list/acc-no/by-acnt-id`,form);
    // },

    getApplyLinkmanRefIdsByApplyId(applyId) {
        return request.get(`agnes-app/v1/acnt/apply/linkman/ref/ids/applyid`, {params: {applyId}});
    },
    getApplyProvisionBankAcntIdsByApplyId(applyId) {
        return request.get(`agnes-app/v1/acnt/apply/provision-bank-acnt/ref/ids/applyid`, {params: {applyId}});
    },
    getCountUnfinishedAndCanDo() {
        return request.get(`agnes-app/v1/acnt/apply/getCountUnfinishedAndCanDo`);
    }
};
