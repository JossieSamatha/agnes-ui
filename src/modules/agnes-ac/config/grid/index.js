import ModelDef from "./model-def"
import Task from "./task"

const Loading = {
    load: function (Gfui) {
        Gfui.use(ModelDef);
        Gfui.use(Task);
    }
};

export default Loading;
