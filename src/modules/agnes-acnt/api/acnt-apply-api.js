import request from '@hex/gf-ui/src/util/request';


export default {
    getProductCodeList() {
        return request.post(`agnes-app/v1/prdt/info/list/page`,{});
    }

};
