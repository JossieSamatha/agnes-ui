import menu from './menu';
import utilComp from './util-comp';
import DialogFooter from "./dialog-footer";
import Drawer from './drawer/index';
import GfFilterOption from './select/gf-filteroption'
import GfStrBoolCheckBox from './select/gf-strbool-checkbox'
import cronModal from "./cron-comp/cron-modal";
import accEcmUpload from './ecm-upload/acc-ecm-upload';
import MenuConfigUpload from './menu-upload/menu-config-upload';
import TaskFileUpload from './task-file-upload/task-file-upload';
import inputComp from './input/index'
import svgIcon from './svg-icon/svg-icon-comp.vue'
import skinDialog from './skin-dialog'
import GfImageView from './image-viewer/gf-image-view.vue'

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
        Vue.component('task-file-upload',TaskFileUpload);
        Vue.component('robot-wisdom',robotWisdom);
        Vue.component('svg-icon',svgIcon);
        Vue.component('skin-dialog',skinDialog);
        Vue.component('gf-image-view',GfImageView);
    }
};

export default Loading;
