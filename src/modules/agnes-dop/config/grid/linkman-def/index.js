import LinkMan from "./linkman-field";
import linkManGroup from "./linkman-group-list"
import linkManGroupField from "./linkman-group-field"

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-linkman-field', LinkMan);
        Gfui.grid('agnes-linkman-group', linkManGroup);
        Gfui.grid('agnes-linkman-group-field', linkManGroupField);
    }
};

export default Loading;
