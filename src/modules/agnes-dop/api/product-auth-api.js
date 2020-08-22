import request from '@hex/gf-ui/src/util/request';

export default {
    searchProdutById(userId) {
        return request.post("/agnes-app/v1/prdt/info/auth/list/tree", null, {params: {userId}});
    },
    saveAuth(userId,auths) {
        let param={
            'userId':userId,
            'auths':auths
        }
        return request.post("/agnes-app/v1/prdt/auth/save",param);
    },

};
