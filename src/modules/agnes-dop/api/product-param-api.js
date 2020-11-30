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
    getProductInfoOfParam(productParamId) {
        return request.get("/agnes-app/v1/prdt/param/info/list", null, {params: {productParamId}});
    },
    deleteParam(productParamId) {
        return request.post("/agnes-app/v1/prdt/param/delete", null, {params: {productParamId}});
    },
    saveProductParamRef(from) {
        return request.post("/agnes-app/v1/prdt/param/save/ref", from);
    },
    removeRef(productParamId, productId) {
        return request.post("/agnes-app/v1/prdt/param/remove/ref", null, {params: {productParamId, productId}});
    }
};
