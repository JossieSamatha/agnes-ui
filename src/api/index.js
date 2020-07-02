import modelConfigApi from './model-config-api';

const Loading = {
    install: function (Vue) {
        Vue.prototype.$api = {
            modelConfigApi,
            ...Vue.prototype.$api
        }
    }
};

export default Loading;
