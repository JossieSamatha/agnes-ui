import ctLine from "./ct-line"
import ctBar from "./ct-bar"
import ctScatter from "./ct-scatter"
import ctPie from "./ct-pie"
import ctRadar from "./ct-radar"
import ctGauge from "./ct-gauge"
import ctFunnel from "./ct-funnel"

// 定义 Loading 对象
const Loading = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function(Vue) {
        Vue.component('ct-line', ctLine);
        Vue.component('ct-bar', ctBar);
        Vue.component('ct-scatter', ctScatter);
        Vue.component('ct-pie', ctPie);
        Vue.component('ct-radar', ctRadar);
        Vue.component('ct-gauge', ctGauge);
        Vue.component('ct-funnel', ctFunnel);
    }
};
// 导出
export default Loading;