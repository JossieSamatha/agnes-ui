import MemoDefList from "./memo-def-list";
import MemoList from "./memo-list";


const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-dop-memo-def-list', MemoDefList);
        Gfui.grid('agnes-dop-memo-ru-list', MemoList);
    }
};

export default Loading;
