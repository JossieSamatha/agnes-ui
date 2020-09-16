import ChartsComp from "./charts-comp"
import DecorateComp from "./decorate-comp";
import GridComp from './grid-comp';
import TextComp from "./text-comp";
import OthersComp from "./others-comp";
import gfDragResize from './gf-drag-resize'

// 定义 Loading 对象
const Loading = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function(Vue) {
        Vue.use(ChartsComp);
        Vue.use(DecorateComp);
        Vue.use(GridComp);
        Vue.use(TextComp);
        Vue.use(OthersComp);
        Vue.component('gf-drag-resize', gfDragResize);
    }
};
// 导出
export default Loading;
