import request from '@hex/gf-ui/src/util/request';


export default {
    getCaseDefList() {
        return request.get("/agnes-ac/v1/ac/case/def/list");
    },
    saveCaseDef(form) {
        return request.post("/agnes-ac/v1/ac/case/def/save", form);
    },
    deleteCaseDef(caseDefId) {
        return request.post("/agnes-ac//v1/ac/case/def/delete", null, {params: {caseDefId}});
    },
    publishCaseDef(form) {
        return request.post("/agnes-ac/v1/ac/case/def/publish", form);
    },
    checkCaseDefKey(caseDefKey) {
        return request.get("/agnes-ac/v1/ac/case/def/check", {params: {caseDefKey}});
    },
};
