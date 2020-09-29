import Vue from 'vue'
import Router from 'vue-router'
import LoginView from "@hex/ares-ui/src/views/login"
import LayoutMain from "../layout/main"
import dataVPreView from '../modules/datav/pages/monitor-view/template-edit/dataV-preview'

Vue.use(Router);

export const routeMap = [
    {path: '/login', name: 'login', component: LoginView},
    {path: '/datavpreview', name: 'datavpreview', component: dataVPreView},
    {path: '/**', name: 'main', component: LayoutMain}
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: routeMap
})

