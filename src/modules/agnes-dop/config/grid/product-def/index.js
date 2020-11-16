import Product from "./product-field";
import ProductUserInfo from "./product-user-field";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-product-field', Product);
        Gfui.grid('agnes-product-user-field', ProductUserInfo);

    }
};

export default Loading;
