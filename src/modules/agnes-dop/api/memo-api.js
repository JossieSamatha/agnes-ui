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
    },


    //新版本运营日历接口
    selectMemoDefList(memoStatus) {
        return request.post("/agnes-app/v2/dop/memo/def/list", null, {params: {memoStatus}});
    },
    getMemoListOfMonth(pageType, memoDate, filterValue) {
        return request.post("/agnes-app/v2/dop/memo/detail", null, {params: {pageType, memoDate, filterValue}});
    },
    saveMemoDef(form) {
        return request.post("/agnes-app/v2/dop/memo/def/save", form);
    },
    approve(pkId) {
        return request.post("/agnes-app/v2/dop/memo/def/approve", null, {params: {pkId}});
    },
    deleteMemoDef(pkId) {
        return request.post("/agnes-app/v2/dop/memo/def/delete", null, {params: {pkId}});
    },
    deleteRuMemo(form) {
        return request.post("/agnes-app/v2/dop/memo/ru/delete", form);
    },
    saveRuMemo(form) {
        return request.post("/agnes-app/v2/dop/memo/ru/save", form);
    },
};
