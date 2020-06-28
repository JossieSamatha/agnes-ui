import AgnesToolManageDefine from "./toolManager/msgDefine";

const Loading = {
    load: function(Gfui) {
        Gfui.componentView('agnes.tools.msg.define', AgnesToolManageDefine, {title: '运营工具管理'});
    }
};

export default Loading;

