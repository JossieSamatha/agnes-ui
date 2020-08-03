import TaskManage from "./task-manage";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task-manage', TaskManage);
    }
};

export default Loading;
