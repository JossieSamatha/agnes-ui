import EventDef from "./event-def/index";
import EventDefTab from "./event-def/event-def-dlg";
import MsgDef from "./msg-def/index";
const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.event', EventDef, {title: '事件定义'});
        Gfui.componentView('agnes.config.event.add', EventDefTab, {title: '事件定义新增'});
        Gfui.componentView('agnes.config.event.edit', EventDefTab, {title: '事件定义编辑'});
        Gfui.componentView('agnes.msg.def', MsgDef, {title: '消息定义'});
    }
};

export default Loading;
