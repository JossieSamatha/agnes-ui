import Components from "./components/index";
import Utils from "./utils/index.js";
import lodash from 'lodash';
import draggable from "../node_modules/vuedraggable";


// 定义 Loading 对象
const Gfui = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function (Vue, options) {
        Gfui.Vue = Vue;
        Vue.use(Components, options);
        Vue.use(Utils, options);
        Vue.component('draggable', draggable);
    },
    use(module, options) {
        if (lodash.isFunction(module.install)) {
            module.install(Gfui.Vue, options);
        }
        if (lodash.isFunction(module.load)) {
            module.load(Gfui, options);
        }
    }
};
// 导出
export default Gfui;