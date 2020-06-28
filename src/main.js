import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
import Pages from "./pages/index";
import srcPage from '../src/index';
import Gfui from "@hex/gf-ui";
import AresUI from '@hex/ares-ui';
import router from "./route/index";
import draggable from "vuedraggable";
import VueGridLayout from 'vue-grid-layout';
import echarts from 'echarts'
import store from '@hex/ares-ui/src/store/index';
import Config from "./config/index";

import './utils/permission';
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import './assets/css/initial.css';
import './assets/css/theme.css';
import './assets/css/component.css';
import './assets/css/agnes.css';
import './assets/css/dash-board.css';


Vue.use(ElementUI);
Vue.use(echarts);
Vue.prototype.echarts = echarts;
Vue.use(srcPage);
Vue.use(AresUI);
Vue.use(Gfui, {tabBar: {cacheMultiView: true, hideTitleBar: false}});
Gfui.use(Pages);
Gfui.use(AresUI);
Gfui.use(Config);

Vue.component('draggable', draggable);
Vue.component('GridLayout', VueGridLayout.GridLayout);
Vue.component('GridItem', VueGridLayout.GridItem);

Gfui.runApp(App, "#app", {router, store});

window.$gfui = Gfui;
