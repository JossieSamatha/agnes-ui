import request from '@hex/gf-ui/src/util/request';


export default {
    queryFunList() {
        return request.get(`/agnes-ac/v1/define/fun/queryFunList`);
    },
    addFunDef(form) {
        return request.post("/agnes-ac/v1/define/fun/addFunDef", form);
    },
    deleteFunDef(fnId) {
        return request.get("/agnes-ac/v1/define/fun/deleteFunDef", {params: {fnId}});
    },
    getByFnId(fnId) {
        return request.get("/agnes-ac/v1/define/fun/getByFnId", {params: {fnId}});
    },

};
