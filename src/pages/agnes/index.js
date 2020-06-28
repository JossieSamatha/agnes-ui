import AgnesToolManageDefine from "./toolManager/msgDefine";

const Loading = {
    load: function(Gfui) {
        Gfui.componentView('agnes.tools.msg.define', AgnesToolManageDefine, {title: '消息定义'});
    }
};

export default Loading;

