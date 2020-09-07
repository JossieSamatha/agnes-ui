import clientView from "./index.vue";

var pages = [{
    id: "datav.client.view",
    title: "首页",
    component: clientView,
    args: {pageId: 'client'},
    closeable: false
}, {
    id: "datav.dep.view",
    title: "部门首页",
    component: clientView,
    args: {pageId: 'dep'},
    closeable: false
}];

const clientDataV = {
    load: function (Gfui) {
        Gfui.views(pages);
    }
};

export default clientDataV;
