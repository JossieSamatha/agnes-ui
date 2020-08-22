import request from '@hex/gf-ui/src/util/request';


export default {

    saveFileScan(form) {
        return request.post("/agnes-app/v1/dc/file/scan/save", form);
    },
    deleteFileScan(id) {
        return request.get("/agnes-app/v1/dc/file/scan/delete?scanId="+id);
    },
    getVarIdList() {
        return request.get("/agnes-app/v1/dc/file/scan/var-list");
    },
    updateStatus(scanId,status) {
        return request.get("/agnes-app/v1/dc/file/scan/update-status",null,{'scanId':scanId,'status':status});
    },
};
