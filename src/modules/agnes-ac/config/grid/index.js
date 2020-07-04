import ModelDef from "./model-def"
import FunDef from "./fun-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(FunDef);
    }
};

export default Loading;
