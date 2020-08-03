import MemoList from "./memo-list";
import MemoMemberUser from "./memo-member-user-list";
import MemoMemberUserGroup from "./memo-member-user-group-list";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-dop-memo-list', MemoList);
        Gfui.grid('agnes-dop-memo-member-user-list', MemoMemberUser);
        Gfui.grid('agnes-dop-memo-member-user-group-list', MemoMemberUserGroup);
    }
};

export default Loading;
