import OrgList from "./org-info-list";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-org-list', OrgList);
    }
};

export default Loading;
