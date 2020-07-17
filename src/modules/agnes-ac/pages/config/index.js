import ModelDef from "./model-def/index";
import TaskDef from "./task-def/task-list";
import TaskConfig from "./task-config/index";
import FunDef from "./fun-def/index"
import WorkDay from "./workday/index";
import stepActType from './case-def/little-case/step-act-type'
import CaseDef from "./case-def/index";
import CaseConfigIndex from "./case-def/little-case/case-config-index";



const Loading = {
    install: function(Vue){
        Vue.component('step-act-type', stepActType);
    },
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model', ModelDef, {title: '对象类型定义'});
        Gfui.componentView('agnes.define.task', TaskDef, {title: '任务定义配置'});
        Gfui.componentView('agnes.config.task', TaskConfig, {title: '任务执行列表'});
        Gfui.componentView('agnes.define.fun', FunDef, {title: '函数类型定义'});
        Gfui.componentView('agnes.config.workday', WorkDay, {title: '工作日'});
        Gfui.componentView('agnes.config.case', CaseDef, {title: 'case定义'});
        Gfui.componentView('agnes.config.case.step', CaseConfigIndex, {title: 'case详情配置'});
    }
};

export default Loading;
