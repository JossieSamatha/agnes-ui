import request from '@hex/gf-ui/src/util/request';


export default {
    queryLinkmanRefList() {
        return request.post(`/agnes-app/v1/acnt/linkman/ref/list`);
    },
    saveLinkmanRef(form) {
        return request.post("/agnes-app/v1/acnt/linkman/ref/save", form);
    },
    deleteLinkmanRef(form) {
        return request.post("/agnes-app/v1/acnt/linkman/ref/delete", form);
    },
};
