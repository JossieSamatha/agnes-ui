import ModelDef from "./model-def/index";
import TaskConfig from "./task-config/index";
import FunDef from "./fun-def/index"

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model', ModelDef, {title: '对象类型定义'});
        Gfui.componentView('agnes.config.task', TaskConfig, {title: '任务执行列表'});
        Gfui.componentView('agnes.define.fun', FunDef, {title: '函数类型定义'});
    }
};

export default Loading;
