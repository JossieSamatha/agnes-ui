import request from '@hex/gf-ui/src/util/request';

export default {
    initFields(sql) {
        return request.post(`/agnes-app/v1/dop/custom-query/init-fields`, null, {params: {sql}});
    },
    save(param) {
        return request.post(`/agnes-app/v1/dop/custom-query/save`, param);
    },

    queryFieldList(pkId) {
        return request.post(`/agnes-app/v1/dop/custom-query/field-list`, null, {params: {pkId}});
    },

    queryCustomQueryList() {
        return request.post(`/agnes-app/v1/dop/custom-query/list`);
    },

    queryCustomQueryDetail(param) {
        return request.post(`/agnes-app/v1/dop/custom-query/detail`, param);
    },
    removeCustomerQuery(pkId) {
        return request.post(`/agnes-app/v1/dop/custom-query/remove`, null, {params: {pkId}});
    },
    updateStatus(pkId, status) {
        return request.post(`/agnes-app/v1/dop/custom-query/update-status`, null, {params: {pkId, status}});
    },
    queryCustomFieldOfIsQuery(pkId) {
        return request.post(`/agnes-app/v1/dop/custom-query/query-field`, null, {params: {pkId}});
    },
    queryDictList() {
        return request.post(`/agnes-app/v1/dop/custom-query/dict`);
    }

}
