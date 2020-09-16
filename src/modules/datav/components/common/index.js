import colorPicker from "./color-picker"
// 定义 Loading 对象
const Loading = {
    install: function(Vue) {
        Vue.component('color-picker', colorPicker);
    }
};
// 导出
export default Loading;
