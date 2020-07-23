import OrgList from "./org-info-list";
import OrgInfoList from "./agnes-org-info";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-org-list', OrgList);
        Gfui.grid('agnes-org-info-list', OrgInfoList);
    }
};

export default Loading;
