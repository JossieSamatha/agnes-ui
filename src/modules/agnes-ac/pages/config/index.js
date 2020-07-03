import ModelDef from "./model-def/index";
import MsgDef from "./msg-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.model', ModelDef, {title: '对象类型定义'});
        Gfui.componentView('agnes.msg.def', MsgDef, {title: '消息定义'});
    }
};

export default Loading;
