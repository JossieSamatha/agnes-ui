import menu from './menu';
import utilComp from './util-comp';
import DialogFooter from "./dialog-footer";

const Loading = {
    install: function (Vue) {
        Vue.use(menu);
        Vue.use(utilComp);
        Vue.component('dialog-footer',DialogFooter);
    }
};

export default Loading;
