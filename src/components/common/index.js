import menu from './menu';
import utilComp from './util-comp';
import DialogFooter from "./dialog-footer";
import Drawer from './drawer/index';
import GfFilterOption from './select/gf-filter-option'
import GfStrBoolCheckBox from './select/gf-strbool-checkbox'
import cronModal from "./cron-comp/cron-modal";
import accEcmUpload from './ecm-upload/acc-ecm-upload';
import MenuConfigUpload from './menu-upload/menu-config-upload';
import inputComp from './input/index'

import robotWisdom from './input/robot'

const Loading = {
    install: function (Vue) {
        Vue.use(menu);
        Vue.use(utilComp);
        Vue.use(Drawer);
        Vue.use(inputComp);
        Vue.component('gf-cron-modal', cronModal);
        Vue.component('dialog-footer',DialogFooter);
        Vue.component('gf-filter-option',GfFilterOption);
        Vue.component('gf-strbool-checkbox',GfStrBoolCheckBox);
        Vue.component('acc-ecm-upload',accEcmUpload);
        Vue.component('menu-config-upload',MenuConfigUpload);
        Vue.component('robot-wisdom',robotWisdom);
    }
};

export default Loading;
