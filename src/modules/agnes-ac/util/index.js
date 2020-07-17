import caseUtils from "./common.js";

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.prototype.$caseUtils = caseUtils;
    }
};
// 导出
export default Loading;