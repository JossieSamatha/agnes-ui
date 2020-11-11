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
    }

}
