import TaskTodo from "./task-todo";

const Loading = {
    load: function (Gfui) {
        Gfui.grid('agnes-task-todo', TaskTodo);
    }
};

export default Loading;
