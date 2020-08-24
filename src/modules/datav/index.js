import components from "./components/index";
import clientIndex from "./pages/client-view/index.js";
import dataVIndex from './pages/monitor-view/index';
import Utils from './utils/index'
import svgObj from "./assets/svgObj";

import './style/datav-template.css';

const datav = {
    install: function (Vue) {
        Vue.use(components);
        Vue.use(Utils);
        Vue.prototype.$dataVSvg = svgObj;
    },
    load: function (Gfui) {
        Gfui.use(clientIndex);
        Gfui.use(dataVIndex);
    }
};

export default datav;
