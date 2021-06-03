import ruleTable from './rule-table/rule-table';
import RemindDef from './remind-def/remind-def';
import GfPersonChosen from './person-chosen/gf-person-chosen'
import personChoseDialog from './person-chosen/person-chosen-dialog'
import personGroupAdd from './person-chosen/person-group-add'
import BizParamChosen from './biz-param-chosen/biz-param-chosen'
import BizParamChoseDialog from './biz-param-chosen/biz-param-chosen-dialog'
import MoveWidget from './move-widget/index'

import chartComp from './chart-comp/index'

const Loading = {
    install: function (Vue) {
        Vue.use(chartComp);
        Vue.use(MoveWidget);
        Vue.component('rule-table', ruleTable);
        Vue.component('remind-def',RemindDef);
        Vue.component('gf-person-chosen',GfPersonChosen);
        Vue.component('person-chosen-dialog',personChoseDialog);
        Vue.component('person-group-add',personGroupAdd);
        Vue.component('biz-param-chosen',BizParamChosen);
        Vue.component('biz-param-chosen-dialog',BizParamChoseDialog);
    }
};

export default Loading;
