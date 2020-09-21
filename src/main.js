import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";

import Gfui from "@hex/gf-ui";
import AresUI from '@hex/ares-ui';
import AgnesUI from './index';

import draggable from "vuedraggable";
import VueDragResize from 'vue-drag-resize';
import VueGridLayout from 'vue-grid-layout';
import dataVComp from '@jiaminghi/data-view';
import VCharts from 'v-charts'
import echarts from 'echarts'
import screenfull from 'screenfull'

import router from "./route/index";
import store from './store/index';

import gridApi from "./api/grid-api";

import lodash from 'lodash'

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
Vue.use(VCharts);
Vue.prototype.echarts = echarts;
Vue.prototype.$screenfull = screenfull;

Vue.prototype.$lodash = lodash;

Vue.component('draggable', draggable);
Vue.component('vue-drag-resize', VueDragResize);
Vue.component('GridLayout', VueGridLayout.GridLayout);
Vue.component('GridItem', VueGridLayout.GridItem);

// 大屏组件
Vue.use(dataVComp);
Vue.prototype.$dataVComp = dataVComp;

Vue.use(Gfui, {
    tabBar: {cacheMultiView: false, hideTitleBar: false},
    grid: {gridApi}
});
Gfui.use(AresUI);
Gfui.use(AgnesUI);

Gfui.runApp(App, "#app", {router, store});

window.$gfui = Gfui;
