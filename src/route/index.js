import Vue from 'vue'
import Router from 'vue-router'
import LoginView from "@hex/ares-ui/src/views/login"
import LayoutMain from "../layout/main"

Vue.use(Router);

export const routeMap = [
    {path: '/login', name: 'login', component: LoginView},
    {path: '/**', name: 'main', component: LayoutMain}
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: routeMap
})

