import agnesUtils from "./common.js";
import svgImg from './svgImg';
import Msg from "./message";
import HttlTabFunction from './HttlTabFunction'


// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.prototype.$agnesUtils = agnesUtils;
        Vue.prototype.$svgImg = svgImg;
        Vue.prototype.$msg = Msg;
        // Vue.use(HttlTabFunction);
    },
    load: function (Gfui) {
        Gfui.use(HttlTabFunction);
    }
};
// 导出
export default Loading;
