import router from '../route'
import store from '@hex/goframe-ui-admin/src/store'
import {getToken} from '@hex/goframe-ui-admin/src/utils/cookie'

//白名单路由
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    document.title = '智能运营平台';
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else if (!store.getters.roles || store.getters.roles.length === 0) {
            store.dispatch('getUserInfo').then(() => {
                next({...to})
            })
        } else {
            next();
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        store.commit('resetUser');
        next('/login')
    }
});


router.afterEach(() => {

});
