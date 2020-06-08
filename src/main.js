import Vue from "vue";
import ElementUI from 'element-ui';
import App from "./App.vue";
// import Pages from "./pages/index";
import Gfui from "@hex/goframe-ui";
import router from "./route/index";

import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import './assets/css/initial.css';
import './assets/css/theme.css';
import './assets/css/component.css';
import './assets/css/agnes.css';
import srcPage from '../src/index';

Vue.use(ElementUI);
Vue.use(srcPage);
Vue.use(Gfui, {tabBar: {cacheMultiView: true, hideTitleBar: false}});
// Gfui.use(Pages);

Gfui.runApp(App, "#app", {router});

window.$gfui = Gfui;