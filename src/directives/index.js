import clickoutside from './clickoutside';

const Loading = {
    install: function(Vue){
        Vue.directive('clickoutside', clickoutside);
    }
};

export default Loading;
