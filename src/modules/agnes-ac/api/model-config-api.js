import request from '@hex/gf-ui/src/util/request';


export default {
    getModelTypeList() {
        return request.get(`/agnes-ac/v1/config/model/type/list`);
    },
    getModelFieldList(modelTypeId) {
        return request.get("/agnes-ac/v1/config/model/field/list", {params: {modelTypeId}});
    },
    saveModel(form) {
        return request.post("/agnes-ac/v1/config/model/save", form);
    },
    deleteModel(modelTypeId) {
        return request.post("/agnes-ac/v1/config/model/delete", null, {params: {modelTypeId}});
    },
    getModelAndFieldById(modelTypeId) {
        return request.get("/agnes-ac/v1/config/model/type/and/field", {params: {modelTypeId}});
    }
};
