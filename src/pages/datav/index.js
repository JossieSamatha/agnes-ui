import clientView from "./client-view/index.vue";

var pages = [
    {
        id: "datav.clientview",
        title: "客户服务360视图",
        component: clientView,
        closeable: true
    }
];

const Loading = {
    load: function(Gfui) {
        Gfui.views(pages);
    }
};

export default Loading;
