import Biz from './biz/index';
import Common from './common/index'


const Loading = {
    install: function (Vue) {
        Vue.use(Biz);
        Vue.use(Common);
    }
};

export default Loading;
