import linkmanRef from "./linkman-ref-field";
import linkmanChooseField from "./linkman-choose-field"
import acntChooseField from "./acnt-choose-field"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-acnt-linkman-ref', linkmanRef);
        Gfui.grid('agnes-acnt-choose-field', acntChooseField);
        Gfui.grid('agnes-acnt-linkman-choose', linkmanChooseField);
    }
};

export default Loading;
