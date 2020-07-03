import pages from "./pages/index";

// 定义 Loading 对象
const datav = {
    load: function (Gfui) {
        Gfui.use(pages);
    }
};

export default datav;