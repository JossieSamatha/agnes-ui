import agnesUtils from "./common.js";
import svgImg from './svgImg';
import Msg from "./message";
import HttlTabFunction from './HttlTabFunction'
import request from "@hex/gf-ui/src/util/request";
import store from '@hex/ares-ui/src/store'
import LunarToSolar from './LunarToSolar'


function ajaxInterceptors() {
    //响应拦截
    request.interceptors.response.eject(0);
    request.interceptors.response.use(
        response => {
            const res = response.data;
            if (response.status !== 200) {
                Msg.error(res || 'Error');
                return Promise.reject(new Error(res.message || 'Error'));
            } else if (res.status === "403") {
                Msg.warning(res.message || '无访问权限！');
            } else if (res.status === "9999") {
                store.commit("resetUser");
                const p = Msg.warning(res.message || '登录已过期，请重新登录！');
                p.then(()=>{
                    top.location='/#/login';
                });
                return Promise.reject(res.message || '登录已过期，请重新登录！');
            } else if (res.type === 'application/octet-stream') {
                request.download(response);
            }
            return res;
        },
        error => {
            Msg.error(error.message);
            return Promise.reject(error);
        }
    );
}

// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        ajaxInterceptors();
        Vue.prototype.$agnesUtils = agnesUtils;
        Vue.prototype.$svgImg = svgImg;
        Vue.prototype.$msg = Msg;
        Vue.prototype.$LunarToSolar = LunarToSolar;
        // Vue.use(HttlTabFunction);
    },
    load: function (Gfui) {
        Gfui.use(HttlTabFunction);
    }
};
// 导出
export default Loading;
