import request from '@hex/gf-ui/src/util/request';

export default {
    saveProdut(row) {
        return request.post("/agnes-app/v1/prdt/info/save", {prdtRuInfoVo: row});
    },
    deleteProdut(param) {
        return request.post("/agnes-app/v1/prdt/info/delete",null,{params: param});
    },
    checkCodeExist(productCode) {
        let param = {
            productCode
        };
        return request.post("/agnes-app/v1/prdt/info/check/code/exists",null,{params: param});
    },
    updateStatus(param) {
        return request.post("/agnes-app/v1/prdt/info/update/status",null,{params: param});
    },

    productList() {
        return request.post("/agnes-app/v1/prdt/info/list/page?pageIndex=0&pageSize=50", {params: {}});
    },
    getAllProductList() {
        return request.get("/agnes-app/v1/prdt/info/list/all");
    },
};
