import MsgDef from "./msg-def/index";


const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.app.message.mgr', MsgDef, {title: '消息管理'});
    }
};

export default Loading;
