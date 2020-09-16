import components from "./components/index";
import clientIndex from "./pages/client-view/index.js";
import dataVIndex from './pages/monitor-view/index';
import datavTemplateService from './services/datav-template-service'
import Utils from './utils/index'
import svgObj from "./assets/svgObj";

import './style/datav-template.css';
import './style/data-conf.css';

const datav = {
    install: function (Vue) {
        Vue.use(components);
        Vue.use(Utils);
        Vue.prototype.$dataVSvg = svgObj;
        Vue.prototype.$datavTemplateService = new datavTemplateService(Vue);
    },
    load: function (Gfui) {
        Gfui.use(clientIndex);
        Gfui.use(dataVIndex);
    }
};

export default datav;
