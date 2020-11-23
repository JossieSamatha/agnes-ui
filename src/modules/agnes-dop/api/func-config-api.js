import request from '@hex/gf-ui/src/util/request';


export default {
    getMenuList(){
        return request.post(`/agnes-app//v1/dop/func/config/get/menu/list`);
    },
    saveFuncConfig(form) {
        return request.post(`/agnes-app//v1/dop/func/config/save`, form);
    },
    deleteFuncConfig(form) {
        return request.post("/agnes-app//v1/dop/func/config/delete", form);
    },
};
