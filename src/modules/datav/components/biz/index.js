import datavComp from './datav-comp/index';
import dashBoard from './dash-board/index'

const Loading = {
    install: function (Vue) {
        Vue.use(datavComp);
        Vue.use(dashBoard);
    }
};

export default Loading;
