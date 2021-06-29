import request from '@hex/gf-ui/src/util/request';


export default {
    batchRead(form) {
        return request.post("/agnes-remind/v1/remind/msg/batch/read", form);
    },

    handlerSaveBpmn(form) {
        return request.post("test/order/v1/remind/msg/query", form);
    },

};
