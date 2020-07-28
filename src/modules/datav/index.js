import clientView from "./client-view/index.vue";

var pages = [{
    id: "datav.client.view",
    title: "首页",
    component: clientView,
    closeable: true
}
];

const datav = {
    load: function (Gfui) {
        Gfui.views(pages);
    }
};

export default datav;
