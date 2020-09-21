import request from '@hex/gf-ui/src/util/request';


export default {
    // 获取数据集列表
    getDateSetList(){
        return request.get("/agnes-datav/datav/data-set/option/list");
    },

    // 数据集定义明细
    getDateSetDetail(){
        return request.get("/agnes-datav/datav/data-set/column/list");
    },

    getCaseDefList() {
        return request.post("/agnes-datav/config/dataset/listAll");
    },
};
