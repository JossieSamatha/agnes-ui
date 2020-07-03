import ModelDef from "./model-def"
import MsgDef from "./msg-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(MsgDef);
    }
};

export default Loading;
