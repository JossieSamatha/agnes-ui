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
    updateFileMove(scanId,status) {
        return request.post("/agnes-app/v1/dc/file/scan/update-status",{'scanId':scanId,'status':status});
    },
    //扫描中使用的规则查询
    queryRuleConfigList() {
        return request.get(`/agnes-app/v1/dop/file/analy/all/list`);
    },
};
