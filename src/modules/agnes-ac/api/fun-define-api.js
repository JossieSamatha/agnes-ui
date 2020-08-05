import request from '@hex/gf-ui/src/util/request';


export default {
    queryFunList() {
        return request.get(`/agnes-ac/v1/config/fun/query/list/all`);
    },
    addFunDef(form) {
        return request.post("/agnes-ac/v1/config/fun/add", form);
    },
    deleteFunDef(fnId) {
        return request.get("/agnes-ac/v1/config/fun/delete", {params: {fnId}});
    },
    getByFnId(fnId) {
        return request.get("/agnes-ac/v1/config/fun/query/id", {params: {fnId}});
    },
    checkFun(form) {
        return request.post("/agnes-ac/v1/config/fun/check", form);
    },

};
