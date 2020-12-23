import dashBoardFrame from './dash-board-frame'
import dashBoardContent from './dash-board-content'
import dashBoardGroup from './dash-board-group'
import rapidContactForm from './rapid-contact-form'
import chartComp from './chart-comp'
import gridComp from './grid-comp'
import formComp from './form-comp'
import calendarDef from './calendar-def'
import myTodoList from './my-todolist'
import compNotice from './comp-notice'
import compEvent from './comp-event'
import compWork from './comp-work'
import linkMan from './comp-linkman'
import productComp from './comp-product'
import channelComp from './comp-channel'
import AgnesCalendar from './agnes-calendar'
import commonSearchPanel from './common-search-panel'

const Loading = {
    install: function (Vue) {
        Vue.component('dash-board-frame', dashBoardFrame);
        Vue.component('dash-board-content', dashBoardContent);
        Vue.component('dash-board-group', dashBoardGroup);
        Vue.component('rapid-contact-form', rapidContactForm);
        Vue.component('chart-comp', chartComp);
        Vue.component('grid-comp', gridComp);
        Vue.component('form-comp', formComp);
        Vue.component('calendar-def', calendarDef);
        Vue.component('my-todolist', myTodoList);
        Vue.component('comp-notice', compNotice);
        Vue.component('comp-event', compEvent);
        Vue.component('comp-work', compWork)
        Vue.component('comp-lineman', linkMan)
        Vue.component('comp-product', productComp)
        Vue.component('comp-channel', channelComp)
        Vue.component('agnes-calendar', AgnesCalendar)
        Vue.component('common-search-panel', commonSearchPanel)
    }
};

export default Loading;
