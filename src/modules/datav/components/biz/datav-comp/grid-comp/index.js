import staticGrid from "./static-grid"
import scrollBoard from "./scroll-board"
import ctCapsule from "./ct-capsule"
import rankingBoard from "./ranking-board"

// 定义 Loading 对象
const Loading = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install: function(Vue) {
        Vue.component('static-grid', staticGrid);
        Vue.component('scroll-board', scrollBoard);
        Vue.component('ct-capsule', ctCapsule);
        Vue.component('ranking-board', rankingBoard);
    }
};
// 导出
export default Loading;