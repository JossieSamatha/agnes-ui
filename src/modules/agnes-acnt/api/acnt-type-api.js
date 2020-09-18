import request from '@hex/gf-ui/src/util/request';


export default {
    getAcntTypeList() {
        return request.get(`/agnes-app/v1/acnt/type/list`);
    },
    getAcntTypeFactorList(typeCode) {
        return request.post("/agnes-app/v1/acnt/type/factor/list", null, {params: {typeCode}});
    },
    getAcntTypeFactorShowConfig(typeCode) {
        return request.post("/agnes-app/v1/acnt/type/factor/show/config", null, {params: {typeCode}});
    },
    existsAcntTypeCode(typeCode,typeId) {
        return request.post("/agnes-app/v1/acnt/type/existsTypeCode", null, {params: {typeCode,typeId}});
    },
    deleteAcntType(typeId) {
        return request.post("/agnes-app/v1/acnt/type/delete", null, {params: {typeId}});
    },
    saveAcntType(form) {
        return request.post("/agnes-app/v1/acnt/type/save", form);
    }
};
