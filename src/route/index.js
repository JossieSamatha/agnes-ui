import Vue from 'vue'
import Router from 'vue-router'
import LayoutMain from "../layout/main"


Vue.use(Router);

export const routeMap = [
    {path: '/**', component: LayoutMain, name: 'main'},
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: routeMap
})

