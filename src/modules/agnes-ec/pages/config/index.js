import EventDef from "./event-def/index";
import EventDefTab from "./event-def/event-def-dlg";
import EventExecRes from "./event-exec-res/index";
import MsgDef from "./msg-def/index";
const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.config.event', EventDef, {title: '事件定义配置'});
        Gfui.componentView('agnes.config.event.add', EventDefTab, {title: '事件定义新增'});
        Gfui.componentView('agnes.config.event.edit', EventDefTab, {title: '事件定义编辑'});
        Gfui.componentView('agnes.config.event.exec.res', EventExecRes, {title: '事件触发记录查询'});
        Gfui.componentView('agnes.msg.def', MsgDef, {title: '消息定义配置'});
    }
};

export default Loading;
