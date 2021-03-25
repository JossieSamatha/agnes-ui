import router from '../route'
import store from '@hex/ares-ui/src/store'

//白名单路由
const whiteList = ['/login', '/datavpreview'];

router.beforeEach((to, from, next) => {
    document.title = '智能运营平台(v2.0.1)';


    let token = localStorage.getItem('token');
    if (token) {
        if (to.path === '/login') {
            next({path: '/'})
        } else if (!store.getters.roles || store.getters.roles.length === 0) {
            store.dispatch('getUserInfo').then((resp) => {
                if (resp.ok) {
                    next({...to})
                } else {
                    store.commit('resetUser');
                    next('/login')
                }
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
