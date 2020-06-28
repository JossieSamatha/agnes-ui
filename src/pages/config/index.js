import ModelDef from "./model-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model-def', ModelDef,{title : '对象类型定义'});
    }
};

export default Loading;
