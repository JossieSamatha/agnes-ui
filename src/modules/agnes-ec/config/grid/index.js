import EventDef from "./event-def"
import MsgDef from "./msg-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(EventDef);
        Gfui.use(MsgDef);
    }
};

export default Loading;
