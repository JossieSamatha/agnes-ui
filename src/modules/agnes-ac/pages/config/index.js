import ModelDef from "./model-def/index";
import TaskConfig from "./task-config/index";
const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model', ModelDef, {title: '对象类型定义'});
        Gfui.componentView('agnes.config.task', TaskConfig, {title: '任务执行列表'});
    }
};

export default Loading;
