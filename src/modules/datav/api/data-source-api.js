import request from '@hex/gf-ui/src/util/request';


export default {
    // 获取数据源列表
    getDatasourceList(id){
        return request.get("/agnes-datav/config/datasource/get", {params: {id}});
    },

    // 新增数据源
    addDatasource(parms){
        return request.post("/agnes-datav/config/datasource/add", parms);
    },

    // 更新数据源
    updateDatasource(parms){
        return request.post("/agnes-datav/config/datasource/update", parms);
    },

    // 删除数据源
    deleteDatasource(id){
        return request.post("/agnes-datav/config/datasource/removeData", {params: {id}});
    }
};
