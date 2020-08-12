import clickoutside from './clickoutside';
import dragX from "./dragX";

const Loading = {
    install: function(Vue){
        Vue.directive('clickoutside', clickoutside);
        Vue.directive('dragx', dragX);
    }
};

export default Loading;
