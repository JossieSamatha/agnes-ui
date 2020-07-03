import modelConfigApi from './model-config-api';
import msgDefineApi from './msg-def-api';

const Loading = {
    install: function (Vue) {
        Vue.prototype.$api = {
            modelConfigApi,
            msgDefineApi,
            ...Vue.prototype.$api
        }
    }
};

export default Loading;
