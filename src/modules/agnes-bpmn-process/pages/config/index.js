import MsgDef from "./msg-def/bpmn";
import processDefine from "./msg-def/process-define"
import dtl from "./msg-def/bpmn-dtl"
import processDtl from "./msg-def/process-dtl"

const Loading = {
    load: function (Gfui) {
        Gfui.componentView('agnes.app.message.bpmn' , MsgDef, {title: '消息管理'});
        Gfui.componentView('agnes.app.message.bpmn.process.dtl' , processDtl, {title: '消息管理'});
        Gfui.componentView('agnes.app.message.bpmn.dtl' , dtl, {title: '消息管理'});
        Gfui.componentView('agnes.app.message.bpmn.process.define' ,processDefine, {title: '消息管理'});
    }
};

export default Loading;
