import caseUtils from "./common.js";
import svgImg from './svgImg'

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.prototype.$caseUtils = caseUtils;
        Vue.prototype.$svgImg = svgImg;
    }
};
// 导出
export default Loading;