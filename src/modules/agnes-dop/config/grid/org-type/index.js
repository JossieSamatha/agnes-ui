import OrgTypeList from "./org-type-list";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-org-type-list', OrgTypeList);
    }
};

export default Loading;
