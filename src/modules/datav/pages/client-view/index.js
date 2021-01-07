import clientView from "./index.vue";

const pages = [{
    id: "datav.client.view",
    title: "我的首页",
    component: clientView,
    args: {pageId: 'personal'},
    closeable: false,
    forbidDrag: true
}, {
    id: "datav.dep.view",
    title: "部门首页",
    component: clientView,
    args: {pageId: 'department'},
    closeable: false,
    forbidDrag: true
}];

const clientDataV = {
    load: function (Gfui) {
        Gfui.views(pages);
    }
};

export default clientDataV;
