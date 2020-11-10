import request from '@hex/gf-ui/src/util/request';

export default {
    saveMemo(form) {
        return request.post("/agnes-app/v1/dop/memo/save", form);
    },
    deleteMemo(memoId) {
        return request.post("/agnes-app/v1/dop/memo/delete", null, {params: {memoId}});
    },
    updateMemo(memoId, memoStatus) {
        return request.post("/agnes-app/v1/dop/memo/update/status", null, {params: {memoId, memoStatus}});
    },

    getMemoMemberRefList(memoId) {
        return request.get("/agnes-app/v1/dop/memo/member/ref/list/memoid", {params: {memoId}});
    },

    getMemoListByUser(memoDt, memoStatus) {
        return request.get("/agnes-app/v1/dop/memo/list/user", {params: {memoDt, memoStatus}});
    },
    getMemoList(memoDt, memoStatus) {
        return request.get("/agnes-app/v1/dop/memo/list", {params: {memoDt, memoStatus}});
    }
};
