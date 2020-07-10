import MsgDef from "./msg-def/index";

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.msg.def', MsgDef, {title: '消息定义'});
    }
};

export default Loading;
