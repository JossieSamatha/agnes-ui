import datavComp from './datav-comp/index';
import dashBoard from './dash-board/index';
import dashBoardNew from './dash-board-new/index'

const Loading = {
    install: function (Vue) {
        Vue.use(datavComp);
        Vue.use(dashBoard);
        Vue.use(dashBoardNew);
    }
};

export default Loading;
