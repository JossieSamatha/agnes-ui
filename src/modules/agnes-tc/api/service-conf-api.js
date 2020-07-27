import request from '@hex/gf-ui/src/util/request';


export default {
    getServiceList(form){
        return request.post(`/agnes-app/v1/tc/service/list`, form);
    },
    saveService(form){
        return request.post(`/agnes-app/v1/tc/service/save`, form);
    },
    deleteService(serviceResponseId) {
        return request.post("/agnes-app/v1/tc/service/delete", null, {params: {serviceResponseId}});
    },
    getService(form) {
        return request.post("/agnes-app/v1/tc/service/get", form);
    },
};