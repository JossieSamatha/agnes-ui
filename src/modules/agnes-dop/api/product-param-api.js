import request from '@hex/gf-ui/src/util/request';

export default {
    searchProdutTree() {
        return request.post("/agnes-app/v1/prdt/info/list/tree");
    },
    saveProdutParam(row) {
        return request.post("/agnes-app/v1/prdt/param/save",{prdtRuInfoParam:row});
    },
    checkCodeExist(param) {
        return request.post("/agnes-app/v1/prdt/param/check/code/exists",{prdtRuInfoParam: param});
    },
    updateStatus(param) {
        return request.post("/agnes-app/v1/prdt/param/update/status",null,{params: param});
    },
};
