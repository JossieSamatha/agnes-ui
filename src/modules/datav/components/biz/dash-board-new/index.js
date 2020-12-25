import tablePie from './table-pie'
import gaugeComp from'./gauge-comp'
import gaugeCompItem from'./guage-comp-item'
import stripComp from'./strip-comp'
import schedule from './schedule'
import myIndex from "./my-index";
import myTodoList from './my-todolist'
import myException from './my-exception'
import noticeComp from './notice-comp'

const Loading = {
    install: function (Vue) {
        Vue.component('table-pie', tablePie);
        Vue.component('gauge-comp-item', gaugeCompItem);
        Vue.component('gauge-comp', gaugeComp);
        Vue.component('strip-comp', stripComp);
        Vue.component('schedule-comp', schedule);
        Vue.component('my-index', myIndex);
        Vue.component('my-todolist', myTodoList);
        Vue.component('my-exception', myException);
        Vue.component('notice-comp', noticeComp);
    }
};

export default Loading;
