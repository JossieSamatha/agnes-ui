import datavApi from "./api/index";
import config from "./config/index";
import components from "./components/index";
import clientIndex from "./pages/client-view/index.js";
import dataVIndex from './pages/monitor-view/index';
import dataSetIndex from './pages/data-center/dataset/index.js'
import datavTemplateService from './services/datav-template-service'
import Utils from './utils/index'
import svgObj from "./assets/svgObj";

import './style/datav-template.css';
import './style/data-conf.css';
import './assets/ali-iconfont/iconfont'
import lodash from "lodash";

const datav = {
    install: function (Vue) {
        Vue.use(components);
        Vue.use(Utils);
        Vue.prototype.$dataVSvg = svgObj;
        Vue.prototype.$datavTemplateService = new datavTemplateService(Vue);
        Vue.prototype.$api = lodash.extend(Vue.prototype.$api || {}, datavApi);
    },
    load: function (Gfui) {
        Gfui.use(config);
        Gfui.use(clientIndex);
        Gfui.use(dataVIndex);
        Gfui.use(dataSetIndex);
    }
};

export default datav;
