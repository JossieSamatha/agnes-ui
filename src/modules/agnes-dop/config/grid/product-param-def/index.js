import Product from "./product-param";
import ProductParamRef from "./product-param-ref"
import ProductInfoBeyondParam from "./product-info-beyond-param"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-product-param', Product);
        Gfui.grid('agnes-product-param-ref', ProductParamRef);
        Gfui.grid('agnes-product-info-beyond-param', ProductInfoBeyondParam);
    }
};

export default Loading;
