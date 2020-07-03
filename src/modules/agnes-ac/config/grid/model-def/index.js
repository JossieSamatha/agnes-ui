import ModelType from "./model-type";
import ModelField from "./model-field";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-model-type', ModelType);
        Gfui.grid('agnes-model-field', ModelField);
    }
};

export default Loading;
