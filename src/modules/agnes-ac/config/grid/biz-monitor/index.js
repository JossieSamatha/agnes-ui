import ProductField from "./product-task-field";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('product-task-field', ProductField);
    }
};

export default Loading;
