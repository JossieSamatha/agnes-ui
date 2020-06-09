import Common from "./common/index"
import Biz from './biz/index'

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.use(Common);
        Vue.use(Biz);
    }
};
// 导出
export default Loading;
