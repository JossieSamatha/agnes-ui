import Drawer from './gf-drawer';

class GfPageDrawer {
    constructor(Vue) {
        this.Vue = Vue;
        this.modeMap = {"add": '添加', 'edit': '编辑', 'view': '查看'};
    }

    createByType(drawerType, options) {
        let drawer = new this.Vue({
            data() {
                return {
                    options: {...options},
                }
            },
            render(h) {
                return h(drawerType, {
                    props: this.options,
                });
            },
        });
        drawer.$mount();
        document.body.appendChild(drawer.$el);
        return drawer;
    }

    create(options) {
        return this.createByType(Drawer, options);
    }

    close(vm, action) {
        vm.$root.$children[0].close(action);
    }


    formatTitle(title, mode) {
        const modeName = this.modeMap[mode] || '';
        return `${title}-${modeName}`
    }
}


// 定义 Loading 对象
const Loading = {
    install: function (Vue) {
        Vue.component('gf-drawer-page', Drawer);
        Vue.prototype.$drawerPage = new GfPageDrawer(Vue);
    }
};
// 导出
export default Loading;

