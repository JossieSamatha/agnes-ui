import dashBoardFrame from './dash-board-frame'
import dashBoardContent from './dash-board-content'
import dashBoardGroup from './dash-board-group'
import rapidContactForm from './rapid-contact-form'
import chartComp from './chart-comp'
import gridComp from './grid-comp'
import formComp from './form-comp'
import pieChart from './pie-chart'
import calendarDef from './calendar-def'
import myTodoList from './my-todolist'
import compNotice from './comp-notice'
import compEvent from './comp-event'
import compWork from './comp-work'
import AgnesCalendar from './agnes-calendar'

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
        Vue.component('calendar-def', calendarDef);
        Vue.component('my-todolist', myTodoList);
        Vue.component('comp-notice', compNotice);
        Vue.component('comp-event', compEvent);
        Vue.component('comp-work', compWork)
        Vue.component('agnes-calendar', AgnesCalendar)
    }
};

export default Loading;
