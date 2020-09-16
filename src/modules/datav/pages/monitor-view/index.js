import dataVTemplate from './index.vue';
import dataVTemplateEdit from './template-edit/index';
import gfDragResize from './template-edit/gf-drag-resize'
import chartConfSet from './template-edit/chart-conf-drawer/index'

const datav = {
    install: function (Vue) {
        Vue.use(chartConfSet);
        Vue.component('gf-drag-resize', gfDragResize);
    },
    load: function (Gfui) {
        Gfui.componentView('agnes.datav.config', dataVTemplate, {title: '监控大屏'});
        Gfui.componentView('datav.monitor.editBoard', dataVTemplateEdit, {title: '大屏编辑'});
    }
};

export default datav;
