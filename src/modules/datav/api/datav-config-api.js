import request from '@hex/gf-ui/src/util/request';


export default {
    // 获取大屏列表
    getTemplatesList(){
        return request.get("/agnes-datav/datav/report/templates");
    },

    // 获取大屏详情
    getTemplateDetail(id){
        return request.get("/agnes-datav/datav/report/template/get?id="+id);
    },

    // 保存大屏信息
    saveTemplate(params){
        return request.post("/agnes-datav/datav/report/template/save", params);
    },

    // 复制大屏
    copyTemplate(id){
        return request.get("/agnes-datav/datav/report/template/copy?id="+id);
    },

    // 删除大屏
    deleteTemplate(id){
        return request.get("/agnes-datav/datav/report/template/remove?id="+id);
    }
};
