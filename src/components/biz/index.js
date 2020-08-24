import ruleTable from './rule-table/rule-table';
import RemindDef from './remind-def/remind-def';
import GfPersonChosen from './person-chosen/gf-person-chosen'
import personChoseDialog from './person-chosen/person-chosen-dialog'
import personGroupAdd from './person-chosen/person-group-add'

const Loading = {
    install: function (Vue) {
        Vue.component('rule-table', ruleTable);
        Vue.component('remind-def',RemindDef);
        Vue.component('gf-person-chosen',GfPersonChosen);
        Vue.component('person-chosen-dialog',personChoseDialog);
        Vue.component('person-group-add',personGroupAdd);
    }
};

export default Loading;
