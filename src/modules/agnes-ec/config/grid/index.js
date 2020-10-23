import EventDef from "./event-def"
import EventExecRes from "./event-exec-res"
import MsgDef from "./msg-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(EventDef);
        Gfui.use(EventExecRes);
        Gfui.use(MsgDef);
    }
};

export default Loading;
