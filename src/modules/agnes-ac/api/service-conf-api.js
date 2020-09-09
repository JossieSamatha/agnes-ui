import request from '@hex/gf-ui/src/util/request';


export default {
    getServiceList(form){
        return request.post(`/agnes-ac/v1/ac/service/list`, form);
    },
    saveService(form){
        return request.post(`/agnes-ac/v1/ac/service/save`, form);
    },
    deleteService(serviceResponseId) {
        return request.post("/agnes-ac/v1/ac/service/delete", null, {params: {serviceResponseId}});
    },
    changeServiceStatus(form) {
        return request.post("/agnes-ac/v1/ac/service/change-status", form);
    },
    getService(form) {
        return request.post("/agnes-ac/v1/ac/service/get", form);
    },
};