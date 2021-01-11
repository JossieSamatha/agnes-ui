import request from '@hex/gf-ui/src/util/request';


export default {

    getApplyMaterialList(applyId,doQuerySub) {
        return request.get(`agnes-app/v1/acnt/material/list/applyid`, {params: {applyId,doQuerySub}});
    },

    getApplySubMaterialList(applySubId) {
        return request.get(`agnes-app/v1/acnt/material/list/applysubid`, {params: {applySubId}});
    },

    getApplyMaterialListByType(applyId,type) {
        return request.get(`agnes-app/v1/acnt/material/apply/list-by-type`, {params: {applyId,type}});
    },

    getApplySubMaterialListByType(applySubId,type) {
        return request.get(`agnes-app/v1/acnt/material/applysub/list-by-type`, {params: {applySubId, type}});
    }

};
