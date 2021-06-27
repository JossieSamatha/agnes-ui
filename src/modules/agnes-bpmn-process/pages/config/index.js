import MsgDef from "./msg-def/index";
import dtl from "./msg-def/bpmn-dtl"

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.app.message.bpmn' , MsgDef, {title: '消息管理'});
        Gfui.componentView('agnes.app.message.bpmn.dtl' , dtl, {title: '消息管理'});
    }
};

export default Loading;
