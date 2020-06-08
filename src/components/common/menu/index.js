import gfSideMenu from './gf-side-menu'
import gfVerticalExpand from './gf-vertical-expand'
import noticeBox from './notice-box'

const Loading = {
    install: function (Vue) {
        Vue.component('gf-side-menu', gfSideMenu);
        Vue.component('gf-vertical-expand', gfVerticalExpand);
        Vue.component('notice-box', noticeBox);
    }
};

export default Loading;
