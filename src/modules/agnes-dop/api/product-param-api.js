import request from '@hex/gf-ui/src/util/request';

export default {

    saveProdutParam(form) {
        return request.post("/agnes-app/v1/prdt/param/save", form);
    },
    checkCodeExist(param) {
        return request.post("/agnes-app/v1/prdt/param/check/code/exists", {prdtRuInfoParam: param});
    },
    updateStatus(param) {
        return request.post("/agnes-app/v1/prdt/param/update/status", null, {params: param});
    },
    getParamList(paramBizType) {
        return request.post("/agnes-app/v1/prdt/param/list/all", null, {params: {paramBizType}});
    },
    getProductInfoOfParam(paramCode) {
        return request.get("/agnes-app/v1/prdt/param/info/list", null, {params: {paramCode}});
    },
    deleteParam(paramCode, pkId) {
        return request.post("/agnes-app/v1/prdt/param/delete", null, {params: {paramCode, pkId}});
    },
    saveProductParamRef(from) {
        return request.post("/agnes-app/v1/prdt/param/save/ref", from);
    },
    removeRef(paramCode, productCode) {
        return request.post("/agnes-app/v1/prdt/param/remove/ref", null, {params: {paramCode, productCode}});
    }
};
