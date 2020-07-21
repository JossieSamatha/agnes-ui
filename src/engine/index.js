import HttlTabService from './Services'

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.use(HttlTabService);
    }
};
// 导出
export default Loading;
