import dataVBus from './bus';
import bizComFunc from "./bizComFunc";
import dataVTheme from './theme/index'

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.prototype.$dataVBus = dataVBus();
        Vue.prototype.$dataVBizFunc = bizComFunc;
        Vue.prototype.$dataVTheme = dataVTheme;
    }
};
// 导出
export default Loading;