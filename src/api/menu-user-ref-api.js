import request from '@hex/gf-ui/src/util/request';


export default {

    //获取用户收藏菜单列表
    getMenuUserRefList() {
        return request.get("/agnes-app/v1/dop/menu/list");
    },

    //保存用户收藏菜单
    saveMenuUserRefList(form){
        return request.post("/agnes-app/v1/dop/menu/save",form);
    },
    //移除用户收藏菜单
    deleteMenuUserRefList(form){
        return request.post("/agnes-app/v1/dop/menu/delete",form);
    },
};
