import dataVTemplate from './index.vue';
import dataVTemplateEdit from './template-edit/index';

const datav = {
    install: function () {

    },
    load: function (Gfui) {
        Gfui.componentView('datav.monitor.dashboard', dataVTemplate, {title: '监控大屏'});
        Gfui.componentView('datav.monitor.editBoard', dataVTemplateEdit, {title: '大屏编辑'});
    }
};

export default datav;
