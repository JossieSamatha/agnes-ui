import MemoList from "./memo-list";
import MemoMemberUser from "./memo-member-user-list";
import MemoMemberUserGroup from "./memo-member-user-group-list";
import MemoMemberRoster from "./memo-member-roster-list";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-dop-memo-list', MemoList);
        Gfui.grid('agnes-dop-memo-member-user-list', MemoMemberUser);
        Gfui.grid('agnes-dop-memo-member-user-group-list', MemoMemberUserGroup);
        Gfui.grid('agnes-dop-memo-member-roster-list', MemoMemberRoster);
    }
};

export default Loading;
