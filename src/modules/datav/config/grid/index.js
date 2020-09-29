import datasetGrids from './dataset/index';

const Loading = {
    load: function (Gfui) {
        Gfui.use(datasetGrids);
    }
};

export default Loading;
