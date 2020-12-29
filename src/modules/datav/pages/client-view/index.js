import clientView from "./index.vue";

const pages = [{
    id: "datav.client.view",
    title: "我的首页",
    component: clientView,
    args: {pageId: '0'},
    closeable: false
}, {
    id: "datav.dep.view",
    title: "部门首页",
    component: clientView,
    args: {pageId: '1'},
    closeable: false
}];

const clientDataV = {
    load: function (Gfui) {
        Gfui.views(pages);
    }
};

export default clientDataV;
