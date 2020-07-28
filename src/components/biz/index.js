import dashBoard from './dashboard/index';
import ruleTable from './rule-table/rule-table';
import RemindDef from './remind-def/remind-def'

const Loading = {
    install: function (Vue) {
        Vue.use(dashBoard);
        Vue.component('rule-table', ruleTable);
        Vue.component('remind-def',RemindDef);
    }
};

export default Loading;
