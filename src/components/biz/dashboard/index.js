import dashBoardFrame from './dash-board-frame'
import dashBoardContent from './dash-board-content'
import dashBoardGroup from './dash-board-group'
import rapidContactForm from './rapid-contact-form'
import chartComp from './chart-comp'
import gridComp from './grid-comp'
import formComp from './form-comp'
import pieChart from './pie-chart'

const Loading = {
    install: function (Vue) {
        Vue.component('dash-board-frame', dashBoardFrame);
        Vue.component('dash-board-content', dashBoardContent);
        Vue.component('dash-board-group', dashBoardGroup);
        Vue.component('rapid-contact-form', rapidContactForm);
        Vue.component('chart-comp', chartComp);
        Vue.component('grid-comp', gridComp);
        Vue.component('form-comp', formComp);
        Vue.component('pie-chart', pieChart);
    }
};

export default Loading;
