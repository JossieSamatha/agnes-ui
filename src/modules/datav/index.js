import pages from "./client-view/index";

// 定义 Loading 对象
const datav = {
    load: function (Gfui) {
        Gfui.use(pages);
    }
};

export default datav;