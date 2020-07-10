import ModelDef from "./model-def"
import Task from "./task"
import FunDef from "./fun-def"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(FunDef);
        Gfui.use(Task);
    }
};

export default Loading;
