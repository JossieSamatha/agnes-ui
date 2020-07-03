import clientView from "./client-view/index.vue";

const Loading = {
    load: function(Gfui) {
        Gfui.componentView('datav.clientview', clientView, {title: '客户服务360视图'});
    }
};

export default Loading;
