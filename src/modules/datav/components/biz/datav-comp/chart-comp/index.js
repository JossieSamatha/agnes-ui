import CtLine from './JS/ct-line';
import CtBar from './JS/ct-bar';
import CtStrip from './JS/ct-strip';
import CtArea from './JS/ct-area';
import CtLineBar from './JS/ct-line-bar';
import CtPie from './JS/ct-pie';
import CtRing from './JS/ct-ring'
import CtRadar from './JS/ct-radar';
import CtMap from './JS/ct-map';
import CtGauge from './JS/ct-gauge';
import CtFunnel from './JS/ct-funnel';

// 定义 Loading 对象
const Loading = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function (Vue) {
        Vue.component('ct-bar', CtBar);
        Vue.component('ct-strip', CtStrip);
        Vue.component('ct-line', CtLine);
        Vue.component('ct-area', CtArea);
        Vue.component('ct-line-bar', CtLineBar);
        Vue.component('ct-pie', CtPie);
        Vue.component('ct-ring', CtRing);
        Vue.component('ct-radar', CtRadar);
        Vue.component('ct-map', CtMap);
        Vue.component('ct-gauge', CtGauge);
        Vue.component('ct-funnel', CtFunnel);
    }
};
// 导出
export default Loading;