import request from '@hex/gf-ui/src/util/request';


export default {
    saveData(form) {
        return request.post('/agnes-app/v1/dop/bank/save', form);
    },
    deteleData(branchId) {
        return request.post('/agnes-app/v1/dop/bank/dele?branchId='+branchId);
    },
    searchByPayNo(payNo){
        return request.post('/agnes-app/v1/dop/bank/search?payNo='+payNo);
    },
    listByPayNo(payNo){
        return request.post('/agnes-app/v1/dop/bank/list/by/payno?payNo='+payNo);
    },
    listByBigPayNoAndBranchName(bigPayNo,branchName){
        return request.post('/agnes-app/v1/dop/bank/list/by/bigpayno/and/branchname', null, {params: {bigPayNo,branchName}});
    },
    existsBigPayNo(bigPayNo,bankBranchId) {
        return request.post("/agnes-app/v1/dop/bank/existsBigPayNo", null, {params: {bigPayNo,bankBranchId}});
    }
}
