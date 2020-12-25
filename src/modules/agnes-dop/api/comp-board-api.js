import request from '@hex/gf-ui/src/util/request';


export default {
    getDashboards(form){
        return request.post(`/agnes-app//v1/dop/board/query-board`,form);
    },
    saveDashboards(form) {
        return request.post(`/agnes-app//v1/dop/board/save-board`, form);
    },
    getCompList() {
        return request.post("/agnes-app//v1/dop/board/query-comp");
    },
    saveComponents(form){
        return request.post("/agnes-app//v1/dop/board/save-comp",form);
    },
    deleteComponents(form){
        return request.post("/agnes-app//v1/dop/board/delete-comp",form);
    },
};
