import request from '@hex/gf-ui/src/util/request';

export default {
    saveProdut(row) {
        return request.post("/agnes-app/v1/prdt/info/save",{prdtRuInfo:row});
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
};