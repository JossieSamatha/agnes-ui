import basicText from "./basic-text"
import rollText from "./roll-text"
import digitalFlop from "./digital-flop"
import dateTime from './date-time'

// 定义 Loading 对象
const Loading = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function(Vue) {
        Vue.component('basic-text', basicText);
        Vue.component('roll-text', rollText);
        Vue.component('digital-flop', digitalFlop);
        Vue.component('date-time', dateTime);
    }
};
// 导出
export default Loading;