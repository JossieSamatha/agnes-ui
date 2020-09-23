import DatasetView from "./list";

//Files Upload
var pages=[
    {
        id: "dtr.config.dataset",
        title: "数据集管理",
        component: DatasetView,
        closeable: true
    }
];

const Loading = {
    load: function(Gfui) {
        Gfui.views(pages);
    }
};

export default Loading;


