import ModelDef from "./model-def/index";
import TaskDef from "./task-def/task-list";
import TaskConfig from "./task-config/index";
import FunDef from "./fun-def/index"
import WorkDay from "./workday/index";
import stepActType from './case-def/little-case/step-act-type'
import CaseDef from "./case-def/index";
import MotDef from "./mot-def/mot-list";
import CaseConfigIndex from "./case-def/little-case/case-config-index";
import KpiTaskDef from './kpi-task-def/kpi-task-list'
import FlowTaskDef from "./flow-task-def/index";
import ElecProcessOp from './elec-process/optional/index'
import ElecProcessDB from './elec-process/dashboard/index'
import ServiceRespLevelConf from "./service-resp-level-conf/index";


const Loading = {
    install: function(Vue){
        Vue.component('step-act-type', stepActType);
        Vue.component('case-config-index', CaseConfigIndex);
    },
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model', ModelDef, {title: '业务对象定义'});
        Gfui.componentView('agnes.define.task', TaskDef, {title: '任务定义配置'});
        Gfui.componentView('agnes.config.task', TaskConfig, {title: '任务执行列表'});
        Gfui.componentView('agnes.define.fun', FunDef, {title: '函数定义配置'});
        Gfui.componentView('agnes.config.workday', WorkDay, {title: '工作日'});
        Gfui.componentView('agnes.config.case', CaseDef, {title: 'case定义'});
        Gfui.componentView('agnes.config.mot', MotDef, {title: 'MOT任务配置'});

        // Gfui.componentView('agnes.config.case.step', CaseConfigIndex, {title: 'case详情配置'});
        Gfui.componentView('agnes.kpi.task.def', KpiTaskDef, {title: '监控指标任务配置'});
        Gfui.componentView('agnes.app.business.flowconf', FlowTaskDef, {title: '电子流程任务配置'});
        // Gfui.componentView('agnes.config.case.step', CaseConfigIndex, {title: 'case详情配置'});
        // Gfui.componentView('agnes.app.business.kpiconf', KpiTaskDef, {title: '指标任务配置'});


        Gfui.componentView('agnes.elec.operate', ElecProcessOp, {title: '电子流程操作'});
        Gfui.componentView('agnes.app.monitor.leader', ElecProcessDB, {title: '综合监控看板'});
        Gfui.componentView('agnes.service.resp.level.conf', ServiceRespLevelConf, {title: '服务响应等级配置'});
    }
};

export default Loading;
