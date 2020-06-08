import menu from './menu';
import utilComp from './util-comp'

const Loading = {
    install: function (Vue) {
        Vue.use(menu);
        Vue.use(utilComp);
    }
};

export default Loading;
