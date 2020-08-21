import clientView from "./client-view/index.vue";
import components from "./components/index";
import dataVTemplate from './datav/index';
import dataVTemplateEdit from './datav/template-edit/index';
import svgObj from "./assets/svgObj";

import './style/datav-template.css';

var pages = [{
        id: "datav.client.view",
        title: "首页",
        component: clientView,
        args: {pageId: 'client'},
        closeable: false
    }, {
        id: "datav.dep.view",
        title: "部门首页",
        component: clientView,
        args: {pageId: 'dep'},
        closeable: false
    }];

const datav = {
    install: function (Vue) {
        Vue.use(components);
        Vue.prototype.$dataVSvg = svgObj;
    },
    load: function (Gfui) {
        Gfui.componentView('datav.dataV.dashboard', dataVTemplate, {title: '监控大屏'});
        Gfui.componentView('datav.dataV.editBoard', dataVTemplateEdit, {title: '大屏编辑'});
        Gfui.views(pages);
    }
};

export default datav;
