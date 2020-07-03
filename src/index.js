import Config from "./config/index";
import Components from "./components/index";
import Utils from "./utils/index.js";
import modules from './modules/index';
import draggable from "vuedraggable";


// 定义 Loading 对象
const AgnesUI = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function (Vue, options) {
        Vue.use(Config);
        Vue.use(Components, options);
        Vue.use(Utils, options);
        Vue.component('draggable', draggable);
    },
    load: function (Gfui) {
        Gfui.use(modules);
    }
};
// 导出
export default AgnesUI;