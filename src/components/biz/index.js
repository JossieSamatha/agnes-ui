import dashBoard from './dashboard/index';
import ruleTable from './rule-table/rule-table'

const Loading = {
    install: function (Vue) {
        Vue.use(dashBoard);
        Vue.component('rule-table', ruleTable);
    }
};

export default Loading;
