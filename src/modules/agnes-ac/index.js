import lodash from 'lodash'

import api from './api/index';
import components from "./components/index";
import config from "./config/index";
import pages from "./pages/index";
import utils from "./util/index.js";
import lcImg from "./assets/svgImg";

import './style/little-case.css'
import './style/elec-process.css'

// 定义 Loading 对象
const agnesAc = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function (Vue, options) {
        Vue.prototype.$api = lodash.extend(Vue.prototype.$api || {}, api);
        Vue.prototype.$lcImg = lcImg;

        Vue.use(components, options);
        Vue.use(config, options);
        Vue.use(pages, options);
        Vue.use(utils, options);
    },
    load: function (Gfui) {
        Gfui.use(pages);
        Gfui.use(config);
    }
};

export default agnesAc;