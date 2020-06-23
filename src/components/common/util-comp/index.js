import tabComp from './tab-comp';
import moduleCard from './module-card';

const Loading = {
    install: function (Vue) {
        Vue.component('tabComp', tabComp);
        Vue.component('module-card', moduleCard);
    }
};

export default Loading;
