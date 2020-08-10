import menu from './menu';
import utilComp from './util-comp';
import DialogFooter from "./dialog-footer";
import Drawer from './drawer/index';
import GfFilterOption from './select/gf-filter-option'
import GfStrBoolCheckBox from './select/gf-strbool-checkbox'
import cronModal from "./cron-comp/cron-modal";

const Loading = {
    install: function (Vue) {
        Vue.use(menu);
        Vue.use(utilComp);
        Vue.use(Drawer);
        Vue.component('gf-cron-modal', cronModal);
        Vue.component('dialog-footer',DialogFooter);
        Vue.component('gf-filter-option',GfFilterOption);
        Vue.component('gf-strbool-checkbox',GfStrBoolCheckBox);
    }
};

export default Loading;
