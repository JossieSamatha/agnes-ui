import stageDef from './stage-def'
import groupDef from './group-def'
import stepDef from './step-def'
import actionDef from './action-def'
import remindDef from './remind-def'

const Loading = {
    install: function (Vue) {
        Vue.component('stageDef', stageDef);
        Vue.component('groupDef', groupDef);
        Vue.component('stepDef', stepDef);
        Vue.component('actionDef', actionDef);
        Vue.component('remindDef', remindDef);
    }
};

export default Loading;