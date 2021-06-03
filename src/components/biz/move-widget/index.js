import complexWidget from './complex-widget';
import moveWidget from './move-widget';
import treeComp from './tree-comp';
import treeDataManage from './tree-data-manage';


const Loading = {
    install: function (Vue) {
        Vue.component('complex-widget', complexWidget);
        Vue.component('move-widget', moveWidget);
        Vue.component('tree-comp', treeComp);
        Vue.component('tree-data-manage', treeDataManage);
    }
}

export default Loading;