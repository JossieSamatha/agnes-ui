import request from '@hex/gf-ui/src/util/request';


export default {
    getMenuList(){
        return request.post(`/agnes-app//v1/dop/func/config/get/menu/list`);
    },
    saveFuncConfig(form) {
        return request.post(`/agnes-app//v1/dop/func/config/save`, form);
    },
    deleteFuncConfig(form) {
        return request.post("/agnes-app//v1/dop/func/config/delete", form);
    },
    getMenuConfigList(form){
        return request.post("/agnes-app//v1/dop/func/config/menu-config/list",form);
    },
    reloadMenuForConfig(){
        return request.get("/agnes-app//v1/dop/func/config/menu-config/reload");
    },
    saveMenuConfig(form){
        return request.post("/agnes-app//v1/dop/func/config/save/menu/config",form);
    },
    queryMenuByActionUrl(form){
        return request.post("/agnes-app//v1/dop/func/config/query/menu-by-url",form);
    },
    inputTable(form){
        return request.post("/agnes-app//v1/dop/func/config/input-table",form);
    },
    exportExcel(pkId,fileName) {
        return request.get("/data-pipe/v1/etl/file/exportexcel?pkId=" + pkId+"&fileName="+fileName);
    },
};
