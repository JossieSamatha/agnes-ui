import request from '@hex/gf-ui/src/util/request';


export default {

    saveCopyConf(form) {
        return request.post("/agnes-app/v1/dc/copy/conf/save", form);
    },
    deleteCopyConf(copyId) {
        return request.post("/agnes-app/v1/dc/copy/conf/delete", null, {params: {copyId}});
    },
    getSlaveServerList(copyId) {
        return request.post("/agnes-app/v1/dc/copy/conf/slave/server/list",null ,{params: {copyId}});
    },
    slaveServer(form) {
        return request.post("/agnes-app/v1/dc/copy/conf/update/slave/server",form);
    },
};
