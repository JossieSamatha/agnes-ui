import dataVBus from './bus';
import bizComFunc from "./bizComFunc";

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.prototype.$dataVBus = dataVBus;
        Vue.prototype.$bizComFunc = bizComFunc;
    }
};
// 导出
export default Loading;